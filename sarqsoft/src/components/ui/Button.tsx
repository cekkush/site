'use client';

import {Link} from '@/i18n/navigation';
import {cn} from '@/lib/utils';
import {Magnetic} from '@/components/motion/Magnetic';

const variants = {
  primary:
    'text-night bg-gradient-to-b from-gold-soft via-gold to-amber shadow-[0_8px_24px_-8px_rgba(246,160,74,0.6),inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-3px_8px_rgba(150,82,18,0.4)] hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-10px_rgba(246,160,74,0.85),inset_0_1px_0_rgba(255,255,255,0.6)] active:translate-y-0 active:shadow-[0_4px_14px_-8px_rgba(246,160,74,0.7),inset_0_2px_5px_rgba(150,82,18,0.45)]',
  outline:
    'beam text-ink border border-white/15 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] hover:-translate-y-0.5 hover:border-gold/50 hover:text-gold',
  ghost: 'text-ink/80 hover:text-gold',
} as const;

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
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
      className="relative z-[1] transition-transform duration-300 group-hover:translate-x-1"
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
    'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-tight transition-all duration-300 will-change-transform',
    variants[variant],
    className,
  );

  const inner = (
    <>
      {variant === 'primary' && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full"
        >
          <span className="absolute -inset-y-3 left-0 w-1/3 -translate-x-[160%] -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[340%]" />
        </span>
      )}
      <span className="relative z-[1]">{children}</span>
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
