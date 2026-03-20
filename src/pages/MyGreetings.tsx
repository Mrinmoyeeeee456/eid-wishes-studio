import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Share2, PenLine } from 'lucide-react';
import { toast } from 'sonner';
import { toPng, toJpeg } from 'html-to-image';
import EidCard from '@/components/EidCard';
import Footer from '@/components/Footer';
import { SavedGreeting, loadGreetings, saveGreetings, deleteGreetingFromDb } from '@/lib/greetings';

const MyGreetings = () => {
  const [greetings, setGreetings] = useState<SavedGreeting[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadGreetings().then(data => {
      setGreetings(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    setGreetings((prev) => {
      const updated = prev.filter((g) => g.id !== id);
      saveGreetings(updated);
      return updated;
    });
    await deleteGreetingFromDb(id);
    toast('Greeting deleted');
  }, []);

  const handleShare = useCallback(async (g: SavedGreeting, dataUrl?: string) => {
    const text = `Eid Mubarak! 🌙\nTo: ${g.recipientName}\n${g.message}\nFrom: ${g.senderName}`;
    if (navigator.share) {
      try {
        if (dataUrl) {
          try {
            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], 'eid-greeting.png', { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              await navigator.share({ title: 'Eid Mubarak', text, files: [file] });
              return;
            }
          } catch(e) { console.warn('Native image share unavail/failed', e); }
        }
        await navigator.share({ title: 'Eid Mubarak', text });
      } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen"
    >
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

        {loading ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Loading your greetings...</p>
          </div>
        ) : greetings.length === 0 ? (
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
                  onEdit={(greeting) => navigate('/create', { state: { editData: greeting } })}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        <Footer />
      </main>
    </motion.div>
  );
};

interface GreetingItemProps {
  greeting: SavedGreeting;
  onDelete: (id: string) => void;
  onShare: (g: SavedGreeting, dataUrl?: string) => void;
  onEdit: (g: SavedGreeting) => void;
}

const GreetingItem = ({ greeting, onDelete, onShare, onEdit }: GreetingItemProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const exportImage = useCallback(
    async (format: 'png' | 'jpeg') => {
      if (!cardRef.current) return;
      document.body.classList.add('exporting');
      try {
        const fn = format === 'png' ? toPng : toJpeg;
        const dataUrl = await fn(cardRef.current, { 
          quality: 1.0, 
          pixelRatio: 2,
          skipFonts: false,
          style: { transform: 'none' }
        });
        const link = document.createElement('a');
        link.download = `eid-greeting.${format}`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success(`Exported as ${format.toUpperCase()}`);
      } catch {
        toast.error('Export failed');
      } finally {
        document.body.classList.remove('exporting');
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
      <div className="card-sharp">
          <EidCard
            ref={cardRef}
            recipientName={greeting.recipientName}
            senderName={greeting.senderName}
            message={greeting.message}
            size={greeting.cardSize || 'medium'}
            frameId={greeting.frameId as any}
            eidType={greeting.eidType}
            customBg={greeting.customBg}
          />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={async () => {
             if (!cardRef.current) { onShare(greeting); return; }
             toast.loading('Generating image for share...', { id: 'share' });
             document.body.classList.add('exporting');
             try {
               const dataUrl = await toPng(cardRef.current, { 
                 quality: 1.0, 
                 pixelRatio: 2, 
                 skipFonts: false,
                 style: { transform: 'none' } 
               });
               toast.dismiss('share');
               onShare(greeting, dataUrl);
             } catch {
               toast.dismiss('share');
               onShare(greeting);
             } finally {
               document.body.classList.remove('exporting');
             }
          }}
          className="flex-1 py-2 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary transition flex items-center justify-center gap-2 glass-button"
        >
          <Share2 size={14} /> Share
        </button>
        <button
          onClick={() => onEdit(greeting)}
          className="flex-1 py-2 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary transition flex items-center justify-center gap-2 glass-button"
        >
          <PenLine size={14} /> Edit
        </button>
        <button
          onClick={() => onDelete(greeting.id)}
          className="p-2.5 border border-border rounded-lg text-destructive hover:bg-destructive/10 transition glass-button"
        >
          <Trash2 size={14} />
        </button>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => exportImage('png')}
          className="flex-1 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:text-primary hover:border-primary transition flex items-center justify-center gap-2 glass-button"
        >
          ⬇ PNG
        </button>
        <button
          onClick={() => exportImage('jpeg')}
          className="flex-1 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:text-primary hover:border-primary transition flex items-center justify-center gap-2 glass-button"
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
