'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {cn} from '@/lib/utils';

function Field({
  label,
  name,
  type = 'text',
  textarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
}) {
  const cls =
    'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-ink placeholder-slate/60 outline-none transition-colors focus:border-gold/50 focus:bg-white/[0.05]';
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-slate">{label}</span>
      {textarea ? (
        <textarea name={name} rows={4} className={cls} />
      ) : (
        <input name={name} type={type} className={cls} />
      )}
    </label>
  );
}

export function ContactForm() {
  const t = useTranslations('contactPage');
  const f = useTranslations('contactPage.fields');
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
    >
      <h2 className="font-display text-2xl text-ink">{t('formTitle')}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label={f('name')} name="name" />
        <Field label={f('company')} name="company" />
        <Field label={f('phone')} name="phone" type="tel" />
        <Field label={f('email')} name="email" type="email" />
      </div>
      <div className="mt-4">
        <Field label={f('message')} name="message" textarea />
      </div>

      <button
        type="submit"
        className={cn(
          'mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-gold-soft via-gold to-amber px-7 py-3.5 text-sm font-semibold text-night shadow-glow transition-shadow duration-300 hover:shadow-[0_0_70px_-12px_rgba(246,160,74,0.75)] sm:w-auto',
        )}
      >
        {t('submit')}
      </button>

      {sent && (
        <p className="mt-5 rounded-xl border border-gold/30 bg-gold/[0.06] px-4 py-3 text-sm text-gold/90">
          {t('deferNote')}
        </p>
      )}
      {!sent && (
        <p className="mt-5 text-sm leading-relaxed text-slate">
          {t('deferNote')}
        </p>
      )}
    </form>
  );
}
