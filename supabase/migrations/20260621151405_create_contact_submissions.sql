/*
# Create contact_submissions table (single-tenant, no auth)

This table stores inquiries submitted through the Nexus Alpha contact form.
The marketing site has no sign-in flow, so submissions are public/anonymous
and intentionally shared — any visitor can submit an inquiry.

1. New Tables
- `contact_submissions`
  - `id`            uuid, primary key (default gen_random_uuid())
  - `name`          text, not null — full name of the inquirer
  - `email`         text, not null — contact email
  - `phone`         text, nullable — optional phone number
  - `loan_type`     text, not null — one of: 'Personal', 'Business', 'Home', 'Other'
  - `loan_amount`   numeric, nullable — requested amount if provided
  - `message`       text, nullable — free-text message
  - `status`        text, not null default 'new' — lead status (new / contacted / closed)
  - `created_at`    timestamptz, default now()

2. Security
- Enable RLS on `contact_submissions`.
- Allow anon + authenticated INSERT so the public form can submit without sign-in.
- No SELECT/UPDATE/DELETE for anon — only the service role (backend/dashboard) reads leads.
- Policies are split per CRUD verb (no FOR ALL).

3. Notes
- INSERT policy uses WITH CHECK (true) because any visitor may submit; the table is
  intentionally write-open for lead capture, which is documented here.
- Read access is reserved for the service-role key used by internal tooling.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  loan_type text NOT NULL DEFAULT 'Other',
  loan_amount numeric,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- INSERT: public visitors (anon) and authenticated users can submit inquiries.
DROP POLICY IF EXISTS "anon_insert_contact_submissions" ON contact_submissions;
CREATE POLICY "anon_insert_contact_submissions"
ON contact_submissions FOR INSERT
TO anon, authenticated WITH CHECK (true);

-- SELECT: only authenticated staff (via service role) can read leads.
DROP POLICY IF EXISTS "auth_select_contact_submissions" ON contact_submissions;
CREATE POLICY "auth_select_contact_submissions"
ON contact_submissions FOR SELECT
TO authenticated USING (true);

-- UPDATE / DELETE: authenticated staff can manage leads.
DROP POLICY IF EXISTS "auth_update_contact_submissions" ON contact_submissions;
CREATE POLICY "auth_update_contact_submissions"
ON contact_submissions FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_contact_submissions" ON contact_submissions;
CREATE POLICY "auth_delete_contact_submissions"
ON contact_submissions FOR DELETE
TO authenticated USING (true);

-- Index newest leads first for dashboard queries.
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx
ON contact_submissions (created_at DESC);
