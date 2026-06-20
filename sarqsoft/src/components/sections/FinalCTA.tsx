'use client';

import {useTranslations} from 'next-intl';
import {Kicker} from '@/components/ui/Kicker';
import {Button} from '@/components/ui/Button';
import {Reveal} from '@/components/motion/Reveal';

export function FinalCTA() {
  const t = useTranslations('cta');

  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      {/* sunrise glow rising from the bottom */}
      <div className="bg-east-glow pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_100%,rgba(246,160,74,0.28),transparent_70%)]" />
      {/* horizon line */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
        <span className="h-px w-2/3 max-w-3xl bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>

      <div className="container-x relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <Kicker>{t('kicker')}</Kicker>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-7 font-display text-4xl leading-[1.05] tracking-tighter2 text-balance sm:text-5xl lg:text-6xl">
              <span className="text-gradient-gold">{t('title')}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-mist text-pretty">
              {t('subtitle')}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" withArrow>
                {t('button')}
              </Button>
              <Button href="/contact" variant="outline">
                {t('secondary')}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <p className="mt-8 text-sm text-slate">{t('contactsNote')}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
