import { useCallback, useEffect, useState } from 'react'
import { api, rupiah, upload } from '../lib/api'

const TABS = ['Ringkasan', 'Kamar', 'Futsal', 'Pengguna']

export default function Admin() {
  const [tab, setTab] = useState(TABS[0])
  return (
    <>
      <h1>Dashboard admin</h1>
      <div className="tabs">
        {TABS.map((t) => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}
      </div>
      {tab === 'Ringkasan' && <Stats />}
      {tab === 'Kamar' && <Rooms />}
      {tab === 'Futsal' && <FutsalAdmin />}
      {tab === 'Pengguna' && <Users />}
    </>
  )
}

// hook kecil: load data + reload setelah aksi
function useLoad(path) {
  const [data, setData] = useState([])
  const [err, setErr] = useState('')
  const load = useCallback(() => api(path).then(setData).catch((e) => setErr(e.message)), [path])
  useEffect(() => { load() }, [load])
  return [data, load, err]
}

function Stats() {
  const [s, setS] = useState(null)
  useEffect(() => { api('/api/admin/stats').then(setS) }, [])
  if (!s) return null
  const items = [
    ['Pengguna', s.users], ['Kamar', s.rooms], ['Kamar tersedia', s.roomsAvailable], ['Kamar terisi', s.roomsOccupied],
    ['Booking menunggu', s.bookingsPending], ['Booking lunas', s.bookingsPaid], ['Pendapatan futsal', rupiah(s.futsalRevenue)],
  ]
  return (
    <div className="stats">
      {items.map(([k, v]) => <div key={k}><b>{v}</b><span>{k}</span></div>)}
    </div>
  )
}

function Rooms() {
  const [props, loadProps] = useLoad('/api/public/properties')
  const [allRooms, setAll] = useState([])
  const [p, setP] = useState({ name: '', type: 'kost', address: '' })
  const [r, setR] = useState({ propertyId: '', name: '', priceMonthly: '' })

  const reload = useCallback(async () => {
    loadProps()
    const lists = await Promise.all((await api('/api/public/properties')).map((x) => api(`/api/public/rooms?propertyId=${x.id}`)))
    setAll(lists.flat())
  }, [loadProps])
  useEffect(() => { reload() }, [reload])

  const act = (fn) => async (...a) => { try { await fn(...a); await reload() } catch (e) { alert(e.message) } }
  const addProp = act(async (e) => { e.preventDefault(); await api('/api/admin/properties', { method: 'POST', body: p }); setP({ name: '', type: 'kost', address: '' }) })
  const addRoom = act(async (e) => { e.preventDefault(); await api('/api/admin/rooms', { method: 'POST', body: { ...r, priceMonthly: +r.priceMonthly } }); setR({ ...r, name: '', priceMonthly: '' }) })
  const setStatus = act((room, status) => api(`/api/admin/rooms/${room.id}`, { method: 'PUT', body: { ...room, status } }))
  const delRoom = act((room) => confirm(`Hapus ${room.name}?`) && api(`/api/admin/rooms/${room.id}`, { method: 'DELETE' }))
  const addPhoto = act((room, file) => file && upload(`/api/admin/rooms/${room.id}/photos`, file))
  const delPhoto = act((room, url) => api(`/api/admin/rooms/${room.id}/photos?url=${encodeURIComponent(url)}`, { method: 'DELETE' }))
  const nameOf = (id) => props.find((x) => x.id === id)?.name

  return (
    <>
      <div className="row top">
        <form className="box flat" onSubmit={addProp}>
          <h3>Tambah properti</h3>
          <input placeholder="Nama (mis. Kost Melati)" value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} required />
          <select value={p.type} onChange={(e) => setP({ ...p, type: e.target.value })}><option>kost</option><option>kontrakan</option></select>
          <input placeholder="Alamat" value={p.address} onChange={(e) => setP({ ...p, address: e.target.value })} />
          <button className="btn">Tambah properti</button>
        </form>
        <form className="box flat" onSubmit={addRoom}>
          <h3>Tambah kamar</h3>
          <select value={r.propertyId} onChange={(e) => setR({ ...r, propertyId: e.target.value })} required>
            <option value="">Pilih properti</option>
            {props.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
          </select>
          <input placeholder="Nama kamar (mis. Kamar A1)" value={r.name} onChange={(e) => setR({ ...r, name: e.target.value })} required />
          <input type="number" placeholder="Harga per bulan (Rp)" value={r.priceMonthly} onChange={(e) => setR({ ...r, priceMonthly: e.target.value })} required />
          <button className="btn">Tambah kamar</button>
        </form>
      </div>
      <table>
        <tbody>
          {allRooms.map((room) => (
            <tr key={room.id}>
              <td><b>{room.name}</b><br /><span className="muted">{nameOf(room.propertyId)}</span></td>
              <td>{rupiah(room.priceMonthly)}</td>
              <td>
                <select value={room.status} onChange={(e) => setStatus(room, e.target.value)}>
                  <option>available</option><option>occupied</option><option>maintenance</option>
                </select>
              </td>
              <td className="thumbs">
                {room.photos?.map((u) => <img key={u} src={u} alt="" title="Klik untuk hapus" onClick={() => delPhoto(room, u)} />)}
                <label className="add">+ Foto<input type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(e) => addPhoto(room, e.target.files[0])} /></label>
              </td>
              <td><button className="ghost" onClick={() => delRoom(room)}>Hapus</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

function FutsalAdmin() {
  const [fields, loadFields] = useLoad('/api/public/futsal/fields')
  const [bookings, loadBookings] = useLoad('/api/admin/futsal/bookings')
  const [f, setF] = useState({ name: '', pricePerHour: '' })
  const act = (fn) => async (...a) => { try { await fn(...a); loadFields(); loadBookings() } catch (e) { alert(e.message) } }
  const addField = act(async (e) => { e.preventDefault(); await api('/api/admin/futsal/fields', { method: 'POST', body: { ...f, pricePerHour: +f.pricePerHour } }); setF({ name: '', pricePerHour: '' }) })
  const delField = act((x) => confirm(`Hapus ${x.name}?`) && api(`/api/admin/futsal/fields/${x.id}`, { method: 'DELETE' }))
  const setStatus = act((b, status) => api(`/api/admin/futsal/bookings/${b.id}/status`, { method: 'PATCH', body: { status } }))
  const fieldName = (id) => fields.find((x) => x.id === id)?.name

  return (
    <>
      <form className="box flat" onSubmit={addField}>
        <h3>Tambah lapangan</h3>
        <input placeholder="Nama lapangan" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} required />
        <input type="number" placeholder="Harga per jam (Rp)" value={f.pricePerHour} onChange={(e) => setF({ ...f, pricePerHour: e.target.value })} required />
        <button className="btn">Tambah lapangan</button>
      </form>
      <p>{fields.map((x) => <span key={x.id} className="tag">{x.name} · {rupiah(x.pricePerHour)}/jam <a onClick={() => delField(x)}>×</a></span>)}</p>
      <h2>Semua booking</h2>
      <table>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{new Date(b.startTime).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</td>
              <td>{fieldName(b.fieldId)}</td>
              <td>{b.customerName}<br /><span className="muted">{b.phone}</span></td>
              <td>{rupiah(b.totalPrice)}</td>
              <td>
                <select value={b.status} onChange={(e) => setStatus(b, e.target.value)}>
                  <option>pending</option><option>paid</option><option>cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

function Users() {
  const [users, load] = useLoad('/api/admin/users')
  const setRole = async (u, role) => { try { await api(`/api/admin/users/${u.id}/role`, { method: 'PATCH', body: { role } }); load() } catch (e) { alert(e.message) } }
  return (
    <table>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td className="thumbs">{u.avatarUrl ? <img src={u.avatarUrl} alt="" /> : <span className="dot" />}</td>
            <td>{u.fullName}<br /><span className="muted">{u.phone}</span></td>
            <td>
              <select value={u.role} onChange={(e) => setRole(u, e.target.value)}>
                <option>user</option><option>admin</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
