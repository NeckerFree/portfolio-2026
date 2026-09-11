/**
 * GitHub data layer.
 *
 * One unauthenticated request per visitor, cached in sessionStorage, merged
 * over the authored project list. See docs/adr/0002-runtime-github-fetch.md
 * for why it works this way.
 */

import { GITHUB_USER } from '../data/projects';
import type { GitHubRepo, Project, ProjectSnapshot, ProjectSource } from '../types';

/** One call returns every public repo with the fields the cards need, which
 *  keeps a visitor well inside the 60 requests/hour unauthenticated limit. */
const ENDPOINT = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`;

const CACHE_KEY = `portfolio:github:${GITHUB_USER}:v1`;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const REQUEST_TIMEOUT_MS = 8000;

interface CacheEntry {
  at: number;
  repos: GitHubRepo[];
}

/** sessionStorage throws in some privacy modes — never let that break a render. */
function readCache(): GitHubRepo[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;
    if (!entry?.at || Date.now() - entry.at > CACHE_TTL_MS) return null;
    return Array.isArray(entry.repos) ? entry.repos : null;
  } catch {
    return null;
  }
}

function writeCache(repos: GitHubRepo[]): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos } satisfies CacheEntry));
  } catch {
    /* quota or disabled storage — the fetch still worked, just uncached */
  }
}

/** Fetches the repo list, preferring a warm cache (AC5).
 *  Throws on network failure, rate limiting or a non-OK response; callers
 *  fall back to the bundled snapshot (AC4). */
export async function fetchRepos(signal?: AbortSignal): Promise<GitHubRepo[]> {
  const cached = readCache();
  if (cached) return cached;

  const timeout = new AbortController();
  const timer = setTimeout(() => timeout.abort(), REQUEST_TIMEOUT_MS);
  // Abort if either the caller unmounts or the timeout fires.
  signal?.addEventListener('abort', () => timeout.abort(), { once: true });

  try {
    const response = await fetch(ENDPOINT, {
      signal: timeout.signal,
      headers: { Accept: 'application/vnd.github+json' },
    });

    if (response.status === 403 || response.status === 429) {
      throw new Error('GitHub API rate limit reached');
    }
    if (!response.ok) {
      throw new Error(`GitHub API responded ${response.status}`);
    }

    const repos = (await response.json()) as GitHubRepo[];
    if (!Array.isArray(repos)) throw new Error('Unexpected GitHub API payload');

    writeCache(repos);
    return repos;
  } finally {
    clearTimeout(timer);
  }
}

/** Topics are lowercase slugs; these read badly as chips, so the common ones
 *  get a proper label and the rest are title-cased. */
const TOPIC_LABELS: Record<string, string> = {
  'c-sharp': 'C#',
  'net-core': '.NET Core',
  'dot-net-core': '.NET Core',
  'minimal-api': 'Minimal APIs',
  'ci-cd': 'CI/CD',
  nodejs: 'Node.js',
  mysql: 'MySQL',
  sqlite: 'SQLite',
  api: 'REST API',
  'unitofwork-pattern': 'Unit of Work',
  'repository-pattern': 'Repository Pattern',
  'dependency-injection': 'Dependency Injection',
  paging: 'Pagination',
  iac: 'IaC',
  aws: 'AWS',
  azure: 'Azure',
};

export function labelTopic(topic: string): string {
  const known = TOPIC_LABELS[topic.toLowerCase()];
  if (known) return known;
  return topic
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** Curated tools lead; topics fill in behind them, case-insensitively deduped. */
function mergeTools(curated: string[], topics: string[]): string[] {
  const seen = new Set(curated.map((tool) => tool.toLowerCase()));
  const merged = [...curated];
  for (const topic of topics) {
    const label = labelTopic(topic);
    if (!seen.has(label.toLowerCase())) {
      seen.add(label.toLowerCase());
      merged.push(label);
    }
  }
  return merged;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Merges authored project data with live GitHub data and the bundled snapshot.
 *
 * Precedence per field: **authored -> live -> snapshot**. Authored fields win
 * so a weak repo description can be overridden without editing the repo; live
 * wins over the snapshot so the page reflects GitHub without a redeploy (AC3).
 *
 * @param repos `null` when the fetch failed — every card then falls back to
 *              the snapshot and reports `isLive: false` (AC4).
 */
export function mergeProjects(
  sources: ProjectSource[],
  repos: GitHubRepo[] | null,
  snapshot: Record<string, ProjectSnapshot>,
): Project[] {
  const byName = new Map<string, GitHubRepo>();
  for (const repo of repos ?? []) {
    byName.set(repo.name.toLowerCase(), repo);
  }

  return sources.map((source) => {
    const live = source.repo ? (byName.get(source.repo.toLowerCase()) ?? null) : null;
    const fallback = source.repo ? snapshot[source.repo] : undefined;
    const topics = live?.topics ?? fallback?.topics ?? [];

    const repoUrl =
      live?.html_url ??
      fallback?.url ??
      (source.repo ? `https://github.com/${GITHUB_USER}/${source.repo}` : null);

    return {
      id: source.repo ?? slugify(source.label),
      label: source.label,
      description: source.description ?? live?.description ?? fallback?.description ?? '',
      tools: mergeTools(source.tools, topics),
      repoUrl,
      liveUrl: source.liveUrl ?? (live?.homepage ? live.homepage : null),
      stars: live?.stargazers_count ?? fallback?.stars ?? 0,
      updatedAt: live?.pushed_at ?? fallback?.pushedAt ?? null,
      highlight: source.highlight,
      isLive: Boolean(live),
    };
  });
}
