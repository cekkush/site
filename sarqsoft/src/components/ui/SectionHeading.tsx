import {cn} from '@/lib/utils';
import {Kicker} from './Kicker';
import {Reveal} from '@/components/motion/Reveal';
import {SplitText} from '@/components/motion/SplitText';

type Props = {
  kicker?: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  kicker,
  title,
  intro,
  align = 'left',
  className,
  titleClassName,
}: Props) {
  return (
    <div
      data-parallax="0.05"
      className={cn(
        'flex max-w-3xl flex-col gap-6',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      {kicker && (
        <Reveal>
          <Kicker>{kicker}</Kicker>
        </Reveal>
      )}
      <h2
        className={cn(
          'font-display text-[2.5rem] font-medium leading-[1.02] tracking-tightest sm:text-5xl lg:text-[3.9rem]',
          titleClassName,
        )}
      >
        <SplitText text={title} />
      </h2>
      {intro && (
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-lg leading-relaxed text-mist text-pretty sm:text-xl">
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
