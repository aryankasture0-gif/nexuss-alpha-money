import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Loader2, AlertCircle, MessageCircle, FileText } from 'lucide-react';
import {
  LOAN_TYPES,
  APPLICANT_PROFILES,
  buildApplyWhatsAppMessage,
  whatsappLink,
} from '../lib/site';

type Status = 'idle' | 'loading' | 'success' | 'error';

const turnstileSiteKey = (import.meta.env.VITE_TURNSTILE_SITE_KEY || '').trim();

const empty = {
  name: '',
  phone: '',
  email: '',
  amount: '',
  loanType: LOAN_TYPES[0],
  profile: APPLICANT_PROFILES[0],
  requirement: '',
  website: '',
  consent: false,
};

export default function Apply() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [lastWhatsAppMessage, setLastWhatsAppMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [submittedAt] = useState(() => Date.now());
  const submittingRef = useRef(false);
  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetRef = useRef<string>('');

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileRef.current) return;

    const renderTurnstile = () => {
      if (!window.turnstile || !turnstileRef.current || turnstileWidgetRef.current) return;
      turnstileWidgetRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: turnstileSiteKey,
        theme: 'dark',
        callback: setTurnstileToken,
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
      });
    };

    if (window.turnstile) {
      renderTurnstile();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.onload = renderTurnstile;
    document.head.appendChild(script);
  }, []);

  const update = (key: keyof typeof form, value: string | boolean) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const validate = () => {
    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const requirement = form.requirement.trim();
    if (form.website.trim()) return 'Spam check failed.';
    if (!name || name.length < 2 || name.length > 120) return 'Please enter your full name.';
    if (!phone) return 'A phone number is required so we can reach you.';
    if (!/^[\d\s+()-]{8,32}$/.test(phone)) return 'Phone number looks invalid.';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'A valid email is required (or leave it blank).';
    if (requirement.length > 1000) return 'Requirement must be 1000 characters or less.';
    if (!form.consent) return 'Please agree to be contacted about this enquiry.';
    if (turnstileSiteKey && !turnstileToken) return 'Please complete the security check.';
    return '';
  };

  const resetTurnstile = () => {
    setTurnstileToken('');
    if (window.turnstile && turnstileWidgetRef.current) {
      window.turnstile.reset(turnstileWidgetRef.current);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;
    const err = validate();
    if (err) {
      setErrorMsg(err);
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    setSuccessMsg('');
    submittingRef.current = true;

    const waMessage = buildApplyWhatsAppMessage(form);
    setLastWhatsAppMessage(waMessage);

    try {
      if (!turnstileSiteKey) {
        window.open(whatsappLink(waMessage), '_blank', 'noopener,noreferrer');
        setStatus('success');
        setSuccessMsg('WhatsApp is opening with your details. Please tap send there so our team receives your loan enquiry.');
        return;
      }

      const response = await fetch('/website-api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          submittedAt,
          turnstileToken,
          consent: form.consent,
          source: document.referrer || 'Direct',
        }),
      });

      const result = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setStatus('error');
        setErrorMsg(result.error || 'Could not save your application right now. You can still send it via WhatsApp.');
        resetTurnstile();
        return;
      }

      window.open(whatsappLink(waMessage), '_blank', 'noopener,noreferrer');

      setStatus('success');
      setSuccessMsg("Application saved securely! WhatsApp is opening with your details. If it didn't open, tap the button below.");
      setForm(empty);
      resetTurnstile();
    } catch {
      setStatus('error');
      setErrorMsg('We could not reach the enquiry service. Please try again or send the details through WhatsApp.');
      resetTurnstile();
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <section id="apply" className="relative px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-label">
            <FileText className="h-3.5 w-3.5" /> Apply Now
          </span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-tight text-white text-balance sm:text-5xl">
            Begin your loan <span className="text-gold-sheen">application.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/55">
            Fill in your details and submit. WhatsApp opens with your information pre-filled so our team can assist right away.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto mt-14 max-w-3xl"
        >
          <form onSubmit={onSubmit} className="glass-gold rounded-3xl p-8 sm:p-10" noValidate>
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => update('website', e.target.value)}
              className="hidden"
              aria-hidden="true"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="apply-name" className="mb-2 block text-sm font-medium text-white/75">Full Name *</label>
                <input
                  id="apply-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Your full name"
                  className="input-lux"
                  required
                />
              </div>
              <div>
                <label htmlFor="apply-phone" className="mb-2 block text-sm font-medium text-white/75">Phone Number *</label>
                <input
                  id="apply-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder="+91 9371735519"
                  className="input-lux"
                  required
                />
              </div>
              <div>
                <label htmlFor="apply-email" className="mb-2 block text-sm font-medium text-white/75">Email</label>
                <input
                  id="apply-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="you@example.com"
                  className="input-lux"
                />
              </div>
              <div>
                <label htmlFor="apply-amount" className="mb-2 block text-sm font-medium text-white/75">Preferred Amount</label>
                <input
                  id="apply-amount"
                  name="amount"
                  type="text"
                  inputMode="numeric"
                  value={form.amount}
                  onChange={(e) => update('amount', e.target.value)}
                  placeholder="₹5,00,000"
                  className="input-lux"
                />
              </div>
              <div>
                <label htmlFor="apply-loan-type" className="mb-2 block text-sm font-medium text-white/75">Loan Type</label>
                <select
                  id="apply-loan-type"
                  name="loanType"
                  value={form.loanType}
                  onChange={(e) => update('loanType', e.target.value)}
                  className="input-lux appearance-none"
                >
                  {LOAN_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-navy-800 text-white">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="apply-profile" className="mb-2 block text-sm font-medium text-white/75">Applicant Profile</label>
                <select
                  id="apply-profile"
                  name="profile"
                  value={form.profile}
                  onChange={(e) => update('profile', e.target.value)}
                  className="input-lux appearance-none"
                >
                  {APPLICANT_PROFILES.map((p) => (
                    <option key={p} value={p} className="bg-navy-800 text-white">
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="apply-requirement" className="mb-2 block text-sm font-medium text-white/75">Requirement</label>
              <textarea
                id="apply-requirement"
                name="requirement"
                value={form.requirement}
                onChange={(e) => update('requirement', e.target.value)}
                rows={4}
                placeholder="Tell us about your requirement, goals, or any questions…"
                className="input-lux resize-none"
              />
            </div>

            {turnstileSiteKey && (
              <div className="mt-6" aria-label="Security check">
                <div ref={turnstileRef} />
              </div>
            )}

            <label className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-white/60">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => update('consent', e.target.checked)}
                className="mt-1 h-4 w-4 accent-gold-400"
              />
              <span>
                I agree to be contacted about this enquiry and understand that final eligibility, fees, rates, approval, and disbursal are decided by the lender.
              </span>
            </label>

            {status === 'error' && (
              <div role="alert" className="mt-5 flex items-center gap-2.5 rounded-2xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {errorMsg}
              </div>
            )}

            {status === 'success' && successMsg && (
              <div role="status" className="mt-5 flex items-center gap-2.5 rounded-2xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                {successMsg}
              </div>
            )}

            {status === 'success' && !successMsg && (
              <div className="mt-5 flex items-center gap-2.5 rounded-2xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Application saved! WhatsApp is opening with your details — if it didn't open, tap the button below.
              </div>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-gold flex-1 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                  </>
                ) : (
                  <>
                    Submit &amp; Open WhatsApp <Send className="h-4 w-4" />
                  </>
                )}
              </button>
              {status === 'success' && lastWhatsAppMessage && (
                <a
                  href={whatsappLink(lastWhatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wa flex-1"
                >
                  <MessageCircle className="h-4 w-4" /> Re-open WhatsApp
                </a>
              )}
            </div>

            <p className="mt-4 text-center text-xs text-white/35">
              Do not enter OTPs, passwords, PINs, or unnecessary sensitive information in this form. See our <a href="/privacy" className="text-gold-300 hover:text-gold-200">Privacy Policy</a>.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
