'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Phone,
  FileDown,
  LogOut,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/calls', label: 'Calls', icon: Phone },
  { href: '/admin/export', label: 'Export', icon: FileDown },
]

export function AdminSidebar({ user }: { user: { email?: string | null } }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="hidden w-64 flex-col border-r bg-gray-50/40 p-4 lg:flex">
      <div className="mb-8">
        <h2 className="text-lg font-semibold tracking-tight text-gray-900">
          Beacon Admit
        </h2>
        <p className="text-xs text-gray-500">Admin Dashboard</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(item => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t pt-4 space-y-2">
        <p className="text-xs text-gray-500 truncate">{user.email}</p>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </aside>
  )
}
