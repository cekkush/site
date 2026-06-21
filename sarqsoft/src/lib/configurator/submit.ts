import {CURRENCY, TELEGRAM_RELAY_URL, WEB3FORMS_KEY} from './config';
import {
  integrationById,
  moduleById,
  serviceById,
  sphereById,
} from './catalog';
import {activityById, nicheById} from './axes';
import {pick, type Estimate, type Selections} from './types';

const names = (ids: string[], map: Map<string, {name: import('./types').Loc}>, locale: string) =>
  ids
    .map((id) => pick(map.get(id)?.name, locale))
    .filter(Boolean)
    .join(', ');

/** Human-readable lead summary used for email / Telegram / clipboard. */
export function buildSummary(
  sel: Selections,
  est: Estimate,
  locale: string,
  proposalUrl: string,
): string {
  const L = locale === 'en';
  const money = `${est.priceMin.toLocaleString()}–${est.priceMax.toLocaleString()} ${CURRENCY}`;
  const monthly =
    est.monthlyMax > 0
      ? `${est.monthlyMin.toLocaleString()}–${est.monthlyMax.toLocaleString()} ${CURRENCY}/${L ? 'mo' : 'ay'}`
      : '—';

  const lines = [
    `🟡 ${L ? 'NEW PROPOSAL REQUEST' : 'YENİ KP SORĞUSU'} — Şərq Soft`,
    '',
    `${L ? 'Company' : 'Şirkət'}: ${sel.contact.company || '—'}`,
    `${L ? 'Contact' : 'Əlaqə'}: ${sel.contact.name || '—'}`,
    `${L ? 'Phone' : 'Telefon'}: ${sel.contact.phone || '—'}`,
    `Email: ${sel.contact.email || '—'}`,
    sel.contact.messenger ? `Messenger: ${sel.contact.messenger}` : '',
    '',
    `${L ? 'Activity' : 'Fəaliyyət'}: ${sel.activities.map((id) => pick(activityById.get(id)?.name, locale)).filter(Boolean).join(', ') || '—'}`,
    `${L ? 'Niche' : 'Sahə/niş'}: ${pick(nicheById.get(sel.niche ?? '')?.name, locale) || '—'}`,
    `${L ? 'Size' : 'Ölçü'}: ${sel.size ?? '—'} · ${L ? 'users' : 'istifadəçi'}: ${sel.users} · ${L ? 'branches' : 'filial'}: ${sel.branches}`,
    `${L ? 'Current system' : 'Mövcud sistem'}: ${sel.current ?? '—'}`,
    `${L ? 'Deployment' : 'Yerləşdirmə'}: ${sel.deployment ?? '—'} · ${L ? 'urgency' : 'tələskənlik'}: ${sel.urgency ?? '—'} · ${L ? 'budget' : 'büdcə'}: ${sel.budget ?? '—'}`,
    '',
    `${L ? 'Spheres' : 'Sahələr'}: ${names(sel.spheres, sphereById as never, locale) || '—'}`,
    `${L ? 'Modules' : 'Modullar'} (${sel.modules.length}): ${names(sel.modules, moduleById as never, locale) || '—'}`,
    `${L ? 'Integrations' : 'İnteqrasiyalar'}: ${names(sel.integrations, integrationById as never, locale) || '—'}`,
    `${L ? 'Services' : 'Xidmətlər'}: ${names(sel.services, serviceById as never, locale) || '—'}`,
    '',
    `${L ? 'Estimate' : 'Təxmini'}: ${money} · ${L ? 'monthly' : 'aylıq'}: ${monthly} · ~${est.weeks} ${L ? 'weeks' : 'həftə'} · ${est.complexity}`,
    sel.contact.note ? `\n${L ? 'Note' : 'Qeyd'}: ${sel.contact.note}` : '',
    '',
    `🔗 ${L ? 'Full proposal' : 'Tam KP'}: ${proposalUrl}`,
  ];
  return lines.filter((l) => l !== '').join('\n');
}

export type SubmitResult = {ok: boolean; channels: string[]; reason?: string};

/** Deliver the lead via the configured channels. Returns which channels fired.
 *  With nothing configured it reports ok:false so the UI shows the manual path. */
export async function submitLead(
  sel: Selections,
  est: Estimate,
  locale: string,
  proposalUrl: string,
): Promise<SubmitResult> {
  const summary = buildSummary(sel, est, locale, proposalUrl);
  const channels: string[] = [];

  const tasks: Promise<void>[] = [];

  if (WEB3FORMS_KEY) {
    tasks.push(
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `KP / Lead — ${sel.contact.company || sel.contact.name || 'Şərq Soft'}`,
          from_name: sel.contact.name || 'Şərq Soft configurator',
          email: sel.contact.email || 'no-reply@sarqsoft.az',
          message: summary,
        }),
      }).then((r) => {
        if (r.ok) channels.push('email');
      }),
    );
  }

  if (TELEGRAM_RELAY_URL) {
    tasks.push(
      fetch(TELEGRAM_RELAY_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text: summary, source: 'configurator'}),
      }).then((r) => {
        if (r.ok) channels.push('telegram');
      }),
    );
  }

  if (!tasks.length) return {ok: false, channels, reason: 'no-endpoint'};

  try {
    await Promise.allSettled(tasks);
    return {ok: channels.length > 0, channels};
  } catch {
    return {ok: channels.length > 0, channels, reason: 'network'};
  }
}
