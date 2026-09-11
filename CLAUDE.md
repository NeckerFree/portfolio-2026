# CLAUDE.md — Portfolio 2026

Project guide for Claude Code. Read this before making changes.

## What this project is

Elio Cortés's personal portfolio: a **static React + TypeScript SPA** deployed to GitHub Pages at
`https://neckerfree.github.io/portfolio-2026/`. Project cards are driven by the **live GitHub API**;
everything else comes from the CV. Delivered with the **AIDLC** process (`docs/aidlc/`).

The site is small. Its real requirement is **maintainability** — it exists to stay current with a
career that keeps moving, which is why data and presentation are strictly separated.

## Golden rules

1. **Components hold no content.** Copy lives in `src/data/profile.ts` and `src/data/projects.ts`.
   If you are typing a sentence about Elio into a `.tsx` file, it belongs in `src/data/`.
2. **Components hold no colours.** Every colour, space, radius and font comes from a custom
   property in `src/styles/tokens.css`. Hard-coded hex values in a component stylesheet are a bug.
3. **The project section must never be empty.** Any new failure mode in the GitHub path falls back
   to `src/data/snapshot.ts`, never to a blank section or an error screen.
4. **No secrets, ever.** This is a static site; anything in the bundle is public. That constraint is
   why pin order is authored by hand rather than fetched (ADR-0002).
5. **Editing one array changes the cards.** Adding, removing or reordering a project must not
   require touching a component. If it does, the abstraction has broken.

## Architecture

```
src/data/*      authored content (edit here)      ─┐
src/lib/*       pure logic: fetch, merge, format   ├─▶ src/hooks/* ─▶ src/components/*
src/data/snapshot.ts  generated fallback          ─┘
```

- `src/lib/github.ts` — the only place that knows the GitHub API exists. One cached request;
  `mergeProjects` is pure and unit-tested.
- `src/hooks/*` — `useProjects` (data + status), `useTheme` (system + override), `useActiveSection`
  (nav scroll-spy).
- `src/components/*` — presentational, one co-located `.css` per component.

**Merge precedence:** authored → live GitHub → snapshot. Authored always wins so a weak repo
description can be overridden without editing the repo.

## Conventions

- **Stack:** React 19, TypeScript, Vite 8, Vitest + Testing Library. No UI kit, no icon package, no
  CSS framework — icons are inline SVG in `src/components/Icons.tsx`.
- **CSS:** `block__element--modifier`, scoped under a component root class. Mobile-first; add
  `@media (min-width: …)` upward.
- **Dark theme:** redefine colour tokens under `:root[data-theme='dark']` only. Never write a
  theme-specific rule in a component unless a token genuinely cannot express it.
- **Accessibility is not optional:** semantic landmarks, one `<h1>`, labelled controls, visible
  focus, `prefers-reduced-motion` honoured. Avoid nesting `<header>`/`<footer>` inside `<article>`
  — Testing Library reports them as duplicate landmarks.
- **Types:** external API data is typed at the boundary in `src/types.ts`. Do not spread untyped
  API responses into components.

## Definition of Done

1. `npx tsc -b` clean.
2. `npm test` green — new behaviour has a test.
3. `npm run build` succeeds.
4. Content changes in `src/data/`, style changes in `styles/tokens.css`.
5. Conventional-commit message; PR against `main`.

## How to work here (AIDLC)

- **Inception** — `docs/aidlc/01-inception.md`: scope, personas, acceptance criteria AC1–AC11, the
  merge rule, constraints. Authoritative on *what* and *why*.
- **Construction** — `docs/aidlc/02-construction.md`: build order, the GitHub data contract, failure
  matrix, component tree.
- **Operation** — `docs/aidlc/03-operation.md`: commands, deployment, how to change things, gotchas.
- **ADRs** — `docs/adr/`: five decisions with their trade-offs. Read ADR-0002 before changing
  anything about how project data is loaded.

## Commands

```bash
npm run dev        # http://localhost:5173  (use localhost, not 127.0.0.1)
npm test           # vitest run
npx tsc -b         # type-check
npm run build      # type-check + build to dist/
npm run preview    # http://localhost:4173/portfolio-2026/  (note the sub-path)
npm run snapshot   # regenerate src/data/snapshot.ts from the live GitHub API
```

## Traps

- `npm run preview` at `/` is blank by design — the app is served from `/portfolio-2026/`.
- `src/data/snapshot.ts` is **generated**. Edit `projectSources`, then run `npm run snapshot`.
- Changing pins on GitHub does not reorder the site; mirror the order in `projectSources`.
- Replacing the CV PDF means keeping the filename or updating `profile.ts` too.
