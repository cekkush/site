'use client';

import {motion} from 'framer-motion';
import {useTranslations} from 'next-intl';
import {Section} from '@/components/ui/Section';
import {SectionHeading} from '@/components/ui/SectionHeading';

const EASE = [0.16, 1, 0.3, 1] as const;

function XIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 3l6 6M9 3l-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden
    >
      <path
        d="M2.5 7l2.5 2.5 5.5-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChaosToOrder() {
  const t = useTranslations('chaos');
  const before = t.raw('before') as string[];
  const after = t.raw('after') as string[];

  return (
    <Section>
      <SectionHeading
        kicker={t('kicker')}
        title={t('title')}
        intro={t('intro')}
      />

      <div className="relative mt-14 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 md:gap-10 lg:gap-14">
        {/* LEFT — chaos / before */}
        <motion.div
          initial={{opacity: 0, x: -28}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true, margin: '-10% 0px -10% 0px'}}
          transition={{duration: 0.85, ease: EASE}}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7 saturate-[0.85] sm:p-8"
        >
          <p className="font-display text-sm uppercase tracking-[0.22em] text-slate">
            {t('beforeTitle')}
          </p>
          <ul className="mt-7 flex flex-col gap-5">
            {before.map((item, i) => (
              <motion.li
                key={item}
                initial={{opacity: 0, y: 12}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-10% 0px -10% 0px'}}
                transition={{duration: 0.6, ease: EASE, delay: 0.1 + i * 0.08}}
                className="flex items-start gap-4"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 text-slate">
                  <XIcon />
                </span>
                <span className="text-[0.95rem] leading-relaxed text-mist/70">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* transformation cue — desktop only, between columns */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          aria-hidden
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/20 bg-void/80 text-gold shadow-[0_0_40px_-8px_rgba(236,178,76,0.45)] backdrop-blur-sm">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 10h11M11 5.5l4.5 4.5L11 14.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* RIGHT — order / after */}
        <motion.div
          initial={{opacity: 0, x: 28}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true, margin: '-10% 0px -10% 0px'}}
          transition={{duration: 0.85, ease: EASE}}
          className="relative overflow-hidden rounded-2xl border border-gold/15 bg-gold/[0.03] p-7 sm:p-8"
        >
          {/* faint radial gold glow */}
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(236,178,76,0.16)_0%,transparent_70%)] blur-2xl"
            aria-hidden
          />
          <p className="relative font-display text-sm uppercase tracking-[0.22em] text-gradient-gold">
            {t('afterTitle')}
          </p>
          <ul className="relative mt-7 flex flex-col gap-5">
            {after.map((item, i) => (
              <motion.li
                key={item}
                initial={{opacity: 0, y: 12}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-10% 0px -10% 0px'}}
                transition={{duration: 0.6, ease: EASE, delay: 0.1 + i * 0.08}}
                className="flex items-start gap-4"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold ring-1 ring-inset ring-gold/30">
                  <CheckIcon />
                </span>
                <span className="text-[0.95rem] leading-relaxed text-ink">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* note */}
      <motion.p
        initial={{opacity: 0, y: 12}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, margin: '-10% 0px -10% 0px'}}
        transition={{duration: 0.7, ease: EASE, delay: 0.2}}
        className="mx-auto mt-12 flex max-w-xl items-center justify-center gap-2.5 text-center text-sm text-slate md:mt-14"
      >
        <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
        {t('note')}
      </motion.p>
    </Section>
  );
}
