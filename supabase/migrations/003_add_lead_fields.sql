-- Add new columns to leads table for comprehensive lead capture
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS company TEXT,
  ADD COLUMN IF NOT EXISTS job_title TEXT,
  ADD COLUMN IF NOT EXISTS website TEXT;

-- Add index on phone for faster lookups
CREATE INDEX IF NOT EXISTS leads_phone_idx ON public.leads (phone);
