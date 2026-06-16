# Şərq Soft — Jey ERP landing

An awards-grade, animation-first landing page for **Şərq Soft**, the official
distributor of **Jey Soft** in Azerbaijan, delivering **Jey ERP** implementation
(accounting, inventory, sales/CRM/POS, HR/payroll/manufacturing).

## Concept

**Living Data** — the hero is an interactive 3D network of glowing nodes and
links (a metaphor for an ERP: many moving parts, one living system), rendered
with real WebGL shaders and reacting to the pointer and scroll.

## Stack

- **Frappe UI** (Vue 3 component library) — used for the contact form controls
- **Vue 3 + Vite**
- **Three.js** + custom GLSL shaders — the Living Data field
- **GSAP + ScrollTrigger** — cinematic scroll, reveals, magnetic & split-text
- **vue-i18n** — Azerbaijani (default) + English, Russian can be added later
- **Tailwind CSS** (with the `frappe-ui` preset)

## Features

- Cinematic intro preloader with assembling network + load counter
- Custom cursor with magnetic interactive elements
- Letter-by-letter text reveal, scroll-reveal, animated counters
- Dark-only premium "enterprise-tech" theme, electric-indigo neon
- Fully responsive
- `prefers-reduced-motion` respected throughout

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview
```

## Deployment

Deploys to **GitHub Pages** via `.github/workflows/deploy.yml` on push to
`main` (and the active feature branch). Enable Pages → "GitHub Actions" in the
repo settings. The Vite `base` is relative (`./`) so it works on project pages.

## MCP servers

`.mcp.json` configures the MCP servers used while building this site:

- **playwright** — browser automation / visual verification
- **context7** — up-to-date library docs (Frappe UI, GSAP, Vue, Three.js)
- **magic** (21st.dev) — UI component generation (set `MAGIC_21ST_API_KEY`)

## To customize

- **Logo** — replace the inline SVG mark in `NavBar.vue` / `SiteFooter.vue`
  (a slot is reserved) and `public/favicon.svg`.
- **Contact details** — update placeholders in `ContactSection.vue`,
  `SiteFooter.vue` and the i18n files.
- **Copy** — all text lives in `src/i18n/az.js` and `src/i18n/en.js`.
- **Contact form** — currently acknowledges locally (static site). Wire
  `submit()` in `ContactSection.vue` to an email/API endpoint when ready.
