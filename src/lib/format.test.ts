import { describe, expect, it } from 'vitest';

import { formatStars, relativeTime } from './format';

const now = new Date('2026-09-10T12:00:00Z');

describe('relativeTime', () => {
  it('handles the recent past in days', () => {
    expect(relativeTime('2026-09-10T08:00:00Z', now)).toBe('today');
    expect(relativeTime('2026-09-09T08:00:00Z', now)).toBe('yesterday');
    expect(relativeTime('2026-09-01T12:00:00Z', now)).toBe('9 days ago');
  });

  it('switches to months and years', () => {
    expect(relativeTime('2026-08-05T12:00:00Z', now)).toBe('last month');
    expect(relativeTime('2026-03-10T12:00:00Z', now)).toBe('6 months ago');
    expect(relativeTime('2025-01-10T12:00:00Z', now)).toBe('last year');
    expect(relativeTime('2022-09-10T12:00:00Z', now)).toBe('4 years ago');
  });

  it('returns an empty string for missing or invalid input', () => {
    expect(relativeTime(null, now)).toBe('');
    expect(relativeTime('not-a-date', now)).toBe('');
  });
});

describe('formatStars', () => {
  it('shows small counts verbatim and compacts thousands', () => {
    expect(formatStars(0)).toBe('0');
    expect(formatStars(31)).toBe('31');
    expect(formatStars(1200)).toBe('1.2k');
    expect(formatStars(2000)).toBe('2k');
  });
});
