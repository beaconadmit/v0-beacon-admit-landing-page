import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { CallsTable } from './calls-table'

export const dynamic = 'force-dynamic'

async function getCalls() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('calls')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return []
  return data
}

export default async function CallsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const calls = await getCalls()

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Voice Calls
        </h1>
        <p className="text-sm text-gray-500">
          {calls.length} total call{calls.length !== 1 ? 's' : ''}
        </p>
      </div>
      <CallsTable calls={calls} />
    </div>
  )
}
