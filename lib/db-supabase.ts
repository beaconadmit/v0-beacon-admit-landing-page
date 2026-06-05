import { SupabaseClient } from '@supabase/supabase-js'
import { DatabaseAdapter, Lead, Call } from './db-interface'

export class SupabaseAdapter implements DatabaseAdapter {
  constructor(private client: SupabaseClient) {}

  async createLead(lead: Omit<Lead, 'id' | 'created_at'>): Promise<Lead> {
    const { data, error } = await this.client
      .from('leads')
      .insert([
        {
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          company: lead.company,
          job_title: lead.job_title,
          website: lead.website,
          facility: lead.facility,
          facility_type: lead.facility_type,
          contact_name: lead.contact_name,
          bed_count: lead.bed_count,
          states_served: lead.states_served,
          current_after_hours: lead.current_after_hours,
          insurance_accepted: lead.insurance_accepted,
          agree_to_contact: lead.agree_to_contact,
        }
      ])
      .select()
      .single()

    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }

    return data as Lead
  }

  async createCall(call: Omit<Call, 'id' | 'created_at'>): Promise<Call> {
    const { data, error } = await this.client
      .from('calls')
      .insert([
        {
          call_id: call.call_id,
          facility_name: call.facility_name,
          facility_type: call.facility_type,
          call_status: call.call_status,
          call_outcome: call.call_outcome,
          start_time: call.start_time,
          end_time: call.end_time,
          duration_seconds: call.duration_seconds,
          caller_phone: call.caller_phone,
          transcript: call.transcript,
          recording_url: call.recording_url,
          metadata: call.metadata,
        }
      ])
      .select()
      .single()

    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }

    return data as Call
  }

  async getLeads(search?: string): Promise<Lead[]> {
    let query = this.client
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
    }

    const { data, error } = await query

    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }

    return data as Lead[]
  }

  async getCalls(): Promise<Call[]> {
    const { data, error } = await this.client
      .from('calls')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }

    return data as Call[]
  }
}
