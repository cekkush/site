'use client';

import {useTranslations} from 'next-intl';
import {Section} from '@/components/ui/Section';
import {SectionHeading} from '@/components/ui/SectionHeading';
import {Card} from '@/components/ui/Card';
import {Reveal} from '@/components/motion/Reveal';

type Item = {title: string; desc: string};

const s = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const icons = [
  // accounting entries — ledger
  <svg key="0" {...s}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></svg>,
  // financial & tax reports — bar chart
  <svg key="1" {...s}><path d="M4 20h16" /><path d="M7 17v-5M12 17V8M17 17v-7" /></svg>,
  // tax forms — checklist
  <svg key="2" {...s}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8.5 8l1.3 1.3L12.5 6.5M8.5 14l1.3 1.3L12.5 12.5M15 8.2h1M15 14.2h1" /></svg>,
  // warehouse — box
  <svg key="3" {...s}><path d="M3 7l9-4 9 4v10l-9 4-9-4z" /><path d="M3 7l9 4 9-4M12 11v10" /></svg>,
  // HR — person
  <svg key="4" {...s}><circle cx="12" cy="8" r="3.2" /><path d="M5 20c0-3.6 3.1-5.6 7-5.6s7 2 7 5.6" /></svg>,
  // sales — cart
  <svg key="5" {...s}><circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /><path d="M3 4h2l2.2 11h10l2-7.5H7" /></svg>,
  // procurement — truck
  <svg key="6" {...s}><path d="M3 6h11v9H3z" /><path d="M14 9h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></svg>,
  // management reports — dashboard
  <svg key="7" {...s}><rect x="3" y="3" width="8" height="7" rx="1" /><rect x="13" y="3" width="8" height="4" rx="1" /><rect x="13" y="10" width="8" height="11" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /></svg>,
];

export function Automation() {
  const t = useTranslations('automation');
  const items = t.raw('items') as Item[];

  return (
    <Section id="automation">
      <SectionHeading
        kicker={t('kicker')}
        title={t('title')}
        intro={t('intro')}
        className="mb-14"
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05}>
            <Card className="h-full">
              <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/[0.06] text-gold">
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
