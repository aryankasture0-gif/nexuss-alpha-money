import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const PORT = Number(process.env.PORT || 4175);
const ACCESS_TOKEN = (process.env.DASHBOARD_ACCESS_TOKEN || '').trim();
const DATA_DIR = process.env.DATA_DIR || '/var/lib/nexuss-public-site';
const DATA_FILE = path.join(DATA_DIR, 'data.json');
const EVENT_TYPES = new Set(['page_view', 'whatsapp_click', 'phone_click', 'form_started', 'form_submitted']);
let writeQueue = Promise.resolve();

const json = (status, body) => ({ status, body: JSON.stringify(body), headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
const send = (res, result) => { res.writeHead(result.status, result.headers); res.end(result.body); };
const readBody = async (req) => {
  let raw = '';
  for await (const chunk of req) { raw += chunk; if (raw.length > 100_000) throw new Error('Payload too large'); }
  return JSON.parse(raw || '{}');
};
const readData = async () => {
  try { return JSON.parse(await fs.readFile(DATA_FILE, 'utf8')); }
  catch { return { events: [], enquiries: [] }; }
};
const saveData = async (data) => {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${DATA_FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data), { mode: 0o600 });
  await fs.rename(tmp, DATA_FILE);
};
const enqueue = (work) => { writeQueue = writeQueue.then(work, work); return writeQueue; };
const tokenIsValid = (req) => ACCESS_TOKEN && req.headers.authorization === `Bearer ${ACCESS_TOKEN}`;
const clean = (value, max) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const validPhone = (value) => /^[\d\s+()\-]{8,32}$/.test(value);

async function route(req) {
  if (req.method === 'GET' && req.url === '/health') return json(200, { ok: true });
  if (req.method === 'POST' && req.url === '/events') {
    const body = await readBody(req);
    if (!EVENT_TYPES.has(body.eventType)) return json(400, { error: 'Invalid event type.' });
    await enqueue(async () => { const data = await readData(); data.events.push({ id: crypto.randomUUID(), event_type: body.eventType, session_id: clean(body.sessionId, 120) || 'anonymous', path: clean(body.path, 300) || '/', referrer: clean(body.referrer, 500) || null, device_type: clean(body.deviceType, 30) || null, created_at: new Date().toISOString() }); data.events = data.events.slice(-50_000); await saveData(data); });
    return json(202, { ok: true });
  }
  if (req.method === 'POST' && req.url === '/enquiries') {
    const body = await readBody(req);
    const name = clean(body.name, 120), phone = clean(body.phone, 32), email = clean(body.email, 180), requirement = clean(body.requirement, 1000);
    if (clean(body.website, 120)) return json(400, { error: 'Spam check failed.' });
    if (name.length < 2 || !validPhone(phone) || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) || body.consent !== true) return json(400, { error: 'Please check your name, phone number, email and consent.' });
    const enquiry = { id: crypto.randomUUID(), name, phone, email: email || null, loan_type: clean(body.loanType, 80), loan_amount: clean(body.amount, 40) || null, applicant_profile: clean(body.profile, 80) || null, requirement: requirement || null, status: 'NEW', created_at: new Date().toISOString() };
    await enqueue(async () => { const data = await readData(); data.enquiries.unshift(enquiry); data.enquiries = data.enquiries.slice(0, 5_000); data.events.push({ id: crypto.randomUUID(), event_type: 'form_submitted', session_id: clean(body.sessionId, 120) || 'anonymous', path: '/', referrer: null, device_type: clean(body.deviceType, 30) || null, created_at: enquiry.created_at }); await saveData(data); });
    return json(201, { ok: true });
  }
  if (req.method === 'GET' && req.url === '/dashboard') {
    if (!tokenIsValid(req)) return json(401, { error: 'Dashboard access denied.' });
    if (!ACCESS_TOKEN) return json(503, { error: 'Dashboard access is not configured.' });
    const data = await readData();
    return json(200, { events: data.events.slice(-10_000).reverse(), enquiries: data.enquiries.slice(0, 100) });
  }
  return json(404, { error: 'Not found.' });
}

const server = http.createServer(async (req, res) => {
  try { send(res, await route(req)); } catch (error) { console.error(error); send(res, json(500, { error: 'Service unavailable.' })); }
});
server.listen(PORT, '127.0.0.1', () => console.log(`Public website service listening on ${PORT}`));
