/** Bilingual string. The configurator data layer is self-contained (not in the
 *  next-intl message files) because it's structured data, not UI chrome. */
export type Loc = {az: string; en: string};

export type Tier = 'micro' | 'small' | 'medium' | 'large';

export interface Module {
  id: string;
  name: Loc;
  desc: Loc;
  /** relative effort weight (drives price + time) */
  weight: number;
  /** rough implementation time contribution, in weeks */
  weeks: number;
  /** one-time price contribution range, in AZN */
  priceMin: number;
  priceMax: number;
}

export type SphereGroup = 'foundation' | 'operations' | 'people' | 'insight';

export interface Sphere {
  id: string;
  name: Loc;
  tagline: Loc;
  icon: string;
  group: SphereGroup;
  modules: Module[];
}

export type IntegrationCategory = 'bank' | 'gov' | 'commerce' | 'data' | 'comm';

export interface Integration {
  id: string;
  name: Loc;
  desc: Loc;
  category: IntegrationCategory;
  weight: number;
  priceMin: number;
  priceMax: number;
}

export interface Service {
  id: string;
  name: Loc;
  desc: Loc;
  kind: 'oneTime' | 'monthly';
  weight: number;
  priceMin: number;
  priceMax: number;
  recommended?: boolean;
}

export interface Industry {
  id: string;
  name: Loc;
  icon: string;
  /** preset selections applied on pick */
  spheres: string[];
  modules: string[];
  integrations: string[];
  services: string[];
}

/* ------------------------------------------------------------------ *
 *  TWO-AXIS MODEL
 *  Axis A = Activity (how the business operates)
 *  Axis B = Niche (which vertical it serves)
 *  Together they drive a tailored preset + niche-specific modules.
 * ------------------------------------------------------------------ */

export type ActivityGroup = 'trade' | 'production' | 'service' | 'other';

export interface Activity {
  id: string;
  name: Loc;
  desc: Loc;
  icon: string;
  group: ActivityGroup;
  /** preset selections applied on pick */
  spheres: string[];
  modules: string[];
  integrations: string[];
  services: string[];
}

export type NicheGroup = 'health' | 'goods' | 'tech' | 'service';

export interface Niche {
  id: string;
  name: Loc;
  desc: Loc;
  icon: string;
  group: NicheGroup;
  /** niche-specific modules (registered in the global module map) */
  modules: Module[];
  /** universal/operational spheres this niche typically needs */
  spheres: string[];
  /** integrations this niche commonly relies on */
  integrations: string[];
}

/** A smart sub-question shown when its parent sphere is selected.
 *  Each chosen option toggles concrete module ids on/off. */
export interface SubOption {
  id: string;
  name: Loc;
  /** modules switched on when this option is chosen */
  modules: string[];
}

export interface SubQuestion {
  id: string;
  /** parent sphere id — question only shows when that sphere is active */
  sphere: string;
  prompt: Loc;
  hint?: Loc;
  multi: boolean;
  options: SubOption[];
}

export interface OptionItem {
  id: string;
  name: Loc;
  hint?: Loc;
  /** price/effort multiplier (size, deployment, urgency) */
  factor?: number;
}

export interface Contact {
  company: string;
  name: string;
  email: string;
  phone: string;
  messenger: string;
  note: string;
}

export interface Selections {
  /** legacy single-axis preset (kept for old shared links) */
  industry?: string;
  /** Axis A — activities (how the business operates; multi-select) */
  activities: string[];
  /** Axis B — niche / vertical (single) */
  niche?: string;
  size?: Tier;
  users: number;
  branches: number;
  current?: string;
  goals: string[];
  spheres: string[];
  modules: string[];
  /** smart sub-question answers: questionId -> chosen optionIds */
  subAnswers: Record<string, string[]>;
  integrations: string[];
  services: string[];
  deployment?: string;
  urgency?: string;
  budget?: string;
  contact: Contact;
}

export function emptySelections(): Selections {
  return {
    users: 5,
    branches: 1,
    activities: [],
    goals: [],
    spheres: [],
    modules: [],
    subAnswers: {},
    integrations: [],
    services: [],
    contact: {company: '', name: '', email: '', phone: '', messenger: '', note: ''},
  };
}

export interface Phase {
  key: string;
  title: Loc;
  weeks: number;
  moduleIds: string[];
}

export interface Estimate {
  /** one-time investment band, AZN */
  priceMin: number;
  priceMax: number;
  /** monthly band (support/subscriptions), AZN */
  monthlyMin: number;
  monthlyMax: number;
  /** total implementation timeline, weeks */
  weeks: number;
  phases: Phase[];
  /** rough hours saved per month across the team */
  roiHours: number;
  complexity: 'light' | 'standard' | 'advanced' | 'enterprise';
  moduleCount: number;
}

export function pick(loc: Loc | undefined, locale: string): string {
  if (!loc) return '';
  return locale === 'en' ? loc.en : loc.az;
}
