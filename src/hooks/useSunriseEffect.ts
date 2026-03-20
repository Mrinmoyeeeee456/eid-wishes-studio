import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * useSunriseEffect — Lightweight Peach Lunar transition.
 * Fast (~1.5s), GPU-accelerated, no layout thrash.
 */
export const useSunriseEffect = (isDark: boolean) => {
  const hasRun = useRef(false);

  useEffect(() => {
    // Only run on explicit light-mode switch, not on first mount
    if (isDark) {
      hasRun.current = true;
      return;
    }
    if (!hasRun.current) {
      hasRun.current = true;
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let tl: gsap.core.Timeline | null = null;
    let flash: HTMLDivElement | null = null;
    let moon: HTMLDivElement | null = null;

    try {
      // Single overlay flash — lightweight, no DOM-heavy layers
      flash = document.createElement('div');
      Object.assign(flash.style, {
        position: 'fixed',
        inset: '0',
        background: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%)',
        zIndex: '10000',
        opacity: '0',
        pointerEvents: 'none',
        willChange: 'opacity',
      });
      document.body.appendChild(flash);

      // Simple crescent moon icon
      moon = document.createElement('div');
      Object.assign(moon.style, {
        position: 'fixed',
        bottom: '-80px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '64px',
        zIndex: '10001',
        pointerEvents: 'none',
        willChange: 'transform, opacity',
        filter: 'drop-shadow(0 0 20px rgba(251,146,60,0.6))',
      });
      moon.textContent = '🌙';
      document.body.appendChild(moon);

      tl = gsap.timeline({
        onComplete: () => {
          if (flash && flash.parentNode) flash.remove();
          if (moon && moon.parentNode) moon.remove();
        },
      });

      tl.to(moon, { bottom: '45%', duration: 0.8, ease: 'power2.out' })
        .to(flash, { opacity: 0.7, duration: 0.3, ease: 'power2.inOut' }, '-=0.3')
        .to(moon, { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1, ease: 'back.out' })
        .to(flash, { opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
        .to(moon, { bottom: '110%', opacity: 0, duration: 0.5, ease: 'power1.in' }, '-=0.3');
    } catch (error) {
      console.error('Animation error:', error);
      if (flash && flash.parentNode) flash.remove();
      if (moon && moon.parentNode) moon.remove();
    }

    return () => {
      try {
        if (tl) tl.kill();
        if (flash && flash.parentNode) flash.remove();
        if (moon && moon.parentNode) moon.remove();
      } catch (e) {
        // fail silently on cleanup
      }
    };
  }, [isDark]);
};
