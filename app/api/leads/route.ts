import { NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/supabase'

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  facility: z.string().optional(),
  facilityType: z.string().optional(),
  bed_count: z.number().min(1, 'Bed count must be at least 1').optional(),
  states_served: z.array(z.string()).optional(),
  current_after_hours: z.string().optional(),
  insurance_accepted: z.array(z.string()).optional(),
  agree_to_contact: z.boolean(),
  contact_name: z.string().min(2, 'Contact name is required'),
  facility_name: z.string().min(2, 'Facility name is required'),
  facility_type: z.string().min(2, 'Facility type is required'),
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

    const { name, email, facility, facilityType, bed_count, states_served, current_after_hours, insurance_accepted, agree_to_contact, contact_name, facility_name, facility_type } = result.data

    const lead = await db.createLead({
      name,
      email,
      phone: null,
      company: null,
      job_title: null,
      website: null,
      facility: facility || null,
      facility_type: facility_type || facilityType || null,
      contact_name,
      bed_count,
      states_served,
      current_after_hours,
      insurance_accepted,
      agree_to_contact,
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