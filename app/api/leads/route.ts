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
  agree_to_contact: z.boolean().optional(),
  contact_name: z.string().min(2, 'Contact name is required').optional(),
  facility_name: z.string().min(2, 'Facility name is required').optional(),
  facility_type: z.string().min(2, 'Facility type is required').optional(),
  organization: z.string().optional(),
  programType: z.string().optional(),
  coverageNeed: z.string().optional(),
  calculator: z.record(z.unknown()).optional(),
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

    const { 
      name, email, facility, facilityType, bed_count, states_served, 
      current_after_hours, insurance_accepted, agree_to_contact, 
      contact_name, facility_name, facility_type, organization, programType, coverageNeed 
    } = result.data

    const lead = await db.createLead({
      name,
      email,
      phone: null,
      company: null,
      job_title: null,
      website: null,
      facility: facility || facility_name || organization || null,
      facility_type: facility_type || facilityType || programType || null,
      contact_name: contact_name || name,
      bed_count,
      states_served,
      current_after_hours: current_after_hours || coverageNeed || null,
      insurance_accepted,
      agree_to_contact: agree_to_contact ?? true,
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