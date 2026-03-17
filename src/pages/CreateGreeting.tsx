import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { toPng, toJpeg } from 'html-to-image';
import EidCard from '@/components/EidCard';
import Footer from '@/components/Footer';
import { SavedGreeting, loadGreetings, saveGreetings, defaultMessage } from '@/lib/greetings';

const tabs = [
  { id: 'content', label: '💬 Content' },
  { id: 'ai', label: '✨ AI' },
  { id: 'style', label: '🏛 Style' },
  { id: 'colors', label: '🎨 Colors' },
  { id: 'templates', label: '⭐ Templates' },
];

const cardSizes = ['Small (300px)', 'Medium (400px)', 'Large (500px)'];

const CreateGreeting = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState(defaultMessage);
  const [cardSize, setCardSize] = useState('Medium (400px)');
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const sizeKey = cardSize.includes('Small') ? 'small' : cardSize.includes('Large') ? 'large' : 'medium';

  const handleSave = useCallback(() => {
    const greeting: SavedGreeting = {
      id: crypto.randomUUID(),
      recipientName,
      senderName,
      message,
      template: 'classic',
      cardSize: sizeKey,
      createdAt: Date.now(),
    };
    const all = loadGreetings();
    saveGreetings([greeting, ...all]);
    toast.success('Greeting saved! 🌙');
  }, [recipientName, senderName, message, sizeKey]);

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
                    <label className="text-sm font-medium text-primary mb-1.5 block">Your Name (Sender)</label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary mb-1.5 block">Recipient Name</label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Enter recipient's name"
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-primary mb-1.5 block">Greeting Message</label>
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

            {activeTab === 'ai' && (
              <div className="rounded-2xl border border-border bg-card p-6 text-center py-16">
                <p className="text-muted-foreground">✨ AI message generation coming soon...</p>
              </div>
            )}
            {activeTab === 'style' && (
              <div className="rounded-2xl border border-border bg-card p-6 text-center py-16">
                <p className="text-muted-foreground">🏛 Style options coming soon...</p>
              </div>
            )}
            {activeTab === 'colors' && (
              <div className="rounded-2xl border border-border bg-card p-6 text-center py-16">
                <p className="text-muted-foreground">🎨 Color customization coming soon...</p>
              </div>
            )}
            {activeTab === 'templates' && (
              <div className="rounded-2xl border border-border bg-card p-6 text-center py-16">
                <p className="text-muted-foreground">⭐ Template gallery coming soon...</p>
              </div>
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
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary">🐪</span>
              <h3 className="font-display font-bold text-lg text-foreground">Live Preview</h3>
            </div>
            <EidCard
              ref={cardRef}
              recipientName={recipientName}
              senderName={senderName}
              message={message}
              size={sizeKey}
            />
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default CreateGreeting;
