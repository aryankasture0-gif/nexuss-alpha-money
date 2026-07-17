import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, User, IndianRupee, MapPin, CreditCard, ChevronRight } from 'lucide-react';

export default function EligibilityChecker() {
  const [employment, setEmployment] = useState('');
  const [income, setIncome] = useState('');
  const [city, setCity] = useState('');
  const [existingEmi, setExistingEmi] = useState('');
  const [result, setResult] = useState<null | { status: 'eligible' | 'ineligible' | 'conditional'; message: string }>(null);

  const checkEligibility = () => {
    const monthlyIncome = parseFloat(income) || 0;
    const existing = parseFloat(existingEmi) || 0;
    const disposable = monthlyIncome - existing;

    if (!employment || !income || !city) {
      setResult({ status: 'conditional', message: 'Please fill in all required fields to check eligibility.' });
      return;
    }

    if (monthlyIncome < 20000) {
      setResult({ status: 'ineligible', message: 'Minimum monthly income of ₹20,000 is required for loan eligibility.' });
      return;
    }

    if (disposable < 15000) {
      setResult({ status: 'conditional', message: 'Your disposable income after existing EMIs is low. You may be eligible for a smaller loan amount.' });
      return;
    }

    if (employment === 'salaried' && monthlyIncome >= 25000) {
      setResult({ status: 'eligible', message: 'Congratulations! You are eligible for a loan. Our advisors will contact you with the best options from 350+ partners.' });
      return;
    }

    if (employment === 'self-employed' && monthlyIncome >= 40000) {
      setResult({ status: 'eligible', message: 'Congratulations! You are eligible for a business loan. Our team will connect you with the right banking partners.' });
      return;
    }

    if (employment === 'business' && monthlyIncome >= 50000) {
      setResult({ status: 'eligible', message: 'Congratulations! Your business profile qualifies for a loan. We will match you with the best NBFC partners.' });
      return;
    }

    setResult({ status: 'conditional', message: 'Your profile may be eligible. Our loan experts will review your details and contact you with personalized options.' });
  };

  const statusConfig = {
    eligible: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    ineligible: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
    conditional: { icon: AlertCircle, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  };

  return (
    <section id="eligibility" className="relative overflow-hidden px-6 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <span className="section-label mb-3">Quick Check</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Check Your <span className="text-gold-sheen">Loan Eligibility</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/55">
            Enter your details below and get instant eligibility feedback. No paperwork required.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="card-premium p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Employment Type */}
            <div className="sm:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/75">
                <User className="h-4 w-4 text-gold-400" />
                Employment Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['salaried', 'self-employed', 'business'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setEmployment(type)}
                    className={`rounded-xl border px-3 py-3 text-sm font-medium transition-all duration-300 ${
                      employment === type
                        ? 'border-gold-500/40 bg-gold-500/10 text-gold-200'
                        : 'border-white/10 bg-white/[0.02] text-white/55 hover:border-white/20 hover:text-white/75'
                    }`}
                  >
                    {type === 'salaried' ? 'Salaried' : type === 'self-employed' ? 'Self Employed' : 'Business Owner'}
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Income */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/75">
                <IndianRupee className="h-4 w-4 text-gold-400" />
                Monthly Income (₹)
              </label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="e.g. 50000"
                className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-gold-500/40 focus:bg-white/[0.04]"
              />
            </div>

            {/* City */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/75">
                <MapPin className="h-4 w-4 text-gold-400" />
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Mumbai"
                className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-gold-500/40 focus:bg-white/[0.04]"
              />
            </div>

            {/* Existing EMI */}
            <div className="sm:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/75">
                <CreditCard className="h-4 w-4 text-gold-400" />
                Existing Monthly EMI (₹)
              </label>
              <input
                type="number"
                value={existingEmi}
                onChange={(e) => setExistingEmi(e.target.value)}
                placeholder="0 if none"
                className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-gold-500/40 focus:bg-white/[0.04]"
              />
            </div>
          </div>

          <button
            onClick={checkEligibility}
            className="btn-primary mt-6 w-full"
          >
            Check Eligibility
            <ChevronRight className="h-4 w-4" />
          </button>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: 10 }}
                transition={{ duration: 0.4 }}
                className="mt-6 overflow-hidden"
              >
                <div className={`flex items-start gap-3 rounded-xl border p-4 ${statusConfig[result.status].border} ${statusConfig[result.status].bg}`}>
                  {(() => {
                    const Icon = statusConfig[result.status].icon;
                    return <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${statusConfig[result.status].color}`} />;
                  })()}
                  <div>
                    <div className={`font-semibold text-sm ${statusConfig[result.status].color}`}>
                      {result.status === 'eligible' ? 'Eligible' : result.status === 'ineligible' ? 'Not Eligible' : 'Conditional'}
                    </div>
                    <p className="mt-1 text-sm text-white/65">{result.message}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
