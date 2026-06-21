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
  industry?: string;
  size?: Tier;
  users: number;
  branches: number;
  current?: string;
  goals: string[];
  spheres: string[];
  modules: string[];
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
    goals: [],
    spheres: [],
    modules: [],
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
