import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // Azerbaijani is the primary language; English is secondary.
  locales: ['az', 'en'],
  defaultLocale: 'az',
  // Static hosting (GitHub Pages) has no middleware, so every locale is
  // always prefixed and we redirect `/` -> `/az/` via public/index.html.
  localePrefix: 'always',
});
