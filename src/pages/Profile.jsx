import { useEffect, useState } from 'react'
import { useAuth } from '../auth'
import { api, rupiah, upload } from '../lib/api'

export default function Profile() {
  const { profile, refresh } = useAuth()
  const [f, setF] = useState({ fullName: '', phone: '' })
  const [bookings, setBookings] = useState([])
  const [msg, setMsg] = useState('')

  useEffect(() => { if (profile) setF({ fullName: profile.fullName ?? '', phone: profile.phone ?? '' }) }, [profile])
  useEffect(() => { api('/api/me/bookings').then(setBookings).catch(() => {}) }, [])

  async function save(e) {
    e.preventDefault()
    try { await api('/api/me', { method: 'PUT', body: f }); await refresh(); setMsg('Profil disimpan') } catch (e) { setMsg(e.message) }
  }
  async function avatar(e) {
    const file = e.target.files[0]
    if (!file) return
    try { await upload('/api/me/avatar', file); await refresh(); setMsg('Foto profil diganti') } catch (e) { setMsg(e.message) }
  }

  return (
    <>
      <h1>Profil saya</h1>
      <div className="row top">
        <label className="avatar">
          {profile?.avatarUrl ? <img src={profile.avatarUrl} alt="Foto profil" /> : <span>Unggah foto</span>}
          <input type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={avatar} />
        </label>
        <form className="box flat" onSubmit={save}>
          <input placeholder="Nama lengkap" value={f.fullName} onChange={(e) => setF({ ...f, fullName: e.target.value })} required />
          <input placeholder="No. HP" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
          <button className="btn">Simpan perubahan</button>
        </form>
      </div>
      {msg && <p className="muted">{msg}</p>}
      <h2>Booking futsal saya</h2>
      {bookings.length === 0 && <p className="muted">Belum ada booking.</p>}
      <table>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{new Date(b.startTime).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</td>
              <td>{rupiah(b.totalPrice)}</td>
              <td><span className={`tag ${b.status}`}>{b.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
