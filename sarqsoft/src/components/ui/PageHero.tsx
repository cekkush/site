import {cn} from '@/lib/utils';
import {Kicker} from './Kicker';
import {Reveal} from '@/components/motion/Reveal';
import {SplitText} from '@/components/motion/SplitText';

/** Compact hero used at the top of inner pages. */
export function PageHero({
  kicker,
  title,
  subtitle,
  className,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden pb-20 pt-40 md:pb-28 md:pt-48',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[440px] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(246,160,74,0.18),transparent_70%)]" />
      <div className="container-x relative">
        <Reveal>
          <Kicker>{kicker}</Kicker>
        </Reveal>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.04] tracking-tightest sm:text-6xl lg:text-7xl">
          <SplitText text={title} />
        </h1>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist text-pretty">
            {subtitle}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
