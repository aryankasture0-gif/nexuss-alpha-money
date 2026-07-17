/*
# Extend contact_submissions for Nexuss Alpha Money apply form

1. Background
The site was rebranded to Nexuss Alpha Money. The public "Apply Now" form now
captures the applicant profile (Salaried / Self-employed / Business Owner) and
a free-text requirement. The previous `loan_amount` numeric column is reused for
Preferred Amount, and `loan_type` is reused (the dropdown is broader now).

2. Modified tables
- `contact_submissions`
  - ADD `applicant_profile` text, nullable  — Salaried / Self-employed / Business Owner
  - ADD `requirement` text, nullable         — free-text requirement / message

3. Security
- No RLS policy changes. Existing per-CRUD policies still apply: anon + authenticated
  INSERT, authenticated SELECT/UPDATE/DELETE.
- New columns inherit table-level RLS automatically; no extra policy needed.

4. Notes
- Columns are nullable so existing rows and the previous contact form keep working.
- `loan_amount` stays numeric; the frontend strips non-numeric characters before insert.
- Idempotent: uses DO block + IF NOT EXISTS so re-runs are safe.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'applicant_profile'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN applicant_profile text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'requirement'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN requirement text;
  END IF;
END $$;
