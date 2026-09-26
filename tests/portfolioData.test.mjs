// portfolioData.test.mjs
// Structural validation of data/portfolioData.json — catches FR/EN drift before deploy.

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(resolve(__dirname, '../data/portfolioData.json'), 'utf-8'));

describe('portfolioData.json — multilingual integrity', () => {
  test('homepage highlights reference real projects and keep both languages aligned', () => {
    const { en, fr } = data.homepage;
    expect(en.stats.map(item => item.value)).toEqual(fr.stats.map(item => item.value));
    expect(en.projects.map(item => item.title)).toEqual(fr.projects.map(item => item.title));
    for (const language of ['en', 'fr']) {
      const copy = data.homepage[language];
      for (const label of ['title', 'intro', 'allProjects', 'viewProject']) {
        expect(copy[label]).toBeTruthy();
      }
      copy.stats.forEach(item => expect(item.label).toBeTruthy());
      copy.projects.forEach(item => {
        expect(data.projects[language].some(project => project.title === item.title)).toBe(true);
        expect(item.detail).toBeTruthy();
      });
    }
  });
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
    ['languages'],
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

  test('AI expertise is complete and aligned in both languages', () => {
    const en = data.aiExpertise.en;
    const fr = data.aiExpertise.fr;

    expect(en.title).toBeTruthy();
    expect(fr.title).toBeTruthy();
    expect(en.professionalTools.map(({ name }) => name))
      .toEqual(fr.professionalTools.map(({ name }) => name));
    expect(en.personalTools.map(({ name }) => name))
      .toEqual(fr.personalTools.map(({ name }) => name));
    expect(en.professionalTools.map(({ name }) => name)).toEqual(['GitHub Copilot', 'SovBox', 'Codestral (Mistral AI)']);
    expect(en.personalTools.map(({ name }) => name)).toEqual(['Codex', 'Claude Code', 'Cursor']);
    expect(en.evidence.length).toBe(fr.evidence.length);
    expect(en.workflow.length).toBe(fr.workflow.length);
    expect(en.principles.length).toBe(fr.principles.length);
  });

  test('every project keeps required fields and matching title across en/fr', () => {
    data.projects.en.forEach((project, i) => {
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(Array.isArray(project.technologies)).toBe(true);
      expect(data.projects.fr[i].title).toBe(project.title);
      expect(data.projects.fr[i].technologies).toEqual(project.technologies);
      expect(data.projects.fr[i].link).toBe(project.link);
      for (const localized of [project, data.projects.fr[i]]) {
        expect(localized.summary).toBeTruthy();
        expect(localized.category).toBeTruthy();
        expect(localized.availability).toBeTruthy();
        for (const image of [localized.image, ...localized.gallery]) {
          expect(existsSync(resolve(__dirname, '..', image))).toBe(true);
        }
      }
    });
  });

  test('resume path is set and points to a pdf', () => {
    const resumePath = data.personalInfo.resume.split('?')[0];
    expect(resumePath).toMatch(/\.pdf$/);
    expect(existsSync(resolve(__dirname, '..', resumePath))).toBe(true);
  });
});
