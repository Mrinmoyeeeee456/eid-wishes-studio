import { useThemeStore } from '../store/themeStore';
import { motion, AnimatePresence } from 'framer-motion';

export const LaughingMoon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10 A40 40 0 1 0 50 90 A30 30 0 1 1 50 10" fill="currentColor" />
    <g className="moon-face">
      <path d="M35 40 Q40 35 45 40" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M55 40 Q60 35 65 40" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 60 Q50 75 60 60" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" className="animate-bounce" />
    </g>
  </svg>
);

const StarField = () => {
  const { isDark } = useThemeStore();
  
  // Create a limited set of stars (mobile optimized)
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    size: Math.random() > 0.8 ? Math.random() * 4 + 2 : Math.random() * 2 + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    isCyan: Math.random() > 0.5,
    delay: Math.random() * 3,
    duration: Math.random() * 2 + 0.8,
  }));

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden z-0 transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden="true"
    >
      <AnimatePresence>
        {isDark && (
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 1 }}
             className="w-full h-full relative"
          >
            {/* Stars */}
            {stars.map((star) => (
              <motion.div
                key={star.id}
                initial={{ opacity: 0.1, scale: 0.5 }}
                animate={{ opacity: Math.random() * 0.8 + 0.1, scale: star.size }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: star.delay,
                  ease: "easeInOut",
                }}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  left: star.left,
                  top: star.top,
                  backgroundColor: star.isCyan ? 'rgba(100, 255, 218, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                  boxShadow: star.isCyan ? '0 0 4px rgba(100,255,218,0.8)' : '0 0 4px rgba(255,255,255,0.8)',
                }}
              />
            ))}

            {/* Moons */}
            <div className="absolute top-12 right-12 w-32 h-32 text-amber-50 drop-shadow-[0_0_80px_rgba(251,191,36,0.8)] opacity-100 scale-125">
              <LaughingMoon className="w-full h-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StarField;
