import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Stars, BookHeart, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/animations/scale.css';

import { useThemeStore } from '../store/themeStore';
import AppBarSkeleton from './AppBarSkeleton';

const AppBar = () => {
  const { isDark, isLoading, toggleTheme } = useThemeStore();

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
          
          <Tippy content="Login to sync your wishes 🌙" animation="scale" theme={isDark ? 'light' : 'dark'}>
            <button className="hidden md:flex items-center gap-2 text-sm font-medium border border-border/60 glass-button px-4 py-1.5 rounded-full hover:glow-spiritual hover:border-festive/50 transition-all duration-300">
              <UserRound size={16} />
              Login
            </button>
          </Tippy>

          {/* Theme Toggle with Tippy Tooltip */}
          <Tippy 
            content={isDark ? "Switch to Morning ☀️" : "Activate Night Sky 🌙"} 
            animation="scale" 
            theme={isDark ? 'light' : 'dark'}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2.5 rounded-full transition-all duration-300 relative overflow-hidden ${
                isDark
                  ? 'bg-secondary text-secondary-foreground glow-spiritual'
                  : 'bg-amber-100 text-amber-700 glow-gold'
              }`}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? 'dark' : 'light'}
                  initial={{ y: -20, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? (
                    <Moon size={20} className="text-festive" />
                  ) : (
                    <Sun size={20} className="text-orange-500" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </Tippy>
        </motion.div>
      </div>
    </nav>
  );
};

export default AppBar;
