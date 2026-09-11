/**
 * Shared domain types.
 *
 * The model is deliberately small (see docs/aidlc/01-inception.md):
 * `ProjectSource` is authored and owns identity + order, `GitHubRepo` is the
 * external API shape, and `Project` is what a card actually renders.
 */

/** A project as authored by the owner. Editing this array is the only step
 *  needed to add, remove or reorder a card (AC6). */
export interface ProjectSource {
  /** Repository name on GitHub, or `null` for work that lives elsewhere
   *  (private client work, a closed-source app). `null` means no live data
   *  is merged and every field below must be authored. */
  repo: string | null;
  /** Display name. Repo names are rarely presentable as-is. */
  label: string;
  /** One-line summary shown under the title. Overrides the GitHub
   *  description when present — useful when the repo's own text is too long
   *  or too vague for a card. */
  description?: string;
  /** Curated tool chips. Always shown; GitHub topics are merged in after
   *  these, de-duplicated, so the important tools lead. */
  tools: string[];
  /** Deployed/demo URL, if any. Falls back to the repo's GitHub homepage. */
  liveUrl?: string;
  /** Optional short note calling out what is interesting about the project. */
  highlight?: string;
}

/** The subset of GitHub's REST repo payload this site relies on. */
export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics?: string[];
  stargazers_count: number;
  pushed_at: string;
  language: string | null;
  archived: boolean;
}

/** Volatile fields captured at build time, rendered when GitHub is
 *  unavailable or rate-limits the visitor (AC4). */
export interface ProjectSnapshot {
  description: string | null;
  topics: string[];
  stars: number;
  pushedAt: string;
  url: string;
}

/** The merged view a card renders. */
export interface Project {
  id: string;
  label: string;
  description: string;
  tools: string[];
  repoUrl: string | null;
  liveUrl: string | null;
  stars: number;
  updatedAt: string | null;
  highlight?: string;
  /** True when live GitHub data was applied to this card. */
  isLive: boolean;
}

/** Where the project data on screen came from — drives the freshness note. */
export type DataStatus = 'loading' | 'live' | 'snapshot';

// ---------------------------------------------------------------------------
// Profile (CV-derived, authored content)
// ---------------------------------------------------------------------------

export interface Role {
  title: string;
  company: string;
  project?: string;
  location: string;
  period: string;
  /** Sort/display helper: the year the role started. */
  start: string;
  stack: string[];
  highlights: string[];
}

export interface SkillGroup {
  name: string;
  skills: string[];
}

export interface Education {
  title: string;
  institution: string;
  period: string;
  detail: string;
}

export interface Contact {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  /** Path to the CV PDF, resolved against the deployed base path. */
  cv: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  avatar: string;
  summary: string;
  stats: { label: string; value: string }[];
  contact: Contact;
  skills: SkillGroup[];
  experience: Role[];
  education: Education[];
}
