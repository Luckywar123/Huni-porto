import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
const missing = ['VITE_API_URL', 'VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY']
  .filter((k) => !import.meta.env[k])

if (missing.length) {
  // Env belum diisi di Vercel -> tampilkan pesan, bukan layar putih
  root.render(
    <div className="box">
      <h1>Konfigurasi belum lengkap</h1>
      <p>Isi env var ini di Vercel (Settings → Environment Variables), lalu redeploy:</p>
      <ul>{missing.map((k) => <li key={k}><code>{k}</code></li>)}</ul>
    </div>
  )
} else {
  Promise.all([import('react-router-dom'), import('./auth'), import('./App')]).then(
    ([{ BrowserRouter }, { AuthProvider }, { default: App }]) =>
      root.render(
        <React.StrictMode>
          <BrowserRouter>
            <AuthProvider>
              <App />
            </AuthProvider>
          </BrowserRouter>
        </React.StrictMode>
      )
  )
}
