import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Wallet, Briefcase, Home, Car, CircleDot, Landmark, Building, Factory, Rocket, Banknote,
  UserCheck, Stethoscope, Calculator, GraduationCap, Gem, Cog, Truck, Shield, Repeat,
  ArrowUpCircle, Wrench, FileText, Building2, CreditCard, Layers, ChevronRight,
} from 'lucide-react';
import { LOAN_CATEGORIES } from '../lib/site';

const iconMap: Record<string, typeof Wallet> = {
  Wallet, Briefcase, Home, Car, CircleDot, Landmark, Building, Factory, Rocket, Banknote,
  UserCheck, Stethoscope, Calculator, GraduationCap, Gem, Cog, Truck, Shield, Repeat,
  ArrowUpCircle, Wrench, FileText, Building2, CreditCard, Layers,
};

export default function LoanCategories() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="loan-categories" className="relative overflow-hidden px-6 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="section-label mb-3">Loan Solutions</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            25+ Loan Categories for <span className="text-gold-sheen">Every Need</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/50">
            From personal loans to business financing, we cover all types of loan requirements with expert guidance.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {LOAN_CATEGORIES.map((loan, i) => {
            const Icon = iconMap[loan.icon] || Wallet;
            return (
              <motion.div
                key={loan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="card-premium group cursor-pointer"
              >
                <div className="relative z-10 flex flex-col items-center gap-4 p-2 text-center">
                  <div className={`icon-gold transition-all duration-300 ${hovered === i ? 'scale-110 bg-gold-500/20' : ''}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white transition-colors group-hover:text-gold-300">
                    {loan.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gold-400/0 transition-all duration-300 group-hover:text-gold-400/100">
                    <span>Learn more</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
