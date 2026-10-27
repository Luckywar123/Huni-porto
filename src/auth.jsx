import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import { api } from './lib/api'

const Ctx = createContext(null)
export const useAuth = () => useContext(Ctx)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async (s) => {
    setSession(s)
    try { setProfile(s ? await api('/api/me') : null) } catch { setProfile(null) }
    setLoading(false)
  }, [])

  useEffect(() => {
    // setTimeout: hindari panggil supabase di dalam callback auth (bisa deadlock)
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setTimeout(() => load(s), 0))
    return () => data.subscription.unsubscribe()
  }, [load])

  const value = {
    session, profile, loading,
    refresh: () => load(session),
    signOut: () => supabase.auth.signOut(),
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
