const SUPABASE_URL = (process.env.SUPABASE_URL || '').trim();
const SUPABASE_SERVICE_ROLE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

function json(statusCode, body) {
  return { statusCode, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }, body: JSON.stringify(body) };
}

function clean(value, max) {
  return String(value || '').replace(/[<>]/g, '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed.' });
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return json(503, { error: 'Analytics is not configured.' });
  try {
    const body = JSON.parse(event.body || '{}');
    const allowed = new Set(['page_view', 'whatsapp_click', 'phone_click', 'form_started', 'form_submitted']);
    const eventType = clean(body.eventType, 40);
    const sessionId = clean(body.sessionId, 100);
    const path = clean(body.path, 300) || '/';
    if (!allowed.has(eventType) || sessionId.length < 16) return json(400, { error: 'Invalid analytics event.' });
    const response = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/site_events`, {
      method: 'POST',
      headers: { apikey: SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({ event_type: eventType, session_id: sessionId, path, referrer: clean(body.referrer, 500) || null, device_type: clean(body.deviceType, 20) || null }),
    });
    return response.ok ? json(204, {}) : json(503, { error: 'Could not record analytics.' });
  } catch {
    return json(400, { error: 'Invalid request.' });
  }
}
