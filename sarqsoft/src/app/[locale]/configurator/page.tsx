import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {PageHero} from '@/components/ui/PageHero';
import {Configurator} from '@/components/configurator/Configurator';

export async function generateMetadata({
  params,
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const t = await getTranslations({locale: params.locale, namespace: 'meta'});
  return {
    title: t('configuratorTitle'),
    description: t('configuratorDescription'),
  };
}

export default async function ConfiguratorPage({
  params,
}: {
  params: {locale: string};
}) {
  const {locale} = params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'configurator'});

  return (
    <>
      <PageHero
        kicker={t('kicker')}
        title={t('title')}
        subtitle={t('subtitle')}
        className="pb-6 md:pb-8"
      />
      <Configurator />
    </>
  );
}
