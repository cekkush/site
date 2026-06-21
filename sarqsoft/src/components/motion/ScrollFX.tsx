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
        gsap.fromTo(
          el,
          {yPercent: speed * 50},
          {
            yPercent: -speed * 50,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
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
