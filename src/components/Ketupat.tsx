import { motion } from 'framer-motion';

export const Ketupat = ({ className }: { className?: string }) => (
  <motion.div
    initial={{ y: -20, rotate: -5 }}
    animate={{ y: 0, rotate: 5 }}
    transition={{
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }}
    className={`relative w-32 h-32 ${className}`}
  >
    {/* Diamond Shape (Plaid Pattern) */}
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
      <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="#fb923c" stroke="#fed7aa" strokeWidth="2"/>
      {/* Plaid Effect */}
      <path d="M27.5 27.5 L72.5 72.5 M27.5 72.5 L72.5 27.5" stroke="#fed7aa" strokeWidth="1" opacity="0.5"/>
      <path d="M16 61.5 L84 38.5 M16 38.5 L84 61.5" stroke="#fed7aa" strokeWidth="1" opacity="0.3"/>
      
      {/* Ribbons */}
      <path d="M50 95 C40 110 30 115 20 120" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
      <path d="M50 95 C60 110 70 115 80 120" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
      <path d="M45 105 L35 125 M55 105 L65 125" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
    </svg>
  </motion.div>
);
