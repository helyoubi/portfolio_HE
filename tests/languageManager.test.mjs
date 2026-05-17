// languageManager.test.mjs
// Tests for languageManager.js — verifies persistence and <html lang> sync.

import { jest } from '@jest/globals';
import {
  getCurrentLanguage,
  setCurrentLanguage,
  initializeLanguageSwitcher
} from '../scripts/languageManager.js';

describe('languageManager.js', () => {
  beforeEach(() => {
    document.documentElement.lang = '';
    document.body.innerHTML = '<button id="languageSwitcher"></button>';
    localStorage.clear();
  });

  test('defaults to French when no preference stored', () => {
    expect(getCurrentLanguage()).toBe('fr');
  });

  test('setCurrentLanguage persists to localStorage and syncs <html lang>', () => {
    setCurrentLanguage('en');
    expect(localStorage.getItem('language')).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });

  test('initializeLanguageSwitcher syncs <html lang> from storage on load', () => {
    localStorage.setItem('language', 'en');
    initializeLanguageSwitcher();
    expect(document.documentElement.lang).toBe('en');
  });

  test('clicking the switcher toggles fr<->en and notifies caller', () => {
    localStorage.setItem('language', 'fr');
    const onChange = jest.fn();
    initializeLanguageSwitcher(onChange);
    document.getElementById('languageSwitcher').click();
    expect(getCurrentLanguage()).toBe('en');
    expect(onChange).toHaveBeenCalledWith('en');
  });
});
