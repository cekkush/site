import {cn} from '@/lib/utils';

/** Glass surface card with a subtle gold hover edge. */
export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors duration-300 hover:border-gold/30',
        className,
      )}
    >
      {children}
    </div>
  );
}
