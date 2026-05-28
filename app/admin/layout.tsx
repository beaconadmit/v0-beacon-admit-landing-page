import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { AdminSidebar } from './sidebar'

export const metadata: Metadata = {
  title: 'Beacon Admit Admin',
  description: 'Admin dashboard for Beacon Admit',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  return (
    <div className="flex min-h-screen">
      <AdminSidebar user={user} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
