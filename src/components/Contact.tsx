import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, MessageCircle, Clock } from 'lucide-react';
import { BRAND, whatsappLink } from '../lib/site';

export default function Contact() {
  const items = [
    {
      icon: Phone,
      label: 'Call',
      value: BRAND.phone,
      href: `tel:${BRAND.phone.replace(/\s/g, '')}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: BRAND.email,
      href: `mailto:${BRAND.email}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: BRAND.location,
      href: 'https://maps.google.com/?q=Camp+Pune+Maharashtra',
    },
    {
      icon: Clock,
      label: 'Support',
      value: 'All-India loan support',
      href: '#apply',
    },
  ];

  return (
    <section id="contact" className="relative px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-label">
            <Mail className="h-3.5 w-3.5" /> Get in Touch
          </span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-tight text-white text-balance sm:text-5xl">
            Reach Nexuss Alpha <span className="text-gold-sheen">Money.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/55">
            Prefer to talk first? Reach our advisory desk directly — we answer fast and keep your data secure.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto mt-14 max-w-4xl"
        >
          <div className="glass-gold grid gap-6 rounded-3xl p-8 sm:grid-cols-2 sm:p-10">
            {items.map((item) => {
              const Icon = item.icon;
              const isExternal = item.href.startsWith('http');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:border-gold-500/30 hover:bg-gold-500/[0.04]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-gold-500/20 bg-gold-500/5 text-gold-300">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-[0.15em] text-white/40">{item.label}</div>
                    <div className="mt-1 text-sm font-medium text-white group-hover:text-gold-200">{item.value}</div>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href={whatsappLink(`Hello ${BRAND.name}, I would like to enquire about a loan.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa"
            >
              <MessageCircle className="h-4 w-4" />
              Chat with us on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
