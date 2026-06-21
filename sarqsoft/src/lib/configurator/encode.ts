import {emptySelections, type Selections} from './types';

/* Encode the whole selection set into a compact, URL-safe string so each
 * client's proposal lives entirely in its link — no backend required. */

function b64urlEncode(s: string): string {
  const b64 =
    typeof btoa !== 'undefined'
      ? btoa(unescape(encodeURIComponent(s)))
      : Buffer.from(s, 'utf-8').toString('base64');
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(s: string): string {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b64.length % 4 ? '='.repeat(4 - (b64.length % 4)) : '';
  const raw =
    typeof atob !== 'undefined'
      ? atob(b64 + pad)
      : Buffer.from(b64 + pad, 'base64').toString('binary');
  return decodeURIComponent(escape(raw));
}

export function encodeSelections(sel: Selections): string {
  const compact = {
    i: sel.industry,
    a: sel.activity,
    ni: sel.niche,
    z: sel.size,
    u: sel.users,
    b: sel.branches,
    c: sel.current,
    g: sel.goals,
    s: sel.spheres,
    m: sel.modules,
    q: sel.subAnswers,
    n: sel.integrations,
    v: sel.services,
    d: sel.deployment,
    r: sel.urgency,
    bu: sel.budget,
    k: sel.contact,
  };
  return b64urlEncode(JSON.stringify(compact));
}

export function decodeSelections(str: string): Selections | null {
  try {
    const c = JSON.parse(b64urlDecode(str)) as Record<string, unknown>;
    const base = emptySelections();
    return {
      ...base,
      industry: c.i as string | undefined,
      activity: c.a as string | undefined,
      niche: c.ni as string | undefined,
      size: c.z as Selections['size'],
      users: (c.u as number) ?? base.users,
      branches: (c.b as number) ?? base.branches,
      current: c.c as string | undefined,
      goals: (c.g as string[]) ?? [],
      spheres: (c.s as string[]) ?? [],
      modules: (c.m as string[]) ?? [],
      subAnswers: (c.q as Record<string, string[]>) ?? {},
      integrations: (c.n as string[]) ?? [],
      services: (c.v as string[]) ?? [],
      deployment: c.d as string | undefined,
      urgency: c.r as string | undefined,
      budget: c.bu as string | undefined,
      contact: {...base.contact, ...((c.k as object) ?? {})},
    };
  } catch {
    return null;
  }
}
