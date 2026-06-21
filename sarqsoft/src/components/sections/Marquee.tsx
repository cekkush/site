'use client';

import {useTranslations} from 'next-intl';

export function Marquee() {
  const t = useTranslations('marquee');
  const items = t.raw('items') as string[];
  const row = [...items, ...items];

  return (
    <div className="marquee-mask relative overflow-hidden border-y border-white/10 bg-night/40 py-5">
      <div className="flex w-max animate-marquee-x">
        {row.map((word, i) => (
          <span
            key={i}
            className="flex items-center gap-6 whitespace-nowrap px-6 text-sm font-medium uppercase tracking-[0.22em] text-mist/80"
          >
            {word}
            <span className="text-gold/60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
