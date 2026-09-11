# AIDLC — Phase 3: Operation

*How is it built, deployed, observed and changed later?*

Entry condition: [Construction](02-construction.md) exit criteria met.

## Live site

**https://neckerfree.github.io/portfolio-2026/**

## Commands

| Command | What it does |
|---------|--------------|
| `npm install` | Install dependencies (Node 20+) |
| `npm run dev` | Dev server with HMR — **use `http://localhost:5173`**, not `127.0.0.1` (Vite binds IPv6 loopback on the author's machine) |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Tests in watch mode |
| `npx tsc -b` | Type-check |
| `npm run build` | Type-check + production build into `dist/` |
| `npm run preview` | Serve `dist/` locally at `http://localhost:4173/portfolio-2026/` — note the sub-path |
| `npm run snapshot` | Regenerate `src/data/snapshot.ts` from the live GitHub API |

## Deployment

Push to `main` → `.github/workflows/deploy.yml` type-checks, tests, builds and publishes `dist/` to Pages. No build output is committed; there is no `gh-pages` branch.

**One-time repository setup** (already done, recorded here so it can be repeated):

1. Settings → Pages → **Source: GitHub Actions**.
2. Nothing else. The workflow uses the built-in `GITHUB_TOKEN`; no secrets to configure.

`public/.nojekyll` stops Pages running Jekyll, which would otherwise strip Vite's `_`-prefixed asset paths.

## How to change things

| I want to… | Edit | Redeploy needed? |
|-----------|------|------------------|
| Fix a typo in a repo description | Nothing — edit it **on GitHub** | No, it is read live |
| Add / remove / reorder a project card | `src/data/projects.ts` | Yes |
| Change a project's display name, tools, or highlight | `src/data/projects.ts` | Yes |
| Add non-GitHub work (private, client) | `src/data/projects.ts`, `repo: null` + author every field | Yes |
| Update the CV text on the page | `src/data/profile.ts` | Yes |
| Replace the downloadable CV | `public/Elio-Cortes-Backend-Developer.pdf` (keep the filename) | Yes |
| Change colours, fonts, spacing | `src/styles/tokens.css` | Yes |
| Refresh the offline fallback data | `npm run snapshot`, commit the result | Yes |

**The one manual step:** changing which repos are pinned on GitHub does *not* reorder the site. Pinned items are only readable through GitHub's authenticated GraphQL API, and a static site cannot hold a token, so pin order is mirrored by hand in `projectSources`. See [ADR-0002](../adr/0002-runtime-github-fetch.md).

## Monitoring

There is no server and no analytics, so "monitoring" means three periodic checks:

1. **Deploy status** — Actions tab; a red run means the live site is stale, not broken (Pages keeps serving the last good deploy).
2. **Freshness indicator** — the small line under the Projects heading reports `Live from the GitHub API` or the saved-copy notice. If a normal visit shows the saved copy, GitHub is down or the IP is rate-limited.
3. **Rate limits** — unauthenticated GitHub allows 60 requests/hour per IP. The site uses one per visitor per hour thanks to the `sessionStorage` cache. A visitor behind a busy shared IP may still hit the limit; they see the snapshot, which is why it exists.

## Known constraints and gotchas

- **`npm run preview` serves at `/portfolio-2026/`**, not `/`. Hitting `http://localhost:4173/` returns a blank page — that is the `base` path working correctly, not a bug.
- **Moving to a custom domain or a user site** (`neckerfree.github.io`) means setting `base: '/'` in `vite.config.ts`, or assets will 404.
- **The CV filename is referenced from `profile.ts`.** Replacing the PDF with a differently-named file breaks the download link; keep the name or update both.
- **jsdom has no `matchMedia` or `IntersectionObserver`** — both are stubbed in `src/test/setup.ts`. A test failure there is an environment gap, not a product defect.
- **`api.github.com` is the only third-party request** the page makes. No cookies, no credentials, no analytics, no tracking.

## Evolution paths

Deliberately out of scope for v1, in rough order of value:

- **Pin sync via a scheduled Action.** A weekly workflow could read pinned items with the Actions `GITHUB_TOKEN` (GraphQL works there — the token never reaches the browser) and open a PR when the pin order drifts from `projectSources`. This removes the only manual step.
- **Pre-rendering** the authored content for crawlers, if search traffic ever matters.
- **Per-project detail pages**, which is the point at which a router — and the Pages `404.html` workaround — becomes necessary (ADR-0004).
- **A contact form**, which needs a third-party form service; `mailto:` avoids that dependency today.

## Exit criteria

- [x] Deployment workflow written and repository Pages source set to GitHub Actions.
- [x] Site reachable at the live URL and assets load under the sub-path.
- [x] Build/run/deploy commands documented in one place.
- [x] Change procedures documented for every routine edit.
- [x] Constraints and gotchas recorded so they are not rediscovered.
