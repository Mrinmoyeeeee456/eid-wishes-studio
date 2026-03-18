import { motion } from 'framer-motion';

interface LanternProps {
  className?: string;
  delay?: number;
}

export const Lantern = ({ className, delay = 0 }: LanternProps) => (
  <motion.div
    initial={{ y: -10 }}
    animate={{ y: 0 }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay
    }}
    className={`relative flex flex-col items-center ${className}`}
  >
    {/* Hanging Wire */}
    <div className="w-[1px] h-20 bg-amber-200/40" />
    
    {/* Lantern Body */}
    <div className="relative w-8 h-12">
      <svg viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 10 L35 10 L32 50 L8 50 Z" fill="#fb923c" fillOpacity="0.8" stroke="#fcd34d" strokeWidth="2"/>
        <path d="M8 50 L32 50 L28 58 L12 58 Z" fill="#7c2d12" stroke="#fcd34d" strokeWidth="1"/>
        <rect x="15" y="2" width="10" height="8" rx="2" fill="#7c2d12" stroke="#fcd34d" strokeWidth="1"/>
        
        {/* Glow */}
        <circle cx="20" cy="30" r="10" fill="#fef3c7" fillOpacity="0.4" className="animate-pulse" />
      </svg>
      
      {/* Light Blur */}
      <div className="absolute inset-0 bg-amber-400/20 blur-xl rounded-full scale-150" />
    </div>
  </motion.div>
);

export const HangingLanterns = () => {
  return (
    <div className="absolute top-0 inset-x-0 flex justify-around pointer-events-none z-0">
      <Lantern className="opacity-80" delay={0.2} />
      <Lantern className="opacity-40 scale-75 pt-10" delay={0.5} />
      <Lantern className="opacity-60 scale-90 pt-5" delay={0.8} />
      <Lantern className="opacity-90 pt-8" delay={1.1} />
      <Lantern className="opacity-50 scale-110 pt-2" delay={1.4} />
      <Lantern className="opacity-70 scale-85 pt-12" delay={0} />
    </div>
  );
};
