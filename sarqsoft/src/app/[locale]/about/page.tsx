import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {PageHero} from '@/components/ui/PageHero';
import {Section} from '@/components/ui/Section';
import {SectionHeading} from '@/components/ui/SectionHeading';
import {Card} from '@/components/ui/Card';
import {Reveal} from '@/components/motion/Reveal';
import {FinalCTA} from '@/components/sections/FinalCTA';

export async function generateMetadata({
  params,
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const t = await getTranslations({locale: params.locale, namespace: 'meta'});
  return {title: t('aboutTitle'), description: t('aboutDescription')};
}

export default async function AboutPage({
  params,
}: {
  params: {locale: string};
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations('aboutPage');
  const values = t.raw('values') as Array<{title: string; desc: string}>;

  return (
    <>
      <PageHero
        kicker={t('hero.kicker')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <h2 className="font-display text-2xl text-ink">
                {t('missionTitle')}
              </h2>
              <p className="mt-4 leading-relaxed text-mist">
                {t('missionText')}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-gold/15 bg-gold/[0.03] p-8">
              <h2 className="font-display text-2xl text-ink">
                {t('storyTitle')}
              </h2>
              <p className="mt-4 leading-relaxed text-mist">{t('storyText')}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-night">
        <SectionHeading
          title={t('valuesTitle')}
          align="center"
          className="mx-auto mb-14"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.07}>
              <Card className="h-full">
                <span className="font-display text-3xl text-gradient-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-lg text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  {v.desc}
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
