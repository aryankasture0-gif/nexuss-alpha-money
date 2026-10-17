const SUPABASE_URL = (process.env.SUPABASE_URL || '').trim();
const SUPABASE_SERVICE_ROLE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
const TURNSTILE_SECRET_KEY = (process.env.TURNSTILE_SECRET_KEY || '').trim();

const LOAN_TYPES = new Set([
  'Personal Loan',
  'Business Loan',
  'Home Loan',
  'Mortgage Loan',
  'Construction Loan',
  'Agriculture Loan',
  'Project Funding',
  'Builder Funding',
  'Hospital Funding',
  'School Funding',
  'Education Loan',
  'Vehicle Loan',
  'Car Loan',
  'Used Car Loan',
  'Subsidy Loan',
  'Mahamandal Loan',
  'All Types of Insurance',
  'Flexible Credit Solution',
]);

const APPLICANT_PROFILES = new Set(['Salaried', 'Self-employed', 'Business Owner']);

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify(body),
  };
}

function cleanText(value, maxLength) {
  return String(value || '')
    .replace(/[<>]/g, '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function parseAmount(value) {
  if (!value) return null;
  const numeric = Number(String(value).replace(/[^0-9.]/g, ''));
  if (!Number.isFinite(numeric) || numeric <= 0 || numeric > 1000000000) return null;
  return numeric;
}

function validatePayload(payload) {
  const submittedAt = Number(payload.submittedAt || 0);
  const age = Date.now() - submittedAt;
  const name = cleanText(payload.name, 120);
  const phone = cleanText(payload.phone, 32);
  const email = cleanText(payload.email, 160).toLowerCase();
  const amount = cleanText(payload.amount, 40);
  const loanType = cleanText(payload.loanType, 80);
  const profile = cleanText(payload.profile, 80);
  const requirement = cleanText(payload.requirement, 1000);
  const website = cleanText(payload.website, 120);
  const consent = payload.consent === true;

  if (website) return { error: 'Spam check failed.' };
  if (!submittedAt || age < 2500) return { error: 'Please wait a moment before submitting.' };
  if (!name || name.length < 2) return { error: 'Please enter your full name.' };
  if (!/^[\d\s+()-]{8,32}$/.test(phone)) return { error: 'Phone number looks invalid.' };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Email address looks invalid.' };
  if (!LOAN_TYPES.has(loanType)) return { error: 'Please choose a valid loan type.' };
  if (!APPLICANT_PROFILES.has(profile)) return { error: 'Please choose a valid applicant profile.' };
  if (!consent) return { error: 'Please agree to be contacted about this enquiry.' };

  return {
    data: {
      name,
      phone,
      email: email || null,
      loan_type: loanType,
      loan_amount: parseAmount(amount),
      applicant_profile: profile,
      requirement: requirement || null,
      consent_given: true,
    },
  };
}

async function verifyTurnstile(token, remoteIp) {
  if (!TURNSTILE_SECRET_KEY) return { ok: false, error: 'Form protection is not configured.' };
  if (!token) return { ok: false, error: 'Please complete the security check.' };

  const form = new FormData();
  form.append('secret', TURNSTILE_SECRET_KEY);
  form.append('response', token);
  if (remoteIp) form.append('remoteip', remoteIp);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form,
  });
  const result = await response.json();
  return result.success ? { ok: true } : { ok: false, error: 'Security check failed. Please try again.' };
}

async function saveLead(data) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return { ok: false, error: 'Online application storage is not configured.' };
  }

  const response = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/contact_submissions`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return { ok: false, error: 'Could not save your application right now.' };
  }
  return { ok: true };
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed.' });

  try {
    const payload = JSON.parse(event.body || '{}');
    const remoteIp = event.headers['x-nf-client-connection-ip'] || event.headers['client-ip'] || '';
    const turnstile = await verifyTurnstile(cleanText(payload.turnstileToken, 4096), remoteIp);
    if (!turnstile.ok) return json(400, { error: turnstile.error });

    const validation = validatePayload(payload);
    if (validation.error) return json(400, { error: validation.error });

    const saved = await saveLead(validation.data);
    if (!saved.ok) return json(503, { error: saved.error });

    return json(200, { ok: true });
  } catch {
    return json(400, { error: 'Invalid request.' });
  }
}
