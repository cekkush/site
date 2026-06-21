'use client';

import {useState} from 'react';
import {motion} from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import {Section} from '@/components/ui/Section';
import {SectionHeading} from '@/components/ui/SectionHeading';
import {Button} from '@/components/ui/Button';
import {Reveal} from '@/components/motion/Reveal';
import {RayMark} from '@/components/brand/RayMark';
import {cn} from '@/lib/utils';

type Module = {name: string; desc: string};

/**
 * Shared SVG shell — simple line-style glyphs, ~24px, gold stroke.
 * Order matches the `jey.modules` array:
 * finance, inventory, sales/CRM, POS, payroll/HR, manufacturing,
 * procurement, analytics.
 */
function Glyph({children}: {children: React.ReactNode}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const ICONS = [
  // 0 — Finance & accounting (banknote / coin stack)
  <Glyph key="finance">
    <rect x="2.5" y="6" width="19" height="12" rx="2" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M5.5 9.5h.01M18.5 14.5h.01" />
  </Glyph>,
  // 1 — Inventory / warehouse (boxes)
  <Glyph key="inventory">
    <path d="M3 8.5 12 4l9 4.5-9 4.5-9-4.5Z" />
    <path d="M3 8.5v7L12 20l9-4.5v-7" />
    <path d="M12 13v7" />
  </Glyph>,
  // 2 — Sales & CRM (people / relationships)
  <Glyph key="crm">
    <circle cx="9" cy="8.5" r="3" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
    <path d="M16 5.5a3 3 0 0 1 0 6M17.5 19a5.5 5.5 0 0 0-2.2-4.4" />
  </Glyph>,
  // 3 — POS / cash register (terminal + receipt)
  <Glyph key="pos">
    <rect x="3.5" y="4" width="17" height="10" rx="1.5" />
    <path d="M7 8h10M7 11h6" />
    <path d="M7 17h10l-1 3H8l-1-3Z" />
  </Glyph>,
  // 4 — Payroll & HR (id badge)
  <Glyph key="hr">
    <rect x="3.5" y="5" width="17" height="14" rx="2" />
    <circle cx="9" cy="11" r="2" />
    <path d="M6 16a3.2 3.2 0 0 1 6 0M14.5 10h3M14.5 13.5h3" />
  </Glyph>,
  // 5 — Manufacturing (gear)
  <Glyph key="manufacturing">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4 5.3 5.3" />
  </Glyph>,
  // 6 — Procurement / purchasing (cart)
  <Glyph key="procurement">
    <path d="M2.5 3.5h2l2 12h11" />
    <path d="M6.5 7h14l-1.6 6.5H7.6" />
    <circle cx="9" cy="19.5" r="1.3" />
    <circle cx="17" cy="19.5" r="1.3" />
  </Glyph>,
  // 7 — Reporting & analytics (bar chart)
  <Glyph key="analytics">
    <path d="M3.5 3.5v17h17" />
    <path d="M8 16.5v-4M12 16.5v-7M16 16.5v-9.5M20 16.5v-2" />
  </Glyph>,
];

const RADIUS = 41; // % of the stage, from center
const node = (i: number, total: number) => {
  const a = ((-90 + (360 / total) * i) * Math.PI) / 180;
  return {x: 50 + RADIUS * Math.cos(a), y: 50 + RADIUS * Math.sin(a)};
};

export function JeyModules() {
  const t = useTranslations('jey');
  const locale = useLocale();
  const modules = t.raw('modules') as Module[];
  const [active, setActive] = useState<number | null>(null);
  const current = active != null ? modules[active] : null;
  const hint =
    locale === 'en'
      ? 'Hover a module to see what it covers'
      : 'Modulun nəyi əhatə etdiyini görmək üçün üzərinə gəlin';

  return (
    <Section>
      <SectionHeading kicker={t('kicker')} title={t('title')} intro={t('intro')} />

      {/* ───────── DESKTOP — radial constellation around the Jey ERP core ───────── */}
      <div className="mt-12 hidden lg:block">
        <div className="relative mx-auto aspect-square w-full max-w-[560px]">
          {/* slow-rotating dashed orbit */}
          <motion.div
            className="absolute inset-[9%] rounded-full border border-dashed border-gold/15"
            animate={{rotate: 360}}
            transition={{duration: 70, repeat: Infinity, ease: 'linear'}}
            aria-hidden
          />
          <div className="absolute inset-[24%] rounded-full border border-white/[0.06]" aria-hidden />

          {/* connecting spokes */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
            {modules.map((_, i) => {
              const p = node(i, modules.length);
              const on = active === i;
              return (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={p.x}
                  y2={p.y}
                  stroke="currentColor"
                  className={cn(
                    'transition-colors duration-300',
                    on ? 'text-gold/60' : 'text-white/10',
                  )}
                  strokeWidth={on ? 0.5 : 0.3}
                />
              );
            })}
          </svg>

          {/* center core */}
          <div className="absolute left-1/2 top-1/2 flex aspect-square w-[36%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-gold/25 bg-void/85 text-center shadow-[0_0_70px_-14px_rgba(236,178,76,0.55)] backdrop-blur">
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(236,178,76,0.16),transparent_70%)]"
              animate={{opacity: [0.5, 0.9, 0.5], scale: [1, 1.05, 1]}}
              transition={{duration: 5, repeat: Infinity, ease: 'easeInOut'}}
              aria-hidden
            />
            {current ? (
              <>
                <span className="relative text-gold">{ICONS[active!]}</span>
                <span className="relative mt-1.5 px-3 font-display text-[15px] leading-tight text-ink">
                  {current.name}
                </span>
              </>
            ) : (
              <>
                <RayMark className="relative h-10 w-10" />
                <span className="relative mt-1.5 font-display text-lg tracking-tight text-ink">
                  Jey <span className="text-gold">ERP</span>
                </span>
              </>
            )}
          </div>

          {/* module nodes */}
          {modules.map((mod, i) => {
            const p = node(i, modules.length);
            const on = active === i;
            return (
              <button
                key={mod.name}
                type="button"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                aria-label={mod.name}
                className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 outline-none"
                style={{left: `${p.x}%`, top: `${p.y}%`}}
              >
                <motion.span
                  animate={{y: [0, -6, 0]}}
                  transition={{
                    duration: 4 + (i % 4) * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.2,
                  }}
                  className={cn(
                    'flex h-16 w-16 items-center justify-center rounded-2xl border bg-void/70 backdrop-blur transition-all duration-300',
                    on
                      ? 'scale-110 border-gold/60 text-gold shadow-[0_0_30px_-6px_rgba(236,178,76,0.6)]'
                      : 'border-white/12 text-mist group-hover:border-gold/40 group-hover:text-ink',
                  )}
                >
                  {ICONS[i] ?? ICONS[0]}
                </motion.span>
              </button>
            );
          })}
        </div>

        {/* live description for the focused module */}
        <div className="mx-auto mt-10 flex min-h-[3.5rem] max-w-xl items-center justify-center text-center">
          {current ? (
            <motion.p
              key={active}
              initial={{opacity: 0, y: 6}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.35}}
              className="text-[15px] leading-relaxed text-mist"
            >
              <span className="font-display text-ink">{current.name}. </span>
              {current.desc}
            </motion.p>
          ) : (
            <p className="text-sm uppercase tracking-[0.2em] text-slate">{hint}</p>
          )}
        </div>
      </div>

      {/* ───────── MOBILE / TABLET — clean list (no heavy cards) ───────── */}
      <div className="mt-12 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:hidden">
        {modules.map((mod, i) => (
          <Reveal key={mod.name} delay={i * 0.05} y={16}>
            <div className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-gold/[0.06] text-gold">
                {ICONS[i] ?? ICONS[0]}
              </span>
              <div>
                <h3 className="font-display text-lg text-ink">{mod.name}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-mist">{mod.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-14 flex flex-col items-center justify-center gap-5 text-center md:flex-row md:gap-7">
          <p className="text-mist">{t('ctaText')}</p>
          <Button href="/jey-erp" variant="outline" withArrow>
            {t('ctaButton')}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
