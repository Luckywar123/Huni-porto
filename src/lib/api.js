import { supabase } from './supabase'

const BASE = import.meta.env.VITE_API_URL

export async function api(path, { method = 'GET', body, form } = {}) {
  const { data } = await supabase.auth.getSession()
  const headers = {}
  const token = data.session?.access_token
  if (token) headers.Authorization = `Bearer ${token}`
  if (body) headers['Content-Type'] = 'application/json'
  const res = await fetch(BASE + path, {
    method,
    headers,
    body: form ?? (body ? JSON.stringify(body) : undefined),
  })
  const text = await res.text()
  const json = text ? JSON.parse(text) : null
  if (!res.ok) throw new Error(json?.message || res.statusText)
  return json
}

export const upload = (path, file) => {
  const form = new FormData()
  form.append('file', file)
  return api(path, { method: 'POST', form })
}

export const rupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n ?? 0)
