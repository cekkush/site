'use client';

import {useRef} from 'react';
import {motion, useMotionValue, useSpring} from 'framer-motion';
import {cn} from '@/lib/utils';

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

/** Pulls its content toward the cursor on hover (pointer devices only). */
export function Magnetic({children, className, strength = 0.35}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, {stiffness: 160, damping: 15, mass: 0.3});
  const sy = useSpring(y, {stiffness: 160, damping: 15, mass: 0.3});

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{x: sx, y: sy}}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.div>
  );
}
