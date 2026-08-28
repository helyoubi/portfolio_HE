// hamburgerMenu.test.mjs
// Tests for hamburgerMenu.js
//
// Test 1: Should export initializeHamburgerMenu function
//   - Verifies that the hamburgerMenu module exports the required function.
//
// Test 2: Should export updateNavigationLanguage function
//   - Verifies that the hamburgerMenu module exports the language update function.

import { jest } from '@jest/globals';

describe('hamburgerMenu.js', () => {
  test('should export initializeHamburgerMenu function', async () => {
    const hamburgerMenuModule = await import('../scripts/hamburgerMenu.js');
    expect(typeof hamburgerMenuModule.initializeHamburgerMenu).toBe('function');
  });

  test('should export updateNavigationLanguage function', async () => {
    const hamburgerMenuModule = await import('../scripts/hamburgerMenu.js');
    expect(typeof hamburgerMenuModule.updateNavigationLanguage).toBe('function');
  });

  test('keeps aria-expanded in sync when the menu opens and closes', async () => {
    document.documentElement.lang = 'fr';
    document.body.innerHTML = `
      <button id="hamburgerMenu" aria-expanded="false"></button>
      <nav id="navMenu"><a href="index.html#home">Accueil</a></nav>
    `;
    const { initializeHamburgerMenu } = await import('../scripts/hamburgerMenu.js');

    initializeHamburgerMenu();
    const button = document.getElementById('hamburgerMenu');
    button.click();
    expect(button.getAttribute('aria-expanded')).toBe('true');

    button.click();
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });
});
