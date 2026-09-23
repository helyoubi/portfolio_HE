import { jest } from '@jest/globals';
import { ModalManager } from '../scripts/modalManager.js';

test('reopening the gallery does not duplicate next handlers, and one-image projects hide controls', () => {
  document.body.innerHTML = `<div id="project-modal">
    <div id="modal-project-gallery-container"><div id="modal-gallery"></div></div>
    <div id="gallery-controls"><button class="gallery-prev"></button><div id="gallery-dots"></div><button class="gallery-next"></button></div>
  </div><div id="lightbox"></div>`;
  const manager = new ModalManager();
  manager.modal = document.getElementById('project-modal');
  const gallery = document.getElementById('modal-gallery');
  gallery.scrollTo = jest.fn();
  const project = { title: 'Demo', gallery: ['one.png', 'two.png', 'three.png'] };
  manager.updateGallery(project, manager.translations.fr);
  manager.updateGallery(project, manager.translations.fr);
  document.querySelector('.gallery-next').click();
  expect(manager.currentGalleryIndex).toBe(1);
  expect(gallery.scrollTo).toHaveBeenCalledTimes(1);
  manager.updateGallery({ title: 'Single', gallery: ['one.png'] }, manager.translations.fr);
  expect(document.getElementById('gallery-controls').style.display).toBe('none');
  expect(gallery.querySelector('button').getAttribute('aria-label')).toContain('Agrandir');
});
