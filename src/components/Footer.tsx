import { Mail, Phone, MapPin } from 'lucide-react';
import { BRAND } from '../lib/site';

const columns = [
  {
    title: 'Loan Categories',
    links: [
      { label: 'Personal Loan', href: '#loan-categories' },
      { label: 'Business Loan', href: '#loan-categories' },
      { label: 'Home Loan', href: '#loan-categories' },
      { label: 'Education Loan', href: '#loan-categories' },
      { label: 'Car Loan', href: '#loan-categories' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'Why Choose Us', href: '#why-us' },
      { label: 'How It Works', href: '#process' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Contact Us', href: '#contact' },
      { label: 'Apply Now', href: '#apply' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative">
      <div className="gold-divider mx-auto max-w-7xl" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="group flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Nexuss Alpha Money"
                loading="lazy"
                className="h-14 w-auto object-contain"
              />
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-semibold text-white">
                  Nexuss <span className="text-gold-sheen">Alpha Money</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Smart Financing</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
              {BRAND.tagline} Loan assistance and consultancy across India, subject to lender availability and service coverage.
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/55">
              <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 hover:text-gold-300 transition-colors">
                <Phone className="h-4 w-4 text-gold-400" /> {BRAND.phone}
              </a>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 hover:text-gold-300 transition-colors">
                <Mail className="h-4 w-4 text-gold-400" /> {BRAND.email}
              </a>
              <span className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gold-400" /> {BRAND.location}
              </span>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">{col.title}</h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onClick={(e) => {
                        if (l.href.startsWith('#') && l.href !== '#') {
                          e.preventDefault();
                          if (window.location.pathname !== '/') {
                            window.location.href = `/${l.href}`;
                            return;
                          }
                          document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="text-sm text-white/55 transition-colors hover:text-gold-300"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-white/40">{BRAND.copyright}</p>
          <div className="flex gap-4 text-xs text-white/40">
            <a href="/privacy" className="hover:text-gold-300 transition-colors">Privacy Policy</a>
            <span className="text-white/20">|</span>
            <a href="/terms" className="hover:text-gold-300 transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
