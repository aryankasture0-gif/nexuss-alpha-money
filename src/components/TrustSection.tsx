import { motion } from 'framer-motion';
import { Star, ShieldCheck, Clock, Landmark, Headphones } from 'lucide-react';

const trustPoints = [
  { icon: Clock, text: 'Fast Processing' },
  { icon: ShieldCheck, text: 'Transparent Guidance' },
  { icon: Landmark, text: 'Multiple Bank Options' },
  { icon: Headphones, text: 'Professional Support' },
];

export default function TrustSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.02] px-6 py-10 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:gap-10 lg:text-left"
        >
          {/* Rating */}
          <div className="flex flex-col items-center gap-3 lg:items-start">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <span className="font-display text-2xl font-bold text-white">4.9/5</span>
            </div>
            <div className="text-sm text-white/50">Customer Satisfaction Score</div>
          </div>

          {/* Divider */}
          <div className="hidden h-12 w-px bg-white/10 lg:block" />

          {/* Trust Points */}
          <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            {trustPoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.text}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5"
                >
                  <Icon className="h-4 w-4 text-gold-400" />
                  <span className="text-sm font-medium text-white/75">{point.text}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
