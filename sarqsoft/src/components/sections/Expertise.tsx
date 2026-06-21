'use client';

import {useTranslations} from 'next-intl';
import {Section} from '@/components/ui/Section';
import {SectionHeading} from '@/components/ui/SectionHeading';
import {Card} from '@/components/ui/Card';
import {Reveal} from '@/components/motion/Reveal';

type Item = {title: string; desc: string};

const s = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const icons = [
  // Azerbaijani accounting — calculator
  <svg key="0" {...s}><rect x="6" y="3" width="12" height="18" rx="2" /><path d="M9 7h6" /><path d="M9 11h.01M12 11h.01M15 11h.01M9 14h.01M12 14h.01M15 14h.01M9 17h6" /></svg>,
  // import from any source — download to tray
  <svg key="1" {...s}><path d="M12 3v10" /><path d="M8 9l4 4 4-4" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></svg>,
  // cloud infrastructure
  <svg key="2" {...s}><path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.58-1.5A3.5 3.5 0 0 1 18 18z" /></svg>,
  // training — graduation cap
  <svg key="3" {...s}><path d="M2 8l10-4 10 4-10 4z" /><path d="M6 10.5V15c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" /></svg>,
];

export function Expertise() {
  const t = useTranslations('expertise');
  const items = t.raw('items') as Item[];

  return (
    <Section id="expertise" className="bg-night">
      <SectionHeading
        kicker={t('kicker')}
        title={t('title')}
        intro={t('intro')}
        className="mb-14"
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08}>
            <Card className="h-full">
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/25 bg-gold/[0.06] text-gold">
                {icons[i % icons.length]}
              </span>
              <h3 className="font-display text-lg text-ink">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-mist">
                {item.desc}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
