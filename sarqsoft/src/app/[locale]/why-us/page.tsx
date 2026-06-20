import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {PageHero} from '@/components/ui/PageHero';
import {Section} from '@/components/ui/Section';
import {SectionHeading} from '@/components/ui/SectionHeading';
import {Card} from '@/components/ui/Card';
import {Reveal} from '@/components/motion/Reveal';
import {RayMark} from '@/components/brand/RayMark';
import {FinalCTA} from '@/components/sections/FinalCTA';
import {site} from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const t = await getTranslations({locale: params.locale, namespace: 'meta'});
  return {title: t('whyTitle'), description: t('whyDescription')};
}

export default async function WhyUsPage({
  params,
}: {
  params: {locale: string};
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations('whyPage');
  const benefits = t.raw('benefits') as Array<{title: string; desc: string}>;

  return (
    <>
      <PageHero
        kicker={t('hero.kicker')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <SectionHeading title={t('introTitle')} />
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-mist text-pretty">
                {t('introText')}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-10 text-center">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-east-glow opacity-50" />
                <RayMark className="mx-auto h-16 w-16" />
                <p className="relative mt-6 font-display text-2xl text-ink">
                  {site.name}
                </p>
                <p className="relative mt-2 text-xs uppercase tracking-[0.28em] text-gold">
                  {site.product}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="bg-night">
        <SectionHeading
          title={t('benefitsTitle')}
          align="center"
          className="mx-auto mb-14"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.07}>
              <Card className="h-full">
                <h3 className="font-display text-lg text-ink">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  {b.desc}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
