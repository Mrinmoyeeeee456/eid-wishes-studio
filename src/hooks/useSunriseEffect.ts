import { useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * useSunriseEffect (Now Peach Lunar Experience)
 * 
 * When `isDark` goes FALSE (light mode activates), plays a serene Moon ascent
 * featuring the Laughing Moon and nature elements.
 */
export const useSunriseEffect = (isDark: boolean) => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isDark || prefersReducedMotion) return;

    // ── 1. Lunar Layer & Moon ──────────────────────────────────────────
    const lunarLayer = document.createElement('div');
    lunarLayer.id = 'lunar-transition-layer';
    Object.assign(lunarLayer.style, {
      position: 'fixed',
      inset: '0',
      zIndex: '9999',
      pointerEvents: 'none',
      overflow: 'hidden',
    });
    document.body.appendChild(lunarLayer);

    const moonEl = document.createElement('div');
    moonEl.style.cssText = `
      position: absolute;
      bottom: -160px;
      left: 50%;
      transform: translateX(-50%);
      width: 150px;
      height: 150px;
      color: #fb923c;
      filter: drop-shadow(0 0 40px rgba(251,146,60,0.6));
    `;
    moonEl.innerHTML = `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10 A40 40 0 1 0 50 90 A30 30 0 1 1 50 10" fill="currentColor" />
        <g stroke="black" stroke-width="2" fill="none" stroke-linecap="round">
          <path d="M35 40 Q40 35 45 40" />
          <path d="M55 40 Q60 35 65 40" />
          <path d="M40 60 Q50 75 60 60" stroke-width="3" />
        </g>
      </svg>
    `;
    lunarLayer.appendChild(moonEl);

    // ── 2. Flash Overlay ──────────────────────────────────────────────
    const flash = document.createElement('div');
    Object.assign(flash.style, {
      position: 'fixed',
      inset: '0',
      background: '#fff7ed', // Peach white
      zIndex: '10000',
      opacity: '0',
      pointerEvents: 'none',
    });
    document.body.appendChild(flash);

    // ── 3. Nature Layer ───────────────────────────────────────────────
    const natureLayer = document.createElement('div');
    Object.assign(natureLayer.style, {
      position: 'fixed',
      inset: '0',
      zIndex: '9998',
      pointerEvents: 'none',
    });
    natureLayer.innerHTML = `
      <div class="bird" style="position:absolute; top:30%; left:-60px; font-size:24px; opacity:0">🕊️</div>
      <div class="bird" style="position:absolute; top:20%; left:-100px; font-size:20px; opacity:0">🕊️</div>
      <div class="flower" style="position:absolute; bottom:-40px; left:20%; font-size:32px;">🌷</div>
      <div class="flower" style="position:absolute; bottom:-40px; left:50%; font-size:40px;">🌺</div>
      <div class="flower" style="position:absolute; bottom:-40px; left:80%; font-size:32px;">🌻</div>
    `;
    document.body.appendChild(natureLayer);

    const tl = gsap.timeline({
      onComplete: () => {
        lunarLayer.remove();
        flash.remove();
        natureLayer.remove();
      }
    });

    tl.to(moonEl, { bottom: '40%', duration: 1.8, ease: 'power2.out' })
      .to(moonEl, { scale: 1.2, duration: 0.4, yoyo: true, repeat: 1, ease: 'back.out' }, '-=0.2') // Laugh pulse
      .to(flash, { opacity: 1, duration: 0.4, ease: 'power2.inOut' }, '-=0.4')
      .to(flash, { opacity: 0, duration: 1, ease: 'power2.inOut' })
      .to('.flower', { bottom: 30, rotation: 360, duration: 1, stagger: 0.2, ease: 'back.out' }, '-=1.2')
      .to('.bird', { x: window.innerWidth + 150, opacity: 1, duration: 3, stagger: 0.5, ease: 'none' }, '-=1.5')
      .to(moonEl, { bottom: '100%', opacity: 0, duration: 1, ease: 'power1.in' }, '-=0.5');

    return () => {
      tl.kill();
      lunarLayer.remove();
      flash.remove();
      natureLayer.remove();
    };
  }, [isDark]);
};
