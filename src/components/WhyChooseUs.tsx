import { motion } from 'framer-motion';
import { Landmark, LayoutGrid, Globe, FileCheck, Users, Eye } from 'lucide-react';
import { WHY_CHOOSE } from '../lib/site';

const iconMap: Record<string, typeof Landmark> = {
  Landmark, LayoutGrid, Globe, FileCheck, Users, Eye,
};

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden px-6 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="section-label mb-3">Why Choose Us</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Trusted Partner for <span className="text-gold-sheen">Your Financial Goals</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/50">
            With industry expertise, extensive banking partnerships, and customer-first approach, we make loan processing simple and transparent.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.map((item, i) => {
            const Icon = iconMap[item.icon] || Landmark;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-premium h-full"
              >
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="icon-gold">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/50">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
