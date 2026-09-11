# ADR-0002 — Runtime GitHub REST fetch over a curated pin list

- **Status:** Accepted (2026-09-10)
- **Context:** Project cards must reflect the pinned repositories and must not go stale. Three options were considered: a hand-edited JSON file, a build-time sync (scheduled Action regenerates JSON and opens a PR), and a runtime fetch from GitHub. The owner chose the **runtime fetch**.

## The problem with "pinned"

GitHub exposes **pinned items only through the authenticated GraphQL API**. A static site cannot hold a token — anything in the bundle is public. So a pure runtime fetch cannot know what is pinned.

## Decision

Split the concern by how fast each part changes:

- **Identity and order** (which repos, in what order) live in `src/data/projects.ts` as an array of `ProjectSource`. This mirrors the GitHub pin order and is edited by hand — pins change a few times a year.
- **Volatile fields** (description, topics, stars, last push) are fetched **at runtime** from the unauthenticated REST endpoint `GET /users/NeckerFree/repos?per_page=100&sort=pushed`, in **one request**, then matched to the pin list by repo name.
- **A bundled snapshot** of those same fields ships in `projects.ts` as `snapshot`, and renders when the fetch fails.

Precedence per field: authored override → live GitHub → bundled snapshot.

## Rationale

- One request per visitor, not six: the list endpoint returns every public repo with `description`, `topics`, `stargazers_count` and `pushed_at` in a single call, well inside the 60 req/hour unauthenticated limit.
- Results are cached in `sessionStorage` for 60 minutes, so a visitor browsing back and forth spends one request, not one per view (AC5).
- The snapshot means the section is **never** empty or broken — rate limiting on a shared corporate IP is a real scenario for a recruiter audience (AC4).
- Authored overrides win, so a repo whose GitHub description is weak or three lines long can be presented well without editing the repo.

## Consequences

- Pin order is duplicated: changing pins on GitHub does **not** reorder the site until `projects.ts` is edited. Documented in the README and in `03-operation.md` as the one manual step.
- Private or non-GitHub work can be added as a `ProjectSource` with `repo: null` and fully authored fields — the same array handles it.
- The site makes a third-party request on load. No cookies, no credentials, no PII; `api.github.com` is the only external origin.
- If the API shape ever changes, only `src/lib/github.ts` is affected — the merge is behind one function with unit tests.
