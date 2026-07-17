import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, ClipboardPen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BRAND, whatsappLink } from '../lib/site';

export default function MobileBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around gap-1 border-t border-white/10 bg-navy-950/95 px-2 py-2 backdrop-blur-xl sm:hidden"
        >
          <a
            href={`tel:+${BRAND.phoneE164}`}
            className="flex flex-1 flex-col items-center gap-1 rounded-xl bg-gold-500/10 py-2 text-xs font-medium text-gold-200 transition-colors active:bg-gold-500/20"
          >
            <Phone className="h-5 w-5 text-gold-400" />
            Call Now
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 flex-col items-center gap-1 rounded-xl bg-[#25D366]/10 py-2 text-xs font-medium text-emerald-300 transition-colors active:bg-[#25D366]/20"
          >
            <MessageCircle className="h-5 w-5 text-[#25D366]" />
            WhatsApp
          </a>
          <a
            href="#apply"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#apply')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-1 flex-col items-center gap-1 rounded-xl bg-navy-500/20 py-2 text-xs font-medium text-white/80 transition-colors active:bg-navy-500/30"
          >
            <ClipboardPen className="h-5 w-5 text-white/60" />
            Apply Now
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
