# Elio Cortés — Portfolio

Personal portfolio site. **Live: https://neckerfree.github.io/portfolio-2026/**

React 19 + TypeScript + Vite, deployed to GitHub Pages. Project cards are read from the **GitHub API
at page load**, so the repositories on the site describe themselves — edit a repo description on
GitHub and the card updates with no redeploy.

<!-- Badges appear once the first workflow run completes. -->
[![Deploy](https://github.com/NeckerFree/portfolio-2026/actions/workflows/deploy.yml/badge.svg)](https://github.com/NeckerFree/portfolio-2026/actions/workflows/deploy.yml)

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

Node 20+.

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server with HMR |
| `npm test` | Test suite (26 tests) |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Serve the build at `http://localhost:4173/portfolio-2026/` |
| `npm run snapshot` | Refresh the offline fallback data from GitHub |

## Changing the content

Everything the site says lives in two files.

**Projects — `src/data/projects.ts`**

```ts
{
  repo: 'AdvancedWebAPI',            // GitHub repo name, or null for non-GitHub work
  label: 'Advanced Web API',         // display name
  description: 'Minimal API …',      // optional; overrides the GitHub description
  tools: ['.NET Core', 'C#'],        // chips; GitHub topics are merged in behind them
  highlight: 'Most-starred repo',    // optional callout
}
```

Array order is card order. Add, remove or reorder entries — no component changes needed.

**CV content — `src/data/profile.ts`**: summary, skills, experience, education, contact links.

**Look and feel — `src/styles/tokens.css`**: colours, typography, spacing, radii. The dark theme
redefines only the colour tokens, so one edit covers both themes.

> **Note:** changing which repositories are *pinned* on GitHub does not reorder this site. Pinned
> items are only exposed through GitHub's authenticated GraphQL API and a static site cannot hold a
> token, so the order is mirrored by hand in `projectSources`. See
> [ADR-0002](docs/adr/0002-runtime-github-fetch.md).

## How the project data works

1. One unauthenticated request on load: `GET /users/NeckerFree/repos?per_page=100&sort=pushed`.
2. Cached in `sessionStorage` for an hour, so a visitor costs one request, not one per view.
3. Merged over the authored list — **authored → live → snapshot**.
4. If GitHub is unreachable or rate-limits the visitor, the bundled snapshot in
   `src/data/snapshot.ts` renders instead and the page says so. The section is never empty.

## Deployment

Push to `main`; `.github/workflows/deploy.yml` type-checks, tests, builds and publishes to GitHub
Pages. Repository setting required once: **Settings → Pages → Source: GitHub Actions**.

## Documentation

Built with the **AIDLC** process — Inception, Construction, Operation, each with exit criteria.

- [`docs/aidlc/00-overview.md`](docs/aidlc/00-overview.md) — the process and phase status
- [`docs/aidlc/01-inception.md`](docs/aidlc/01-inception.md) — scope, personas, acceptance criteria
- [`docs/aidlc/02-construction.md`](docs/aidlc/02-construction.md) — build order and data contract
- [`docs/aidlc/03-operation.md`](docs/aidlc/03-operation.md) — commands, deploy, how to change things
- [`docs/adr/`](docs/adr/) — five architecture decisions with their trade-offs
- [`CLAUDE.md`](CLAUDE.md) — conventions for working in this repo

## Licence

Source available for reference. The CV content, avatar and personal data are not licensed for reuse.
