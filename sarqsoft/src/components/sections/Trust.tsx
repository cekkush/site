'use client';

import {useTranslations} from 'next-intl';
import {Section} from '@/components/ui/Section';
import {SectionHeading} from '@/components/ui/SectionHeading';
import {Card} from '@/components/ui/Card';
import {Reveal} from '@/components/motion/Reveal';
import {Counter} from '@/components/motion/Counter';

type Stat = {value: number; suffix: string; label: string};
type CaseItem = {company: string; sector: string; result: string};
type Testimonial = {quote: string; name: string; role: string};

function Eyebrow({children}: {children: React.ReactNode}) {
  return (
    <span className="text-xs font-medium uppercase tracking-[0.28em] text-gold/90">
      {children}
    </span>
  );
}

export function Trust() {
  const t = useTranslations('trust');
  const stats = t.raw('stats') as Stat[];
  const cases = t.raw('cases') as CaseItem[];
  const testimonials = t.raw('testimonials') as Testimonial[];

  return (
    <Section id="trust">
      <SectionHeading
        kicker={t('kicker')}
        title={t('title')}
        intro={t('intro')}
      />

      {/* (a) STATS */}
      <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 border-y border-white/10 py-12 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="text-center sm:text-left">
            <Counter
              value={s.value}
              suffix={s.suffix}
              className="font-display text-5xl text-gradient-gold lg:text-6xl"
            />
            <p className="mt-2 text-sm text-slate">{s.label}</p>
          </Reveal>
        ))}
      </div>

      {/* (b) CASES */}
      <div className="mt-20">
        <Reveal>
          <Eyebrow>{t('casesTitle')}</Eyebrow>
        </Reveal>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={c.company} delay={i * 0.08}>
              <Card className="h-full">
                <p className="text-xs uppercase tracking-[0.2em] text-gold">
                  {c.sector}
                </p>
                <h3 className="mt-3 font-display text-lg text-ink">
                  {c.company}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  {c.result}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      {/* (c) TESTIMONIALS */}
      <div className="mt-20">
        <Reveal>
          <Eyebrow>{t('testimonialsTitle')}</Eyebrow>
        </Reveal>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {testimonials.map((tm, i) => (
            <Reveal key={`${tm.role}-${i}`} delay={i * 0.08}>
              <Card className="flex h-full flex-col">
                <span
                  className="font-display text-5xl leading-none text-gold/40"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <p className="mt-2 flex-1 leading-relaxed text-ink/90 text-pretty">
                  {tm.quote}
                </p>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="text-gold">{tm.name}</p>
                  <p className="mt-1 text-sm text-slate">{tm.role}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      {/* (d) PARTNER strip */}
      <Reveal className="mt-20">
        <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-gold/[0.04] p-8 md:p-10">
          <div className="pointer-events-none absolute -right-1/4 top-1/2 h-[200%] w-1/2 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(246,160,74,0.18),transparent_70%)]" />
          <div className="relative">
            <Eyebrow>{t('partnerTitle')}</Eyebrow>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink/90 text-pretty">
              {t('partnerText')}
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
