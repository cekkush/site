'use client';

import {motion} from 'framer-motion';
import {useTranslations} from 'next-intl';
import {Section} from '@/components/ui/Section';
import {SectionHeading} from '@/components/ui/SectionHeading';
import {cn} from '@/lib/utils';

type Step = {title: string; desc: string};

const EASE = [0.16, 1, 0.3, 1] as const;

function num(i: number) {
  return String(i + 1).padStart(2, '0');
}

export function Process() {
  const t = useTranslations('process');
  const steps = t.raw('steps') as Step[];

  return (
    <Section>
      <SectionHeading
        kicker={t('kicker')}
        title={t('title')}
        intro={t('intro')}
      />

      {/* ───────── DESKTOP — horizontal timeline ───────── */}
      <div className="relative mt-16 hidden lg:block">
        {/* connecting line behind the circles (aligned to circle centers) */}
        <div
          className="pointer-events-none absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-gold/40 via-gold/20 to-transparent"
          aria-hidden
        />

        <ol className="grid grid-cols-5 gap-6">
          {steps.map((step, i) => {
            const active = i === 0;
            return (
              <motion.li
                key={step.title}
                initial={{opacity: 0, y: 24}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-10% 0px -10% 0px'}}
                transition={{duration: 0.7, ease: EASE, delay: i * 0.1}}
                className="relative flex flex-col"
              >
                <span
                  className={cn(
                    'relative z-10 flex h-14 w-14 items-center justify-center rounded-full font-display text-base tracking-tight',
                    active
                      ? 'bg-gradient-to-br from-gold-soft via-gold to-amber text-night shadow-glow'
                      : 'border border-gold/40 bg-void text-gold',
                  )}
                >
                  {num(i)}
                </span>
                <h3 className="mt-6 font-display text-xl text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-mist">
                  {step.desc}
                </p>
              </motion.li>
            );
          })}
        </ol>
      </div>

      {/* ───────── MOBILE / TABLET — vertical timeline ───────── */}
      <ol className="relative mt-12 flex flex-col lg:hidden">
        {/* vertical line down the left, through circle centers (left ~24px) */}
        <div
          className="pointer-events-none absolute bottom-6 left-6 top-6 w-px -translate-x-1/2 bg-gradient-to-b from-gold/40 via-gold/20 to-transparent"
          aria-hidden
        />

        {steps.map((step, i) => {
          const active = i === 0;
          return (
            <motion.li
              key={step.title}
              initial={{opacity: 0, y: 18}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-10% 0px -10% 0px'}}
              transition={{duration: 0.7, ease: EASE, delay: i * 0.1}}
              className="relative flex gap-5 pb-10 last:pb-0"
            >
              <span
                className={cn(
                  'relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-sm tracking-tight',
                  active
                    ? 'bg-gradient-to-br from-gold-soft via-gold to-amber text-night shadow-glow'
                    : 'border border-gold/40 bg-void text-gold',
                )}
              >
                {num(i)}
              </span>
              <div className="pt-1.5">
                <h3 className="font-display text-lg text-ink">{step.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-mist">
                  {step.desc}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </Section>
  );
}
