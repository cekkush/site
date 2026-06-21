/**
 * Lead-delivery + pricing configuration for the configurator.
 *
 * Everything here ships to the static client, so it must contain NO secrets.
 * - Web3Forms uses a public "access key" (safe to expose) bound to an inbox.
 * - Telegram must go through a relay (e.g. a free Cloudflare Worker) that keeps
 *   the bot token server-side. Never put a raw bot token in client code.
 */

// https://web3forms.com — create a free key for info@sarqsoft.az and paste it.
// While empty, the wizard still works and falls back to copy / mailto / link.
export const WEB3FORMS_KEY = '';

// Optional: URL of a relay that forwards the lead to Telegram (and/or CRM).
// Leave empty to disable. See docs/CONFIGURATOR.md for a ready Worker snippet.
export const TELEGRAM_RELAY_URL = '';

export const CURRENCY = '₼'; // AZN

/** Rough, fully-editable pricing knobs. Prices are bands by design. */
export const PRICING = {
  baseMin: 600,
  baseMax: 1200,
  size: {micro: 0.7, small: 1, medium: 1.55, large: 2.4} as Record<string, number>,
  deployment: {cloud: 1, hybrid: 1.15, onprem: 1.3} as Record<string, number>,
  urgency: {flexible: 0.95, normal: 1, asap: 1.25} as Record<string, number>,
  /** weeks compress as scope grows (parallel workstreams) */
  timeParallelism: 0.62,
  /** per-extra-user monthly cost band */
  userMonthlyMin: 6,
  userMonthlyMax: 12,
};
