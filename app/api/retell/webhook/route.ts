import { NextResponse } from 'next/server'
import { db } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Retell webhook sends call data
    const {
      call_id,
      agent_id,
      call_status,
      call_outcome,
      start_time,
      end_time,
      duration_seconds,
      from_number,
      transcript,
      recording_url,
      metadata,
    } = body

    if (!call_id) {
      return NextResponse.json(
        { error: 'Missing call_id' },
        { status: 400 }
      )
    }

    // Extract facility info from metadata if available
    const facilityName = metadata?.facility_name || null
    const facilityType = metadata?.facility_type || null

    const call = await db.createCall({
      call_id,
      facility_name: facilityName,
      facility_type: facilityType,
      call_status: call_status || null,
      call_outcome: call_outcome || null,
      start_time: start_time || null,
      end_time: end_time || null,
      duration_seconds: duration_seconds || null,
      caller_phone: from_number || null,
      transcript: transcript || null,
      recording_url: recording_url || null,
      metadata: metadata || null,
    })

    return NextResponse.json({ success: true, id: call.id }, { status: 200 })
  } catch (error) {
    console.error('Retell webhook error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
