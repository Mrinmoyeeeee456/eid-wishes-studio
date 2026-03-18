import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Stars, BookHeart, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/animations/scale.css';

import { useThemeStore } from '../store/themeStore';
import { supabase } from '@/lib/supabase';
import AppBarSkeleton from './AppBarSkeleton';
import AuthModal from './AuthModal';

const AppBar = () => {
  const { isDark, isLoading, toggleTheme } = useThemeStore();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return <AppBarSkeleton />;
  }

  return (
    <nav className="sticky top-0 z-50 w-full glass-card border-b border-border/50 px-4 py-3 md:px-8 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10">
        
        {/* Logo / Brand */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-2"
        >
          <Link autoFocus={false} to="/" className="flex items-center gap-2 group outline-none">
            <Stars className="text-festive group-hover:rotate-12 transition-transform duration-300" />
            <h1 className="text-xl md:text-2xl font-bold tracking-tight font-display text-foreground">
              Eid<span className="text-festive">Mubarak</span>
            </h1>
          </Link>
        </motion.div>

        {/* Navigation & Actions */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4 md:gap-6"
        >
          {/* Protected Route Links */}
          <Tippy content="Browse your saved cards 💌" animation="scale" theme={isDark ? 'light' : 'dark'}>
            <Link to="/greetings" className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-festive transition-all duration-300">
              <BookHeart size={18} />
              My Saved Cards
            </Link>
          </Tippy>
          
          <Tippy content={user ? "Sign Out" : "Login to sync your wishes 🌙"} animation="scale" theme={isDark ? 'light' : 'dark'}>
            <button 
              onClick={() => user ? supabase.auth.signOut() : setIsAuthOpen(true)}
              className="hidden md:flex items-center gap-2 text-sm font-medium border border-border/60 glass-button px-4 py-1.5 rounded-full hover:glow-spiritual hover:border-festive/50 transition-all duration-300">
              <UserRound size={16} />
              {user ? "Sign Out" : "Login"}
            </button>
          </Tippy>

          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            <div className="hidden sm:flex items-center gap-1 text-[var(--primary-festive)] opacity-60">
              <Stars size={14} className="animate-pulse" />
              <span className="text-[10px] uppercase tracking-tighter font-bold">Divine</span>
            </div>
            
            <Tippy content={isDark ? "Sunrise View ☀️" : "Moonlit Night 🌙"} animation="scale">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-card border border-border/50 hover:bg-accent transition-colors flex items-center justify-center glass-pulse"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun size={18} className="text-amber-400" />
                ) : (
                  <Moon size={18} className="text-slate-700" />
                )}
              </button>
            </Tippy>

            {user ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => supabase.auth.signOut()}
                  className="flex items-center gap-2 h-10 px-4 rounded-xl text-sm font-medium bg-secondary/50 hover:bg-secondary transition border border-border/50 glass-pulse"
                >
                  <UserRound size={16} />
                  <span className="hidden md:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-2 h-10 px-4 rounded-xl text-sm font-medium text-white shadow-lg transition-all hover:scale-105 active:scale-95 glass-pulse"
                style={{ background: 'var(--primary-festive)' }}
              >
                <UserRound size={16} />
                <span>Login</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </nav>
  );
};

export default AppBar;
