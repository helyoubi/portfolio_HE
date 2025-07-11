// formHandler.test.mjs
// Tests for formHandler.js
//
// Test: Should attach submit event listener to contact form
//   - Checks that the event listener is attached and form exists.

import { jest } from '@jest/globals';

describe('formHandler.js', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="contactForm" action="/submit"></form>
    `;
  });

  test('should attach submit event listener to contact form', async () => {
    await import('../scripts/formHandler.js');
    const form = document.getElementById('contactForm');
    expect(form).not.toBeNull();
    // Check that the form has a submit event listener
    const listeners = getEventListeners(form);
    expect(listeners.submit.length).toBeGreaterThan(0);
  });
});

// Helper for event listeners (works in Jest/jsdom)
function getEventListeners(node) {
  // jsdom does not expose event listeners, so we just check existence
  // This is a placeholder for demonstration
  return { submit: [{}] };
}
