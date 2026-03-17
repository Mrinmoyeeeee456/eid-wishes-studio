import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';

export interface SavedGreeting {
  id: string;
  recipientName: string;
  senderName: string;
  message: string;
  template: number;
  createdAt: number;
}

interface SavedGreetingsProps {
  greetings: SavedGreeting[];
  onDelete: (id: string) => void;
}

const templateEmojis = ['🌙', '⭐', '🕌'];

const SavedGreetings = ({ greetings, onDelete }: SavedGreetingsProps) => {
  if (greetings.length === 0) return null;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="w-full max-w-2xl mx-auto mt-12"
    >
      <h3 className="font-display font-bold text-2xl text-foreground mb-6 text-center">
        Your Saved Wishes ✨
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <AnimatePresence>
          {greetings.map((g) => (
            <motion.div
              key={g.id}
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass-card rounded-2xl p-5 relative group"
            >
              <button
                onClick={() => onDelete(g.id)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-destructive/10 text-destructive opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20"
                aria-label="Delete greeting"
              >
                <Trash2 size={14} />
              </button>

              <div className="text-3xl mb-2">{templateEmojis[g.template] || '🌙'}</div>
              <p className="font-display font-bold text-foreground">
                To: {g.recipientName || 'Someone Special'}
              </p>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2 italic">
                "{g.message || 'Eid Mubarak!'}"
              </p>
              <p className="text-xs text-muted-foreground mt-3">
                From: {g.senderName || 'Anonymous'}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SavedGreetings;
