import { useEffect, useState } from 'react'
import { api, rupiah } from '../lib/api'

export default function Home() {
  const [props, setProps] = useState([])
  const [rooms, setRooms] = useState([])
  const [type, setType] = useState('all')
  const [err, setErr] = useState('')

  useEffect(() => {
    Promise.all([api('/api/public/properties'), api('/api/public/rooms')])
      .then(([p, r]) => { setProps(p); setRooms(r) })
      .catch((e) => setErr(e.message))
  }, [])

  const byId = Object.fromEntries(props.map((p) => [p.id, p]))
  const list = rooms.filter((r) => type === 'all' || byId[r.propertyId]?.type === type)

  return (
    <>
      <h1>Cari kost atau kontrakan</h1>
      <div className="tabs">
        {[['all', 'Semua'], ['kost', 'Kost'], ['kontrakan', 'Kontrakan']].map(([k, label]) => (
          <button key={k} className={type === k ? 'on' : ''} onClick={() => setType(k)}>{label}</button>
        ))}
      </div>
      {err && <p className="err">{err}</p>}
      {!err && list.length === 0 && <p className="muted">Belum ada kamar tersedia. Cek lagi nanti.</p>}
      <div className="grid">
        {list.map((r) => (
          <article key={r.id} className="card">
            {r.photos?.[0] ? <img src={r.photos[0]} alt={r.name} /> : <div className="ph" />}
            <div className="pad">
              <h3>{r.name}</h3>
              <p className="muted">{byId[r.propertyId]?.name} · {byId[r.propertyId]?.address}</p>
              <p className="price">{rupiah(r.priceMonthly)} <small>/ bulan</small></p>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
