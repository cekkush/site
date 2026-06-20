'use client';

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import {locales} from '@/lib/site';
import {cn} from '@/lib/utils';

export function LangSwitcher({className}: {className?: string}) {
  const pathname = usePathname();
  const router = useRouter();
  const active = useLocale();

  return (
    <div
      className={cn('inline-flex items-center text-sm font-medium', className)}
      role="group"
      aria-label="Language"
    >
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="px-1.5 text-white/20">/</span>}
          <button
            type="button"
            onClick={() => router.replace(pathname, {locale: l})}
            className={cn(
              'uppercase tracking-wide transition-colors',
              l === active ? 'text-gold' : 'text-mist hover:text-ink',
            )}
            aria-current={l === active ? 'true' : undefined}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
