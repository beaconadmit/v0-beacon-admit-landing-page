import { createClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const headers = ['id', 'name', 'email', 'facility', 'facility_type', 'created_at']
  const rows = data.map(row =>
    headers.map(h => {
      const val = row[h as keyof typeof row]
      if (val === null || val === undefined) return ''
      return `"${String(val).replace(/"/g, '""')}"`
    }).join(',')
  )

  const csv = [headers.join(','), ...rows].join('\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="leads.csv"',
    },
  })
}
