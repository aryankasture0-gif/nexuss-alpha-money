import { motion } from 'framer-motion';
import { ShieldCheck, Globe, LockKeyhole, Landmark, CircleSlash } from 'lucide-react';
import { STATS } from '../lib/site';

const iconMap: Record<string, typeof ShieldCheck> = {
  'Service model': ShieldCheck,
  Coverage: Globe,
  'Enquiry flow': LockKeyhole,
  Terms: Landmark,
  Approval: CircleSlash,
};

export default function Stats() {
  return (
    <section id="stats" className="relative overflow-hidden px-6 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="section-label mb-3">Our Impact</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
          What you can <span className="text-gold-sheen">expect</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {STATS.map((stat, i) => {
            const Icon = iconMap[stat.label] || Landmark;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-premium flex flex-col items-center p-6 text-center"
              >
                <div className="icon-gold mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-display text-3xl font-bold text-gold-sheen sm:text-4xl">{stat.prefix}</span>
                <div className="mt-2 text-sm font-medium text-white/50">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
