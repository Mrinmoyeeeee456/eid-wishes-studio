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
      title: '💬 Text & Message',
      desc: 'Write heartfelt, personalised messages. Use our AI generator for multilingual greetings or type your own.',
      path: '/create',
    },
    {
      icon: <Sparkles className="text-[var(--primary-festive)]" size={28} />,
      title: '🖼️ Frame & Theme',
      desc: 'Choose from 46+ stunning card themes — or upload your own photo. Each card is a work of art.',
      path: '/create',
    },
    {
      icon: <FolderOpen className="text-[var(--primary-festive)]" size={28} />,
      title: '💾 Save & Share',
      desc: 'Your greetings are saved instantly. Download as PNG/JPEG, print, or share across WhatsApp & Facebook.',
      path: '/greetings',
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
        <div className="gate-left w-1/2 h-full bg-[var(--background)] border-r-4 border-[var(--primary-festive)] flex items-center justify-end pr-4 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
          <Sparkles className="text-[var(--primary-festive)] opacity-50" size={48} />
        </div>
        <div className="gate-right w-1/2 h-full bg-[var(--background)] border-l-4 border-[var(--primary-festive)] flex items-center justify-start pl-4 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
          <Sparkles className="text-[var(--primary-festive)] opacity-50" size={48} />
        </div>
      </div>

      {/* ── Hero ── */}
      <main className="relative z-10 max-w-6xl mx-auto flex flex-col items-center justify-center pt-8 px-4 pb-8">

        {isDark ? (
          /* ── DARK MODE HERO ── */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center w-full relative py-12"
          >
            <HangingLanterns />
            <div className="relative mb-8 mt-8">
              <h2 className="text-7xl md:text-9xl font-display font-black glassy-text-glow tracking-widest leading-none mb-4">
                RAMADAN MUBARAK
              </h2>
              <div className="text-3xl md:text-5xl text-[var(--primary-festive)] filter drop-shadow-[0_0_20px_rgba(251,146,60,0.9)] mt-4 font-bold">
                مبارك عليكم الشهر
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] -z-10 opacity-15 pointer-events-none overflow-hidden">
              <div className="flex items-end justify-center h-full gap-3">
                <div className="w-16 h-36 bg-white rounded-t-full" />
                <div className="w-28 h-56 bg-white rounded-t-full" />
                <div className="w-36 h-72 bg-white rounded-t-full" />
                <div className="w-28 h-56 bg-white rounded-t-full" />
                <div className="w-16 h-36 bg-white rounded-t-full" />
              </div>
            </div>
          </motion.div>
        ) : (
          /* ── LIGHT MODE HERO ── */
          <>
            <PeachDecorations />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full z-10"
            >
              <div
                className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl max-w-2xl"
                style={{
                  background: 'linear-gradient(160deg, #f9f0ee 0%, #fdf4ff 60%, #f0f9ff 100%)',
                  border: '1.5px solid #fde2c8',
                }}
              >
                {/* Top ketupat + hanging chains */}
                <div className="flex justify-between items-start px-4 pt-4 relative">
                  <motion.div
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative"
                  >
                    <svg width="90" height="110" viewBox="0 0 90 110" fill="none">
                      <path d="M45 5 L85 45 L45 85 L5 45 Z" fill="#fb923c" stroke="#fed7aa" strokeWidth="2"/>
                      <path d="M25 25 L65 65 M25 65 L65 25" stroke="#fef3c7" strokeWidth="1.5" opacity="0.6"/>
                      <path d="M45 85 C35 95 25 100 15 108" stroke="#f472b6" strokeWidth="4" strokeLinecap="round"/>
                      <path d="M45 85 C55 95 65 100 75 108" stroke="#f472b6" strokeWidth="4" strokeLinecap="round"/>
                      <path d="M38 92 L28 110 M52 92 L62 110" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
                    </svg>
                  </motion.div>

                  <div className="flex gap-8 items-start pt-2">
                    {['🌙','⭐','🌙','⭐','🌙'].map((icon, i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                        className="flex flex-col items-center"
                      >
                        <div className="w-[1px] bg-stone-300/60" style={{ height: `${40 + i * 10}px` }} />
                        <span className="text-sm opacity-70">{icon}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    animate={{ rotate: [5, -5, 5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  >
                    <svg width="90" height="110" viewBox="0 0 90 110" fill="none">
                      <path d="M45 5 L85 45 L45 85 L5 45 Z" fill="#2dd4bf" stroke="#99f6e4" strokeWidth="2"/>
                      <path d="M25 25 L65 65 M25 65 L65 25" stroke="#ccfbf1" strokeWidth="1.5" opacity="0.6"/>
                      <path d="M45 85 C35 95 25 100 15 108" stroke="#f472b6" strokeWidth="4" strokeLinecap="round"/>
                      <path d="M45 85 C55 95 65 100 75 108" stroke="#f472b6" strokeWidth="4" strokeLinecap="round"/>
                      <path d="M38 92 L28 110 M52 92 L62 110" stroke="#fb923c" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
                    </svg>
                  </motion.div>
                </div>

                {/* Central: Moon + Mosque + Hourglass */}
                <div className="flex items-center justify-center gap-6 px-8 py-4 relative">
                  <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                    <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
                      <path d="M50 10 C20 10 5 35 10 65 C15 90 35 110 60 105 C35 100 15 80 20 55 C25 30 45 18 65 25 C60 15 55 10 50 10 Z" fill="#fef9c3" stroke="#fde047" strokeWidth="1.5"/>
                      <circle cx="38" cy="50" r="4" fill="#78350f"/>
                      <path d="M32 65 Q40 72 48 65" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    </svg>
                  </motion.div>

                  <div className="relative">
                    <svg width="160" height="180" viewBox="0 0 160 180" fill="none">
                      <ellipse cx="80" cy="70" rx="45" ry="50" fill="#2dd4bf" stroke="#5eead4" strokeWidth="2"/>
                      <path d="M50 70 Q80 30 110 70" stroke="#99f6e4" strokeWidth="2" opacity="0.4"/>
                      <path d="M55 80 Q80 50 105 80" stroke="#99f6e4" strokeWidth="1.5" opacity="0.3"/>
                      <path d="M80 22 C75 15 68 18 72 25 C68 20 80 16 80 22Z" fill="#fde047" stroke="#facc15" strokeWidth="1"/>
                      <rect x="20" y="60" width="25" height="80" rx="4" fill="#fb923c" stroke="#fed7aa" strokeWidth="1.5"/>
                      <rect x="115" y="60" width="25" height="80" rx="4" fill="#fb923c" stroke="#fed7aa" strokeWidth="1.5"/>
                      <ellipse cx="32" cy="58" rx="13" ry="8" fill="#2dd4bf"/>
                      <ellipse cx="128" cy="58" rx="13" ry="8" fill="#2dd4bf"/>
                      <path d="M60 140 Q80 120 100 140 L100 175 L60 175 Z" fill="#fef3c7" stroke="#fed7aa" strokeWidth="1.5"/>
                      <rect x="15" y="140" width="130" height="35" rx="4" fill="#fb923c" stroke="#fed7aa" strokeWidth="1.5"/>
                      <path d="M15 145 Q40 155 80 145 Q120 135 145 145" stroke="#2dd4bf" strokeWidth="2" opacity="0.5" fill="none"/>
                    </svg>
                    <div className="absolute inset-0 bg-orange-200/20 blur-3xl -z-10 rounded-full" />
                    <motion.div
                      animate={{ y: [0, -12, 0], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="absolute -top-6 -right-2 text-xl"
                    >💖</motion.div>
                  </div>

                  <motion.div animate={{ rotate: [0, 3, 0, -3, 0] }} transition={{ duration: 5, repeat: Infinity }}>
                    <svg width="80" height="120" viewBox="0 0 80 120" fill="none">
                      <rect x="10" y="5" width="60" height="10" rx="5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5"/>
                      <rect x="10" y="105" width="60" height="10" rx="5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5"/>
                      <path d="M15 15 L40 60 L65 15 Z" fill="#fde68a" stroke="#fbbf24" strokeWidth="1.5" opacity="0.8"/>
                      <path d="M15 105 L40 60 L65 105 Z" fill="#fde68a" stroke="#fbbf24" strokeWidth="1.5" opacity="0.4"/>
                      <text x="30" y="90" fontSize="16" opacity="0.5">🌙</text>
                    </svg>
                  </motion.div>
                </div>

                <div className="relative px-6 flex justify-between items-center">
                  <div className="flex gap-2 text-sm opacity-50">
                    {['💕','⭐','💜'].map((s, i) => (
                      <motion.span key={i} animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}>{s}</motion.span>
                    ))}
                  </div>
                  <div className="flex gap-2 text-sm opacity-50">
                    {['💛','💜','💕'].map((s, i) => (
                      <motion.span key={i} animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}>{s}</motion.span>
                    ))}
                  </div>
                </div>

                <div className="text-center px-8 pb-4 pt-2">
                  <h2 className="font-black tracking-tight drop-shadow text-stone-800 leading-tight"
                    style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontFamily: 'Georgia, serif' }}>
                    EID MUBARAK
                  </h2>
                  <p className="text-stone-500 text-lg tracking-widest mt-1 italic">Wish you a blessed Eid</p>

                  <div className="flex items-center justify-center gap-3 mt-3 opacity-50 text-xs text-stone-400">
                    <span>· · · ·</span>
                    <span>🌙</span>
                    <span>☀</span>
                    <span>🌙</span>
                    <span>· · · ·</span>
                  </div>
                </div>

                <div className="relative mt-2">
                  <svg viewBox="0 0 400 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M0 0 C100 0 150 60 200 60 C250 60 300 0 400 0 L400 60 L0 60 Z" fill="white"/>
                  </svg>
                  <div className="absolute bottom-0 left-4 flex gap-1">
                    {[60, 80, 55, 70].map((h, i) => (
                      <div key={i} className="w-2 rounded-b-full opacity-40" style={{ height: `${h}px`, background: '#a855f7' }} />
                    ))}
                  </div>
                  <div className="absolute bottom-0 right-4 flex gap-1">
                    {[70, 55, 80, 60].map((h, i) => (
                      <div key={i} className="w-2 rounded-b-full opacity-40" style={{ height: `${h}px`, background: '#a855f7' }} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="w-20 h-1 bg-orange-300 mx-auto rounded-full my-10 opacity-40 z-10 relative" />
          </>
        )}

        {/* ══ Feature Cards (DISPLAY ONLY — no navigation) ══ */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mt-8 w-full z-10 relative"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              onClick={() => navigate(f.path)}
              whileHover={{ scale: 1.03, y: -4 }}
              className={`cursor-pointer rounded-3xl border p-6 text-left transition-all duration-300 ${
                !isDark ? 'border-orange-100 bg-orange-50/60' : 'border-white/10'
              }`}
              style={{ background: isDark ? 'var(--card-bg)' : undefined }}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                !isDark ? 'bg-orange-100/70' : 'bg-accent'
              }`}>
                {f.icon}
              </div>
              <h3 className="font-display font-bold text-foreground mb-2 text-lg">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ══ CTA Buttons (BELOW feature cards) ══ */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-5 mt-10 w-full justify-center z-10 relative"
        >
          <motion.button
            onClick={() => navigate('/create')}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="w-full sm:w-auto px-12 py-5 rounded-2xl font-black text-lg shadow-2xl transition-all duration-200 flex items-center justify-center gap-3 text-white"
            style={{ background: 'linear-gradient(135deg, var(--primary-festive), #e879f9)', boxShadow: '0 8px 32px rgba(251,146,60,0.4)' }}
          >
            <Sparkles size={22} /> ✏️ Create a Wish
          </motion.button>
          <motion.button
            onClick={() => navigate('/greetings')}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="w-full sm:w-auto px-12 py-5 rounded-2xl font-black text-lg border-2 transition-all duration-200 flex items-center justify-center gap-3"
            style={{
              borderColor: 'var(--primary-festive)',
              color: 'var(--primary-festive)',
              background: 'rgba(251,146,60,0.08)',
              boxShadow: '0 4px 20px rgba(251,146,60,0.15)',
            }}
          >
            💌 My Saved Cards
          </motion.button>
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
