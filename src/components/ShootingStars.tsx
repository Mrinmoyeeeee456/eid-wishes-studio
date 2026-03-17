import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ShootingStarsProps {
  isDark: boolean;
}

const ShootingStars = ({ isDark }: ShootingStarsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDark || !containerRef.current) return;

    const container = containerRef.current;

    const createStar = () => {
      if (!container) return;
      const star = document.createElement('div');
      star.className = 'absolute w-[2px] h-[2px] bg-foreground rounded-full opacity-0';
      star.style.backgroundColor = 'hsl(43, 96%, 80%)';
      container.appendChild(star);

      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * (window.innerHeight / 2);

      gsap.set(star, { x: startX, y: startY });

      gsap.to(star, {
        opacity: 1,
        x: startX + (Math.random() - 0.5) * 200,
        y: window.innerHeight + 100,
        duration: Math.random() * 2 + 1,
        ease: 'power2.in',
        onComplete: () => star.remove(),
      });
    };

    const interval = setInterval(createStar, 1800);
    return () => {
      clearInterval(interval);
      while (container.firstChild) container.removeChild(container.firstChild);
    };
  }, [isDark]);

  if (!isDark) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    />
  );
};

export default ShootingStars;
