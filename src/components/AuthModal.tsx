import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { X } from 'lucide-react';
import { toast } from 'sonner';

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (!error) {
      toast.success('Check your email for the login link!');
      onClose();
    } else {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card w-full max-w-md p-6 rounded-2xl border border-border/50 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
          <X size={20} />
        </button>

        <h2 className="text-2xl font-display font-bold mb-4 text-foreground">Welcome Back</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Sign in to save and sync your beautiful Eid greetings securely.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block text-foreground">Email address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-border bg-background focus:ring-2 focus:ring-[var(--primary-festive)]/30 outline-none transition text-foreground"
              placeholder="you@example.com"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white rounded-xl font-medium transition hover:shadow-lg disabled:opacity-50"
            style={{ background: 'var(--primary-festive)' }}
          >
            {loading ? 'Sending link...' : 'Send Magic Link'}
          </button>
        </form>
      </div>
    </div>
  );
}
