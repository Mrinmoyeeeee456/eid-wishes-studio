import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, Eye, Sparkles, ImagePlus } from 'lucide-react';
import { toast } from 'sonner';
import { toPng, toJpeg } from 'html-to-image';
import { useReactToPrint } from 'react-to-print';
import Tippy from '@tippyjs/react';
import EidCard from '@/components/EidCard';
import Footer from '@/components/Footer';
import { SavedGreeting, loadGreetings, saveGreetings, getDefaultMessage } from '@/lib/greetings';
import { frameOptions, CharacterTheme } from '@/lib/frames';
import { Printer, Download } from 'lucide-react';

const tabs = [
  { id: 'content', label: '💬 Text & Message' },
  { id: 'frames', label: '🖼️ Frame Theme' },
];

const cardSizes = ['Small (300px)', 'Medium (400px)', 'Large (500px)'];

// All categories in display order
const allCategories = ['Premium', 'Eid Festive', 'Traditional', 'Elegant', 'Pastel', 'Bold', 'Princesses', 'Cartoons'] as const;

const CreateGreeting = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState(getDefaultMessage('fitar'));
  const [eidType, setEidType] = useState<'fitar' | 'azha'>('fitar');
  const [cardSize, setCardSize] = useState('Medium (400px)');
  const [frameTheme, setFrameTheme] = useState<CharacterTheme>('traditional_mosque');
  const [customBgImage, setCustomBgImage] = useState<string | null>(null);
  
  const cardComponentRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleCustomPhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomBgImage(reader.result as string);
        toast.success('Custom photo applied! 📷');
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const clearCustomPhoto = useCallback(() => {
    if (customBgImage) {
      URL.revokeObjectURL(customBgImage);
    }
    setCustomBgImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    toast('Custom photo removed');
  }, [customBgImage]);

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
      customBg: customBgImage || undefined,
      createdAt: Date.now(),
    };
    const all = await loadGreetings();
    await saveGreetings([greeting, ...all]);
    toast.success('Greeting saved! 🌙');
  }, [recipientName, senderName, message, sizeKey, frameTheme, eidType]);

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
                      className="sparkle-input w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground outline-none transition-all duration-300"
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
                    <label className="text-sm font-medium text-primary block">
                      ✍️ Type your message or use AI Wizard
                    </label>
                    <button onClick={generateAIGreeting} className="text-xs flex items-center gap-1 text-[var(--primary-festive)] hover:text-primary transition font-medium bg-accent px-3 py-1.5 rounded-md">
                      <Sparkles size={12} /> AI Generate
                    </button>
                  </div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Write your heartfelt Eid message here... or click AI Generate for inspiration ✨"
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
                   <h3 className="font-display font-bold text-xl text-foreground">Select a Card Theme</h3>
                </div>

                {/* Custom Photo Upload Section */}
                <div className="mb-6 p-4 rounded-xl border-2 border-dashed border-border bg-accent/30">
                  <div className="flex items-center gap-3 mb-3">
                    <ImagePlus size={20} className="text-[var(--primary-festive)]" />
                    <span className="font-semibold text-sm text-foreground">Upload Your Own Photo</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">Use your own image as the card background</p>
                  <div className="flex gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleCustomPhotoUpload}
                      className="hidden"
                      id="custom-photo-input"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-[var(--primary-festive)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition flex items-center gap-2"
                    >
                      <ImagePlus size={14} /> Choose Photo
                    </button>
                    {customBgImage && (
                      <button
                        onClick={clearCustomPhoto}
                        className="px-4 py-2 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-accent transition"
                      >
                        ✕ Remove
                      </button>
                    )}
                  </div>
                  {customBgImage && (
                    <div className="mt-3 rounded-lg overflow-hidden border border-border w-20 h-20">
                      <img src={customBgImage} alt="Custom" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="space-y-8">
                  {allCategories.map((categoryName) => {
                    const categoryFrames = frameOptions.filter(f => f.category === categoryName);
                    if (categoryFrames.length === 0) return null;
                    return (
                      <div key={categoryName}>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 border-b border-border/40 pb-1">
                          {categoryName} ({categoryFrames.length})
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {categoryFrames.map(frame => (
                            <button
                              key={frame.id}
                              onClick={() => { setFrameTheme(frame.id); setCustomBgImage(null); }}
                              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-300 relative overflow-hidden ${
                                frameTheme === frame.id && !customBgImage
                                  ? 'border-[var(--primary-festive)] bg-[var(--primary-festive)]/10 glow-gold'
                                  : 'border-border/50 hover:border-[var(--primary-festive)]/50 hover:bg-accent/50'
                              }`}
                            >
                              <span className="text-2xl drop-shadow-md">{frame.icon}</span>
                              <span className={`text-[10px] font-bold uppercase tracking-tight ${frameTheme === frame.id && !customBgImage ? 'text-[var(--primary-festive)]' : 'text-foreground'}`}>
                                {frame.label}
                              </span>
                              {frameTheme === frame.id && !customBgImage && (
                                <div className="absolute top-1 right-1">
                                  <Sparkles size={8} className="text-[var(--primary-festive)] animate-pulse" />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
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
              <h3 className="font-display font-bold text-lg text-foreground">Live Preview</h3>
            </div>
            
            <div className="rounded-2xl bg-black/5 dark:bg-white/5 p-4 border border-border/50 shadow-inner relative overflow-hidden">
                <div className="card-sharp">
                    <EidCard
                      ref={cardComponentRef}
                      recipientName={recipientName}
                      senderName={senderName}
                      message={message}
                      size={sizeKey}
                      frameId={frameTheme}
                      eidType={eidType}
                      customBg={customBgImage || undefined}
                    />
                </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <Tippy
          content={<span className="font-medium px-1">Print your card! 🖨️</span>}
          placement="left"
          animation="scale"
          arrow={true}
        >
          <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3 group">
            <div className="absolute bottom-full right-0 mb-4 flex flex-col gap-3 opacity-0 translate-y-4 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
              <button
                onClick={handleSave}
                className="w-12 h-12 bg-card border border-border text-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-accent transition hover:scale-110"
                aria-label="Save"
              >
                <Save size={20} />
              </button>
              <button
                 onClick={() => exportImage('png')}
                 className="w-12 h-12 bg-card border border-border text-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-accent transition hover:scale-110"
                 aria-label="Download"
              >
                 <Download size={20} />
              </button>
            </div>

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
