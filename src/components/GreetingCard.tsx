import { motion } from 'framer-motion';

interface GreetingCardProps {
  recipientName: string;
  senderName: string;
  message: string;
  template: number;
}

const templates = [
  { emoji: '🌙', accent: 'from-emerald-500 to-teal-600', darkAccent: 'from-amber-400 to-yellow-500' },
  { emoji: '⭐', accent: 'from-blue-500 to-indigo-600', darkAccent: 'from-rose-400 to-pink-500' },
  { emoji: '🕌', accent: 'from-violet-500 to-purple-600', darkAccent: 'from-cyan-400 to-blue-500' },
];

const GreetingCard = ({ recipientName, senderName, message, template }: GreetingCardProps) => {
  const t = templates[template] || templates[0];

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="glass-card rounded-3xl overflow-hidden shadow-2xl">
        {/* Header band */}
        <div className="h-2 bg-gradient-to-r from-festive to-primary" />

        <div className="p-8 text-center space-y-4">
          {/* Decorative emoji */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl"
          >
            {t.emoji}
          </motion.div>

          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-display font-black text-foreground">
            Eid Mubarak
          </h3>

          <p className="text-2xl font-display text-muted-foreground opacity-80">
            عيد مبارك
          </p>

          {/* Recipient */}
          {recipientName && (
            <p className="text-lg text-foreground">
              Dear <span className="font-semibold text-festive">{recipientName}</span>,
            </p>
          )}

          {/* Message */}
          <p className="text-muted-foreground leading-relaxed italic px-4">
            {message || 'Wishing you joy, peace, and blessings on this beautiful Eid!'}
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 py-2">
            <div className="flex-1 h-px bg-border" />
            <span className="text-festive text-sm">✦</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Sender */}
          {senderName && (
            <p className="text-sm text-muted-foreground">
              With love, <span className="font-medium text-foreground">{senderName}</span>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default GreetingCard;
