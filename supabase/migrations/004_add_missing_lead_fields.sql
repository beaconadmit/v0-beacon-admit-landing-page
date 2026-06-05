-- Update leads table to support all form fields
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS contact_name TEXT,
  ADD COLUMN IF NOT EXISTS bed_count INT,
  ADD COLUMN IF NOT EXISTS states_served JSONB,
  ADD COLUMN IF NOT EXISTS current_after_hours TEXT,
  ADD COLUMN IF NOT EXISTS insurance_accepted JSONB,
  ADD COLUMN IF NOT EXISTS agree_to_contact BOOLEAN;