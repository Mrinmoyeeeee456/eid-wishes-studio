import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface CardCustomizerProps {
  recipientName: string;
  setRecipientName: (v: string) => void;
  senderName: string;
  setSenderName: (v: string) => void;
  message: string;
  setMessage: (v: string) => void;
  template: number;
  setTemplate: (v: number) => void;
}

const templateOptions = [
  { emoji: '🌙', label: 'Crescent' },
  { emoji: '⭐', label: 'Star' },
  { emoji: '🕌', label: 'Mosque' },
];

const CardCustomizer = ({
  recipientName, setRecipientName,
  senderName, setSenderName,
  message, setMessage,
  template, setTemplate,
}: CardCustomizerProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="w-full max-w-md mx-auto glass-card rounded-3xl p-6 space-y-5"
    >
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={18} className="text-festive" />
        <h3 className="font-display font-bold text-lg text-foreground">Customize Your Wish</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">Recipient Name</label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Who is this for?"
            className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground border border-border focus:ring-2 focus:ring-festive focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">Your Name</label>
          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="From..."
            className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground border border-border focus:ring-2 focus:ring-festive focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your heartfelt Eid wish..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground border border-border focus:ring-2 focus:ring-festive focus:border-transparent outline-none transition-all resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Template</label>
          <div className="flex gap-3">
            {templateOptions.map((t, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTemplate(i)}
                className={`flex-1 py-3 rounded-xl border text-center transition-all ${
                  template === i
                    ? 'border-festive bg-accent text-accent-foreground shadow-md'
                    : 'border-border bg-secondary text-muted-foreground hover:border-muted-foreground'
                }`}
              >
                <span className="text-2xl block">{t.emoji}</span>
                <span className="text-xs mt-1 block">{t.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CardCustomizer;
