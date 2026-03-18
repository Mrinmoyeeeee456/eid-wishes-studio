import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Eye, Printer, Download, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { toPng, toJpeg } from 'html-to-image';
import { useReactToPrint } from 'react-to-print';
import Tippy from '@tippyjs/react';
import EidCard from '@/components/EidCard';
import Footer from '@/components/Footer';
import { SavedGreeting, loadGreetings, saveGreetings, getDefaultMessage } from '@/lib/greetings';
import { frameOptions, CharacterTheme } from '@/lib/frames';

const tabs = [
  { id: 'content', label: '💬 Text & Message' },
  { id: 'frames', label: '🖼️ Frame Theme' },
];

const cardSizes = ['Small (300px)', 'Medium (400px)', 'Large (500px)'];

const CreateGreeting = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState(getDefaultMessage('fitar'));
  const [eidType, setEidType] = useState<'fitar' | 'azha'>('fitar');
  const [cardSize, setCardSize] = useState('Medium (400px)');
  const [frameTheme, setFrameTheme] = useState<CharacterTheme>('traditional_mosque');
  
  const cardComponentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (message === getDefaultMessage('fitar') || message === getDefaultMessage('azha')) {
      setMessage(getDefaultMessage(eidType));
    }
  }, [eidType, message]);

  const generateAIGreeting = useCallback(() => {
    const isFitar = eidType === 'fitar';
    const aiMessages = isFitar ? [
      "May the divine blessings of Allah bring you hope, faith, and joy on Eid-ul-Fitr and forever.",
      "Wishing you a joyous and blessed Eid-ul-Fitr filled with prosperity, happiness, and peace.",
      "May this beautiful occasion of Eid give you all the reasons to make your life even more beautiful. Eid Mubarak!",
      "Sending you my warmest wishes on Eid. May Allah accept your fasting and forgive your transgressions.",
      "May the magic of this Eid bring lots of happiness in your life. Ramadan Mubarak and Eid-ul-Fitr Mubarak to you and your family!",
      "تقبل الله منا ومنكم صالح الأعمال. عيد فطر مبارك! (May Allah accept from us and from you. Eid-ul-Fitr Mubarak!)",
      "আমাদের পক্ষ থেকে আপনাকে ও আপনার পরিবারের সবাইকে পবিত্র ঈদুল ফিতরের আন্তরিক শুভেচ্ছা ও ঈদ মোবারক!",
      "রমজান শেষে আসলো খুশির ঈদ, খুশিতে ভরে উঠুক আপনার প্রতিটি মুহূর্ত। ঈদ মোবারক!"
    ] : [
      "May the divine blessings of Allah bring you hope, faith, and joy on Eid-ul-Adha and forever.",
      "Wishing you a joyous and blessed Eid-ul-Adha filled with prosperity, happiness, and peace.",
      "May this beautiful occasion of Eid give you all the reasons to make your life even more beautiful. Eid Mubarak!",
      "Sending you my warmest wishes on Eid. May Allah accept your sacrifices and forgive your transgressions.",
      "May the magic of this Eid bring lots of happiness in your life. Eid-ul-Adha Mubarak to you and your family!",
      "تقبل الله منا ومنكم صالح الأعمال. عيد أضحى مبارك! (May Allah accept from us and from you. Eid-ul-Adha Mubarak!)",
      "আমাদের পক্ষ থেকে আপনাকে ও আপনার পরিবারের সবাইকে পবিত্র ঈদুল আযহার আন্তরিক শুভেচ্ছা ও ঈদ মোবারক!",
      "ত্যাগের মহিমায় ভাস্বর পবিত্র ঈদুল আযহা. ঈদ মোবারক!"
    ];
    const greetingMsg = aiMessages[Math.floor(Math.random() * aiMessages.length)];
    const personalized = recipientName ? `Dearest ${recipientName}, ${greetingMsg}` : greetingMsg;
    setMessage(personalized);
    toast.success('AI drafted a new message! ✨');
  }, [recipientName, eidType]);

  const sizeKey = cardSize.includes('Small') ? 'small' : cardSize.includes('Large') ? 'large' : 'medium';

  const handleSave = useCallback(async () => {
    const greeting: SavedGreeting = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36),
      recipientName,
      senderName,
      message,
      template: 'classic',
      frameId: frameTheme,
      cardSize: sizeKey,
      eidType,
      createdAt: Date.now(),
    };
    const all = await loadGreetings();
    await saveGreetings([greeting, ...all]);
    toast.success('Greeting saved! 🌙');
  }, [recipientName, senderName, message, sizeKey, frameTheme, eidType]);

  // Export functions
  const exportImage = useCallback(
    async (format: 'png' | 'jpeg') => {
      if (!cardComponentRef.current) return;
      try {
        const fn = format === 'png' ? toPng : toJpeg;
        const dataUrl = await fn(cardComponentRef.current, { quality: 0.95, pixelRatio: 2 });
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

  const handlePrint = useReactToPrint({
    contentRef: cardComponentRef,
    documentTitle: 'Eid Mubarak Wish',
    onAfterPrint: () => toast.success('Sent to printer!'),
  });

  return (
    <div className="min-h-screen">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: Form */}
          <div>
            {/* Tabs */}
            <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                    activeTab === t.id
                      ? 'bg-card border border-border shadow-sm text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Content Tab */}
            {activeTab === 'content' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl border border-border bg-card p-6 space-y-5"
              >
                <h3 className="font-display font-bold text-xl text-foreground">Greeting Content</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">Your Name (Sender)</label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Enter your name"
                      className="sparkle-input w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">Recipient Name</label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Enter recipient's name"
                      className="sparkle-input w-full px-4 py-4 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <label className="text-sm font-medium text-primary mb-2 block">Occasion</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer font-medium hover:text-[var(--primary-festive)] transition">
                      <input 
                        type="radio" 
                        name="eidType" 
                        value="fitar" 
                        checked={eidType === 'fitar'} 
                        onChange={() => setEidType('fitar')}
                        className="accent-[var(--primary-festive)] w-4 h-4"
                      />
                      <span>Eid-ul-Fitr</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-medium hover:text-[var(--primary-festive)] transition">
                      <input 
                        type="radio" 
                        name="eidType" 
                        value="azha" 
                        checked={eidType === 'azha'} 
                        onChange={() => setEidType('azha')}
                        className="accent-[var(--primary-festive)] w-4 h-4"
                      />
                      <span>Eid-ul-Adha</span>
                    </label>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-sm font-medium text-primary block">Greeting Message</label>
                    <button onClick={generateAIGreeting} className="text-xs flex items-center gap-1 text-[var(--primary-festive)] hover:text-primary transition font-medium bg-accent px-2 py-1 rounded-md glass-pulse">
                      <Sparkles size={12} /> AI Wizard
                    </button>
                  </div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition resize-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-primary mb-1.5 block">Card Size</label>
                  <select
                    value={cardSize}
                    onChange={(e) => setCardSize(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground outline-none"
                  >
                    {cardSizes.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}

            {/* Frames Tab */}
            {activeTab === 'frames' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-center gap-2 mb-6">
                   <Sparkles className="text-primary-festive" size={24} />
                   <h3 className="font-display font-bold text-xl text-foreground">Select a Nostalgic Frame</h3>
                </div>

                <div className="space-y-8">
                  {/* Categories Map */}
                  {['Traditional', 'Princesses', 'Cartoons'].map((categoryName) => (
                    <div key={categoryName}>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 border-b border-border/40 pb-1">
                        {categoryName}
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {frameOptions
                          .filter(f => f.category === categoryName)
                          .map(frame => (
                            <button
                              key={frame.id}
                              onClick={() => setFrameTheme(frame.id)}
                              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 relative overflow-hidden ${
                                frameTheme === frame.id
                                  ? 'border-[var(--primary-festive)] bg-[var(--primary-festive)]/10 glow-gold shine-spiritual'
                                  : 'border-border/50 hover:border-[var(--primary-festive)]/50 hover:bg-accent/50 filter grayscale hover:grayscale-0'
                              }`}
                            >
                              <span className="text-3xl drop-shadow-md group-hover:scale-110 transition-transform">{frame.icon}</span>
                              <span className={`text-[10px] font-bold uppercase tracking-tight ${frameTheme === frame.id ? 'text-[var(--primary-festive)]' : 'text-foreground'}`}>
                                {frame.label}
                              </span>
                              {frameTheme === frame.id && (
                                <div className="absolute top-1 right-1">
                                  <Sparkles size={8} className="text-[var(--primary-festive)] animate-pulse" />
                                </div>
                              )}
                            </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition glass-pulse"
                >
                  <Save size={16} /> Save Greeting
                </button>
                <button
                  onClick={() => navigate('/greetings')}
                  className="px-6 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-accent transition flex items-center gap-2"
                >
                  <Eye size={16} /> View All Greetings
                </button>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => exportImage('png')}
                  className="flex-1 py-2.5 border border-primary text-primary rounded-xl text-sm font-medium hover:bg-accent transition flex items-center justify-center gap-2"
                >
                  ⬇ Export PNG
                </button>
                <button
                  onClick={() => exportImage('jpeg')}
                  className="flex-1 py-2.5 border border-primary text-primary rounded-xl text-sm font-medium hover:bg-accent transition flex items-center justify-center gap-2"
                >
                  ⬇ Export JPEG
                </button>
              </div>
            </div>
          </div>

          {/* Right: Live Preview */}
          <div className="sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary-festive text-xl">🐪</span>
              <h3 className="font-display font-bold text-lg text-foreground">Live Preview Setup</h3>
            </div>
            
            <div className="rounded-2xl bg-black/5 dark:bg-white/5 p-4 border border-border/50 backdrop-blur-sm shadow-inner relative overflow-hidden">
                <div className="card-sharp">
                    <EidCard
                      ref={cardComponentRef}
                      recipientName={recipientName}
                      senderName={senderName}
                      message={message}
                      size={sizeKey}
                      frameId={frameTheme}
                      eidType={eidType}
                    />
                </div>
            </div>
          </div>
        </div>

        {/* Global Floating Action Button (FAB) for Export/Print */}
        <Tippy
          content={<span className="font-medium px-1">Generate your Wish! ✨</span>}
          placement="left"
          animation="scale"
          arrow={true}
        >
          <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3 group">
            {/* Quick Actions (Hover to reveal vertically) */}
            <div className="absolute bottom-full right-0 mb-4 flex flex-col gap-3 opacity-0 translate-y-4 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
              <button
                onClick={handleSave}
                className="w-12 h-12 bg-card border border-border text-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-accent transition hover:scale-110"
                aria-label="Save Pattern"
              >
                <Save size={20} />
              </button>
              <button
                 onClick={() => exportImage('png')}
                 className="w-12 h-12 bg-card border border-border text-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-accent transition hover:scale-110"
                 aria-label="Download Image"
              >
                 <Download size={20} />
              </button>
            </div>

            {/* Main FAB Trigger (Print directly) */}
            <button
              onClick={() => handlePrint()}
              className="w-16 h-16 bg-primary-festive text-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_var(--primary-glow)] flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
              aria-label="Print Card"
            >
              <Printer size={28} />
            </button>
          </div>
        </Tippy>

        <Footer />
      </main>
    </div>
  );
};

export default CreateGreeting;
