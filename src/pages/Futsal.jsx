import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth'
import { api, rupiah } from '../lib/api'

const HOURS = Array.from({ length: 16 }, (_, i) => i + 8) // 08:00 - 23:00
const todayWIB = () => new Date(Date.now() + 7 * 3600000).toISOString().slice(0, 10)

export default function Futsal() {
  const { session } = useAuth()
  const nav = useNavigate()
  const [fields, setFields] = useState([])
  const [fid, setFid] = useState('')
  const [date, setDate] = useState(todayWIB())
  const [busy, setBusy] = useState([])
  const [start, setStart] = useState(null)
  const [dur, setDur] = useState(1)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api('/api/public/futsal/fields').then((f) => { setFields(f); if (f[0]) setFid(f[0].id) }).catch((e) => setMsg(e.message))
  }, [])

  const loadBusy = useCallback(() => {
    if (fid) api(`/api/public/futsal/fields/${fid}/busy?date=${date}`).then(setBusy).catch((e) => setMsg(e.message))
  }, [fid, date])
  useEffect(() => { setStart(null); loadBusy() }, [loadBusy])

  const dayStart = new Date(`${date}T00:00:00+07:00`).getTime()
  const at = (h) => new Date(dayStart + h * 3600000)
  const free = (h) => at(h) > new Date() && !busy.some((b) => new Date(b.start) < at(h + 1) && new Date(b.end) > at(h))
  const field = fields.find((f) => f.id === fid)
  const range = start == null ? [] : Array.from({ length: dur }, (_, i) => start + i)
  const valid = range.length > 0 && range.every((h) => h < 24 && free(h))

  async function book() {
    if (!session) return nav('/masuk')
    try {
      await api('/api/me/bookings', { method: 'POST', body: { fieldId: fid, start: at(start).toISOString(), end: at(start + dur).toISOString() } })
      setMsg('Booking masuk. Status: menunggu pembayaran.')
      setStart(null); loadBusy()
    } catch (e) { setMsg(e.message) }
  }

  return (
    <>
      <h1>Booking lapangan futsal</h1>
      <div className="row">
        <select value={fid} onChange={(e) => setFid(e.target.value)}>
          {fields.map((f) => <option key={f.id} value={f.id}>{f.name} — {rupiah(f.pricePerHour)}/jam</option>)}
        </select>
        <input type="date" value={date} min={todayWIB()} onChange={(e) => setDate(e.target.value)} />
        <select value={dur} onChange={(e) => setDur(+e.target.value)}>
          {[1, 2, 3].map((d) => <option key={d} value={d}>{d} jam</option>)}
        </select>
      </div>
      <div className="slots">
        {HOURS.map((h) => (
          <button key={h} disabled={!free(h)} className={range.includes(h) ? 'on' : ''} onClick={() => setStart(h)}>
            {String(h).padStart(2, '0')}:00
          </button>
        ))}
      </div>
      {start != null && (
        <p>
          {String(start).padStart(2, '0')}:00–{String(start + dur).padStart(2, '0')}:00 ·{' '}
          <b>{rupiah((field?.pricePerHour ?? 0) * dur)}</b>{' '}
          <button className="btn" disabled={!valid} onClick={book}>{session ? 'Booking sekarang' : 'Masuk untuk booking'}</button>
        </p>
      )}
      {msg && <p className="muted">{msg}</p>}
    </>
  )
}
