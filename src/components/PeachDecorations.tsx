import { motion } from 'framer-motion';
import { Ketupat } from './Ketupat';

const HangingDecoration = ({ className, delay = 0, height = 100 }: { className?: string, delay?: number, height?: number }) => (
  <motion.div
    initial={{ y: -20 }}
    animate={{ y: 0 }}
    transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay }}
    className={`absolute top-0 flex flex-col items-center pointer-events-none ${className}`}
  >
    <div className="w-[1px] bg-amber-200/40" style={{ height }} />
    <div className="text-xs opacity-60">✨</div>
    <div className="w-[1px] h-10 bg-amber-200/20" />
    <div className="text-sm opacity-40">🌙</div>
  </motion.div>
);

const Banner = () => (
  <motion.div
    initial={{ y: 0, opacity: 0 }}
    animate={{ 
      y: [0, -20, 0],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
    className={`absolute pointer-events-none ${className}`}
  >
    {children}
  </motion.div>
);

const Banner = () => (
  <div className="absolute top-0 inset-x-0 flex justify-center gap-4 py-8 opacity-40 select-none">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="w-8 h-12 bg-orange-200 clip-path-banner" style={{ transform: `rotate(${i % 2 ? 5 : -5}deg)` }} />
    ))}
  </div>
);

export const PeachDecorations = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <Banner />
      
      {/* Corner Ketupats (Diamond Cakes) */}
      <Ketupat className="absolute -top-4 -left-4 scale-125 opacity-90" />
      <Ketupat className="absolute -top-4 -right-4 scale-125 opacity-90 rotate-[10deg]" />

      {/* Hanging Decorations */}
      <HangingDecoration className="left-[15%]" height={120} delay={0.2} />
      <HangingDecoration className="left-[25%] opacity-40" height={80} delay={0.8} />
      <HangingDecoration className="right-[15%]" height={140} delay={0.5} />
      <HangingDecoration className="right-[25%] opacity-40" height={100} delay={1.1} />
      
      {/* Scattered Hearts and Stars */}
      <FloatingElement className="top-[15%] left-[10%] text-2xl" delay={0.5}>💕</FloatingElement>
      <FloatingElement className="top-[25%] right-[15%] text-xl" delay={1.2}>✨</FloatingElement>
      <FloatingElement className="bottom-[30%] left-[20%] text-2xl" delay={0.8}>💖</FloatingElement>
      <FloatingElement className="bottom-[15%] right-[10%] text-xl" delay={2.1}>⭐</FloatingElement>
      <FloatingElement className="top-[40%] left-[5%] text-sm" delay={1.5}>✨</FloatingElement>
      <FloatingElement className="top-[60%] right-[5%] text-lg" delay={3}>💕</FloatingElement>
      
      {/* Background Shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-100/30 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-50/20 blur-[150px] rounded-full -z-10" />
    </div>
  );
};
