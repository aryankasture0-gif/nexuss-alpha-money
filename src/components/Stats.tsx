import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Landmark, Layers, Users, Globe, Clock } from 'lucide-react';
import { STATS } from '../lib/site';

function AnimatedCounter({ value, suffix = '', prefix }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(value * ease));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-gold-sheen sm:text-5xl">
      {prefix ? prefix : count.toLocaleString()}
      {suffix && !prefix && suffix}
    </span>
  );
}

const iconMap: Record<string, typeof Landmark> = {
  'Bank & NBFC Partners': Landmark,
  'Loan Categories': Layers,
  'Customers Assisted': Users,
  'PAN India Service': Globe,
  'Fast Approval': Clock,
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
            Numbers That Speak <span className="text-gold-sheen">Trust</span>
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
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
                <div className="mt-2 text-sm font-medium text-white/50">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
