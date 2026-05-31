import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { LoginForm } from './login-form'

export default async function AdminLoginPage() {
  const supabase = await createClient()
  
  let user = null
  try {
    const { data, error } = await supabase.auth.getUser()
    if (error) console.error('Auth error:', error.message)
    user = data.user
  } catch (e) {
    console.error('Failed to get user:', e)
  }
  
  if (user) redirect('/admin')

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Beacon Admit Admin
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to access the dashboard
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
