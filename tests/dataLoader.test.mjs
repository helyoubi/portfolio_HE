// dataLoader.test.mjs
// Tests for dataLoader.js
//
// Test 1: Should return null on fetch error
//   - Simulates a fetch error and expects loadPortfolioData to return null.
//
// Test 2: Should return data on success
//   - Simulates a successful fetch and expects loadPortfolioData to return the data.

import { jest } from '@jest/globals';
import { loadPortfolioData } from '../scripts/dataLoader.js';

describe('dataLoader.js', () => {
  test('should return null on fetch error', async () => {
    // Simulates a fetch error and expects loadPortfolioData to return null
    global.fetch = jest.fn(() => Promise.reject('error'));
    const data = await loadPortfolioData();
    expect(data).toBeNull();
  });

  test('should return data on success', async () => {
    // Simulates a successful fetch and expects loadPortfolioData to return the data
    const mockJson = { personalInfo: {} };
    global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(mockJson) }));
    const data = await loadPortfolioData();
    expect(data).toEqual(mockJson);
  });
});
