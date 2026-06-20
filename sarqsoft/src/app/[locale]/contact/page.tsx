import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {PageHero} from '@/components/ui/PageHero';
import {Section} from '@/components/ui/Section';
import {Reveal} from '@/components/motion/Reveal';
import {ContactForm} from '@/components/sections/ContactForm';
import {site} from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const t = await getTranslations({locale: params.locale, namespace: 'meta'});
  return {title: t('contactTitle'), description: t('contactDescription')};
}

function ChannelLink({
  href,
  label,
  value,
  external,
}: {
  href: string;
  label: string;
  value: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 transition-colors hover:border-gold/30"
    >
      <span className="text-xs uppercase tracking-[0.2em] text-slate">
        {label}
      </span>
      <span className="text-ink transition-colors group-hover:text-gold">
        {value}
      </span>
    </a>
  );
}

export default async function ContactPage({
  params,
}: {
  params: {locale: string};
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations('contactPage');

  return (
    <>
      <PageHero
        kicker={t('hero.kicker')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <h2 className="font-display text-2xl text-ink">
                {t('channelsTitle')}
              </h2>
              <div className="mt-6 space-y-3">
                <ChannelLink
                  href={`mailto:${site.email}`}
                  label={t('channels.email')}
                  value={site.email}
                />
                <ChannelLink
                  href={site.phoneHref}
                  label={t('channels.phone')}
                  value={site.phoneDisplay}
                />
                <ChannelLink
                  href={site.whatsapp}
                  label={t('channels.whatsapp')}
                  value={site.phoneDisplay}
                  external
                />
                <ChannelLink
                  href={site.telegram}
                  label={t('channels.telegram')}
                  value="@sarqsoft"
                  external
                />
              </div>
              <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate">
                {t('address')}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
