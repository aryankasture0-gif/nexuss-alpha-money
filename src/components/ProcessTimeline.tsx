import { motion } from 'framer-motion';
import { FileText, ShieldCheck, Building2, CircleDollarSign } from 'lucide-react';
import { LOAN_PROCESS } from '../lib/site';

const iconMap: Record<string, typeof FileText> = {
  FileText, ShieldCheck, Building2, CircleDollarSign,
};

export default function ProcessTimeline() {
  return (
    <section id="process" className="relative overflow-hidden px-6 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="section-label mb-3">How It Works</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Simple <span className="text-gold-sheen">4-Step Process</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/50">
            From application to disbursement, our streamlined process ensures quick and hassle-free loan processing.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline connector line for desktop */}
          <div className="absolute top-20 left-0 right-0 hidden h-0.5 lg:block"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(247, 193, 46, 0.3) 10%, rgba(247, 193, 46, 0.3) 90%, transparent 100%)' }}
          />

          <div className="grid gap-8 lg:grid-cols-4 lg:gap-6">
            {LOAN_PROCESS.map((step, i) => {
              const Icon = iconMap[step.icon] || FileText;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative"
                >
                  <div className="card-premium h-full p-6">
                    {/* Step number badge */}
                    <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-gold-gradient font-bold text-sm text-navy-950 shadow-gold-sm">
                      {step.step}
                    </div>

                    <div className="mt-4 flex flex-col items-center text-center lg:items-start lg:text-left">
                      <div className="icon-gold mb-4">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 font-display text-xl font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/50">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
