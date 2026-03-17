import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Moon, Sun, Plus, Trash2, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { toPng, toJpeg } from 'html-to-image';
import EidCard from '@/components/EidCard';
import Footer from '@/components/Footer';
import { SavedGreeting, loadGreetings, saveGreetings } from '@/lib/greetings';

const MyGreetings = () => {
  const [isDark, setIsDark] = useState(false);
  const [greetings, setGreetings] = useState<SavedGreeting[]>(loadGreetings);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleDelete = useCallback((id: string) => {
    setGreetings((prev) => {
      const updated = prev.filter((g) => g.id !== id);
      saveGreetings(updated);
      return updated;
    });
    toast('Greeting deleted');
  }, []);

  const handleShare = useCallback(async (g: SavedGreeting) => {
    const text = `Eid Mubarak! 🌙\nTo: ${g.recipientName}\n${g.message}\nFrom: ${g.senderName}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Eid Mubarak', text });
      } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-border/50 px-4 py-3 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition"
            >
              <ArrowLeft size={16} /> Back to Home
            </button>
            <div className="flex items-center gap-2">
              <span className="text-primary text-lg">🐪</span>
              <h1 className="text-lg font-bold font-display text-primary">My Greetings</h1>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg border border-border bg-card shadow-sm"
          >
            {isDark ? <Sun size={18} className="text-primary" /> : <Moon size={18} className="text-muted-foreground" />}
          </motion.button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-display font-bold text-foreground">
            Your Eid Greetings ({greetings.length})
          </h2>
          <button
            onClick={() => navigate('/create')}
            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition text-sm"
          >
            <Plus size={16} /> Create New
          </button>
        </div>

        {greetings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No greetings yet. Create your first one!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatePresence>
              {greetings.map((g) => (
                <GreetingItem
                  key={g.id}
                  greeting={g}
                  onDelete={handleDelete}
                  onShare={handleShare}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        <Footer />
      </main>
    </div>
  );
};

interface GreetingItemProps {
  greeting: SavedGreeting;
  onDelete: (id: string) => void;
  onShare: (g: SavedGreeting) => void;
}

const GreetingItem = ({ greeting, onDelete, onShare }: GreetingItemProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const exportImage = useCallback(
    async (format: 'png' | 'jpeg') => {
      if (!cardRef.current) return;
      try {
        const fn = format === 'png' ? toPng : toJpeg;
        const dataUrl = await fn(cardRef.current, { quality: 0.95 });
        const link = document.createElement('a');
        link.download = `eid-greeting.${format}`;
        link.href = dataUrl;
        link.click();
        toast.success(`Exported as ${format.toUpperCase()}`);
      } catch {
        toast.error('Export failed');
      }
    },
    []
  );

  return (
    <motion.div
      layout
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="space-y-3"
    >
      <EidCard
        ref={cardRef}
        recipientName={greeting.recipientName}
        senderName={greeting.senderName}
        message={greeting.message}
        size={greeting.cardSize || 'medium'}
      />

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onShare(greeting)}
          className="flex-1 py-2.5 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary transition flex items-center justify-center gap-2"
        >
          <Share2 size={14} /> Share
        </button>
        <button
          onClick={() => onDelete(greeting.id)}
          className="p-2.5 border border-border rounded-lg text-destructive hover:bg-destructive/10 transition"
        >
          <Trash2 size={14} />
        </button>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => exportImage('png')}
          className="flex-1 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:text-primary hover:border-primary transition flex items-center justify-center gap-2"
        >
          ⬇ PNG
        </button>
        <button
          onClick={() => exportImage('jpeg')}
          className="flex-1 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:text-primary hover:border-primary transition flex items-center justify-center gap-2"
        >
          ⬇ JPEG
        </button>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Created {new Date(greeting.createdAt).toLocaleDateString()} • Classic • {greeting.cardSize || 'Medium'} • Stored Locally
      </p>
    </motion.div>
  );
};

export default MyGreetings;
