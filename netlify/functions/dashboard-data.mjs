const SUPABASE_URL = (process.env.SUPABASE_URL || '').trim();
const SUPABASE_SERVICE_ROLE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
const DASHBOARD_ACCESS_TOKEN = (process.env.DASHBOARD_ACCESS_TOKEN || '').trim();

function json(statusCode, body) {
  return { statusCode, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }, body: JSON.stringify(body) };
}

export async function handler(event) {
  if (event.httpMethod !== 'GET') return json(405, { error: 'Method not allowed.' });
  const token = event.headers.authorization?.replace(/^Bearer\s+/i, '').trim();
  if (!DASHBOARD_ACCESS_TOKEN || token !== DASHBOARD_ACCESS_TOKEN) return json(401, { error: 'Dashboard access denied.' });
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return json(503, { error: 'Dashboard storage is not configured.' });
  try {
    const base = SUPABASE_URL.replace(/\/$/, '');
    const headers = { apikey: SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}` };
    const [eventsResponse, leadsResponse] = await Promise.all([
      fetch(`${base}/rest/v1/site_events?select=event_type,session_id,path,referrer,device_type,created_at&order=created_at.desc&limit=500`, { headers }),
      fetch(`${base}/rest/v1/contact_submissions?select=id,name,email,phone,loan_type,loan_amount,applicant_profile,requirement,status,created_at&order=created_at.desc&limit=100`, { headers }),
    ]);
    if (!eventsResponse.ok || !leadsResponse.ok) return json(503, { error: 'Could not load dashboard data.' });
    return json(200, { events: await eventsResponse.json(), enquiries: await leadsResponse.json() });
  } catch {
    return json(503, { error: 'Could not load dashboard data.' });
  }
}
