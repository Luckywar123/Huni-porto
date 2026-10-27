import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const nav = useNavigate()
  const [signup, setSignup] = useState(false)
  const [f, setF] = useState({ name: '', email: '', password: '' })
  const [err, setErr] = useState('')
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  async function submit(e) {
    e.preventDefault(); setErr('')
    const { error } = signup
      ? await supabase.auth.signUp({ email: f.email, password: f.password, options: { data: { full_name: f.name } } })
      : await supabase.auth.signInWithPassword({ email: f.email, password: f.password })
    if (error) setErr(error.message); else nav('/')
  }

  return (
    <form className="box" onSubmit={submit}>
      <h1>{signup ? 'Daftar akun' : 'Masuk'}</h1>
      {signup && <input placeholder="Nama lengkap" value={f.name} onChange={set('name')} required />}
      <input type="email" placeholder="Email" value={f.email} onChange={set('email')} required />
      <input type="password" placeholder="Password (min. 6 karakter)" value={f.password} onChange={set('password')} minLength={6} required />
      {err && <p className="err">{err}</p>}
      <button className="btn">{signup ? 'Daftar' : 'Masuk'}</button>
      <button type="button" className="ghost" onClick={() => setSignup(!signup)}>
        {signup ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Daftar'}
      </button>
    </form>
  )
}
