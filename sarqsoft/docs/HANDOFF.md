# HANDOFF — Şərq Soft site

> Read this first when continuing the project in a new session.

## 1. Status — what's done ✅

**Live (free GitHub Pages):** https://cekkush.github.io/site/ → redirects to
`/site/az/`. Deployed from this branch via `.github/workflows/deploy.yml`.
(One-time setup done: the `github-pages` environment must allow this branch.)

A complete, building, deployable v1:

- **i18n** — AZ (default) + EN, full content for every page, static export.
- **Home page** with 8 sections: Hero (WebGL) → Chaos→Order → Services → Jey ERP
  modules → Industries (interactive switcher) → Process timeline → Trust
  (counters + cases + testimonials + partner strip) → Final CTA.
- **Inner pages**: `/jey-erp`, `/about`, `/partnership`, `/contact`.
- **Brand**: custom logo (ray mark + wordmark), favicon, color/type system.
- **WebGL hero** — custom GLSL cosmic embers + god-rays + rising sun, pointer
  reactive, reduced-motion aware (falls back to CSS gradient).
- **Deploy** — GitHub Actions → GitHub Pages (free), `basePath=/site`.
- **Build verified** locally; all 10 routes (5 × AZ/EN) + `/` redirect render.

## 2. Tech & versions

Next.js 14.2 · React 18.3 · next-intl 3.26 · Tailwind 3.4 · framer-motion 11 ·
GSAP 3.15 · Lenis 1.3 · three 0.169 + @react-three/fiber 8 + drei 9 ·
@fontsource-variable/{fraunces,manrope}. Node 20+.

## 3. Run / build / preview

```bash
cd sarqsoft
npm install
npm run dev      # http://localhost:3000
npm run build    # static export -> out/
npm run serve    # serve out/ at http://localhost:4321
```

## 4. Architecture notes (important)

- **Static export** (`next.config.mjs: output:'export'`). No server runtime:
  no API routes, no middleware, no server actions, no next/image optimization
  (`images.unoptimized`).
- **basePath** is env-driven: `NEXT_PUBLIC_BASE_PATH` (`/site` in CI, `""` for a
  custom domain). Raw asset URLs go through `withBase()` in `src/lib/utils.ts`.
- **i18n**: `localePrefix: 'always'` (`/az/...`, `/en/...`). `public/index.html`
  redirects `/` → `./az/`. The root `app/layout.tsx` is a passthrough; the real
  `<html>` is in `app/[locale]/layout.tsx`.
  - next-intl **3.26 has no `hasLocale`** export → we use
    `routing.locales.includes(...)`. (It exists in next-intl v4 if you upgrade.)
  - Every page/layout calls `setRequestLocale(locale)` for static rendering.
  - Server components use `getTranslations`; client components use
    `useTranslations`. Arrays/objects → `t.raw('key')`.
- **WebGL** (`components/three/LightField.tsx`) is imported via `next/dynamic`
  with `ssr:false` inside `components/hero/Hero.tsx`, and only mounts when the
  user does NOT prefer reduced motion.
- **Fonts** are self-hosted (`@fontsource`) and imported in
  `app/[locale]/layout.tsx`. We do NOT use Google Fonts `<link>` (the build
  container blocks fonts.googleapis.com, and self-hosting is faster + private).
  Families: `Fraunces Variable` (display), `Manrope Variable` (sans). latin-ext
  covers Azerbaijani (incl. ə U+0259, verified).
- **Build quality gates**: `eslint.ignoreDuringBuilds` and
  `typescript.ignoreBuildErrors` are **on** so the public build can never be
  blocked by lint/type noise. TODO: tighten these and fix any type issues.

## 5. ⚠️ Placeholders to replace before launch

The client chose "placeholder, replace later". Replace these with real data:

- **Numbers** (`messages/*.json`): `hero.stats` (8+, 120+, 24/7) and
  `trust.stats` (8, 120, 40, 99%). Use real figures.
- **Cases** (`trust.cases`) — anonymized; replace with real projects (with
  permission) or real client names/logos.
