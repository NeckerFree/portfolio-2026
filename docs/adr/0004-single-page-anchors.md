# ADR-0004 — One page with anchored sections, no client-side router

- **Status:** Accepted (2026-09-10)
- **Context:** The site has six sections and a target audience that skims. A router (React Router) was the alternative.

## Decision

A single document with `<section id="...">` landmarks and in-page anchor navigation. No router dependency.

## Rationale

- **GitHub Pages has no rewrite rules.** A client-side router on Pages needs the `404.html` copy hack to survive a deep-link refresh — a known source of broken links on exactly the URL a recruiter was sent.
- A recruiter scrolling one page is the actual reading behaviour; forcing navigation between routes adds friction to a 30-second skim.
- Anchors are shareable (`#projects`), work without JS, and cost nothing.
- One less dependency in the bundle.

## Consequences

- All content loads at once. With text-only content and no images beyond the avatar, the payload stays small.
- Per-project detail pages are out of scope; if they are ever wanted, that is the point to reconsider a router (and the `404.html` workaround with it).
- Scroll-spy for the active nav link is implemented with `IntersectionObserver` rather than router state.
