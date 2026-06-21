'use client';

import {useEffect} from 'react';
import Lenis from 'lenis';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

/**
 * Lenis smooth scroll wired into the GSAP ticker so ScrollTrigger stays in
 * sync. Disabled entirely when the user prefers reduced motion.
 */
export default function SmoothScroll({children}: {children: React.ReactNode}) {
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    // Flag the document while scrolling so full-screen per-frame effects (the
    // film grain) can switch off mid-scroll and only paint once it's idle.
    const root = document.documentElement;
    let idle: number | undefined;
    const onScroll = () => {
      ScrollTrigger.update();
      root.classList.add('is-scrolling');
      window.clearTimeout(idle);
      idle = window.setTimeout(() => root.classList.remove('is-scrolling'), 140);
    };
    lenis.on('scroll', onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.clearTimeout(idle);
      root.classList.remove('is-scrolling');
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
