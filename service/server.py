#!/usr/bin/env python3
import json
import os
import re
import secrets
import threading
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

PORT = int(os.environ.get('PORT', '4175'))
ACCESS_TOKEN = os.environ.get('DASHBOARD_ACCESS_TOKEN', '').strip()
DATA_DIR = Path(os.environ.get('DATA_DIR', '/var/lib/nexuss-public-site'))
DATA_FILE = DATA_DIR / 'data.json'
LOCK = threading.Lock()
EVENT_TYPES = {'page_view', 'whatsapp_click', 'phone_click', 'form_started', 'form_submitted'}
PHONE_RE = re.compile(r'^[\d\s+()\-]{8,32}$')
EMAIL_RE = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')

def now():
    return datetime.now(timezone.utc).isoformat()

def clean(value, limit):
    return value.strip()[:limit] if isinstance(value, str) else ''

def read_data():
    try:
        return json.loads(DATA_FILE.read_text(encoding='utf-8'))
    except (FileNotFoundError, json.JSONDecodeError):
        return {'events': [], 'enquiries': []}

def write_data(data):
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    DATA_DIR.chmod(0o700)
    temporary = DATA_FILE.with_suffix('.tmp')
    temporary.write_text(json.dumps(data, separators=(',', ':')), encoding='utf-8')
    temporary.chmod(0o600)
    os.replace(temporary, DATA_FILE)

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_):
        return

    def send_json(self, status, body):
        payload = json.dumps(body).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def body(self):
        length = int(self.headers.get('Content-Length', '0'))
        if length > 100_000:
            raise ValueError('Payload too large')
        return json.loads(self.rfile.read(length) or b'{}')

    def do_GET(self):
        if self.path == '/health':
            return self.send_json(200, {'ok': True})
        if self.path != '/dashboard':
            return self.send_json(404, {'error': 'Not found.'})
        if not ACCESS_TOKEN or self.headers.get('Authorization') != f'Bearer {ACCESS_TOKEN}':
            return self.send_json(401, {'error': 'Dashboard access denied.'})
        with LOCK:
            data = read_data()
        self.send_json(200, {'events': list(reversed(data['events'][-10000:])), 'enquiries': data['enquiries'][:100]})

    def do_POST(self):
        try:
            body = self.body()
        except (ValueError, json.JSONDecodeError):
            return self.send_json(400, {'error': 'Invalid request.'})
        if self.path == '/events':
            event_type = clean(body.get('eventType'), 40)
            if event_type not in EVENT_TYPES:
                return self.send_json(400, {'error': 'Invalid event type.'})
            event = {'id': secrets.token_hex(16), 'event_type': event_type, 'session_id': clean(body.get('sessionId'), 120) or 'anonymous', 'path': clean(body.get('path'), 300) or '/', 'referrer': clean(body.get('referrer'), 500) or None, 'device_type': clean(body.get('deviceType'), 30) or None, 'created_at': now()}
            with LOCK:
                data = read_data(); data['events'].append(event); data['events'] = data['events'][-50000:]; write_data(data)
            return self.send_json(202, {'ok': True})
        if self.path == '/enquiries':
            name, phone = clean(body.get('name'), 120), clean(body.get('phone'), 32)
            email, requirement = clean(body.get('email'), 180), clean(body.get('requirement'), 1000)
            if clean(body.get('website'), 120) or len(name) < 2 or not PHONE_RE.fullmatch(phone) or (email and not EMAIL_RE.fullmatch(email)) or body.get('consent') is not True:
                return self.send_json(400, {'error': 'Please check your name, phone number, email and consent.'})
            created = now()
            enquiry = {'id': secrets.token_hex(16), 'name': name, 'phone': phone, 'email': email or None, 'loan_type': clean(body.get('loanType'), 80), 'loan_amount': clean(body.get('amount'), 40) or None, 'applicant_profile': clean(body.get('profile'), 80) or None, 'requirement': requirement or None, 'status': 'NEW', 'created_at': created}
            event = {'id': secrets.token_hex(16), 'event_type': 'form_submitted', 'session_id': clean(body.get('sessionId'), 120) or 'anonymous', 'path': '/', 'referrer': None, 'device_type': clean(body.get('deviceType'), 30) or None, 'created_at': created}
            with LOCK:
                data = read_data(); data['enquiries'].insert(0, enquiry); data['enquiries'] = data['enquiries'][:5000]; data['events'].append(event); data['events'] = data['events'][-50000:]; write_data(data)
            return self.send_json(201, {'ok': True})
        return self.send_json(404, {'error': 'Not found.'})

ThreadingHTTPServer(('0.0.0.0', PORT), Handler).serve_forever()
