import type {ReactNode} from 'react';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {NextIntlClientProvider} from 'next-intl';
import {
  setRequestLocale,
  getMessages,
  getTranslations,
} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {site} from '@/lib/site';
import {withBase} from '@/lib/utils';
import SmoothScroll from '@/components/motion/SmoothScroll';
import {Header} from '@/components/layout/Header';
import {Footer} from '@/components/layout/Footer';
// Self-hosted variable fonts (bundled, latin-ext covers Azerbaijani glyphs).
import '@fontsource-variable/manrope/wght.css';
import '@fontsource-variable/fraunces/standard.css';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const {locale} = params;
  const t = await getTranslations({locale, namespace: 'meta'});
  return {
    metadataBase: new URL(site.url),
    title: {
      default: t('homeTitle'),
      template: `%s · ${site.name}`,
    },
    description: t('homeDescription'),
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: t('homeTitle'),
      description: t('homeDescription'),
      locale: locale === 'az' ? 'az_AZ' : 'en_US',
    },
    alternates: {
      languages: {az: '/az', en: '/en'},
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: {locale: string};
}) {
  const {locale} = params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href={withBase('/favicon.svg')} type="image/svg+xml" />
      </head>
      <body className="grain">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-night"
          >
            Skip to content
          </a>
          <SmoothScroll>
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
