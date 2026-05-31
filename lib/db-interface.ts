export interface DatabaseAdapter {
  createLead(lead: Omit<Lead, 'id' | 'created_at'>): Promise<Lead>
  getLeads(): Promise<Lead[]>
  getLeads(search?: string): Promise<Lead[]>
  createCall(call: Omit<Call, 'id' | 'created_at'>): Promise<Call>
  getCalls(): Promise<Call[]>
}

export interface Lead {
  id: number
  name: string
  email: string
  phone?: string | null
  company?: string | null
  job_title?: string | null
  website?: string | null
  facility: string | null
  facility_type: string | null
  created_at: string
}

export interface Call {
  id: number
  call_id: string
  facility_name: string | null
  facility_type: string | null
  call_status: string | null
  call_outcome: string | null
  start_time: string | null
  end_time: string | null
  duration_seconds: number | null
  caller_phone: string | null
  transcript: string | null
  recording_url: string | null
  metadata: Record<string, unknown> | null
  created_at: string
}
