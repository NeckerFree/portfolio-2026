import { describe, expect, it } from 'vitest';

import { labelTopic, mergeProjects } from './github';
import type { GitHubRepo, ProjectSnapshot, ProjectSource } from '../types';

const sources: ProjectSource[] = [
  {
    repo: 'AdvancedWebAPI',
    label: 'Advanced Web API',
    description: 'Authored description.',
    tools: ['.NET Core', 'Minimal APIs'],
    highlight: 'Most-starred repo',
  },
  {
    repo: 'StudentsWebApp',
    label: 'Students Web App',
    tools: ['Angular'],
  },
];

const snapshot: Record<string, ProjectSnapshot> = {
  AdvancedWebAPI: {
    description: 'Snapshot description.',
    topics: ['minimal-api'],
    stars: 31,
    pushedAt: '2025-12-21T00:21:29Z',
    url: 'https://github.com/NeckerFree/AdvancedWebAPI',
  },
  StudentsWebApp: {
    description: 'Snapshot students description.',
    topics: ['sqlite'],
    stars: 1,
    pushedAt: '2023-03-04T06:59:43Z',
    url: 'https://github.com/NeckerFree/StudentsWebApp',
  },
};

const repo = (overrides: Partial<GitHubRepo> & { name: string }): GitHubRepo => ({
  description: null,
  html_url: `https://github.com/NeckerFree/${overrides.name}`,
  homepage: null,
  topics: [],
  stargazers_count: 0,
  pushed_at: '2026-09-01T00:00:00Z',
  language: null,
  archived: false,
  ...overrides,
});

describe('mergeProjects', () => {
  it('preserves the authored order regardless of the API response order', () => {
    const repos = [repo({ name: 'StudentsWebApp' }), repo({ name: 'AdvancedWebAPI' })];

    const result = mergeProjects(sources, repos, snapshot);

    expect(result.map((project) => project.id)).toEqual(['AdvancedWebAPI', 'StudentsWebApp']);
  });

  it('prefers an authored description over the live one', () => {
    const repos = [repo({ name: 'AdvancedWebAPI', description: 'Live description.' })];

    const [project] = mergeProjects(sources, repos, snapshot);

    expect(project.description).toBe('Authored description.');
  });

  it('uses the live description when none is authored', () => {
    const repos = [repo({ name: 'StudentsWebApp', description: 'Live students description.' })];

    const result = mergeProjects(sources, repos, snapshot);

    expect(result[1].description).toBe('Live students description.');
  });

  it('falls back to the snapshot when the fetch failed', () => {
    const result = mergeProjects(sources, null, snapshot);

    expect(result[1].description).toBe('Snapshot students description.');
    expect(result[1].stars).toBe(1);
    expect(result.every((project) => project.isLive)).toBe(false);
  });

  it('marks cards as live only when a matching repo came back', () => {
    const repos = [repo({ name: 'AdvancedWebAPI', stargazers_count: 42 })];

    const [advanced, students] = mergeProjects(sources, repos, snapshot);

    expect(advanced.isLive).toBe(true);
    expect(advanced.stars).toBe(42);
    expect(students.isLive).toBe(false);
    expect(students.stars).toBe(1); // snapshot value
  });

  it('matches repo names case-insensitively', () => {
    const repos = [repo({ name: 'advancedwebapi', stargazers_count: 7 })];

    const [project] = mergeProjects(sources, repos, snapshot);

    expect(project.isLive).toBe(true);
    expect(project.stars).toBe(7);
  });

  it('lists curated tools first, then topics, without duplicates', () => {
    const repos = [
      repo({ name: 'AdvancedWebAPI', topics: ['minimal-api', 'c-sharp', 'repository-pattern'] }),
    ];

    const [project] = mergeProjects(sources, repos, snapshot);

    // 'minimal-api' prettifies to 'Minimal APIs', which is already curated.
    expect(project.tools).toEqual(['.NET Core', 'Minimal APIs', 'C#', 'Repository Pattern']);
  });

  it('supports projects that are not on GitHub at all', () => {
    const offGitHub: ProjectSource[] = [
      {
        repo: null,
        label: 'Private Client Platform',
        description: 'Closed-source work.',
        tools: ['C#'],
        liveUrl: 'https://example.com',
      },
    ];

    const [project] = mergeProjects(offGitHub, [], snapshot);

    expect(project.id).toBe('private-client-platform');
    expect(project.repoUrl).toBeNull();
    expect(project.liveUrl).toBe('https://example.com');
    expect(project.isLive).toBe(false);
  });

  it('builds a repo URL even when neither live data nor a snapshot exists', () => {
    const brandNew: ProjectSource[] = [{ repo: 'BrandNewRepo', label: 'Brand New', tools: [] }];

    const [project] = mergeProjects(brandNew, null, snapshot);

    expect(project.repoUrl).toBe('https://github.com/NeckerFree/BrandNewRepo');
    expect(project.description).toBe('');
  });
});

describe('labelTopic', () => {
  it('maps known slugs to their proper names', () => {
    expect(labelTopic('c-sharp')).toBe('C#');
    expect(labelTopic('ci-cd')).toBe('CI/CD');
    expect(labelTopic('nodejs')).toBe('Node.js');
  });

  it('title-cases anything unknown', () => {
    expect(labelTopic('event-sourcing')).toBe('Event Sourcing');
  });
});
