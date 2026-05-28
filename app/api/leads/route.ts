import { NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'

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

    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          name,
          email,
          facility,
          facilityType,
        }
      ])

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}