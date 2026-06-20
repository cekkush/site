'use client';

import {motion, type Variants} from 'framer-motion';
import {cn} from '@/lib/utils';

type SplitTextProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
};

const EASE = [0.16, 1, 0.3, 1] as const;

const child: Variants = {
  hidden: {y: '115%'},
  show: {y: 0, transition: {duration: 0.9, ease: EASE}},
};

/**
 * Word-by-word masked reveal for headlines. Each word slides up from behind a
 * clipping mask with a stagger.
 */
export function SplitText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.07,
}: SplitTextProps) {
  const words = text.split(' ');

  const container: Variants = {
    hidden: {},
    show: {transition: {staggerChildren: stagger, delayChildren: delay}},
  };

  return (
    <motion.span
      className={cn('inline', className)}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{once: true, margin: '-12% 0px'}}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden
        >
          <motion.span
            className={cn('inline-block', wordClassName)}
            variants={child}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
