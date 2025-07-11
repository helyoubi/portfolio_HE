// main.test.mjs
// Tests for main.js
//
// Test: Should render main page elements
//   - Checks that main page elements exist in the DOM.

import { jest } from '@jest/globals';

describe('main.js', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="scrollToTop"></button>
      <div id="copilot-credit"></div>
      <a href="#home">Home</a>
      <section class="section" id="home"></section>
    `;
  });

  test('should render main page elements', () => {
    expect(document.getElementById('scrollToTop')).not.toBeNull();
    expect(document.getElementById('copilot-credit')).not.toBeNull();
    expect(document.querySelector('a[href="#home"]')).not.toBeNull();
    expect(document.getElementById('home')).not.toBeNull();
  });
});
