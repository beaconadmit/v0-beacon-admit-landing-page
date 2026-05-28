import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Download, FileSpreadsheet } from 'lucide-react'
import { ExportButton } from './export-button'

export const dynamic = 'force-dynamic'

export default async function ExportPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const [leadsRes, callsRes] = await Promise.all([
    supabase.from('leads').select('*', { count: 'exact' }),
    supabase.from('calls').select('*', { count: 'exact' }),
  ])

  const leadCount = leadsRes.count ?? 0
  const callCount = callsRes.count ?? 0

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Export Data
        </h1>
        <p className="text-sm text-gray-500">
          Download your leads and call data as CSV files.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ExportCard
          title="Leads"
          count={leadCount}
          description="All demo form submissions"
          href="/admin/export/leads"
        />
        <ExportCard
          title="Voice Calls"
          count={callCount}
          description="All Retell AI call logs"
          href="/admin/export/calls"
        />
      </div>
    </div>
  )
}

function ExportCard({
  title,
  count,
  description,
  href,
}: {
  title: string
  count: number
  description: string
  href: string
}) {
  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-center gap-3">
        <FileSpreadsheet className="h-8 w-8 text-gray-400" />
        <div>
          <p className="font-semibold text-gray-900">{title}</p>
          <p className="text-xs text-gray-500">{count} record{count !== 1 ? 's' : ''}</p>
        </div>
      </div>
      <p className="text-sm text-gray-500">{description}</p>
      <ExportButton label={title} href={href} />
    </div>
  )
}
