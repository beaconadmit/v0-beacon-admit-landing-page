import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Users, Phone, TrendingUp, Calendar } from 'lucide-react'
import { Suspense } from 'react'

async function getStats() {
  const supabase = await createClient()

  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - (now.getDay() || 7) + 1) // Monday of this week
  const weekStartStr = weekStart.toISOString()

  const [
    { count: leadCount },
    { count: callCount },
    { count: monthCount },
    { count: weekCount },
    { data: recentLeads },
    { data: recentCalls },
  ] = await Promise.all([
    supabase.from('leads').select('id', { count: 'exact' }),
    supabase.from('calls').select('id', { count: 'exact' }),
    supabase.from('leads').select('id', { count: 'exact' }).gte('created_at', monthStart),
    supabase.from('leads').select('id', { count: 'exact' }).gte('created_at', weekStartStr),
    supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5),
    supabase.from('calls').select('*').order('created_at', { ascending: false }).limit(5),
  ])

  return {
    leadCount: leadCount ?? 0,
    callCount: callCount ?? 0,
    monthCount: monthCount ?? 0,
    weekCount: weekCount ?? 0,
    recentLeads: recentLeads ?? [],
    recentCalls: recentCalls ?? [],
  }
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const stats = await getStats()

  const statCards = [
    { label: 'Total Leads', value: stats.leadCount, icon: Users, color: 'text-blue-600' },
    { label: 'Total Calls', value: stats.callCount, icon: Phone, color: 'text-green-600' },
    { label: 'This Month', value: stats.monthCount, icon: TrendingUp, color: 'text-purple-600' },
    { label: 'New This Week', value: stats.weekCount, icon: Calendar, color: 'text-orange-600' },
  ]

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Overview of your leads and voice agent activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(card => {
          const Icon = card.icon
          return (
            <Card key={card.label} className="p-4">
              <div className="flex items-center gap-3">
                <Icon className={`h-8 w-8 ${card.color}`} />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-xs text-gray-500">{card.label}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Recent Leads</h3>
          {stats.recentLeads.length === 0 ? (
            <p className="text-sm text-gray-400">No leads yet.</p>
          ) : (
            <ul className="space-y-2">
              {stats.recentLeads.map((lead: any) => (
                <li key={lead.id} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-800">{lead.name}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Recent Calls</h3>
          {stats.recentCalls.length === 0 ? (
            <p className="text-sm text-gray-400">No calls yet.</p>
          ) : (
            <ul className="space-y-2">
              {stats.recentCalls.map((call: any) => (
                <li key={call.id} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-800">
                    {call.facility_name || call.call_id}
                  </span>
                  <span className="text-xs text-gray-400">
                    {call.call_status || 'unknown'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  )
}
