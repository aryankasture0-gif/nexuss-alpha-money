import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Calendar, Coins, RefreshCw, ArrowRight } from 'lucide-react';
import { whatsappLink } from '../lib/site';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(isFinite(n) ? n : 0);

const fmtCompact = (n: number) =>
  new Intl.NumberFormat('en-IN', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(isFinite(n) ? n : 0);

function Slider({
  label,
  icon: Icon,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  icon: typeof Calculator;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="inline-flex items-center gap-2 text-sm font-medium text-white/75">
          <Icon className="h-4 w-4 text-gold-400" />
          {label}
        </label>
        <span className="font-mono text-sm font-semibold text-gold-200">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="emi-range mt-3 h-2 w-full cursor-pointer appearance-none rounded-full outline-none"
        style={{
          background: `linear-gradient(to right, #e6a91c 0%, #f7c12e ${pct}%, rgba(255,255,255,0.08) ${pct}%, rgba(255,255,255,0.08) 100%)`,
        }}
      />
      <div className="mt-1.5 flex justify-between text-[11px] text-white/35">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

type ResultCard = {
  icon: typeof Calculator;
  label: string;
  value: number;
  format: (v: number) => string;
  accent: string;
  delay: number;
};

export default function EMICalculator() {
  const [amount, setAmount] = useState(1500000);
  const [rate, setRate] = useState(10.99);
  const [tenure, setTenure] = useState(5);
  const [computed, setComputed] = useState(true);

  const { emi, totalInterest, totalPayable } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure * 12;
    if (r <= 0 || n <= 0) return { emi: amount / Math.max(n, 1), totalInterest: 0, totalPayable: amount };
    const e = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = e * n;
    return { emi: e, totalInterest: total - amount, totalPayable: total };
  }, [amount, rate, tenure]);

  const principalPct = totalPayable > 0 ? (amount / totalPayable) * 100 : 0;
  const interestPct = 100 - principalPct;

  const resultCards: ResultCard[] = [
    {
      icon: Coins,
      label: 'Monthly EMI',
      value: emi,
      format: fmtINR,
      accent: 'from-gold-400/20 to-gold-600/5 border-gold-500/30',
      delay: 0,
    },
    {
      icon: TrendingUp,
      label: 'Total Interest Payable',
      value: totalInterest,
      format: fmtINR,
      accent: 'from-navy-500/20 to-navy-700/5 border-navy-400/30',
      delay: 0.1,
    },
    {
      icon: Calendar,
      label: 'Total Amount Payable',
      value: totalPayable,
      format: fmtCompact,
      accent: 'from-gold-300/20 to-gold-700/5 border-gold-400/30',
      delay: 0.2,
    },
  ];

  const reset = () => {
    setAmount(1500000);
    setRate(10.99);
    setTenure(5);
    setComputed(false);
    requestAnimationFrame(() => setComputed(true));
  };

  const waHref = whatsappLink(
    `Hello Nexuss Alpha Money, I used the EMI calculator:\n\n• Loan Amount: ${fmtINR(amount)}\n• Interest Rate: ${rate.toFixed(2)}% p.a.\n• Tenure: ${tenure} years\n• Monthly EMI: ${fmtINR(emi)}\n• Total Interest: ${fmtINR(totalInterest)}\n• Total Payable: ${fmtCompact(totalPayable)}\n\nI would like to proceed with this loan.`
  );

  return (
    <section id="emi" className="relative px-6 py-24 lg:py-32">
      <style>{`
        .emi-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #f7c12e, #a36c0f);
          border: 2px solid #fff0c2;
          cursor: pointer;
          box-shadow: 0 0 12px rgba(247,193,46,0.6);
          transition: transform 0.2s ease;
        }
        .emi-range::-webkit-slider-thumb:hover { transform: scale(1.2); }
        .emi-range::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #f7c12e, #a36c0f);
          border: 2px solid #fff0c2;
          cursor: pointer;
          box-shadow: 0 0 12px rgba(247,193,46,0.6);
        }
      `}</style>

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-label">
            <Calculator className="h-3.5 w-3.5" /> EMI Calculator
          </span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-tight text-white text-balance sm:text-5xl">
            Know your number <span className="text-gold-sheen">before you commit.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/55">
            Move the dials to see an illustrative monthly EMI, total interest, and total payable estimate. Actual lender terms may differ.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mt-14 grid gap-7 lg:grid-cols-5"
        >
          {/* Inputs */}
          <div className="glass-gold rounded-3xl p-8 lg:col-span-3">
            <div className="space-y-8">
              <Slider
                label="Loan Amount"
                icon={Coins}
                value={amount}
                min={50000}
                max={20000000}
                step={50000}
                onChange={setAmount}
                format={fmtINR}
              />
              <Slider
                label="Interest Rate (% p.a.)"
                icon={TrendingUp}
                value={rate}
                min={4}
                max={28}
                step={0.05}
                onChange={setRate}
                format={(v) => `${v.toFixed(2)}%`}
              />
              <Slider
                label="Loan Tenure"
                icon={Calendar}
                value={tenure}
                min={1}
                max={30}
                step={1}
                onChange={setTenure}
                format={(v) => `${v} yr`}
              />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setComputed(true)}
                className="btn-gold flex-1"
              >
                <Calculator className="h-4 w-4" /> Calculate EMI
              </button>
              <button
                type="button"
                onClick={reset}
                className="btn-ghost flex-1"
              >
                <RefreshCw className="h-4 w-4" /> Reset
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="glass-gold relative flex flex-col rounded-3xl p-8 lg:col-span-2">
            {/* Donut */}
            <div className="flex flex-col items-center">
              <div className="relative h-40 w-40">
                <div
                  className="h-full w-full rounded-full transition-all duration-700"
                  style={{
                    background: `conic-gradient(#e6a91c 0% ${principalPct}%, rgba(36,73,143,0.4) ${principalPct}% ${principalPct + interestPct}%)`,
                  }}
                />
                <div className="absolute inset-3 grid place-items-center rounded-full bg-navy-900">
                  <div className="text-center">
                    <div className="text-[10px] uppercase tracking-[0.15em] text-white/40">Monthly</div>
                    <div className="mt-0.5 font-display text-2xl font-semibold text-gold-sheen">
                      {fmtCompact(emi)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-white/60">
                  <span className="h-2.5 w-2.5 rounded-full bg-gold-500" /> Principal
                </span>
                <span className="flex items-center gap-1.5 text-white/60">
                  <span className="h-2.5 w-2.5 rounded-full bg-navy-500" /> Interest
                </span>
              </div>
            </div>

            {/* Result cards */}
            <div className="mt-6 space-y-3">
              {resultCards.map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: card.delay, ease: 'easeOut' }}
                    className={`flex items-center justify-between rounded-2xl border bg-gradient-to-r ${card.accent} px-5 py-3.5`}
                  >
                    <span className="flex items-center gap-2.5 text-sm text-white/75">
                      <Icon className="h-4 w-4 text-gold-300" />
                      {card.label}
                    </span>
                    <span className="font-mono text-sm font-semibold text-white">
                      {card.format(card.value)}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {computed && (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-6 w-full"
              >
                Start an enquiry with this estimate <ArrowRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
