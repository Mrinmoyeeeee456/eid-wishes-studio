import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useThemeStore } from '../store/themeStore';

const StarField = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeStore();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isDark || prefersReducedMotion) {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      if (containerRef.current) {
        gsap.to(containerRef.current.children, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            if (containerRef.current) containerRef.current.innerHTML = '';
          },
        });
      }
      return;
    }

    if (!containerRef.current) return;
    const container = containerRef.current;

    // ────────────────────────────────────────────
    // 1. TIM-TIM – continuously flickering sparkle dots
    // ────────────────────────────────────────────
    const NUM_SPARKLES = 80;
    const sparkles: HTMLDivElement[] = [];

    for (let i = 0; i < NUM_SPARKLES; i++) {
      const dot = document.createElement('div');
      const size = Math.random() * 3 + 1; // 1–4 px
      dot.className = 'absolute rounded-full pointer-events-none';
      dot.style.width  = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.top  = `${Math.random() * 100}%`;
      // Alternate between white and soft cyan for the "spiritual mint" look
      const isCyan = Math.random() > 0.5;
      dot.style.backgroundColor = isCyan
        ? 'rgba(100, 255, 218, 0.9)'
        : 'rgba(255, 255, 255, 0.9)';
      dot.style.boxShadow = isCyan
        ? '0 0 4px rgba(100,255,218,0.8)'
        : '0 0 4px rgba(255,255,255,0.8)';
      container.appendChild(dot);
      sparkles.push(dot);

      // Independent flicker loop for each dot
      gsap.to(dot, {
        opacity: Math.random() * 0.8 + 0.1,
        scale: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 2 + 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 3,
      });
    }

    // ────────────────────────────────────────────
    // 2. SHOOTING STARS – periodic streaks
    // ────────────────────────────────────────────
    const createShootingStar = () => {
      if (!isDark || !container) return;

      const star = document.createElement('div');
      star.className = 'absolute opacity-0 pointer-events-none';
      star.style.width  = '120px';
      star.style.height = '2px';
      star.style.background =
        'linear-gradient(90deg, transparent, rgba(255,255,255,0.25) 60%, rgba(255,255,255,1) 100%)';
      star.style.borderRadius = '2px';
      star.style.filter = 'drop-shadow(0 0 5px rgba(255,255,255,0.9))';
      star.style.transform = 'rotate(45deg)';
      container.appendChild(star);

      const spawnSide = Math.random() > 0.5 ? 'top' : 'left';
      const startX = spawnSide === 'top' ? Math.random() * window.innerWidth : -120;
      const startY = spawnSide === 'top' ? -120 : Math.random() * window.innerHeight;
      const dist = Math.max(window.innerWidth, window.innerHeight) * 1.5;

      gsap.set(star, { x: startX, y: startY });

      const tl = gsap.timeline({ onComplete: () => star.remove() });
      tl.to(star, { opacity: 1, duration: 0.15, ease: 'power2.in' })
        .to(star, { x: startX + dist, y: startY + dist, duration: Math.random() * 1.5 + 1.2, ease: 'none' }, '<')
        .to(star, { opacity: 0, scale: 0, duration: 0.25, ease: 'power1.out' }, '-=0.25');

      gsap.delayedCall(Math.random() * 4 + 2, createShootingStar);
    };

    createShootingStar();

    // Cleanup leaked DOM nodes
    const cleanupInterval = setInterval(() => {
      if (container && container.children.length > NUM_SPARKLES + 25) {
        Array.from(container.children)
          .slice(NUM_SPARKLES, -NUM_SPARKLES)
          .forEach(c => c.remove());
      }
    }, 10000);

    return () => {
      gsap.killTweensOf('*');
      clearInterval(cleanupInterval);
      if (container) container.innerHTML = '';
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden -z-10 transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden="true"
    />
  );
};

export default StarField;
