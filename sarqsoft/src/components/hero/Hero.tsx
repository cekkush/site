'use client';

import {useEffect, useRef, useState} from 'react';
import dynamic from 'next/dynamic';
import {motion} from 'framer-motion';
import {useTranslations} from 'next-intl';
import {Button} from '@/components/ui/Button';
import {Kicker} from '@/components/ui/Kicker';
import {SplitText} from '@/components/motion/SplitText';

const LightField = dynamic(() => import('@/components/three/LightField'), {
  ssr: false,
});

type Stat = {value: string; label: string};

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const t = useTranslations('hero');
  const stats = t.raw('stats') as Stat[];
  const [motionOk, setMotionOk] = useState(false);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const [scrolling, setScrolling] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMotionOk(
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );
  }, []);

  // Defer mounting the WebGL canvas until the browser is idle, so the shader
  // compile doesn't collide with the hero's entrance animation on load.
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: {timeout: number}) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true), {timeout: 1500});
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setReady(true), 900);
    return () => window.clearTimeout(id);
  }, []);

  // Pause the WebGL render loop when the hero is off-screen or while scrolling
  // (no point burning frames on it while the user is moving past it).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      {rootMargin: '120px'},
    );
    io.observe(el);

    let idle: number | undefined;
    const onScroll = () => {
      setScrolling(true);
      window.clearTimeout(idle);
      idle = window.setTimeout(() => setScrolling(false), 180);
    };
    window.addEventListener('scroll', onScroll, {passive: true});

    return () => {
      io.disconnect();
      window.clearTimeout(idle);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollDown = () => {
    const next = sectionRef.current?.nextElementSibling as HTMLElement | null;
    if (next) next.scrollIntoView({behavior: 'smooth', block: 'start'});
    else window.scrollTo({top: window.innerHeight, behavior: 'smooth'});
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* sunrise base */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_120%_at_50%_125%,#3a2410_0%,#150c1f_30%,#04060d_62%)]" />
      {/* WebGL light field */}
      {motionOk && ready && (
        <div className="absolute inset-0">
          <LightField active={inView && !scrolling} />
        </div>
      )}
      {/* readability veil + bottom fade */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_40%,rgba(4,6,13,0.2)_0%,rgba(4,6,13,0.7)_100%)]" />

      <div className="container-x relative z-10 pt-28">
        <div className="max-w-4xl">
          <motion.div
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, ease: EASE}}
          >
            <Kicker>{t('kicker')}</Kicker>
          </motion.div>

          <h1 className="mt-7 font-display text-[3.3rem] font-medium leading-[0.98] tracking-tightest text-balance sm:text-7xl lg:text-[6.6rem]">
            <span className="block text-ink">
              <SplitText text={t('titleLine1')} />
            </span>
            <span className="block text-gradient-gold">
              <SplitText text={t('titleLine2')} delay={0.18} />
            </span>
          </h1>

          <motion.p
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, ease: EASE, delay: 0.5}}
            className="mt-8 max-w-xl text-lg leading-relaxed text-mist text-pretty sm:text-xl"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, ease: EASE, delay: 0.65}}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="/contact" withArrow>
              {t('ctaPrimary')}
            </Button>
            <Button href="/jey-erp" variant="outline">
              {t('ctaSecondary')}
            </Button>
          </motion.div>

          {/* stats */}
          <motion.dl
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1, delay: 0.9}}
            className="mt-16 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/10 pt-8"
          >
            {stats?.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl text-gold sm:text-4xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-sm text-slate">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 1.2, duration: 1}}
        className="absolute inset-x-0 bottom-7 z-10 flex justify-center"
      >
        <button
          type="button"
          onClick={scrollDown}
          aria-label={t('scroll')}
          className="flex cursor-pointer flex-col items-center gap-2 text-[0.7rem] uppercase tracking-[0.3em] text-slate transition-colors hover:text-gold"
        >
          {t('scroll')}
          <span className="relative h-9 w-px overflow-hidden bg-white/15">
            <motion.span
              className="absolute inset-x-0 top-0 h-3 bg-gold"
              animate={{y: [-12, 36]}}
              transition={{repeat: Infinity, duration: 1.8, ease: 'easeInOut'}}
            />
          </span>
        </button>
      </motion.div>
    </section>
  );
}
