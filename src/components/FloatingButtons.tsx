import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, X } from 'lucide-react';
import { BRAND, whatsappLink } from '../lib/site';

export default function FloatingButtons() {
  const [showActions, setShowActions] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showActions && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            {/* WhatsApp */}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>

            {/* Call Now */}
            <a
              href={`tel:${BRAND.phone}`}
              className="flex items-center gap-3 rounded-full bg-gold-gradient px-5 py-3 text-sm font-semibold text-navy-950 shadow-lg transition-transform hover:scale-105"
            >
              <Phone className="h-5 w-5" />
              Call Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setShowActions((v) => !v)}
        className="grid h-14 w-14 place-items-center rounded-full shadow-lg transition-transform hover:scale-105"
        style={{
          background: showActions
            ? 'linear-gradient(135deg, #1d3a73 0%, #162d5c 100%)'
            : 'linear-gradient(135deg, #f7c12e 0%, #e6a91c 100%)',
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: scrolled ? 1 : 0,
          scale: scrolled ? 1 : 0,
          pointerEvents: scrolled ? 'auto' : 'none',
        }}
        transition={{ duration: 0.3 }}
      >
        {showActions ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Phone className="h-6 w-6 text-navy-950" />
        )}
      </motion.button>
    </div>
  );
}
