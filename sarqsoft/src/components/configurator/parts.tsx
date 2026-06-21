'use client';

import {cn} from '@/lib/utils';

/* ------------------------------------------------------------------ *
 *  Minimal line-icon set (24x24, currentColor). Keyed by sphere id.
 * ------------------------------------------------------------------ */

const ICONS: Record<string, React.ReactNode> = {
  accounting: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8M8 11h8M8 15h5" />
    </>
  ),
  tax: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M13 3v5h5M9 13l6-2M10 17l4-1" />
    </>
  ),
  finance: (
    <>
      <path d="M4 19V5M4 19h16" />
      <path d="M8 15l3-4 3 2 4-6" />
    </>
  ),
  sales: (
    <>
      <path d="M3 6h2l2 11h11l2-8H7" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </>
  ),
  purchase: (
    <>
      <path d="M6 7h12l-1 12H7zM9 7a3 3 0 0 1 6 0" />
    </>
  ),
  warehouse: (
    <>
      <path d="M3 9l9-5 9 5v11H3z" />
      <path d="M7 20v-7h10v7" />
    </>
  ),
  production: (
    <>
      <path d="M4 20V9l5 3V9l5 3V9l6 3v8z" />
    </>
  ),
  retail: (
    <>
      <rect x="4" y="9" width="16" height="11" rx="1" />
      <path d="M8 9V6a4 4 0 0 1 8 0v3" />
    </>
  ),
  hr: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0M16 7a3 3 0 0 1 0 6M15 20a6 6 0 0 1 6-3" />
    </>
  ),
  docs: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M9 12h6M9 16h6M9 8h3" />
    </>
  ),
  projects: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 9l2 2 4-4M9 15h6" />
    </>
  ),
  bi: (
    <>
      <path d="M4 20V4M4 20h16" />
      <rect x="8" y="11" width="2.5" height="6" />
      <rect x="13" y="7" width="2.5" height="10" />
    </>
  ),
  integration: (
    <>
      <circle cx="7" cy="7" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
      <path d="M9 9l6 6M14 7h3v3" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1A3.5 3.5 0 0 1 17 18z" />
    </>
  ),
};

export function Icon({name, className}: {name: string; className?: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-6 w-6', className)}
      aria-hidden
    >
      {ICONS[name] ?? ICONS.integration}
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden>
      <path
        d="M5 12l4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 *  Selectable card (multi/single). Light: only border/bg transitions.
 * ------------------------------------------------------------------ */

export function ChoiceCard({
  selected,
  onClick,
  icon,
  title,
  desc,
  badge,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  icon?: string;
  title: string;
  desc?: string;
  badge?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'glass group relative flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors duration-200',
        selected
          ? 'border-gold/60 bg-gold/[0.06]'
          : 'border-white/10 hover:border-white/25',
        className,
      )}
    >
      {icon && (
        <span
          className={cn(
            'shrink-0 transition-colors',
            selected ? 'text-gold' : 'text-mist group-hover:text-ink',
          )}
        >
          <Icon name={icon} />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="font-display text-[15px] leading-tight text-ink">
            {title}
          </span>
          {badge && (
            <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold">
              {badge}
            </span>
          )}
        </span>
        {desc && (
          <span className="mt-1 block text-[13px] leading-snug text-slate">
            {desc}
          </span>
        )}
      </span>
      <span
        className={cn(
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors',
          selected
            ? 'border-gold bg-gold text-night'
            : 'border-white/25 text-transparent',
        )}
      >
        <Check />
      </span>
    </button>
  );
}

/* Small chip (goals / quick toggles) */
export function Pill({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'rounded-full border px-4 py-2 text-sm transition-colors duration-200',
        selected
          ? 'border-gold/60 bg-gold/10 text-gold'
          : 'border-white/12 text-mist hover:border-white/30 hover:text-ink',
      )}
    >
      {children}
    </button>
  );
}

/* Single-select row with optional hint */
export function OptionRow({
  selected,
  onClick,
  title,
  hint,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'glass flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors duration-200',
        selected ? 'border-gold/60 bg-gold/[0.06]' : 'border-white/10 hover:border-white/25',
      )}
    >
      <span>
        <span className="block text-[15px] text-ink">{title}</span>
        {hint && <span className="mt-0.5 block text-[12px] text-slate">{hint}</span>}
      </span>
      <span
        className={cn(
          'flex h-4 w-4 shrink-0 rounded-full border-2 transition-colors',
          selected ? 'border-gold bg-gold' : 'border-white/30',
        )}
      />
    </button>
  );
}

/* Numeric stepper */
export function NumberStepper({
  value,
  onChange,
  min = 1,
  max = 9999,
  step = 1,
  label,
  suffix,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label: string;
  suffix?: string;
}) {
  const set = (v: number) => onChange(Math.max(min, Math.min(max, v)));
  return (
    <div>
      <label className="mb-2 block text-sm text-mist">{label}</label>
      <div className="glass flex items-center justify-between rounded-xl border border-white/10 px-2 py-1.5">
        <button
          type="button"
          onClick={() => set(value - step)}
          className="h-9 w-9 rounded-lg text-xl text-mist transition-colors hover:bg-white/5 hover:text-ink"
          aria-label="−"
        >
          −
        </button>
        <span className="font-display text-lg text-ink">
          {value}
          {suffix ? <span className="ml-1 text-sm text-slate">{suffix}</span> : null}
        </span>
        <button
          type="button"
          onClick={() => set(value + step)}
          className="h-9 w-9 rounded-lg text-xl text-mist transition-colors hover:bg-white/5 hover:text-ink"
          aria-label="+"
        >
          +
        </button>
      </div>
    </div>
  );
}

/* Text field / textarea */
export function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const cls =
    'glass w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-[15px] text-ink placeholder:text-slate/70 outline-none transition-colors focus:border-gold/60';
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-mist">
        {label}
        {required && <span className="text-gold"> *</span>}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={cls}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </label>
  );
}

/* Progress bar */
export function ProgressBar({value}: {value: number}) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
      <div
        className="h-full rounded-full bg-gradient-to-r from-gold-soft via-gold to-amber transition-[width] duration-500 ease-out"
        style={{width: `${Math.round(value * 100)}%`}}
      />
    </div>
  );
}
