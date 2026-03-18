import { motion } from 'framer-motion';
import { Ketupat } from './Ketupat';

// ──────────────────────────────────────────────────────────
// Floating Element — emojis that gently bob
// ──────────────────────────────────────────────────────────
const FloatingElement = ({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ y: 0, opacity: 0 }}
    animate={{
      y: [0, -14, 0],
      opacity: [0.4, 0.7, 0.4],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
    className={`absolute pointer-events-none select-none ${className}`}
  >
    {children}
  </motion.div>
);

// ──────────────────────────────────────────────────────────
// Hanging Decoration — a slim cord with a star/moon at end
// ──────────────────────────────────────────────────────────
const HangingDecoration = ({
  className,
  delay = 0,
  height = 100,
}: {
  className?: string;
  delay?: number;
  height?: number;
}) => (
  <motion.div
    initial={{ y: -10 }}
    animate={{ y: 0 }}
    transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay }}
    className={`absolute top-0 flex flex-col items-center pointer-events-none ${className}`}
  >
    <div className="w-[1px] bg-amber-200/40" style={{ height }} />
    <div className="text-xs opacity-60">✨</div>
    <div className="w-[1px] h-8 bg-amber-200/20" />
    <div className="text-sm opacity-40">🌙</div>
  </motion.div>
);

// ──────────────────────────────────────────────────────────
// Top Banner — small triangular flags / pennants
// ──────────────────────────────────────────────────────────
const Banner = () => (
  <div className="absolute top-0 inset-x-0 flex justify-center gap-3 py-6 opacity-30 select-none pointer-events-none z-10">
    {['🟠', '🟡', '🟢', '🟣', '🟡', '🟠', '🟢', '🟣', '🟡'].map((_, i) => (
      <motion.div
        key={i}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
        className="flex flex-col items-center"
      >
        <div className="w-[1px] h-8 bg-stone-300/50" />
        {/* Triangle pennant */}
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
          <polygon
            points="9,0 18,20 0,20"
            fill={['#fb923c', '#fde047', '#2dd4bf', '#c084fc', '#fde047'][i % 5]}
            opacity="0.7"
          />
        </svg>
      </motion.div>
    ))}
  </div>
);

// ──────────────────────────────────────────────────────────
// Main Export
// ──────────────────────────────────────────────────────────
export const PeachDecorations = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <Banner />

      {/* Corner Ketupats (Diamond Cakes) */}
      <Ketupat className="absolute -top-4 -left-4 scale-125 opacity-80" />
      <Ketupat className="absolute -top-4 -right-4 scale-125 opacity-80 rotate-[10deg]" />

      {/* Hanging Decorations — left side */}
      <HangingDecoration className="left-[10%]" height={130} delay={0.1} />
      <HangingDecoration className="left-[22%] opacity-50" height={90} delay={0.7} />

      {/* Hanging Decorations — right side */}
      <HangingDecoration className="right-[10%]" height={150} delay={0.4} />
      <HangingDecoration className="right-[22%] opacity-50" height={110} delay={1.0} />

      {/* ── Scattered Floating Hearts & Stars ── */}
      <FloatingElement className="top-[18%] left-[8%]  text-2xl" delay={0.4}>💕</FloatingElement>
      <FloatingElement className="top-[28%] right-[12%] text-xl"  delay={1.1}>✨</FloatingElement>
      <FloatingElement className="top-[55%] left-[6%]  text-xl"  delay={1.8}>🌸</FloatingElement>
      <FloatingElement className="top-[42%] right-[7%] text-2xl" delay={0.6}>💖</FloatingElement>
      <FloatingElement className="bottom-[32%] left-[18%] text-xl" delay={2.2}>⭐</FloatingElement>
      <FloatingElement className="bottom-[20%] right-[9%]  text-xl" delay={1.5}>💕</FloatingElement>
      <FloatingElement className="top-[70%] left-[3%]  text-sm"  delay={3.0}>✨</FloatingElement>
      <FloatingElement className="top-[65%] right-[4%] text-lg"  delay={2.5}>🌙</FloatingElement>

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-100/25 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-50/15 blur-[150px] rounded-full -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-50/10 blur-[180px] rounded-full -z-10" />
    </div>
  );
};
