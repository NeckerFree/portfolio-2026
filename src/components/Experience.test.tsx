import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { VISIBLE_ROLES, profile } from '../data/profile';
import { Experience } from './Experience';

describe('Experience', () => {
  it('shows only the most recent roles by default (AC8)', () => {
    render(<Experience />);

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(VISIBLE_ROLES);
  });

  it('reveals the remaining roles on demand and collapses again', async () => {
    const user = userEvent.setup();
    render(<Experience />);

    const toggle = screen.getByRole('button', { name: /earlier roles/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(profile.experience.length);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('button', { name: /recent roles only/i }));

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(VISIBLE_ROLES);
  });
});
