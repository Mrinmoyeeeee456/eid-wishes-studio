import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { Moon, Sun, Stars, BookHeart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import { useThemeStore } from '../store/themeStore';
import { supabase } from '@/lib/supabase';
import AppBarSkeleton from './AppBarSkeleton';

const AppBar = () => {
  const { isDark, isLoading, toggleTheme } = useThemeStore();
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
          {/* My Saved Cards */}
          <Tippy content="Browse your saved cards 💌" animation="scale" theme={isDark ? 'light' : 'dark'}>
            <Link to="/greetings" className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-festive transition-all duration-300">
              <BookHeart size={18} />
              My Cards
            </Link>
          </Tippy>

          {/* If user is logged in, show sign out */}
          {user && (
            <button 
              onClick={() => supabase.auth.signOut()}
              className="hidden md:flex items-center gap-2 text-sm font-medium border border-border/60 glass-button px-4 py-1.5 rounded-full hover:glow-spiritual hover:border-festive/50 transition-all duration-300"
            >
              Sign Out
            </button>
          )}

          {/* Theme Toggle */}
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
        </motion.div>
      </div>
    </nav>
  );
};

export default AppBar;
