-- Create leads table for demo form submissions
CREATE TABLE IF NOT EXISTS public.leads (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  facility TEXT,
  facility_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the demo form)
CREATE POLICY "Allow anonymous inserts" ON public.leads
  FOR INSERT
  WITH CHECK (true);

-- Allow service role to read all leads
CREATE POLICY "Allow service role full access" ON public.leads
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS leads_email_idx ON public.leads (email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);
