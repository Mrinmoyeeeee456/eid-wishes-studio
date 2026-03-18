import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PenLine, Sparkles, FolderOpen } from 'lucide-react';
import gsap from 'gsap';
import Footer from '@/components/Footer';
import { useThemeStore } from '@/store/themeStore';
import { HangingLanterns } from '@/components/Lanterns';
import { PeachDecorations } from '@/components/PeachDecorations';

const Index = () => {
  const navigate = useNavigate();
  const { isDark } = useThemeStore();

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

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to('.gate-left', { x: '-100%', duration: 1.8, ease: 'power3.inOut' }, 0.5)
      .to('.gate-right', { x: '100%', duration: 1.8, ease: 'power3.inOut' }, 0.5)
      .to('.gate-container', { autoAlpha: 0, duration: 0.5 }, '-=0.5')
      .set('.gate-container', { display: 'none' });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* GSAP Celestial Gate */}
      <div className="gate-container fixed inset-0 z-50 pointer-events-none flex">
        <div className="gate-left w-1/2 h-full bg-[var(--background)] border-r-4 border-[var(--primary-festive)] flex items-center justify-end pr-4 shadow-[10px_0_30px_rgba(0,0,0,0.5)] shine-spiritual">
          <Sparkles className="text-[var(--primary-festive)] opacity-50" size={48} />
        </div>
        <div className="gate-right w-1/2 h-full bg-[var(--background)] border-l-4 border-[var(--primary-festive)] flex items-center justify-start pl-4 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] shine-spiritual">
          <Sparkles className="text-[var(--primary-festive)] opacity-50" size={48} />
        </div>
      </div>

      {/* ── Conditionals Hero Sections ── */}
      <main className="relative z-10 max-w-6xl mx-auto flex flex-col items-center justify-center pt-16 px-4 pb-8">
        
        {isDark ? (
          /* ── DARK MODE HERO (Mystical Night) ── */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center w-full relative"
          >
            {/* Hanging Lanterns Layer */}
            <HangingLanterns />
            
            {/* Navigation Pills (As seen in image 1) */}
            <div className="flex items-center justify-center gap-6 mb-12 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              <span className="border-b-2 border-[var(--primary-festive)] pb-1 text-white">Amination</span>
              <span className="hover:text-white cursor-pointer transition-colors">Hero</span>
              <span className="hover:text-white cursor-pointer transition-colors">Merat</span>
              <span className="hover:text-white cursor-pointer transition-colors">CTA</span>
            </div>

            <div className="relative mb-6">
               <h2 className="text-7xl md:text-9xl font-display font-black glassy-text-glow tracking-widest leading-none mb-2">
                 RAMADAN MUBARAK
               </h2>
               <div className="flex items-center justify-center gap-4 text-3xl md:text-5xl font-amiri text-amber-100/80 mt-4 italic">
                  <span>Here aid just</span>
                  <span className="text-4xl md:text-6xl text-[var(--primary-festive)] filter drop-shadow-[0_0_15px_rgba(251,146,60,0.8)]">مبني اروريك</span>
               </div>
            </div>

            {/* Background Mosque Silhouette Decorative */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] -z-10 opacity-20 pointer-events-none overflow-hidden">
               <div className="flex items-end justify-center h-full gap-4">
                  <div className="w-20 h-40 bg-white rounded-t-full" />
                  <div className="w-32 h-60 bg-white rounded-t-full" />
                  <div className="w-40 h-80 bg-white rounded-t-full" />
                  <div className="w-32 h-60 bg-white rounded-t-full" />
                  <div className="w-20 h-40 bg-white rounded-t-full" />
               </div>
            </div>
          </motion.div>
        ) : (
          /* ── LIGHT MODE HERO (Peach Lunar) ── */
          <>
            {/* Full Page Decorations Layer */}
            <PeachDecorations />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="text-center w-full relative z-10 pt-10 pb-20"
            >
              <div className="relative mb-12">
                <div className="flex items-center justify-center gap-16 relative z-10">
                  <div className="relative group">
                    <span className="text-7xl animate-float drop-shadow-xl inline-block">🌙</span>
                    <div className="absolute -inset-4 bg-purple-200/30 blur-2xl -z-10 rounded-full" />
                  </div>
                  
                  {/* Central Mosque (Precision Colors) */}
                  <div className="relative">
                    <span className="text-9xl drop-shadow-2xl filter saturate-[1.2] brightness-110">🕌</span>
                    <div className="absolute -inset-10 bg-orange-200/50 blur-[80px] -z-10 rounded-full animate-pulse" />
                    <div className="absolute -top-4 -right-4 text-2xl animate-bounce">💖</div>
                  </div>

                  <div className="relative group">
                    <span className="text-7xl animate-float delay-700 drop-shadow-xl inline-block rotate-12">⏳</span>
                    <div className="absolute -inset-4 bg-orange-200/30 blur-2xl -z-10 rounded-full" />
                  </div>
                </div>
              </div>

              <h2 className="text-7xl md:text-9xl font-display font-black mb-4 py-4 tracking-tighter drop-shadow-md text-stone-900 border-none outline-none">
                EID MUBARAK
              </h2>
              <p className="text-2xl md:text-3xl font-display font-medium text-stone-600/60 tracking-widest uppercase mb-12 italic">
                Wish you a blessed Eid
              </p>

              {/* Refined "Pedestal" Divider at bottom of Hero */}
              <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[300px] z-0 pointer-events-none">
                <svg viewBox="0 0 1000 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                  <path d="M0 100 C200 100 300 0 500 0 C700 0 800 100 1000 100 L1000 300 L0 300 Z" fill="#ffffff"/>
                  {/* Decorative line on divider */}
                  <path d="M100 110 C300 110 400 20 500 20 C600 20 700 110 900 110" stroke="#fef3c7" strokeWidth="2" opacity="0.3"/>
                </svg>
              </div>

              {/* Central Sun/Star Bottom Decor */}
              <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 text-4xl opacity-60">☀️</div>
            </motion.div>

            <div className="w-20 h-1 bg-orange-300 mx-auto rounded-full mb-8 mt-40 opacity-40 z-10 relative" />

            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed z-10 relative text-amber-900/40 font-medium">
              Create beautiful, personalized Eid greeting cards and share them with
              your loved ones. Celebrate this blessed occasion with heartfelt messages.
            </p>
          </>
        )}

        {/* ── CTA Buttons ── */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10"
        >
          <button
            onClick={() => navigate('/create')}
            className="px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center gap-2 text-white glass-pulse"
            style={{ background: 'var(--primary-festive)' }}
          >
            <Sparkles size={18} /> Create Wish
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
              className={`rounded-3xl border p-6 text-center hover:shadow-xl transition-shadow duration-300 shine-spiritual ${
                !isDark ? 'border-orange-100 bg-orange-50/50' : 'border-white/10'
              }`}
              style={{ background: isDark ? 'var(--card-bg)' : undefined, backdropFilter: 'blur(12px)' }}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 glass-pulse ${
                !isDark ? 'bg-orange-100/50' : 'bg-accent'
              }`}>
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
            <span className="flex items-center gap-1">🌙 <span className="font-medium" style={{ color: isDark ? 'var(--primary-festive)' : '#fb923c' }}>Blessed Eid</span></span>
            <span className="flex items-center gap-1">⭐ <span className="font-medium" style={{ color: isDark ? 'var(--primary-festive)' : '#fcd34d' }}>Peace & Joy</span></span>
            <span className="flex items-center gap-1">🤲 <span className="font-medium" style={{ color: isDark ? 'var(--primary-festive)' : '#fb923c' }}>Divine Blessings</span></span>
          </div>
        </motion.div>

        <Footer />
      </main>
    </div>
  );
};

export default Index;
