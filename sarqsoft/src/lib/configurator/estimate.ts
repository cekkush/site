import {PRICING} from './config';
import {
  integrationById,
  moduleById,
  serviceById,
  sphereOfModule,
} from './catalog';
import type {Estimate, Loc, Phase, Selections} from './types';

const PHASE_ORDER: {key: string; title: Loc}[] = [
  {
    key: 'foundation',
    title: {
      az: 'Təməl (uçot, vergi, maliyyə)',
      en: 'Foundation (accounting, tax, finance)',
    },
  },
  {key: 'operations', title: {az: 'Əməliyyatlar', en: 'Operations'}},
  {
    key: 'people',
    title: {az: 'İnsanlar və sənədlər', en: 'People & documents'},
  },
  {key: 'insight', title: {az: 'Analitika', en: 'Insight'}},
];

const URGENCY_TIME: Record<string, number> = {asap: 0.8, normal: 1, flexible: 1.1};

export function estimate(sel: Selections): Estimate {
  const sizeFactor = PRICING.size[sel.size ?? 'small'] ?? 1;
  const depFactor = PRICING.deployment[sel.deployment ?? 'cloud'] ?? 1;
  const urgFactor = PRICING.urgency[sel.urgency ?? 'normal'] ?? 1;
  const factor = sizeFactor * depFactor * urgFactor;
  const sizeTime = 1 + (sizeFactor - 1) * 0.4;

  let oneMin = PRICING.baseMin;
  let oneMax = PRICING.baseMax;
  let monMin = 0;
  let monMax = 0;
  let weight = 0;
  let rawWeeks = 2;

  const mods = sel.modules
    .map((id) => moduleById.get(id))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  for (const mm of mods) {
    oneMin += mm.priceMin;
    oneMax += mm.priceMax;
    weight += mm.weight;
    rawWeeks += mm.weeks * PRICING.timeParallelism;
  }
  for (const id of sel.integrations) {
    const it = integrationById.get(id);
    if (!it) continue;
    oneMin += it.priceMin;
    oneMax += it.priceMax;
    weight += it.weight;
    rawWeeks += 0.4;
  }
  for (const id of sel.services) {
    const s = serviceById.get(id);
    if (!s) continue;
    weight += s.weight;
    if (s.kind === 'monthly') {
      monMin += s.priceMin;
      monMax += s.priceMax;
    } else {
      oneMin += s.priceMin;
      oneMax += s.priceMax;
      rawWeeks += 0.5;
    }
  }

  // platform usage (per active user) once real modules are in play
  if (mods.length) {
    monMin += Math.max(1, sel.users) * PRICING.userMonthlyMin;
    monMax += Math.max(1, sel.users) * PRICING.userMonthlyMax;
  }

  const round50 = (n: number) => Math.round((n * factor) / 50) * 50;
  oneMin = round50(oneMin);
  oneMax = round50(oneMax);
  monMin = Math.round(monMin / 10) * 10;
  monMax = Math.round(monMax / 10) * 10;

  const weeks = Math.max(
    2,
    Math.round(rawWeeks * sizeTime * (URGENCY_TIME[sel.urgency ?? 'normal'] ?? 1)),
  );

  // phases — bucket selected modules by their sphere group
  const byGroup: Record<string, string[]> = {};
  for (const mm of mods) {
    const g = sphereOfModule.get(mm.id)?.group ?? 'operations';
    (byGroup[g] ??= []).push(mm.id);
  }
  const phases: Phase[] = [];
  let setupAdded = false;
  for (const p of PHASE_ORDER) {
    const ids = byGroup[p.key];
    if (!ids || !ids.length) continue;
    let w =
      ids.reduce((a, id) => a + (moduleById.get(id)?.weeks ?? 0), 0) *
      PRICING.timeParallelism *
      sizeTime;
    if (!setupAdded) {
      w += 2; // discovery + setup lands in the first active phase
      setupAdded = true;
    }
    phases.push({
      key: p.key,
      title: p.title,
      weeks: Math.max(1, Math.round(w)),
      moduleIds: ids,
    });
  }

  const roiHours =
    Math.round(((mods.length * 7 + sel.integrations.length * 5) * sizeFactor) / 5) *
    5;

  const complexity =
    weight < 12
      ? 'light'
      : weight < 28
        ? 'standard'
        : weight < 50
          ? 'advanced'
          : 'enterprise';

  return {
    priceMin: oneMin,
    priceMax: oneMax,
    monthlyMin: monMin,
    monthlyMax: monMax,
    weeks,
    phases,
    roiHours,
    complexity,
    moduleCount: mods.length,
  };
}
