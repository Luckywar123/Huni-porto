import { createClient } from '@supabase/supabase-js'

// Supabase dipakai HANYA untuk login (Auth). Data & upload lewat Java API.
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
