'use client';

import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/Button';
import {decodeSelections} from '@/lib/configurator/encode';
import {estimate} from '@/lib/configurator/estimate';
import type {Selections} from '@/lib/configurator/types';
import {Proposal} from './Proposal';

/** Reconstructs a personal proposal from the `?c=` link (no backend). */
export function ProposalView({locale}: {locale: string}) {
  const [sel, setSel] = useState<Selections | null>(null);
  const [invalid, setInvalid] = useState(false);
  const T = (az: string, en: string) => (locale === 'en' ? en : az);

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get('c');
    const decoded = c ? decodeSelections(c) : null;
    if (decoded) setSel(decoded);
    else setInvalid(true);
  }, []);

  if (invalid) {
    return (
      <div className="container-x py-32 text-center">
        <p className="font-display text-2xl text-ink">
          {T('Təklif tapılmadı', 'Proposal not found')}
        </p>
        <p className="mx-auto mt-3 max-w-md text-mist">
          {T(
            'Link səhvdir və ya köhnəlib. Özünüz üçün yeni təklif yığa bilərsiniz.',
            'The link is invalid or expired. You can build a fresh proposal yourself.',
          )}
        </p>
        <div className="mt-7 flex justify-center">
          <Button href="/configurator" withArrow>
            {T('Konfiquratoru aç', 'Open the configurator')}
          </Button>
        </div>
      </div>
    );
  }

  if (!sel) {
    return (
      <div className="container-x py-32 text-center text-slate">
        {T('Yüklənir…', 'Loading…')}
      </div>
    );
  }

  const est = estimate(sel);

  return (
    <div className="container-x py-12">
      <div className="no-print mx-auto mb-6 flex max-w-4xl flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-mist">
          {T('Bu, sizin üçün hazırlanmış təklifdir.', 'This proposal was prepared for you.')}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-full bg-gradient-to-b from-gold-soft via-gold to-amber px-5 py-2.5 text-sm font-semibold text-night"
          >
            {T('PDF yüklə', 'Download PDF')}
          </button>
          <Button href="/configurator" variant="outline">
            {T('Özün üçün yarat', 'Build your own')}
          </Button>
        </div>
      </div>
      <Proposal sel={sel} est={est} locale={locale} />
    </div>
  );
}
