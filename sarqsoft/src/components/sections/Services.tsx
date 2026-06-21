'use client';

import {useTranslations} from 'next-intl';
import {Section} from '@/components/ui/Section';
import {SectionHeading} from '@/components/ui/SectionHeading';
import {Reveal} from '@/components/motion/Reveal';
import {cn} from '@/lib/utils';

type ServiceItem = {title: string; desc: string};

export function Services() {
  const t = useTranslations('services');
  const items = t.raw('items') as ServiceItem[];

  return (
    <Section>
      <SectionHeading kicker={t('kicker')} title={t('title')} intro={t('intro')} />

      {/* Editorial, stepped columns — big outline numerals + a gold top rule,
          alternating vertical offset on desktop so it reads less like a grid. */}
      <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08} y={20}>
            <div className={cn('group relative', i % 2 === 1 && 'lg:mt-16')}>
              <div className="h-px w-full bg-gradient-to-r from-gold/60 via-gold/25 to-transparent" />
              <span
                className="mt-6 block font-display text-6xl leading-none tabular-nums text-transparent"
                style={{WebkitTextStroke: '1px rgba(236,178,76,0.45)'}}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 font-display text-xl leading-snug text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-mist">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
