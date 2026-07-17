import { motion } from 'framer-motion';
import { Info, Check, ShieldCheck, Users, IndianRupee, Globe2 } from 'lucide-react';
import { BRAND, HIGHLIGHTS } from '../lib/site';

const pillars = [
  { icon: ShieldCheck, title: 'Secure & Trusted', description: 'Secure application handling with customer trust as a top priority.' },
  { icon: IndianRupee, title: 'Zero Hidden Charges', description: 'Transparent terms with no hidden costs across every loan type.' },
  { icon: Globe2, title: 'All-India Support', description: 'Loan guidance available across India with all-region support.' },
  { icon: Users, title: 'Customer Guidance', description: 'Trusted advisors guiding you from requirement to processing.' },
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="section-label">
              <Info className="h-3.5 w-3.5" /> About Us
            </span>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-tight text-white text-balance sm:text-5xl">
              Bridging financial needs and <span className="text-gold-sheen">personal goals.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/65">{BRAND.about}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {HIGHLIGHTS.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-sm text-white/75">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500/15 text-gold-400">
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="grid gap-5 sm:grid-cols-2"
          >
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                  className="card-lux"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-gold-500/25 bg-gold-500/5 text-gold-300">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{p.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
