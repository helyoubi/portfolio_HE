import { jest } from '@jest/globals';
import '../scripts/formHandler.js';

const renderForm = () => {
  document.body.innerHTML = `<form id="contactForm" action="https://formspree.io/f/mpwqdrdd">
    <input name="name" value="Test" required>
    <textarea name="message">Test message</textarea>
    <button type="submit">Envoyer</button><p role="status"></p>
  </form>`;
  return document.querySelector('form');
};
const submit = form => form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
const flush = () => new Promise(resolve => setTimeout(resolve, 0));

test('handles a dynamically inserted form and prevents duplicate submissions', async () => {
  document.documentElement.lang = 'fr';
  let finish;
  global.fetch = jest.fn(() => new Promise(resolve => { finish = resolve; }));
  const form = renderForm();
  submit(form);
  submit(form);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(form.querySelector('button').disabled).toBe(true);
  finish({ ok: true });
  await flush();
  expect(form.querySelector('[role="status"]').textContent).toContain('envoyé');
  expect(form.querySelector('button').disabled).toBe(false);
});

test('a replaced English form preserves text after an HTTP failure', async () => {
  document.documentElement.lang = 'en';
  global.fetch = jest.fn(async () => ({ ok: false }));
  const form = renderForm();
  submit(form);
  await flush();
  expect(form.querySelector('[role="status"]').textContent).toContain('could not be sent');
  expect(form.querySelector('textarea').value).toBe('Test message');
  expect(form.querySelector('button').disabled).toBe(false);
});

test('invalid forms are not sent', () => {
  const form = renderForm();
  form.querySelector('input').value = '';
  global.fetch = jest.fn();
  submit(form);
  expect(fetch).not.toHaveBeenCalled();
});
