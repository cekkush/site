# Şərq Soft — Jey ERP website

Premium, bilingual (Azerbaijani / English), animation-first marketing site for
**Şərq Soft**, the official partner of **Jey Soft**, delivering **Jey ERP**
implementation (accounting, inventory, sales/CRM, POS, payroll, manufacturing).

**Concept — "Şərq işığı" (Light of the East):** a deep cosmos night lit by a
golden sunrise. From data chaos to order — a new day for your business.

## Tech

- **Next.js 14** (App Router, static export `output: 'export'`)
- **TypeScript** · **Tailwind CSS**
- **next-intl** — Azerbaijani (default) + English
- **React Three Fiber** + custom GLSL — the interactive WebGL hero (cosmic
  embers + god-rays + rising sun, pointer-reactive)
- **GSAP + Lenis** — smooth scroll / scroll-driven motion
- **framer-motion** — reveals, split-text, magnetic buttons, counters
- Self-hosted **Fraunces** (display serif) + **Manrope** (sans) via `@fontsource`

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # -> out/ (static)
npm run serve    # preview the built site at http://localhost:4321
```

## Deploy

GitHub Actions → **GitHub Pages** (free). See `.github/workflows/deploy.yml` at
the repo root. Published at `https://<owner>.github.io/site/`.

- `NEXT_PUBLIC_BASE_PATH=/site` for the GitHub Pages project URL (set in CI).
- Set it to `""` when pointing the **sarqsoft.az** custom domain at Pages.
- Enable once: repo **Settings → Pages → Source: GitHub Actions**.

## Structure

```
src/
  app/[locale]/        # localized routes: /, jey-erp, about, partnership, contact
  components/
    brand/   hero/   layout/   sections/   three/   ui/   motion/   providers/
  i18n/                # routing, request config, messages/{az,en}.json
  lib/                 # site constants + utils
docs/                  # HANDOFF.md, PROJECT_BRIEF.md, DESIGN_SYSTEM.md
public/                # favicon, .nojekyll, index.html (root -> /az/ redirect)
```

## Continue the project

Read **`CLAUDE.md`** and **`docs/HANDOFF.md`** first — they cover state,
decisions, placeholders to replace, and deferred work (contact-form backend).
