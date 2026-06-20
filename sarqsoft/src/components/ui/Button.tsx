'use client';

import {Link} from '@/i18n/navigation';
import {cn} from '@/lib/utils';
import {Magnetic} from '@/components/motion/Magnetic';

const variants = {
  primary:
    'bg-gradient-to-r from-gold-soft via-gold to-amber text-night shadow-glow hover:shadow-[0_0_70px_-12px_rgba(246,160,74,0.75)]',
  outline:
    'border border-white/15 bg-white/[0.02] text-ink hover:border-gold/50 hover:text-gold',
  ghost: 'text-ink/80 hover:text-gold',
} as const;

type ButtonProps = {
  children: React.ReactNode;
  /** Locale-aware internal path, e.g. "/jey-erp". */
  href?: string;
  /** Raw external/absolute href (tel:, mailto:, https://). */
  external?: string;
  variant?: keyof typeof variants;
  className?: string;
  magnetic?: boolean;
  withArrow?: boolean;
  ariaLabel?: string;
};

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="transition-transform duration-300 group-hover:translate-x-1"
      aria-hidden
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Button({
  children,
  href,
  external,
  variant = 'primary',
  className,
  magnetic = true,
  withArrow = false,
  ariaLabel,
}: ButtonProps) {
  const cls = cn(
    'group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-tight transition-all duration-300 will-change-transform',
    variants[variant],
    className,
  );

  const inner = (
    <>
      {children}
      {withArrow && <Arrow />}
    </>
  );

  let el: React.ReactNode;
  if (external) {
    const isHttp = external.startsWith('http');
    el = (
      <a
        href={external}
        target={isHttp ? '_blank' : undefined}
        rel={isHttp ? 'noopener noreferrer' : undefined}
        className={cls}
        aria-label={ariaLabel}
      >
        {inner}
      </a>
    );
  } else if (href) {
    el = (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  } else {
    el = (
      <button type="button" className={cls} aria-label={ariaLabel}>
        {inner}
      </button>
    );
  }

  return magnetic ? <Magnetic strength={0.25}>{el}</Magnetic> : <>{el}</>;
}
