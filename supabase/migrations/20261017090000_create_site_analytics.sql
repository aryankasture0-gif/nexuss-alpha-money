/*
  Lightweight first-party website analytics.
  Stores anonymous page/click events only; names and emails remain in
  contact_submissions and are never inferred from a visit.
*/
CREATE TABLE IF NOT EXISTS site_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL CHECK (event_type IN ('page_view', 'whatsapp_click', 'phone_click', 'form_started', 'form_submitted')),
  session_id text NOT NULL,
  path text NOT NULL,
  referrer text,
  device_type text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE site_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_site_events" ON site_events;
CREATE POLICY "anon_insert_site_events"
ON site_events FOR INSERT TO anon, authenticated
WITH CHECK (char_length(session_id) BETWEEN 16 AND 100 AND char_length(path) BETWEEN 1 AND 300);

CREATE INDEX IF NOT EXISTS site_events_created_at_idx ON site_events (created_at DESC);
CREATE INDEX IF NOT EXISTS site_events_type_created_at_idx ON site_events (event_type, created_at DESC);
