// pageLoader.test.mjs
// Tests for pageLoader.js
//
// Test 1: Should export loadTrainingsPage function
//   - Verifies that the pageLoader module exports the required training function.
//
// Test 2: Should export loadProjectsPage function
//   - Verifies that the pageLoader module exports the required projects function.

import { jest } from '@jest/globals';

describe('pageLoader.js', () => {
  test('should export loadTrainingsPage function', async () => {
    const pageLoaderModule = await import('../scripts/pageLoader.js');
    expect(typeof pageLoaderModule.loadTrainingsPage).toBe('function');
  });

  test('should export loadProjectsPage function', async () => {
    const pageLoaderModule = await import('../scripts/pageLoader.js');
    expect(typeof pageLoaderModule.loadProjectsPage).toBe('function');
  });
});