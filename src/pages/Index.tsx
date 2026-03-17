import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import ShootingStars from '@/components/ShootingStars';
import AppBar from '@/components/AppBar';
import GreetingCard from '@/components/GreetingCard';
import CardCustomizer from '@/components/CardCustomizer';
import SavedGreetings, { SavedGreeting } from '@/components/SavedGreetings';

const STORAGE_KEY = 'eid-wishes';

const loadGreetings = (): SavedGreeting[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const Index = () => {
  const [isDark, setIsDark] = useState(true);
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [template, setTemplate] = useState(0);
  const [greetings, setGreetings] = useState<SavedGreeting[]>(loadGreetings);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(greetings));
  }, [greetings]);

  const handleSave = useCallback(() => {
    const newGreeting: SavedGreeting = {
      id: crypto.randomUUID(),
      recipientName,
      senderName,
      message,
      template,
      createdAt: Date.now(),
    };
    setGreetings((prev) => [newGreeting, ...prev]);
    toast.success('Eid wish saved! 🌙');
    setRecipientName('');
    setSenderName('');
    setMessage('');
  }, [recipientName, senderName, message, template]);

  const handleDelete = useCallback((id: string) => {
    setGreetings((prev) => prev.filter((g) => g.id !== id));
    toast('Wish removed');
  }, []);

  return (
    <div className="min-h-screen relative">
      <ShootingStars isDark={isDark} />

      <AppBar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

      <main className="relative z-10 max-w-5xl mx-auto px-4 pt-12 pb-32">
        {/* Hero */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-8xl font-display font-black text-foreground mb-4 drop-shadow-2xl">
            EID MUBARAK
          </h2>
          <p className="text-2xl font-display text-muted-foreground opacity-80 italic">
            عيد مبارك
          </p>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            Create beautiful Eid greetings for your loved ones. Customize, preview, and share your wishes.
          </p>
        </motion.div>

        {/* Card + Customizer */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="order-2 md:order-1">
            <CardCustomizer
              recipientName={recipientName}
              setRecipientName={setRecipientName}
              senderName={senderName}
              setSenderName={setSenderName}
              message={message}
              setMessage={setMessage}
              template={template}
              setTemplate={setTemplate}
            />
          </div>
          <div className="order-1 md:order-2">
            <GreetingCard
              recipientName={recipientName}
              senderName={senderName}
              message={message}
              template={template}
            />
          </div>
        </div>

        {/* Saved Greetings */}
        <SavedGreetings greetings={greetings} onDelete={handleDelete} />
      </main>

      {/* Floating Save Button */}
      <motion.button
        whileHover={{ y: -5, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSave}
        className="fixed bottom-8 right-8 px-6 py-4 bg-primary text-primary-foreground rounded-full shadow-2xl z-50 font-semibold flex items-center gap-2 glow-festive"
      >
        <span>✨</span> Save Wish
      </motion.button>
    </div>
  );
};

export default Index;
