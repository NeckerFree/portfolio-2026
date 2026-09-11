/** Small presentation helpers, kept out of components so they can be tested. */

/** "Updated 3 months ago" style label from an ISO timestamp. */
export function relativeTime(iso: string | null, now: Date = new Date()): string {
  if (!iso) return '';
  const then = new Date(iso);
  if (Number.isNaN(then.getTime())) return '';

  const days = Math.floor((now.getTime() - then.getTime()) / 86_400_000);
  if (days < 0) return 'just now';
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return months === 1 ? 'last month' : `${months} months ago`;

  const years = Math.floor(days / 365);
  return years === 1 ? 'last year' : `${years} years ago`;
}

/** Compact star counts: 1200 -> "1.2k". */
export function formatStars(stars: number): string {
  if (stars < 1000) return String(stars);
  return `${(stars / 1000).toFixed(1).replace(/\.0$/, '')}k`;
}
