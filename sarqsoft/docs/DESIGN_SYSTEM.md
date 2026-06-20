# DESIGN SYSTEM — Şərq Soft

## Palette (Tailwind tokens → `tailwind.config.ts`, mirrored in `globals.css`)

**Cosmos (backgrounds, dark → light):**
`void #04060d` (page) · `night #070b18` · `deep #0c1124` · `dusk #131b34` ·
`haze #1c2746`

**East light (sunrise accents):**
`gold #ecb24c` (+`gold-soft #f6cf85`, `gold-deep #cf9230`) · `amber #f6a04a` ·
`coral #ff7d55` · `ember #ff5a52` · `cream #fff3d8`

**Ink / text:**
`ink #f5f2ea` (headings) · `mist #b3bad2` (body) · `slate #79829f` (muted/labels)

Gradient text utility: `.text-gradient-gold`. Gold fill:
`bg-gradient-to-r from-gold-soft via-gold to-amber`. Radial sunrise glow:
`bg-east-glow`, `bg-sunrise`.

## Type

- **Display**: `font-display` → `Fraunces Variable` (serif, optical sizing).
  Headings, big numbers.
- **Sans**: `font-sans` → `Manrope Variable`. Body, UI.
- Self-hosted via `@fontsource` (imported in `app/[locale]/layout.tsx`).
  latin-ext subset covers Azerbaijani (Ə ə Ğ ğ İ ı Ö ö Ü ü Ç ç Ş ş).
- Heading rhythm: `tracking-tightest` / `tracking-tighter2`, `leading-[1.04]`.

## Spacing / surfaces

- Section rhythm: `<Section>` = `py-24 md:py-32` + centered `.container-x`
  (max-w 88rem, responsive padding).
- Cards: `rounded-2xl border border-white/10 bg-white/[0.03]`, gold hover edge.
- Hairlines: `border-white/10`. Pills/buttons: `rounded-full`.
- Film grain overlay via `.grain` on `<body>`.

## Motion

- Smooth scroll: **Lenis** wired to the **GSAP** ticker (`motion/SmoothScroll`).
- Signature ease: `cubic-bezier(0.16, 1, 0.3, 1)` → `[0.16, 1, 0.3, 1]`.
- All motion is disabled under `prefers-reduced-motion` (CSS + the WebGL guard).

## Primitives (reuse — don't reinvent)

**UI** (`components/ui`)
- `Section` — section wrapper (padding + container).
- `SectionHeading` — kicker + animated split headline + intro.
- `Kicker` — small uppercase gold eyebrow with a leading rule.
- `Card` — glass surface with gold hover edge.
- `Button` — `href` (locale-aware) | `external`; variants `primary|outline|ghost`;
  `withArrow`; magnetic by default.
- `PageHero` — compact inner-page hero.

**Motion** (`components/motion`)
- `SmoothScroll` — Lenis + GSAP provider (wrap once, in the layout).
- `Reveal` — scroll-in fade + rise (`delay`, `y`).
- `SplitText` — word-by-word masked reveal (headlines).
- `Magnetic` — cursor-attraction wrapper.
- `Counter` — counts up on view (`value`, `suffix`, `prefix`, `decimals`).

**Brand** (`components/brand`)
- `RayMark` — rising-sun SVG mark. `Logo` — mark + "Şərq Soft" wordmark.

**Three** (`components/three`)
- `LightField` — the WebGL hero scene (Embers + Sunrise shaders). Dynamic,
  `ssr:false`, client-only.

## Conventions

- Section components are `'use client'`, named exports matching the filename.
- Content via i18n keys only (no hard-coded copy); keep `az.json`/`en.json` in
  sync. Arrays via `t.raw()`.
- Mobile-first; verify at 375px and 1440px.
