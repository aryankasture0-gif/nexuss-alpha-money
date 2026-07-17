import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BRAND, whatsappLink } from '../lib/site';

export default function WhatsAppButton() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setExpanded(false);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const href = whatsappLink(`Hello ${BRAND.name}, I would like to enquire about a loan.`);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {expanded && (
        <div className="glass mb-1 w-72 rounded-3xl p-5 shadow-glass animate-fade-up">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold text-white">{BRAND.name}</div>
                <div className="text-[11px] text-white/45">Typically replies in minutes</div>
              </div>
            </div>
            <button onClick={() => setExpanded(false)} aria-label="Close chat" className="text-white/40 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-4 rounded-2xl rounded-tl-sm bg-white/[0.04] px-4 py-3 text-sm text-white/70">
            Hi! Share the loan type you're considering and our team will guide you through eligibility, documents, and processing.
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-navy-950 transition-transform hover:scale-[1.02]"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>
      )}

      <button
        onClick={() => setExpanded((v) => !v)}
        aria-label="Open WhatsApp chat"
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-navy-950 shadow-glass transition-transform hover:scale-110"
      >
        {!expanded && <span className="absolute inset-0 animate-pulse-gold rounded-full" style={{ ['--tw-shadow-color' as string]: 'rgba(37,211,102,0.6)' }} />}
        {expanded ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
