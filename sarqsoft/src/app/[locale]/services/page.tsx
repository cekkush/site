import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {PageHero} from '@/components/ui/PageHero';
import {Section} from '@/components/ui/Section';
import {SectionHeading} from '@/components/ui/SectionHeading';
import {Card} from '@/components/ui/Card';
import {Reveal} from '@/components/motion/Reveal';
import {Services} from '@/components/sections/Services';
import {Automation} from '@/components/sections/Automation';
import {Expertise} from '@/components/sections/Expertise';
import {Process} from '@/components/sections/Process';
import {FinalCTA} from '@/components/sections/FinalCTA';

export async function generateMetadata({
  params,
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'servicesPage',
  });
  return {title: t('hero.kicker'), description: t('hero.subtitle')};
}

export default async function ServicesPage({
  params,
}: {
  params: {locale: string};
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations('servicesPage');
  const scope = t.raw('scope') as Array<{title: string; desc: string}>;

  return (
    <>
      <PageHero
        kicker={t('hero.kicker')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <Section className="pt-0">
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

      <Services />

      <Automation />

      <Section>
        <SectionHeading
          kicker={t('scopeTitle')}
          title={t('scopeText')}
          className="mb-14 max-w-2xl"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {scope.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <Card className="h-full">
                <span className="font-display text-3xl text-gradient-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-lg text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  {item.desc}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Expertise />

      <Process />

      <FinalCTA />
    </>
  );
}
