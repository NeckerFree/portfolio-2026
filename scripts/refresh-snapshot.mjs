/**
 * Regenerates src/data/snapshot.ts from the live GitHub API.
 *
 * The snapshot is the offline/rate-limited fallback for the project cards, so
 * it should be refreshed whenever `projectSources` changes or the repos have
 * moved on noticeably. Run it with:
 *
 *   npm run snapshot
 *
 * Unauthenticated by default (60 requests/hour is plenty for one call). Set
 * GITHUB_TOKEN in the environment to raise the limit if you hit it.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const SOURCES_PATH = resolve(root, 'src/data/projects.ts');
const OUTPUT_PATH = resolve(root, 'src/data/snapshot.ts');

const USER = 'NeckerFree';

/** Reads the repo names out of projects.ts without importing TypeScript. */
async function readRepoNames() {
  const source = await readFile(SOURCES_PATH, 'utf8');
  const names = [...source.matchAll(/^\s*repo:\s*'([^']+)'/gm)].map((match) => match[1]);
  if (names.length === 0) {
    throw new Error(`No repo names found in ${SOURCES_PATH}`);
  }
  return names;
}

async function fetchRepos() {
  const headers = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(
    `https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`,
    { headers },
  );

  if (!response.ok) {
    throw new Error(`GitHub API responded ${response.status} ${response.statusText}`);
  }
  return response.json();
}

const quote = (value) => (value === null ? 'null' : JSON.stringify(value));

function render(entries) {
  const body = entries
    .map(
      ({ name, data }) => `  ${JSON.stringify(name)}: {
    description: ${quote(data.description)},
    topics: ${JSON.stringify(data.topics)},
    stars: ${data.stars},
    pushedAt: ${quote(data.pushedAt)},
    url: ${quote(data.url)},
  },`,
    )
    .join('\n');

  return `/**
 * GENERATED FILE — do not hand-edit.
 *
 * A snapshot of the volatile GitHub fields (description, topics, stars,
 * last push) for every repo in \`projectSources\`. It is rendered only when the
 * live GitHub fetch fails or the visitor is rate-limited, so the project
 * cards are never empty (AC4).
 *
 * Refresh with: npm run snapshot
 * Last generated: ${new Date().toISOString().slice(0, 10)}
 */

import type { ProjectSnapshot } from '../types';

export const snapshot: Record<string, ProjectSnapshot> = {
${body}
};
`;
}

async function main() {
  const names = await readRepoNames();
  const repos = await fetchRepos();
  const byName = new Map(repos.map((repo) => [repo.name.toLowerCase(), repo]));

  const entries = [];
  const missing = [];

  for (const name of names) {
    const repo = byName.get(name.toLowerCase());
    if (!repo) {
      missing.push(name);
      continue;
    }
    entries.push({
      name,
      data: {
        description: repo.description,
        topics: repo.topics ?? [],
        stars: repo.stargazers_count,
        pushedAt: repo.pushed_at,
        url: repo.html_url,
      },
    });
  }

  if (missing.length > 0) {
    console.warn(
      `warning: no public repo found for ${missing.join(', ')} — left out of the snapshot`,
    );
  }

  await writeFile(OUTPUT_PATH, render(entries), 'utf8');
  console.log(`Wrote ${entries.length} project(s) to src/data/snapshot.ts`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
