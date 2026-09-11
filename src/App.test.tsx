import { render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import App from './App';
import { profile } from './data/profile';
import { projectSources } from './data/projects';

/**
 * Whole-page smoke test: every section mounts, the landmarks a screen reader
 * navigates by are present, and the CV/contact links point somewhere real.
 */
beforeEach(() => {
  sessionStorage.clear();
  // Offline by default so the page renders from the snapshot deterministically.
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('App', () => {
  it('renders every section in reading order', () => {
    const { container } = render(<App />);

    const sectionIds = [...container.querySelectorAll('section')].map((section) => section.id);
    expect(sectionIds).toEqual([
      'home',
      'projects',
      'skills',
      'experience',
      'education',
      'contact',
    ]);
  });

  it('exposes the landmarks and skip link assistive tech needs (AC10)', () => {
    render(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute('href', '#main');
    expect(screen.getByRole('navigation', { name: /sections/i })).toBeInTheDocument();
  });

  it('puts the name, title and the four primary contact routes on the page (AC1)', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(profile.name);

    const contact = document.getElementById('contact');
    expect(contact).not.toBeNull();
    const links = within(contact as HTMLElement);
    expect(links.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      profile.contact.github,
    );
    expect(links.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'href',
      profile.contact.linkedin,
    );
    expect(links.getByRole('link', { name: /email/i })).toHaveAttribute(
      'href',
      `mailto:${profile.contact.email}`,
    );
    expect(links.getByRole('link', { name: /download my cv/i })).toHaveAttribute(
      'href',
      profile.contact.cv,
    );
  });

  it('renders one card per pinned project and every skill group', () => {
    render(<App />);

    const projects = within(document.getElementById('projects') as HTMLElement);
    expect(projects.getAllByRole('heading', { level: 3 })).toHaveLength(projectSources.length);

    const skills = within(document.getElementById('skills') as HTMLElement);
    expect(skills.getAllByRole('heading', { level: 3 })).toHaveLength(profile.skills.length);
  });

  it('offers a theme toggle (AC9)', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: /switch to (light|dark) theme/i })).toBeInTheDocument();
  });
});
