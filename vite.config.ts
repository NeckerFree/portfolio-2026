/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * The site is served from https://neckerfree.github.io/portfolio-2026/, i.e.
 * a sub-path rather than a domain root, so every asset URL has to be built
 * with that prefix (AC11). If this ever moves to a custom domain or a user
 * site, `base` becomes '/'. See docs/adr/0005-github-actions-pages-deploy.md.
 */
export default defineConfig({
  base: '/portfolio-2026/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});
