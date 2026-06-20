import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {PageHero} from '@/components/ui/PageHero';
import {Section} from '@/components/ui/Section';
import {SectionHeading} from '@/components/ui/SectionHeading';
import {Card} from '@/components/ui/Card';
import {Reveal} from '@/components/motion/Reveal';
import {JeyModules} from '@/components/sections/JeyModules';
import {FinalCTA} from '@/components/sections/FinalCTA';

export async function generateMetadata({
  params,
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const t = await getTranslations({locale: params.locale, namespace: 'meta'});
  return {title: t('jeyTitle'), description: t('jeyDescription')};
}

export default async function JeyErpPage({
  params,
}: {
  params: {locale: string};
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations('jeyPage');
  const features = t.raw('features') as Array<{title: string; desc: string}>;
  const why = t.raw('why') as Array<{title: string; desc: string}>;

  return (
    <>
      <PageHero
        kicker={t('hero.kicker')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <SectionHeading title={t('overviewTitle')} />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-mist text-pretty">
                {t('overviewText')}
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="bg-night">
        <SectionHeading
          title={t('featuresTitle')}
          align="center"
          className="mx-auto mb-14"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feat, i) => (
            <Reveal key={feat.title} delay={i * 0.06}>
              <Card className="h-full">
                <h3 className="font-display text-lg text-ink">{feat.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  {feat.desc}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <JeyModules />

      <Section>
        <SectionHeading
          title={t('whyTitle')}
          align="center"
          className="mx-auto mb-14"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {why.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <Card className="h-full">
                <h3 className="font-display text-lg text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  {item.desc}
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
