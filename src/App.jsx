import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './auth'
import Home from './pages/Home'
import Futsal from './pages/Futsal'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Admin from './pages/Admin'

export default function App() {
  const { session, profile, loading, signOut } = useAuth()
  const admin = profile?.role === 'admin'

  return (
    <>
      <header className="bar">
        <NavLink to="/" className="brand">HUNI</NavLink>
        <nav>
          <NavLink to="/" end>Kost & Kontrakan</NavLink>
          <NavLink to="/futsal">Lapangan Futsal</NavLink>
          {admin && <NavLink to="/admin">Dashboard</NavLink>}
        </nav>
        <div className="who">
          {session ? (
            <>
              <NavLink to="/profil" className="who-link">
                {profile?.avatarUrl ? <img src={profile.avatarUrl} alt="" /> : <span className="dot" />}
                {profile?.fullName}
              </NavLink>
              <button className="ghost" onClick={signOut}>Keluar</button>
            </>
          ) : (
            <NavLink to="/masuk" className="btn">Masuk</NavLink>
          )}
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/futsal" element={<Futsal />} />
          <Route path="/masuk" element={<Login />} />
          <Route path="/profil" element={session ? <Profile /> : <Navigate to="/masuk" />} />
          <Route path="/admin" element={loading ? null : admin ? <Admin /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  )
}
