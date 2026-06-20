'use client';

import {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {useTranslations} from 'next-intl';
import {Section} from '@/components/ui/Section';
import {SectionHeading} from '@/components/ui/SectionHeading';
import {cn} from '@/lib/utils';

type Item = {
  id: string;
  name: string;
  headline: string;
  desc: string;
  points: string[];
};

const EASE = [0.16, 1, 0.3, 1] as const;

function Check() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="mt-0.5 shrink-0 text-gold"
      aria-hidden
    >
      <path
        d="M4 10.5l3.5 3.5L16 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Industries() {
  const t = useTranslations('industries');
  const items = t.raw('items') as Item[];
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <Section id="industries">
      <SectionHeading
        kicker={t('kicker')}
        title={t('title')}
        intro={t('intro')}
      />

      {/* tab bar */}
      <div
        role="tablist"
        aria-label={t('title')}
        className="mt-12 flex flex-wrap gap-3"
      >
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className={cn(
                'rounded-full px-5 py-2.5 text-sm font-medium tracking-tight transition-all duration-300',
                isActive
                  ? 'bg-gradient-to-r from-gold-soft via-gold to-amber text-night shadow-glow'
                  : 'border border-white/10 text-mist hover:border-white/20 hover:text-ink',
              )}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      {/* animated panel */}
      <div className="relative mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{opacity: 0, y: 16, x: 8}}
            animate={{opacity: 1, y: 0, x: 0}}
            exit={{opacity: 0, y: -12, x: -8}}
            transition={{duration: 0.55, ease: EASE}}
            className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14"
          >
            {/* left: copy */}
            <div className="flex flex-col justify-center">
              <h3 className="font-display text-3xl leading-[1.1] text-ink lg:text-4xl">
                {current.headline}
              </h3>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist text-pretty">
                {current.desc}
              </p>
              <ul className="mt-8 flex flex-col gap-4">
                {current.points.map((point, i) => (
                  <motion.li
                    key={point}
                    initial={{opacity: 0, x: 10}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.5, ease: EASE, delay: 0.15 + i * 0.08}}
                    className="flex items-start gap-3 text-base text-ink/90"
                  >
                    <Check />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* right: decorative visual */}
            <div className="relative min-h-[18rem] overflow-hidden rounded-2xl border border-gold/15 bg-gradient-to-br from-gold/[0.06] to-transparent lg:min-h-[24rem]">
              {/* gold glow */}
              <div className="pointer-events-none absolute -bottom-1/3 left-1/2 h-[120%] w-[120%] -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(246,160,74,0.22),transparent_70%)]" />
              {/* sunrise arcs */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center">
                <span className="h-px w-3/4 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                <span className="mt-6 h-px w-1/2 bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
              </div>
              {/* faint industry initial */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={current.id}
                  initial={{opacity: 0, scale: 0.92}}
                  animate={{opacity: 1, scale: 1}}
                  exit={{opacity: 0, scale: 1.04}}
                  transition={{duration: 0.6, ease: EASE}}
                  className="absolute inset-0 flex items-center justify-center font-display text-[10rem] font-medium leading-none text-gradient-gold opacity-[0.18] lg:text-[14rem]"
                  aria-hidden
                >
                  {current.name.charAt(0)}
                </motion.span>
              </AnimatePresence>
              {/* glass index label */}
              <div className="absolute left-6 top-6 flex items-center gap-3">
                <span className="text-xs font-medium uppercase tracking-[0.28em] text-gold/80">
                  {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-display text-xl text-ink/90">{current.name}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
