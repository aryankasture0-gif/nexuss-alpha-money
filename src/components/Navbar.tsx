import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Loans', href: '#loan-categories' },
  { label: 'Process', href: '#process' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    if (window.location.pathname !== '/' && href.startsWith('#')) {
      window.location.href = `/${href}`;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-glass' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="group flex items-center gap-3" onClick={() => handleNav('#top')}>
          <img
            src="/logo.jpeg"
            alt="Nexuss Alpha Money"
            loading="eager"
            className="h-[70px] w-auto object-contain drop-shadow-lg"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-semibold tracking-wide text-white">
              Nexuss <span className="text-gold-sheen">Alpha Money</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Smart Financing</span>
          </span>
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(l.href);
                }}
                className="group relative text-sm font-medium text-white/70 transition-colors hover:text-gold-300"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold-gradient transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a href="#apply" onClick={(e) => { e.preventDefault(); handleNav('#apply'); }} className="btn-gold">
            Apply Now
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-gold-300 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={`overflow-hidden transition-all duration-400 lg:hidden ${
          open ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="glass mx-4 mb-4 flex flex-col gap-1 rounded-2xl p-4">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => { e.preventDefault(); handleNav(l.href); }}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-gold-500/10 hover:text-gold-200"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a href="#apply" onClick={(e) => { e.preventDefault(); handleNav('#apply'); }} className="btn-gold w-full">
              Apply Now
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
