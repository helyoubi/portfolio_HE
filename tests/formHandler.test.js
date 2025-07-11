// formHandler.test.js
// Tests for formHandler.js
//
// Test 1: Should show success alert on successful submit
//   - Simulates submitting the contact form with a successful fetch response.
//   - Expects a success alert to be shown.
//
// Test 2: Should show error alert on failed submit
//   - Simulates submitting the contact form with a failed fetch response.
//   - Expects an error alert to be shown.

import { jest } from '@jest/globals';

describe('formHandler.js', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="contactForm" action="/submit"></form>
    `;
    global.fetch = jest.fn(() => Promise.resolve({ ok: true }));
    window.alert = jest.fn();
  });

  test('should show success alert on successful submit', async () => {
    // Simulates a successful form submission and expects a success alert
    require('../scripts/formHandler.js');
    const form = document.getElementById('contactForm');
    const event = new Event('submit');
    form.dispatchEvent(event);
    await Promise.resolve();
    expect(window.alert).toHaveBeenCalledWith('Message sent successfully!');
  });

  test('should show error alert on failed submit', async () => {
    // Simulates a failed form submission and expects an error alert
    global.fetch = jest.fn(() => Promise.resolve({ ok: false }));
    require('../scripts/formHandler.js');
    const form = document.getElementById('contactForm');
    const event = new Event('submit');
    form.dispatchEvent(event);
    await Promise.resolve();
    expect(window.alert).toHaveBeenCalledWith('Oops! There was a problem sending your message.');
  });
});
