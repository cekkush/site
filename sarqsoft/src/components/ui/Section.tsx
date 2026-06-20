import {cn} from '@/lib/utils';

/** Consistent vertical rhythm + centered container for page sections. */
export function Section({
  id,
  className,
  children,
  container = true,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  container?: boolean;
}) {
  return (
    <section id={id} className={cn('relative py-24 md:py-32', className)}>
      {container ? <div className="container-x">{children}</div> : children}
    </section>
  );
}
