import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Plus, Minus } from 'lucide-react';
import { FAQS } from '../lib/site';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="section-label">
            <HelpCircle className="h-3.5 w-3.5" /> Frequently Asked
          </span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-tight text-white text-balance sm:text-5xl">
            Questions, <span className="text-gold-sheen">answered.</span>
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                className={`overflow-hidden rounded-3xl border transition-colors duration-300 ${
                  isOpen ? 'border-gold-500/30 bg-gold-500/[0.04]' : 'border-white/[0.07] bg-white/[0.02]'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3 text-base font-medium text-white sm:text-lg">
                    <HelpCircle className="h-5 w-5 shrink-0 text-gold-400" />
                    {faq.q}
                  </span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-gold-300">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 pl-14 text-sm leading-relaxed text-white/60 sm:text-base">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
