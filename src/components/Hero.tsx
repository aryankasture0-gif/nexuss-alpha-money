import { useEffect, useRef } from 'react';
import { ShieldCheck, Globe, Banknote, BadgeCheck, ArrowRight, Phone } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { HERO_HEADLINE, HERO_DESCRIPTION, TRUST_BADGES, whatsappLink } from '../lib/site';

function TrustBadge({ icon: Icon, text }: { icon: typeof ShieldCheck; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-md"
    >
      <Icon className="h-4 w-4 shrink-0 text-gold-400" />
      <span className="text-sm font-medium text-white/80">{text}</span>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (isInView) {
      const countElements = document.querySelectorAll('.hero-count');
      countElements.forEach((el) => {
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(start + (target - start) * ease).toString();
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      });
    }
  }, [isInView]);

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const iconMap = [BadgeCheck, Banknote, Globe, ShieldCheck];

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center overflow-hidden px-6 pt-32 pb-20 lg:px-10 lg:pt-36 lg:pb-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/[0.08] px-5 py-2 text-sm font-medium text-gold-300"
            >
              <BadgeCheck className="h-4 w-4" />
              Trusted by 5,000+ customers across India
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl font-bold leading-[1.15] text-white sm:text-5xl lg:text-[3.6rem]"
            >
              {HERO_HEADLINE.split(' ').map((word, i) => {
                if (['Right', 'Loan', 'Solution', '350+', 'Bank', 'NBFC', 'Partners'].includes(word)) {
                  return <span key={i} className="text-gold-sheen">{word} </span>;
                }
                return <span key={i}>{word} </span>;
              })}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
            >
              {HERO_DESCRIPTION}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <button
                onClick={() => handleNav('#apply')}
                className="btn-primary group"
              >
                Apply Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Phone className="h-4 w-4" />
                WhatsApp Us
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-2 pt-2"
            >
              {TRUST_BADGES.map((badge, i) => (
                <TrustBadge key={badge} icon={iconMap[i % iconMap.length]} text={badge} />
              ))}
            </motion.div>
          </div>

          <div ref={ref} className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative grid gap-5 sm:grid-cols-2"
            >
              {[
                { value: 350, label: 'Bank & NBFC Partners', suffix: '+' },
                { value: 25, label: 'Loan Categories', suffix: '+' },
                { value: 5000, label: 'Customers Assisted', suffix: '+' },
                { value: 1, label: 'Fast Approval', suffix: '', prefix: '24-48h' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="card-premium p-6 text-center sm:text-left"
                >
                  <div className="mb-2 font-display text-3xl font-bold text-gold-sheen sm:text-4xl">
                    {stat.prefix ? (
                      <span className="text-gold-sheen">{stat.prefix}</span>
                    ) : (
                      <span className="hero-count" data-target={stat.value}>
                        0
                      </span>
                    )}
                    {stat.suffix && !stat.prefix && (
                      <span className="text-gold-sheen">{stat.suffix}</span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-white/50">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
