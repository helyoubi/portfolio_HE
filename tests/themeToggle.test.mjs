// themeToggle.test.mjs
// Tests for themeToggle.js
//
// Test 1: Should set theme from localStorage
//   - Sets a theme in localStorage and expects the body to use that theme.
//
// Test 2: Should toggle theme on button click
//   - Simulates clicking the theme toggle button and expects the theme to change.

import { jest } from '@jest/globals';
import { initializeThemeToggle } from '../scripts/themeToggle.js';

describe('themeToggle.js', () => {
  beforeEach(() => {
    document.body.innerHTML = `<button id="themeToggle"></button>`;
    localStorage.clear();
  });

  test('should set theme from localStorage', () => {
    // Sets a theme in localStorage and expects the body to use that theme
    localStorage.setItem('theme', 'light');
    initializeThemeToggle();
    expect(document.body.getAttribute('data-theme')).toBe('light');
  });

  test('should toggle theme on button click', () => {
    // Simulates clicking the theme toggle button and expects the theme to change
    initializeThemeToggle();
    const btn = document.getElementById('themeToggle');
    btn.click();
    expect(document.body.getAttribute('data-theme')).not.toBe('dark');
  });
});
