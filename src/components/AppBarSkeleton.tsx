import { motion } from 'framer-motion';

const AppBarSkeleton = () => {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-border/50 px-4 py-3 md:px-8 bg-background/50">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-[44px]">
        {/* Logo Skeleton */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-32 h-8 bg-muted rounded-md"
        />

        {/* Links & Button Skeleton */}
        <div className="flex items-center gap-6">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            className="w-24 h-5 bg-muted rounded-md hidden md:block"
          />
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            className="w-16 h-8 bg-muted rounded-md hidden md:block"
          />
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            className="w-10 h-10 bg-muted rounded-full"
          />
        </div>
      </div>
    </nav>
  );
};

export default AppBarSkeleton;
