# ADR-0005 — Deploy with GitHub Actions to GitHub Pages

- **Status:** Accepted (2026-09-10)
- **Context:** The site must be published at `https://neckerfree.github.io/portfolio-2026/`. GitHub Pages can serve from a branch (`gh-pages`, the classic `peaceiful/actions-gh-pages` style) or from an Actions artifact.

## Decision

Use the **official Pages Actions pipeline**: `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`, with the Pages source set to **GitHub Actions**. Vite builds with `base: '/portfolio-2026/'`.

Two workflows:
- `ci.yml` — runs on pull requests: type-check, tests, build.
- `deploy.yml` — runs on push to `main`: the same checks, then deploy.

## Rationale

- No `gh-pages` branch to maintain and no build output committed to git — the repo stays source-only.
- Deployment uses the built-in `GITHUB_TOKEN` with `pages: write` / `id-token: write`; no personal access token is stored as a secret.
- A `concurrency` group prevents two pushes from racing a deploy.
- Keeping CI separate means a PR gets the same verification without touching the live site.

## Consequences

- Pages must be switched to "GitHub Actions" as its source once, in repository settings (documented in `03-operation.md`).
- The `base` path is hard-coded to the repo name. Moving to a custom domain or a user site means changing `vite.config.ts` — called out in the operation doc.
- A `.nojekyll` file is emitted so Jekyll does not strip Vite's `_`-prefixed asset directories.
