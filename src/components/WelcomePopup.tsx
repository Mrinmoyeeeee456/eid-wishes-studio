import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup every visit (or use localStorage for once-per-session)
    const timer = setTimeout(() => setIsOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.6, y: 60, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            className="relative max-w-md w-full rounded-3xl overflow-hidden shadow-2xl text-center"
            style={{
              background: 'linear-gradient(135deg, #fff9f5 0%, #fdf4ff 100%)',
              border: '2px solid #fb923c',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-black/10 hover:bg-black/20 transition-colors z-10"
            >
              <X size={16} className="text-stone-600" />
            </button>

            {/* Top Banner */}
            <div className="py-6 px-4" style={{ background: 'linear-gradient(135deg, #fb923c, #e879f9)' }}>
              <div className="text-5xl mb-2">🌙</div>
              <h2 className="text-3xl font-black text-white tracking-tight drop-shadow" style={{ fontFamily: 'serif' }}>
                Ramadan Mubarak!
              </h2>
              <p className="text-white/90 text-sm mt-1 font-medium">رمضان مبارك 🌟</p>
            </div>

            {/* Content */}
            <div className="px-8 py-6">
              <p className="text-stone-600 text-base leading-relaxed">
                Welcome to the <span className="font-bold text-orange-500">Eid Wishes Studio</span> 🌸
              </p>
              <p className="text-stone-500 text-sm mt-2 leading-relaxed">
                Create beautiful, personalised Eid greeting cards and share joy with your loved ones this blessed season.
              </p>

              {/* Floating decoration text */}
              <div className="flex justify-center gap-4 mt-4 text-2xl">
                <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }}>🕌</motion.span>
                <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}>⭐</motion.span>
                <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}>🌙</motion.span>
                <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}>💖</motion.span>
                <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1.6 }}>✨</motion.span>
              </div>

              <p className="text-[11px] text-stone-400 mt-3 italic">
                🎵 Ramadan music is playing — click the 🔊 icon to mute
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="px-8 pb-6 flex gap-3">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsOpen(false)}
                className="flex-1 py-3 rounded-xl font-bold text-white text-sm shadow-lg transition-all"
                style={{ background: 'linear-gradient(135deg, #fb923c, #f97316)' }}
              >
                🌸 Create a Wish
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsOpen(false)}
                className="py-3 px-5 rounded-xl font-semibold text-sm border-2 border-orange-200 text-orange-500 hover:bg-orange-50 transition-all"
              >
                Later
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomePopup;
