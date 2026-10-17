const SESSION_KEY = 'nexuss_analytics_session';

function getSessionId() {
  try {
    const existing = window.localStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = `${crypto.randomUUID()}-${Date.now()}`;
    window.localStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return `anonymous-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

export function trackEvent(eventType: 'page_view' | 'whatsapp_click' | 'phone_click' | 'form_started' | 'form_submitted', path = window.location.pathname) {
  const payload = JSON.stringify({ eventType, sessionId: getSessionId(), path, referrer: document.referrer, deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop' });
  void fetch('/.netlify/functions/track-event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, keepalive: true }).catch(() => undefined);
}
