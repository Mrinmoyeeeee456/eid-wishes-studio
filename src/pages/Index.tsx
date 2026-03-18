import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PenLine, Sparkles, FolderOpen } from 'lucide-react';
import Footer from '@/components/Footer';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <PenLine className="text-[var(--primary-festive)]" size={28} />,
      title: 'Create Greetings',
      desc: 'Design personalized Eid greeting cards with custom messages and beautiful Islamic themes.',
    },
    {
      icon: <Sparkles className="text-[var(--primary-festive)]" size={28} />,
      title: 'AI-Powered',
      desc: 'Generate heartfelt messages with AI in multiple languages including Arabic and Bengali.',
    },
    {
      icon: <FolderOpen className="text-[var(--primary-festive)]" size={28} />,
      title: 'Save & Share',
      desc: 'Store your greetings securely and share them with family and friends across all platforms.',
    },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Hero */}
      <main className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center pt-20 px-4 pb-8">

        {/* ── Main Heading ── */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 text-4xl mb-6">
            <span>⭐</span>
            <span className="text-5xl">🕌</span>
            <span>⭐</span>
          </div>

          <h2 className="text-6xl md:text-8xl font-display font-black mb-4 drop-shadow-2xl text-foreground">
            EID MUBARAK
          </h2>

          <div className="w-20 h-1 bg-[var(--primary-festive)] mx-auto rounded-full mb-4" />

          <p className="text-2xl font-display opacity-80 italic mb-3 text-[var(--primary-festive)]">
            عيد مبارك
          </p>

          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Create beautiful, personalized Eid greeting cards and share them with
            your loved ones. Celebrate this blessed occasion with heartfelt messages.
          </p>
        </motion.div>

        {/* ── CTA Buttons ── */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10"
        >
          <button
            onClick={() => navigate('/create')}
            className="px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center gap-2 text-white"
            style={{ background: 'var(--primary-festive)' }}
          >
            ✨ Create Wish
          </button>
          <button
            onClick={() => navigate('/greetings')}
            className="px-8 py-3 rounded-xl font-semibold border-2 transition-all duration-200 hover:scale-105 flex items-center gap-2"
            style={{
              borderColor: 'var(--primary-festive)',
              color: 'var(--primary-festive)',
            }}
          >
            ☆ My Greetings
          </button>
        </motion.div>

        {/* ── Feature Cards ── */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mt-16 w-full"
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/10 p-6 text-center hover:shadow-xl transition-shadow duration-300"
              style={{ background: 'var(--card-bg)', backdropFilter: 'blur(12px)' }}
            >
              <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                {f.icon}
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Bottom Decoration ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-16 text-center"
        >
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">🌙 <span className="font-medium" style={{ color: 'var(--primary-festive)' }}>Blessed Eid</span></span>
            <span className="flex items-center gap-1">⭐ <span className="font-medium" style={{ color: 'var(--primary-festive)' }}>Peace & Joy</span></span>
            <span className="flex items-center gap-1">🤲 <span className="font-medium" style={{ color: 'var(--primary-festive)' }}>Divine Blessings</span></span>
          </div>
        </motion.div>

        <Footer />
      </main>
    </div>
  );
};

export default Index;
