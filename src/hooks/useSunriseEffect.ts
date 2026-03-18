import { useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * useSunriseEffect
 *
 * When `isDark` goes FALSE (light mode activates), plays a golden-sun
 * sunrise sequence using GSAP.
 *
 * The hook creates temporary DOM nodes, animates them, then removes them.
 * All nodes are appended to `document.body` so they overlay everything.
 */
export const useSunriseEffect = (isDark: boolean) => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isDark || prefersReducedMotion) return; // Only run when switching TO light mode

    // ── 1. Sun disk ───────────────────────────────────────────────────
    const sun = document.createElement('div');
    sun.id = 'celestial-sun';
    Object.assign(sun.style, {
      position: 'fixed',
      bottom: '-120px',
      left:   '50%',
      transform: 'translateX(-50%)',
      width:  '120px',
      height: '120px',
      borderRadius: '50%',
      background:   'radial-gradient(circle, #fde68a 0%, #f59e0b 50%, #d97706 100%)',
      boxShadow:    '0 0 60px 30px rgba(251,191,36,0.5), 0 0 120px 60px rgba(251,191,36,0.2)',
      zIndex:       '9999',
      pointerEvents:'none',
    });
    document.body.appendChild(sun);

    // ── 2. Horizon streak ──────────────────────────────────────────────
    const horizon = document.createElement('div');
    Object.assign(horizon.style, {
      position: 'fixed',
      bottom:   '0',
      left:     '0',
      right:    '0',
      height:   '4px',
      background: 'linear-gradient(90deg, transparent, #fde68a 40%, #f59e0b 60%, transparent)',
      zIndex:   '9998',
      opacity:  '0',
      pointerEvents:'none',
    });
    document.body.appendChild(horizon);

    // ── 3. Overlay flash ──────────────────────────────────────────────
    const flash = document.createElement('div');
    Object.assign(flash.style, {
      position: 'fixed',
      inset:    '0',
      background: 'radial-gradient(ellipse at 50% 100%, rgba(253,230,138,0.35) 0%, transparent 70%)',
      zIndex:   '9997',
      opacity:  '0',
      pointerEvents:'none',
    });
    document.body.appendChild(flash);

    // ── 4. GSAP timeline ──────────────────────────────────────────────
    const tl = gsap.timeline({
      onComplete: () => {
        sun.remove();
        horizon.remove();
        flash.remove();
      },
    });

    tl.to(horizon, { opacity: 1, duration: 0.4, ease: 'power2.out' })

      // Sun rises from below horizon
      .to(sun, {
        bottom: '10%',
        duration: 1.4,
        ease: 'power1.out',
      }, '+=0.1')

      // Flash brightens at peak
      .to(flash, { opacity: 1, duration: 0.4, ease: 'power2.inOut' }, '-=0.5')
      .to(flash, { opacity: 0, duration: 0.6, ease: 'power2.inOut' })

      // Sun slowly drifts up and fades as if rising above viewport
      .to(sun, {
        bottom: '60%',
        opacity: 0,
        scale: 1.4,
        duration: 1.2,
        ease: 'power1.in',
      }, '-=0.2')

      .to(horizon, { opacity: 0, duration: 0.5 }, '-=0.8');

    return () => {
      tl.kill();
      sun.remove();
      horizon.remove();
      flash.remove();
    };
  }, [isDark]);
};
