import { createI18n } from 'vue-i18n'
import az from './az.js'
import en from './en.js'

const STORAGE_KEY = 'sherq-lang'

function detectLocale() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'az' || saved === 'en') return saved
  // Default language is Azerbaijani per project spec.
  return 'az'
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: detectLocale(),
  fallbackLocale: 'en',
  messages: { az, en },
})

export function setLocale(locale) {
  i18n.global.locale.value = locale
  localStorage.setItem(STORAGE_KEY, locale)
  document.documentElement.lang = locale
}

// keep <html lang> in sync on first load
document.documentElement.lang = i18n.global.locale.value
