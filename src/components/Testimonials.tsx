import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../lib/site';

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () => setActive((a) => (a + 1) % TESTIMONIALS.length);
  const prev = () => setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section id="testimonials" className="relative overflow-hidden px-6 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="section-label mb-3">Testimonials</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            What Our <span className="text-gold-sheen">Customers Say</span>
          </h2>
        </motion.div>

        {/* Featured testimonial */}
        <div className="relative mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="card-premium mx-auto max-w-3xl p-8 sm:p-10"
            >
              <Quote className="mb-4 h-10 w-10 text-gold-500/20" />
              <p className="mb-6 text-lg leading-relaxed text-white/80 sm:text-xl">
                "{TESTIMONIALS[active].text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient font-bold text-navy-950">
                  {TESTIMONIALS[active].name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white">{TESTIMONIALS[active].name}</div>
                  <div className="text-sm text-white/40">{TESTIMONIALS[active].location}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: TESTIMONIALS[active].rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <div className="absolute top-1/2 left-0 right-0 hidden -translate-y-1/2 justify-between px-2 sm:flex">
            <button
              onClick={prev}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition-all hover:border-gold-500/40 hover:text-gold-400"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition-all hover:border-gold-500/40 hover:text-gold-400"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? 'w-8 bg-gold-gradient' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Mobile navigation */}
        <div className="mt-6 flex items-center justify-center gap-4 sm:hidden">
          <button
            onClick={prev}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/60"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/60"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
