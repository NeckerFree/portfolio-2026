# ADR-0003 — Hand-authored CSS with design tokens

- **Status:** Accepted (2026-09-10)
- **Context:** The site needs a considered visual identity — "nice colours, friendly typography" — across light and dark themes, and must stay easy to adjust later.

## Decision

Plain CSS, organised as:

- `src/styles/tokens.css` — every colour, space, radius, shadow, font and duration as a CSS custom property, with the dark theme redefining **only** the colour tokens.
- `src/styles/global.css` — reset, base typography, layout primitives, utility classes.
- One co-located `.css` file per component, imported by that component.

No Tailwind, no CSS-in-JS.

## Rationale

- Theming is the main styling requirement, and CSS custom properties do it natively: one `[data-theme="dark"]` block re-points the palette and every component follows. Tailwind would need its own dark-variant on every utility.
- A token file is the single place to change the look — which is the stated goal ("easy to modify in the future"). Colour decisions are legible in one screen instead of scattered across class strings.
- Zero build plugins, zero extra dependencies, nothing to keep on version.

## Consequences

- Class names are hand-managed; the convention is `block__element--modifier`, scoped by a component-level root class to avoid collisions.
- No purge step, so unused CSS must be deleted by hand — small surface, acceptable.
- Contributors need to know CSS rather than a utility vocabulary. For a personal portfolio with one maintainer, that is a feature.
