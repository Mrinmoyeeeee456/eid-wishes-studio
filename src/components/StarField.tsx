import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useThemeStore } from '../store/themeStore';

const StarField = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeStore();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Check for user accessibility preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // If not dark mode OR user prefers reduced motion, clear all stars and avoid animating
    if (!isDark || prefersReducedMotion) {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      
      if (containerRef.current) {
        // Gracefully fade out any existing stars
        gsap.to(containerRef.current.children, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            if (containerRef.current) {
              containerRef.current.innerHTML = '';
            }
          }
        });
      }
      return;
    }

    if (!containerRef.current) return;
    const container = containerRef.current;

    const createStar = () => {
      if (!isDark || !container) return; // double check state
      
      // Create DOM element
      const star = document.createElement('div');
      
      // Star styling: glassmorphic tail with a bright head
      star.className = 'absolute w-[150px] h-[2px] opacity-0 pointer-events-none';
      star.style.background = 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2) 60%, rgba(255, 255, 255, 1) 100%)';
      star.style.borderRadius = '2px';
      star.style.filter = 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))';
      // 45 degree angle
      star.style.transform = 'rotate(45deg)';
      
      container.appendChild(star);

      // Random starting positions (top/left bias to fall down-right)
      // We want them to spawn outside the viewport and travel across
      const spawnSide = Math.random() > 0.5 ? 'top' : 'left';
      let startX, startY;
      
      if (spawnSide === 'top') {
        startX = Math.random() * window.innerWidth;
        startY = -100;
      } else {
        startX = -100;
        startY = Math.random() * window.innerHeight;
      }

      // GSAP Timeline for this single star
      const tl = gsap.timeline({
        onComplete: () => {
          star.remove();
        }
      });

      // Initialize position
      gsap.set(star, { x: startX, y: startY });

      // Path length
      const travelDistance = Math.max(window.innerWidth, window.innerHeight) * 1.5;

      // Animate: Fall and fade out (shatter illusion)
      tl.to(star, {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.in'
      })
      .to(star, {
        x: startX + travelDistance,
        y: startY + travelDistance,
        duration: Math.random() * 1.5 + 1.5,
        ease: 'none'
      }, "<")
      .to(star, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: 'power1.out'
      }, "-=0.3"); // Overlap the fadeout slightly before the movement ends

      // Schedule the next star
      // Random interval between 3 and 7 seconds as requested in spec
      gsap.delayedCall(Math.random() * 4 + 3, createStar);
    };

    // Kick off the loop
    createStar();
    
    // Fallback cleanup interval to destroy leaked DOM nodes from rapid re-renders
    const cleanupInterval = setInterval(() => {
      if (container && container.children.length > 20) {
         // Keep only the most recent ones if things get backed up
         Array.from(container.children).slice(0, -20).forEach(child => child.remove());
      }
    }, 10000);

    return () => {
      gsap.killTweensOf(createStar); // kill delayed calls
      clearInterval(cleanupInterval);
      if (container) {
        while (container.firstChild) container.removeChild(container.firstChild);
      }
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden -z-10 transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-0'}`}
      // Prevent screen readers from reading background decorative animations
      aria-hidden="true" 
    />
  );
};

export default StarField;
