# ADR-0001 — Vite + React + TypeScript as a static SPA

- **Status:** Accepted (2026-09-10)
- **Context:** The portfolio must deploy to GitHub Pages, which serves static files only. It is one page with a handful of sections and one live data source.

## Decision

Build a client-rendered SPA with **Vite 8 + React 19 + TypeScript**, output to static files. No meta-framework (Next.js, Remix, Astro).

## Rationale

- Next.js/Remix bring SSR and routing machinery that a static host cannot use, and their static-export modes add configuration without adding value here.
- Astro would be a reasonable alternative for a content site, but the project's one genuinely dynamic element (live GitHub data, fetched in the browser) is React-shaped anyway, and React is already on the CV — the code doubles as a work sample in a stack Elio claims.
- Vite gives sub-second HMR, a tiny production bundle, and first-class `base` support for sub-path hosting (AC11).
- TypeScript matters here specifically because the GitHub API response is external, untrusted-shape data; typing the boundary is what keeps the merge logic honest.

## Consequences

- Content is not in the initial HTML, so it is not indexed by crawlers that do not run JS. Acceptable: the audience arrives from a CV link or LinkedIn, not from organic search. If SEO ever matters, pre-rendering the authored (non-GitHub) content is the escape hatch.
- The bundle must stay small — no UI kit, no icon package; icons are inline SVG.
