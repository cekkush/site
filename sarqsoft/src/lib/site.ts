export const locales = ['az', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'az';

export const site = {
  name: 'Şərq Soft',
  legalName: 'Şərq Soft MMC',
  domain: 'sarqsoft.az',
  url: 'https://sarqsoft.az',
  email: 'info@sarqsoft.az',
  phoneDisplay: '+994 50 870 03 23',
  phoneHref: 'tel:+994508700323',
  whatsapp: 'https://wa.me/994508700323',
  telegram: 'https://t.me/sarqsoft',
  partner: {
    name: 'Jey Soft',
    product: 'Jey ERP',
  },
} as const;

/** Top navigation — keys resolve in messages under `nav`. */
export const navItems = [
  {key: 'home', href: '/'},
  {key: 'jeyErp', href: '/jey-erp'},
  {key: 'about', href: '/about'},
  {key: 'partnership', href: '/partnership'},
  {key: 'contact', href: '/contact'},
] as const;
