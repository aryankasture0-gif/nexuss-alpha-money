import { motion } from 'framer-motion';
import { ArrowUpRight, Building2, MapPin, Navigation } from 'lucide-react';
import { BRAND } from '../lib/site';

const areas = [
  { name: 'Karad', detail: 'Our primary advisory location', icon: Building2, href: 'https://maps.google.com/?q=Bheda+Chowk+Karad' },
  { name: 'Pune', detail: 'Support for Pune enquiries', icon: MapPin, href: 'https://maps.google.com/?q=MG+Road+Pune' },
  { name: 'Across India', detail: 'Subject to lender availability', icon: Navigation, href: '#apply' },
];

export default function ServiceAreas() {
  return (
    <section id="service-areas" className="relative overflow-hidden px-6 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }} className="mb-10 max-w-2xl">
          <span className="section-label"><MapPin className="h-3.5 w-3.5" /> Service areas</span>
          <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">Guidance that stays <span className="text-gold-sheen">close to you.</span></h2>
          <p className="mt-4 text-white/55">Start with our local advisory desk or share an enquiry from anywhere in India. Availability and final decisions always depend on the relevant lender.</p>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-3">
          {areas.map((area, index) => { const Icon = area.icon; return (
            <motion.a key={area.name} href={area.href} target={area.href.startsWith('http') ? '_blank' : undefined} rel={area.href.startsWith('http') ? 'noopener noreferrer' : undefined} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.45, delay: index * 0.08 }} className="group card-premium flex items-center justify-between p-6">
              <span className="flex items-center gap-4"><span className="icon-gold"><Icon className="h-5 w-5" /></span><span><span className="block font-display text-xl font-semibold text-white">{area.name}</span><span className="mt-1 block text-sm text-white/45">{area.detail}</span></span></span>
              <ArrowUpRight className="h-5 w-5 text-gold-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </motion.a>
          ); })}
        </div>
        <p className="mt-5 text-xs text-white/35">{BRAND.location} · Call {BRAND.phone} for availability.</p>
      </div>
    </section>
  );
}
