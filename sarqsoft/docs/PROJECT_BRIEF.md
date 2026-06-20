# PROJECT BRIEF — Şərq Soft

Decisions captured from the discovery discussion with the client.

## Company

- **Şərq Soft** — implements accounting / ERP systems.
- **Official partner of Jey Soft**; the flagship product is **Jey ERP**.
- Contacts (from brief): `sarqsoft.az` · `info@sarqsoft.az` · `+994 50 870 03 23`.
- Audience: businesses in Azerbaijan across retail, HoReCa, wholesale/distribution,
  manufacturing/services.

## Creative concept

- **"Şərq işığı / Light of the East"** — sunrise over the East as a metaphor for
  a new day / clarity for business. Story arc: **chaos → order**.
- Palette: **deep cosmos night + golden/amber sunrise**.
- Tone: **premium, editorial, art-directed** + corporate trust.
- Dark theme only.
- **Brand built from scratch**: custom logo (rising-sun "ray mark" + wordmark),
  type pairing (contrasting serif display + grotesque sans), with full
  Azerbaijani-glyph support.

## Experience

- **Maximum animation**: WebGL hero (god-rays + cosmic embers, pointer-reactive),
  scroll-driven cinematic motion (GSAP + Lenis), micro-interactions (framer-motion).
- Respects `prefers-reduced-motion`.

## Structure (multi-page, for SEO)

Home · Jey ERP · About · Partnership · Contact.
Home flow: hero → chaos→order → services → Jey ERP modules → industries
(interactive switcher: retail / HoReCa / wholesale / manufacturing) → process
timeline → trust (numbers / cases / testimonials / partner status) → final CTA.

## Conversion

- Primary CTA: **Book a Jey ERP demo**.
- Lead channels: Jey ERP CRM (Frappe) + Email + WhatsApp + Telegram.
- **Lead processing is deferred** for now (form is demo-only). To be wired when
  moving to real hosting.

## Content

- Drafted bilingually (AZ + EN) by the assistant; **client to verify AZ** (native).
- Trust data (numbers, cases, testimonials) are **placeholders** to replace.

## Tech & delivery

- Stack: Next.js (static export) + Tailwind + next-intl + GSAP + React Three
  Fiber + framer-motion + Lenis.
- Repo: this project lives in `sarqsoft/` (personal account).
- Hosting: **temporary on GitHub Pages (free)** → later domain `sarqsoft.az`
  + full hosting. Architecture kept portable (one env var to switch basePath).

## Decision log (Q&A)

| Topic | Decision |
|---|---|
| Start point | From scratch (ignore prior memory/attempts) |
| Vibe | Premium art + animation-first, unique (no template look) |
| Tech choices | Assistant's recommendation (Next.js stack) |
| Theme | Cosmos + golden sunrise, dark |
| Logo | Designed from scratch (ray mark + wordmark) |
| Pages | Multi-page (SEO) |
| Primary CTA | Jey ERP demo |
| Industries | All four, as an interactive switcher |
| Content | Assistant drafts AZ + EN; client verifies AZ |
| Trust elements | Numbers + cases + testimonials + partner status (placeholders) |
| Lead destinations | Frappe CRM + Email + WhatsApp + Telegram (**processing deferred**) |
| Repo location | Personal account, folder `sarqsoft/` |
| Hosting | GitHub Pages (free) for now; domain/host later |
