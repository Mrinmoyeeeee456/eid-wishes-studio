import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Sun, Stars, PenLine, Sparkles, FolderOpen } from 'lucide-react';
import Footer from '@/components/Footer';

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const features = [
    {
      icon: <PenLine className="text-primary" size={28} />,
      bg: 'bg-accent',
      title: 'Create Greetings',
      desc: 'Design personalized Eid greeting cards with custom messages and beautiful Islamic themes',
    },
    {
      icon: <Sparkles className="text-primary" size={28} />,
      bg: 'bg-accent',
      title: 'AI-Powered',
      desc: 'Generate personalized messages with AI in multiple languages including Arabic and Bengali',
    },
    {
      icon: <FolderOpen className="text-primary" size={28} />,
      bg: 'bg-accent',
      title: 'Save & Share',
      desc: 'Store your greetings securely and share them with family and friends across social platforms',
    },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Floating decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-8 w-12 h-12 rounded-full border-2 border-primary/20 opacity-50" />
        <div className="absolute top-40 right-16 w-8 h-8 rotate-45 border-2 border-primary/20 opacity-40" />
        <div className="absolute bottom-40 left-16 text-primary/20 text-2xl">🐪</div>
        <div className="absolute bottom-60 right-12 text-primary/15 text-xl">🕌</div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-28 right-1/4 text-primary/20"
        >
          ☆
        </motion.div>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-border/50 px-4 py-3 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-primary text-xl">🐪</span>
            <h1 className="text-xl font-bold tracking-tight font-display text-foreground">
              Eid<span className="text-primary">Greetings</span>
            </h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg border border-border bg-card shadow-sm"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} className="text-primary" /> : <Moon size={18} className="text-muted-foreground" />}
          </motion.button>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 pt-16 pb-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 text-4xl mb-4">
            <span>⭐</span>
            <span className="text-primary text-5xl">🕌</span>
            <span>⭐</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-display font-black text-foreground mb-3">
            Eid Mubarak
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-3" />
          <p className="text-xl font-display text-primary mb-6">عيد أضحستى مبارك</p>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Create beautiful, personalized Eid-ul-Adha greeting cards to share with your loved ones.
            Celebrate this blessed occasion with heartfelt messages and elegant designs.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6 mt-14"
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className={`w-14 h-14 ${f.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                {f.icon}
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <button
            onClick={() => navigate('/create')}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg hover:opacity-90 transition flex items-center gap-2"
          >
            🐪 Create Greeting Card
          </button>
          <button
            onClick={() => navigate('/greetings')}
            className="px-8 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-accent transition flex items-center gap-2"
          >
            ☆ View My Greetings
          </button>
        </motion.div>

        {/* Bottom decoration */}
        <div className="flex items-center justify-center gap-2 mt-14 text-2xl">
          🐪 🐪 🐪 🐪 🐪
        </div>
        <div className="flex items-center justify-center gap-1 mt-2 text-primary/50">
          | | | | |
        </div>
        <div className="flex items-center justify-center gap-2 mt-1 text-primary/40">
          ☆ ☆ ☆ ☆ ☆
        </div>
        <div className="flex items-center justify-center gap-6 mt-6 text-sm">
          <span className="flex items-center gap-1">🌙 <span className="text-primary font-medium">Blessed Eid</span></span>
          <span className="flex items-center gap-1">⭐ <span className="text-primary font-medium">Peace & Joy</span></span>
          <span className="flex items-center gap-1">🤲 <span className="text-primary font-medium">Divine Blessings</span></span>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Index;
