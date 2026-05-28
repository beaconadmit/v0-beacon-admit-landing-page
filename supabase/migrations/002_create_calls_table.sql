-- Create calls table for Retell AI voice agent call logging
CREATE TABLE IF NOT EXISTS public.calls (
  id BIGSERIAL PRIMARY KEY,
  call_id TEXT NOT NULL UNIQUE,
  facility_name TEXT,
  facility_type TEXT,
  call_status TEXT,
  call_outcome TEXT,
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  duration_seconds INTEGER,
  caller_phone TEXT,
  transcript TEXT,
  recording_url TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Add columns if they don't exist (for existing tables with different schema)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='facility_name') THEN
    ALTER TABLE public.calls ADD COLUMN facility_name TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='facility_type') THEN
    ALTER TABLE public.calls ADD COLUMN facility_type TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='call_status') THEN
    ALTER TABLE public.calls ADD COLUMN call_status TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='call_outcome') THEN
    ALTER TABLE public.calls ADD COLUMN call_outcome TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='start_time') THEN
    ALTER TABLE public.calls ADD COLUMN start_time TIMESTAMPTZ;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='end_time') THEN
    ALTER TABLE public.calls ADD COLUMN end_time TIMESTAMPTZ;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='duration_seconds') THEN
    ALTER TABLE public.calls ADD COLUMN duration_seconds INTEGER;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='caller_phone') THEN
    ALTER TABLE public.calls ADD COLUMN caller_phone TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='transcript') THEN
    ALTER TABLE public.calls ADD COLUMN transcript TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='recording_url') THEN
    ALTER TABLE public.calls ADD COLUMN recording_url TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='metadata') THEN
    ALTER TABLE public.calls ADD COLUMN metadata JSONB;
  END IF;
END $$;

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS calls_call_id_idx ON public.calls (call_id);
CREATE INDEX IF NOT EXISTS calls_facility_name_idx ON public.calls (facility_name);
CREATE INDEX IF NOT EXISTS calls_created_at_idx ON public.calls (created_at DESC);
CREATE INDEX IF NOT EXISTS calls_call_status_idx ON public.calls (call_status);

-- Enable Row Level Security (denies all access until policies are added)
ALTER TABLE public.calls ENABLE ROW LEVEL SECURITY;

-- Revoke any accidental anon access
REVOKE ALL ON public.calls FROM anon;

-- Grant read privilege to authenticated role
GRANT SELECT ON public.calls TO authenticated;

-- Create policy for authenticated team members to read all calls
DROP POLICY IF EXISTS "beacon_admit_team_full_select" ON public.calls;
CREATE POLICY "beacon_admit_team_full_select"
ON public.calls
FOR SELECT
TO authenticated
USING (true); -- Adjust to check user role if you add team role tracking later

-- Note: Service role (used by Retell webhooks) bypasses RLS entirely,
-- so no policy needed for INSERT - it will work automatically with service role key
