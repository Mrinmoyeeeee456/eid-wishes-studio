import { motion } from 'framer-motion';
import { Moon, Sun, Stars } from 'lucide-react';

interface AppBarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const AppBar = ({ isDark, toggleTheme }: AppBarProps) => {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-border/50 px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-2"
        >
          <Stars className="text-festive" />
          <h1 className="text-xl font-bold tracking-tight font-display">
            Eid<span className="text-festive">Mubarak</span>
          </h1>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="p-2 rounded-full glass-card shadow-lg"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun size={20} className="text-festive" />
          ) : (
            <Moon size={20} className="text-muted-foreground" />
          )}
        </motion.button>
      </div>
    </nav>
  );
};

export default AppBar;
