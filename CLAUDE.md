# CLAUDE.md (repository root)

## ▶ Active project: [`sarqsoft/`](./sarqsoft/)

The current Şərq Soft website is the **Next.js project in `sarqsoft/`**.
Start there. Read `sarqsoft/CLAUDE.md` and `sarqsoft/docs/HANDOFF.md` to continue.

It deploys to **GitHub Pages (free)** via `.github/workflows/deploy.yml`, which
builds `sarqsoft/` and serves it at `https://<owner>.github.io/site/`.

## 🌐 Live & deploy status

**Live (free GitHub Pages): https://cekkush.github.io/site/** (redirects to `/site/az/`).

Current publish path: the repo's `github-pages` environment only permits
deploys from the branch `claude/amazing-dirac-t92k1h`, so the live site is
deployed from **that** branch (it was fast-forwarded to include `sarqsoft/` +
the deploy workflow). Active **development** stays on
`claude/gallant-lamport-kf4f7e`.

To publish from `main` / `claude/gallant-lamport-kf4f7e` instead, remove the
branch limit once: repo **Settings → Environments → `github-pages` →
Deployment branches and tags → "No restriction"** (or delete the environment so
it recreates unrestricted), then push.

### Current temporary publish (branch builder)

Pages **Source = "Deploy from a branch"** (this branch, root). The built static
export is committed to the repo **root** and served by GitHub's branch builder.
Next's `_next/` dir is renamed to **`assets/`** (and refs rewritten) so Jekyll
doesn't strip it. Cleanest long-term: switch Source to **GitHub Actions** (the
`deploy.yml` workflow already builds `sarqsoft/` and now deploys successfully).

## Archived: repository root (Vue/Vite)

The files at the repo root (`src/`, `index.html`, `vite.config.js`,
`package.json`, …) are an **earlier Vue/Vite attempt**, kept for reference only.
They are **not** deployed. Do not build on them unless explicitly asked.
