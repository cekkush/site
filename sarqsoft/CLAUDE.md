# CLAUDE.md — Şərq Soft site (ACTIVE project)

This folder (`sarqsoft/`) is the **active** Şərq Soft marketing site. A previous
Vue/Vite attempt lives at the repo root and is **archived** (not deployed).

## What this is

Premium, bilingual (**AZ** default / **EN**) animation-first marketing site for
**Şərq Soft**, the official partner of **Jey Soft**, delivering **Jey ERP**
implementation. Creative concept: **"Şərq işığı / Light of the East"** — a deep
cosmos night lit by a golden sunrise (chaos → order, a new day for business).

## Stack

Next.js 14 (App Router, **static export**) · TypeScript · Tailwind CSS ·
next-intl (AZ/EN) · framer-motion · GSAP + Lenis (smooth scroll) · React Three
Fiber + custom GLSL (WebGL hero) · self-hosted fonts (`@fontsource` Fraunces +
Manrope, latin-ext = Azerbaijani glyphs).

## Commands (run inside `sarqsoft/`)

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export -> out/
npm run serve    # preview out/ at http://localhost:4321
```

## Deploy (free)

GitHub Actions → GitHub Pages, via `../.github/workflows/deploy.yml`.
Served at `https://<owner>.github.io/site/` (`basePath=/site`).
Moving to the **sarqsoft.az** domain later → set `NEXT_PUBLIC_BASE_PATH=""`.

## Rules / gotchas

- **Static export only** — no server code, API routes, or middleware.
- All interactive UI = client components (`'use client'`); WebGL is dynamically
  imported with `ssr:false`.
- Content lives in `src/i18n/messages/{az,en}.json` — **keep both in sync**.
- `next-intl@3.26` has **no** `hasLocale` export (it's v4) — we check
  `routing.locales.includes(...)` manually.
- `/` is redirected to `/az/` by `public/index.html` (static hosting has no
  middleware).

## ⚠️ Before continuing, read [`docs/HANDOFF.md`](./docs/HANDOFF.md)

It has the full project state, design decisions, the list of **placeholders to
replace** (numbers, cases, testimonials, contacts) and the **deferred work**
(contact-form backend → Jey ERP / Frappe CRM + email/WhatsApp/Telegram).
