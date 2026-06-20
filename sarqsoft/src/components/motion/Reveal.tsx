'use client';

import {motion} from 'framer-motion';
import {cn} from '@/lib/utils';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{opacity: 0, y}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once, margin: '-10% 0px -10% 0px'}}
      transition={{duration: 0.85, ease: EASE, delay}}
    >
      {children}
    </motion.div>
  );
}
