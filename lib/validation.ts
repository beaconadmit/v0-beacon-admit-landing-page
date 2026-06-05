import { z } from 'zod'

export const validators = {
  email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  phone: (v: string) => /^[\d\s\-\(\)\+]{10,}$/.test(v),
  required: (v: string) => v.trim().length > 0,
}

export const leadSchema = z.object({
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