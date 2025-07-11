// main.test.mjs
// Tests for main.js
//
// Test 1: Should show scroll-to-top button when scrolled
//   - Simulates scrolling down and expects the scroll-to-top button to be visible.
//
// Test 2: Should hide scroll-to-top button when not scrolled
//   - Simulates being at the top of the page and expects the button to be hidden.
//
// Test 3: Should update copilot credit
//   - Checks that the Copilot credit is updated in the DOM.

import { jest } from '@jest/globals';

describe('main.js', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="scrollToTop"></button>
      <div id="copilot-credit"></div>
      <a href="#home">Home</a>
      <section class="section" id="home"></section>
    `;
    window.scrollY = 0;
  });

  test('should show scroll-to-top button when scrolled', () => {
    // Simulates scrolling down and expects the scroll-to-top button to be visible
    const scrollToTop = document.getElementById('scrollToTop');
    window.scrollY = 400;
    window.dispatchEvent(new Event('scroll'));
    expect(scrollToTop.classList.contains('show')).toBe(true);
  });

  test('should hide scroll-to-top button when not scrolled', () => {
    // Simulates being at the top of the page and expects the button to be hidden
    const scrollToTop = document.getElementById('scrollToTop');
    window.scrollY = 0;
    window.dispatchEvent(new Event('scroll'));
    expect(scrollToTop.classList.contains('show')).toBe(false);
  });

  test('should update copilot credit', async () => {
    // Checks that the Copilot credit is updated in the DOM
    await import('../scripts/main.js');
    const copilotCredit = document.getElementById('copilot-credit');
    expect(copilotCredit.innerHTML).toContain('GitHub Copilot');
  });
});
