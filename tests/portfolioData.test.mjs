// portfolioData.test.mjs
// Structural validation of data/portfolioData.json — catches FR/EN drift before deploy.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(resolve(__dirname, '../data/portfolioData.json'), 'utf-8'));

describe('portfolioData.json — multilingual integrity', () => {
  test('personalInfo has both en and fr for name, title, bio', () => {
    expect(data.personalInfo.name.en).toBeTruthy();
    expect(data.personalInfo.name.fr).toBeTruthy();
    expect(data.personalInfo.title.en).toBeTruthy();
    expect(data.personalInfo.title.fr).toBeTruthy();
    expect(data.personalInfo.bio.en).toBeTruthy();
    expect(data.personalInfo.bio.fr).toBeTruthy();
  });

  test.each([
    ['experience'],
    ['education'],
    ['projects'],
    ['softSkills'],
    ['achievements']
  ])('%s has identical en/fr array lengths', (section) => {
    expect(Array.isArray(data[section].en)).toBe(true);
    expect(Array.isArray(data[section].fr)).toBe(true);
    expect(data[section].en.length).toBe(data[section].fr.length);
  });

  test('personalInfo.certifications has en and fr with matching length', () => {
    expect(data.personalInfo.certifications.en.length)
      .toBe(data.personalInfo.certifications.fr.length);
  });

  test('every project keeps required fields and matching title across en/fr', () => {
    data.projects.en.forEach((project, i) => {
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(Array.isArray(project.technologies)).toBe(true);
      expect(data.projects.fr[i].title).toBe(project.title);
    });
  });

  test('resume path is set and points to a pdf', () => {
    expect(data.personalInfo.resume).toMatch(/\.pdf$/);
  });
});
