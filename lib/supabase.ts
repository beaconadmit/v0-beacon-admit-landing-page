import { createClient } from '@supabase/supabase-js'
import { SupabaseAdapter } from './db-supabase'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)
export const db = new SupabaseAdapter(supabase)