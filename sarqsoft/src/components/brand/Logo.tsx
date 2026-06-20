import {cn} from '@/lib/utils';
import {RayMark} from './RayMark';

export function Logo({
  className,
  showWord = true,
  wordClassName,
}: {
  className?: string;
  showWord?: boolean;
  wordClassName?: string;
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <RayMark className="h-8 w-8 shrink-0" />
      {showWord && (
        <span
          className={cn(
            'font-display text-xl font-semibold tracking-tight text-ink',
            wordClassName,
          )}
        >
          Şərq<span className="text-gold"> Soft</span>
        </span>
      )}
    </span>
  );
}
