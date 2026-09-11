import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { projectSources } from '../data/projects';
import { Projects } from './Projects';

/** A minimal GitHub payload for one repo, enough for the merge to apply. */
const liveRepo = (name: string, description: string, stars: number) => ({
  name,
  description,
  html_url: `https://github.com/NeckerFree/${name}`,
  homepage: null,
  topics: [],
  stargazers_count: stars,
  pushed_at: '2026-09-01T00:00:00Z',
  language: 'C#',
  archived: false,
});

beforeEach(() => {
  sessionStorage.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Projects', () => {
  it('renders a card per pinned project, in the authored order', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

    render(<Projects />);

    const headings = await screen.findAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(projectSources.length);
    expect(headings.map((heading) => heading.textContent)).toEqual(
      projectSources.map((source) => source.label),
    );
  });

  it('falls back to the bundled snapshot and says so when GitHub is unreachable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

    render(<Projects />);

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/saved copy/i);
    });
    // The section is still complete — never an empty state.
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(projectSources.length);
  });

  it('applies live GitHub data when the request succeeds', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => [liveRepo('StudentsWebApp', 'A freshly edited description.', 99)],
      }),
    );

    render(<Projects />);

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/live/i);
    });
    // The live star count replaces the snapshot's (which is 1).
    expect(screen.getByText('99')).toBeInTheDocument();
  });

  it('keeps an authored description even when GitHub returns its own', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => [liveRepo('AdvancedWebAPI', 'Whatever the repo says.', 31)],
      }),
    );

    render(<Projects />);

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/live/i);
    });
    expect(screen.queryByText('Whatever the repo says.')).not.toBeInTheDocument();
  });
});
