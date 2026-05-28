import { createBrowserClient as createSC } from '@supabase/ssr'

export function createBrowserClient() {
  return createSC(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
