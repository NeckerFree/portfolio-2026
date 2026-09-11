import { useEffect, useState } from 'react';

import { projectSources } from '../data/projects';
import { snapshot } from '../data/snapshot';
import { fetchRepos, mergeProjects } from '../lib/github';
import type { DataStatus, Project } from '../types';

interface UseProjectsResult {
  projects: Project[];
  status: DataStatus;
}

/**
 * Project cards, live where possible.
 *
 * Renders the snapshot immediately so there is never an empty section, then
 * swaps in live GitHub data when it arrives. If the fetch fails — offline, or
 * a shared IP that has burned the 60/hour limit — the snapshot simply stays
 * and `status` reports `'snapshot'` so the UI can say so (AC4).
 */
export function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>(() =>
    mergeProjects(projectSources, null, snapshot),
  );
  const [status, setStatus] = useState<DataStatus>('loading');

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    fetchRepos(controller.signal)
      .then((repos) => {
        if (!active) return;
        setProjects(mergeProjects(projectSources, repos, snapshot));
        setStatus('live');
      })
      .catch(() => {
        if (!active) return;
        // Keep the snapshot that is already on screen.
        setStatus('snapshot');
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  return { projects, status };
}
