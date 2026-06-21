'use client';

import {useRef} from 'react';
import {cn} from '@/lib/utils';

type CardProps = {
  className?: string;
  children: React.ReactNode;
  /** 3D tilt toward the cursor. */
  tilt?: boolean;
  /** Orbiting light along the border on hover. */
  beam?: boolean;
  /** Keep the beam running permanently (for featured cards). */
  beamAlways?: boolean;
};

/**
 * Interactive glass card: cursor-follow spotlight, subtle 3D tilt and an
 * orbiting light border. Falls back gracefully under reduced motion.
 */
export function Card({
  className,
  children,
  tilt = true,
  beam = true,
  beamAlways = false,
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useRef(false);

  function handleEnter() {
    reduce.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${(px * 100).toFixed(2)}%`);
    el.style.setProperty('--my', `${(py * 100).toFixed(2)}%`);
    if (tilt && !reduce.current) {
      el.style.setProperty('--rx', `${((0.5 - py) * 6).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${((px - 0.5) * 6).toFixed(2)}deg`);
    }
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        'group glass relative overflow-hidden rounded-2xl border border-white/10 p-7 hover:border-gold/35',
        (beam || beamAlways) && 'beam',
        beamAlways && 'beam-always',
        className,
      )}
      style={{
        transform:
          'perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
        transition:
          'transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(440px circle at var(--mx, 50%) var(--my, 50%), rgba(246,160,74,0.16), transparent 45%)',
        }}
      />
      <div className="relative z-[3]">{children}</div>
    </div>
  );
}
