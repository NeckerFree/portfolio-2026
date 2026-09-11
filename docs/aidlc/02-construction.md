# AIDLC — Phase 2: Construction

*In what order do we build it, and against what contract?*

Entry condition: [Inception](01-inception.md) exit criteria met.

## Build order

Each step leaves the project in a working state.

| # | Step | Output | Verified by |
|---|------|--------|-------------|
| 0 | Scaffold | Vite + React 19 + TypeScript, Vitest + Testing Library, `base` set to `/portfolio-2026/` | `npm run build` succeeds |
| 1 | Types | `src/types.ts` — `ProjectSource`, `GitHubRepo`, `ProjectSnapshot`, `Project`, `Profile` | `tsc -b` clean |
| 2 | Data | `src/data/projects.ts` (authored, pin order), `src/data/snapshot.ts` (generated), `src/data/profile.ts` (CV content) | Unit tests in step 3 |
| 3 | GitHub client | `src/lib/github.ts` — one cached fetch + `mergeProjects` | 10 unit tests covering precedence, order, dedupe, fallback |
| 4 | Hooks | `useProjects`, `useTheme`, `useActiveSection` | Exercised through component tests |
| 5 | Design system | `styles/tokens.css` + `styles/global.css` | Visual review; dark theme redefines colour tokens only |
| 6 | Sections | Header, Hero, Projects/ProjectCard, Skills, Experience, Education, Contact, Footer | Component + smoke tests |
| 7 | Tooling | `npm run snapshot` regenerates the fallback from the live API | Script run, 6 projects written |
| 8 | CI/CD | `ci.yml` (PRs) and `deploy.yml` (main → Pages) | Green run, live URL responds |

## The data contract

**Endpoint** (unauthenticated, one call per visitor):

```
GET https://api.github.com/users/NeckerFree/repos?per_page=100&sort=pushed
Accept: application/vnd.github+json
```

**Fields consumed:** `name`, `description`, `html_url`, `homepage`, `topics`, `stargazers_count`, `pushed_at`, `language`, `archived`. Everything else in the payload is ignored.

**Failure handling** — every one of these paths ends in a fully rendered section:

| Condition | Behaviour |
|-----------|-----------|
| 403 / 429 (rate limited) | Throw → snapshot stays on screen, status `snapshot` |
| Any non-OK status | Throw → snapshot, status `snapshot` |
| Network error / offline | Throw → snapshot, status `snapshot` |
| No response in 8 s | Aborted → snapshot, status `snapshot` |
| Payload is not an array | Throw → snapshot, status `snapshot` |
| Repo in `projectSources` missing from the response | That card alone falls back to its snapshot entry |

**Caching:** successful responses go to `sessionStorage` under `portfolio:github:NeckerFree:v1` with a 1-hour TTL. Reads and writes are wrapped in `try/catch` — storage is disabled in some privacy modes and must never break a render.

**Merge precedence** (per field): authored in `projectSources` → live API → snapshot.

## Component structure

```
App
├── Header          nav + theme toggle + mobile menu (scroll-spy via IntersectionObserver)
├── main
│   ├── Hero        name, summary, CTAs, avatar, stat tiles
│   ├── Projects    useProjects() → ProjectCard × n + freshness note
│   ├── Skills      six groups of chips
│   ├── Experience  timeline, 4 roles + reveal (AC8)
│   ├── Education   six training/degree cards
│   └── Contact     four channels + CV download
└── Footer
```

Components read from `src/data/*` and never hold copy of their own — that is what makes the site editable from one place.

## Definition of Done

1. `npx tsc -b` clean.
2. `npm test` green.
3. `npm run build` succeeds and assets resolve under `/portfolio-2026/`.
4. New behaviour has a test; data-shape changes update `src/types.ts`.
5. Copy changes go in `src/data/`, colour changes in `styles/tokens.css` — never inline in a component.
6. Conventional-commit message; PR against `main`.

## Exit criteria

- [x] Steps 0–8 complete.
- [x] 26 tests passing across 5 files (merge logic, formatting, projects section, experience toggle, whole-page smoke).
- [x] `tsc -b` clean, `npm run build` clean (254 kB JS / 80 kB gzipped, 21 kB CSS).
- [x] Fallback path verified by test, not just by inspection.
- [x] `npm run snapshot` executed successfully against the live API.
- [ ] Deployed and reachable — tracked in [Operation](03-operation.md).
