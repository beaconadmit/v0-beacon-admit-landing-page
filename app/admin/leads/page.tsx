import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { LeadsTable } from './leads-table'
import { SearchBar } from './search-bar'

export const dynamic = 'force-dynamic'

async function getLeads(search?: string) {
  const supabase = await createClient()

  let query = supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
  }

  const { data, error } = await query
  if (error) return []
  return data
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const params = await searchParams
  const search = params.q
  const leads = await getLeads(search)

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Leads
          </h1>
          <p className="text-sm text-gray-500">
            {leads.length} total lead{leads.length !== 1 ? 's' : ''}
          </p>
        </div>
        <SearchBar initialQuery={search} />
      </div>
      <LeadsTable leads={leads} />
    </div>
  )
}
