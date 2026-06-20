import {cn} from '@/lib/utils';

export function Kicker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-gold/90',
        className,
      )}
    >
      <span className="h-px w-8 bg-gradient-to-r from-gold to-transparent" />
      {children}
    </span>
  );
}
