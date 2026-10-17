import { motion } from 'framer-motion';
import { CheckCircle2, FileCheck2, MessageCircle, ShieldCheck } from 'lucide-react';

const points = [
  { icon: MessageCircle, title: 'Talk to a real advisor', text: 'Start with a clear conversation about your requirement and next step.' },
  { icon: FileCheck2, title: 'Know what is needed', text: 'Get a practical document checklist without sharing unnecessary information.' },
  { icon: ShieldCheck, title: 'Understand the process', text: 'Lender terms, timelines, charges and decisions are explained upfront.' },
  { icon: CheckCircle2, title: 'Make an informed choice', text: 'Use our calculators and eligibility guide before proceeding.' },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative px-6 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }} className="glass-gold rounded-3xl p-8 sm:p-10">
          <span className="section-label">A better enquiry experience</span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">Simple answers before you take the <span className="text-gold-sheen">next step.</span></h2>
          <p className="mt-5 leading-relaxed text-white/55">Our role is to help you understand your options and prepare your enquiry. Approval, pricing and disbursal remain the lender&apos;s decision.</p>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2">
          {points.map((point, index) => { const Icon = point.icon; return (
            <motion.div key={point.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.45, delay: index * 0.08 }} className="card-premium p-6">
              <div className="icon-gold mb-5"><Icon className="h-5 w-5" /></div><h3 className="font-display text-lg font-semibold text-white">{point.title}</h3><p className="mt-2 text-sm leading-relaxed text-white/50">{point.text}</p>
            </motion.div>
          ); })}
        </div>
      </div>
    </section>
  );
}
