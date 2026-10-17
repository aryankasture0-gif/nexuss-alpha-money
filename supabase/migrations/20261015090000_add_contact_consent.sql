/*
  Store the public enquiry consent separately from the enquiry text.
  The column is nullable for compatibility with older submissions.
*/
ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS consent_given boolean;
