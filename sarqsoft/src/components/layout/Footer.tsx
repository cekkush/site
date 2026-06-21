import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {navItems, site} from '@/lib/site';
import {Logo} from '@/components/brand/Logo';
import {RayMark} from '@/components/brand/RayMark';

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="no-print relative overflow-hidden border-t border-white/10 bg-night">
      {/* East glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-east-glow opacity-60" />

      <div className="container-x relative grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo wordClassName="text-2xl" />
          <p className="mt-5 max-w-sm text-pretty text-mist">
            {t('footer.tagline')}
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-2 text-sm text-gold/90">
            <RayMark className="h-4 w-4" />
            {t('footer.partnerNote')}
          </p>
        </div>

        <div className="md:col-span-3 md:col-start-7">
          <h3 className="text-xs uppercase tracking-[0.25em] text-slate">
            {t('footer.navTitle')}
          </h3>
          <ul className="mt-5 space-y-3">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-mist transition-colors hover:text-gold"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-xs uppercase tracking-[0.25em] text-slate">
            {t('footer.contactTitle')}
          </h3>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-mist transition-colors hover:text-gold"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.phoneHref}
                className="text-mist transition-colors hover:text-gold"
              >
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-4 pt-1">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mist transition-colors hover:text-gold"
              >
                WhatsApp
              </a>
              <a
                href={site.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mist transition-colors hover:text-gold"
              >
                Telegram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x relative flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 text-sm text-slate sm:flex-row">
        <p>
          © {year} {site.name}. {t('footer.rights')}
        </p>
        <p>{t('footer.madeWith')}</p>
      </div>
    </footer>
  );
}
