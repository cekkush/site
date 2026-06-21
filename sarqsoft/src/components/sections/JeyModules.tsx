'use client';

import {useTranslations} from 'next-intl';
import {Section} from '@/components/ui/Section';
import {SectionHeading} from '@/components/ui/SectionHeading';
import {Card} from '@/components/ui/Card';
import {Button} from '@/components/ui/Button';
import {Reveal} from '@/components/motion/Reveal';

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

export function JeyModules() {
  const t = useTranslations('jey');
  const modules = t.raw('modules') as Module[];

  return (
    <Section>
      <SectionHeading
        kicker={t('kicker')}
        title={t('title')}
        intro={t('intro')}
      />

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
        {modules.map((mod, i) => (
          <Reveal key={mod.name} delay={i * 0.06} y={20}>
            <Card className="h-full">
              {/* faint gold glow on hover */}
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(236,178,76,0.14)_0%,transparent_70%)] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-gold/20 bg-gold/[0.06] text-gold transition-colors duration-300 group-hover:border-gold/40">
                {ICONS[i] ?? ICONS[0]}
              </span>
              <h3 className="relative mt-6 font-display text-lg text-ink">
                {mod.name}
              </h3>
              <p className="relative mt-2 text-[15px] leading-relaxed text-mist">
                {mod.desc}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-col items-center justify-center gap-5 text-center md:mt-14 md:flex-row md:gap-7">
          <p className="text-mist">{t('ctaText')}</p>
          <Button href="/jey-erp" variant="outline" withArrow>
            {t('ctaButton')}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
