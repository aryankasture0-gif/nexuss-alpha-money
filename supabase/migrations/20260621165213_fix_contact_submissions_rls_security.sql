/*
# Fix RLS security issues on contact_submissions

1. Background
Security audit flagged three RLS policies with `true` clauses that bypass
row-level security:
  - `anon_insert_contact_submissions` — allowed both anon AND authenticated
    with `WITH CHECK (true)`
  - `auth_delete_contact_submissions` — `USING (true)` for authenticated
  - `auth_update_contact_submissions` — `USING (true)` WITH CHECK (true)
    for authenticated

2. Root cause
The table was created for a public marketing lead form with no user auth
system. The original policies mixed the `anon` and `authenticated` roles
and used open clauses for all verbs. The table has no `user_id` column,
so authenticated-user ownership checks are impossible.

3. Fix applied
- Remove all old weak policies.
- Keep only one INSERT policy for `anon` (public visitors submitting the
  lead form). This is the only role that legitimately needs RLS access.
- Remove SELECT / UPDATE / DELETE policies for `authenticated`. Since
  the app has no sign-in flow, no authenticated users exist. The service
  role key bypasses RLS and is used for admin/dashboard access.
- This means:
  - `anon` → can INSERT only (submit lead form)
  - `authenticated` → no access at all (no auth system on the site)
  - `service_role` → full CRUD (admin dashboard, bypasses RLS)

4. Migration notes
- DROP POLICY IF EXISTS is safe (idempotent).
- No data loss. No column changes. Only policy changes.
*/

-- Drop old weak policies
DROP POLICY IF EXISTS "anon_insert_contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "auth_select_contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "auth_update_contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "auth_delete_contact_submissions" ON contact_submissions;

-- Create the single safe policy: anon INSERT only (public lead form)
CREATE POLICY "anon_insert_contact_submissions"
  ON contact_submissions FOR INSERT
  TO anon WITH CHECK (true);

-- No SELECT, UPDATE, or DELETE policies for authenticated users.
-- The service role bypasses RLS and is used for admin operations.
