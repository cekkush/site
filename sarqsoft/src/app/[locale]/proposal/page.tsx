import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {ProposalView} from '@/components/configurator/ProposalView';

export async function generateMetadata({
  params,
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const t = await getTranslations({locale: params.locale, namespace: 'meta'});
  return {
    title: t('proposalTitle'),
    description: t('proposalDescription'),
    // personal proposals shouldn't be indexed
    robots: {index: false, follow: false},
  };
}

export default function ProposalPage({params}: {params: {locale: string}}) {
  const {locale} = params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen pt-24">
      <ProposalView locale={locale} />
    </div>
  );
}
