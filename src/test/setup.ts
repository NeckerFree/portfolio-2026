import '@testing-library/jest-dom/vitest';

/**
 * jsdom implements neither of these browser APIs, and both are used by
 * components mounted in tests (theme detection, nav scroll-spy). Stub them
 * with inert versions so a test failure means a real defect, not a missing
 * environment feature.
 */

if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
}

if (!window.IntersectionObserver) {
  // Not declared as `implements IntersectionObserver`: the DOM lib keeps
  // adding optional-in-practice members (scrollMargin, and more over time),
  // and this stub only needs the methods the hook actually calls.
  class MockIntersectionObserver {
    readonly root = null;
    readonly rootMargin = '';
    readonly thresholds: ReadonlyArray<number> = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }

  window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
}