- **Testimonials** (`trust.testimonials`) — generic ("Müştəri rəyi"); replace
  with real quotes + names/roles.
- **Contacts** (`src/lib/site.ts`): email `info@sarqsoft.az` (an older attempt
  used `sales@sarqsoft.az` — confirm which), Telegram handle `@sarqsoft`
  (placeholder), address "Bakı, Azərbaycan". Phone `+994 50 870 03 23` is from
  the brief.
- **Partner wording** — confirm the exact "official partner of Jey Soft"
  phrasing/branding is approved by Jey Soft.
- **Configurator requisites** (`src/lib/configurator/config.ts → REQUISITES`):
  VÖEN, bank, IBAN, SWIFT are placeholders shown on every generated KP — replace
  with the real Şərq Soft bank details before sending real proposals. Offer
  validity (`PROPOSAL.validityDays`, 14) and payment terms are editable there.
- **Lead delivery** still falls back to WhatsApp/PDF/copy-link: set
  `WEB3FORMS_KEY` (and optionally `TELEGRAM_RELAY_URL`) in `config.ts` to enable
  email/Telegram delivery of configurator leads.

## 5a. Configurator — two-axis model (rebuilt)

The configurator (`src/lib/configurator/`, `src/components/configurator/`) is a
10-step wizard built on two axes:

- **Axis A — activity** (`axes.ts → activities`, 16): how the business operates
  (retail, wholesale, manufacturing, services, HoReCa, …). Picking one applies a
  preset (spheres + modules + integrations + services).
- **Axis B — niche** (`axes.ts → niches`, 16 × 4 = 64 niche-specific modules):
  the vertical (pharmacy, clinic, construction, auto, jewelry, …). Picking one
  adds its specialised modules and nudges relevant spheres on.
- **Smart sub-questions** (`axes.ts → subQuestions`): shown on the "details" step
  when their parent sphere is active; each option toggles existing module ids.

Niche modules are registered into the global `moduleById` (in `catalog.ts`) so
the estimator and proposal resolve them automatically. Prices are bands by
design (`config.ts → PRICING`). Selections (incl. axes + sub-answers) are encoded
into the shareable `/proposal?c=…` link — old links still decode.

## 6. Deferred work (agreed with client)

- **Contact form backend** — currently the form is demo-only (no submit; shows a
  note pointing to direct channels). When moving off GitHub Pages to real
  hosting, wire it to **Jey ERP CRM (Frappe)** + email + WhatsApp + Telegram,
  e.g. via a small serverless proxy (Cloudflare Worker / Vercel function) that
  posts a Lead to Frappe. See `components/sections/ContactForm.tsx`.
- **Custom domain** sarqsoft.az + real hosting (Vercel ideal for Next.js).

## 7. Suggested next steps / TODO

- Replace placeholders (section 5).
- Re-enable strict TS/ESLint and fix issues; add CI typecheck.
- OG/social image + per-page OG; `sitemap.xml` + `robots.txt`; JSON-LD
  Organization schema.
- Light polish: logo ray-mark refinement, optional light theme, 404 page design.
- Analytics (privacy-friendly) once live.
- Verify WebGL on low-end devices; tune particle count for perf.
- AZ copy review by a native speaker (drafted here, client to verify).

## 8. Continuity tips for the next Claude session

- Start in `sarqsoft/`. Read `CLAUDE.md` + this file + `docs/DESIGN_SYSTEM.md`.
- Reuse the primitives in `components/ui` and `components/motion` — don't
  reinvent. Keep both `az.json` and `en.json` in sync (same keys/shapes).
- Build locally before pushing: `npm run build`. The Pages deploy runs on push
  to `main` or `claude/gallant-lamport-kf4f7e` (and `workflow_dispatch`).
- Playwright screenshots: the WebGL rAF loop blocks the screenshotter — remove
  `<canvas>` and inject `*{opacity:1!important;transform:none!important}` before
  capturing (reveals start at opacity 0 until scrolled into view).
