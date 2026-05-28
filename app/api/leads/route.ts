import { NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/supabase'

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  facility: z.string().optional(),
  facilityType: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = formSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.format() },
        { status: 400 }
      )
    }

    const { name, email, facility, facilityType } = result.data

    const lead = await db.createLead({
      name,
      email,
      facility: facility || null,
      facility_type: facilityType || null,
    })

    return NextResponse.json({ success: true, id: lead.id }, { status: 200 })
  } catch (error) {
    console.error('API route error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}