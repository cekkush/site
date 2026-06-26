'use client';

import {useEffect} from 'react';
import {usePathname} from '@/i18n/navigation';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

/**
 * Scroll-driven parallax. Any element with `data-parallax="0.15"` drifts as it
 * passes through the viewport (value = strength). Disabled for reduced motion.
 * Re-initialises on route change.
 */
export function ScrollFX() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.12');
        // Promote to its own layer + force a 3D transform so the element (often
        // heading text) is rasterised once and only composited as it drifts,
        // instead of repainting every scroll frame.
        gsap.set(el, {willChange: 'transform', force3D: true});
        gsap.fromTo(
          el,
          {yPercent: speed * 50},
          {
            yPercent: -speed * 50,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              // Smooth (time-based) scrubbing instead of `true`. With Lenis
              // driving the scroll, an instant scrub re-reads a slightly
              // different scroll value than ScrollTrigger every frame, so the
              // heading visibly jitters against the rest of the page. Easing
              // the transform over ~0.5s damps that per-frame desync — the
              // drift stays subtle (±2.5%) but no longer trembles.
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    });

    const id = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      window.clearTimeout(id);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
