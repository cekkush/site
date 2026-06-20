'use client';

import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import {navItems} from '@/lib/site';
import {Logo} from '@/components/brand/Logo';
import {Button} from '@/components/ui/Button';
import {LangSwitcher} from './LangSwitcher';
import {cn} from '@/lib/utils';

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close menu on route change.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-white/5 bg-void/70 backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <div className="container-x flex h-[72px] items-center justify-between">
        <Link href="/" aria-label="Şərq Soft" className="relative z-10">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm tracking-tight transition-colors',
                  isActive
                    ? 'text-gold'
                    : 'text-mist hover:text-ink',
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LangSwitcher />
          <Button href="/contact" className="px-5 py-2.5" withArrow>
            {t('cta')}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 flex h-10 w-10 items-center justify-center lg:hidden"
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className="relative block h-3 w-6">
            <span
              className={cn(
                'absolute left-0 top-0 h-0.5 w-6 bg-ink transition-all duration-300',
                open && 'top-1.5 rotate-45',
              )}
            />
            <span
              className={cn(
                'absolute bottom-0 left-0 h-0.5 w-6 bg-ink transition-all duration-300',
                open && 'bottom-1 -rotate-45',
              )}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            className="fixed inset-0 z-0 flex flex-col bg-void/95 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: 0.05 * i + 0.1, duration: 0.5}}
                >
                  <Link
                    href={item.href}
                    className="font-display text-3xl tracking-tight text-ink"
                  >
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-6">
              <LangSwitcher />
              <Button href="/contact" withArrow>
                {t('cta')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
