// modalManager.js
export class ModalManager {
    constructor() {
        this.modal = null;
        this.activeModal = null;
        this.focusBeforeModal = null;
        this.currentLanguage = 'fr';
        this.lightbox = null;
        this.currentImages = [];
        this.currentImageIndex = 0;
        this.scrollPosition = 0;
        this.translations = {
            'fr': {
                projectDetails: 'Détails du projet',
                technologies: 'Technologies :',
                aiAssistant: 'Assistant IA :',
                projectLink: 'Lien du projet :',
                projectGallery: 'Galerie du projet :',
                visitProject: 'Visiter le projet',
                closeModal: 'Fermer la modale'
            },
            'en': {
                projectDetails: 'Project Details',
                technologies: 'Technologies:',
                aiAssistant: 'AI Assistant:',
                projectLink: 'Project Link:',
                projectGallery: 'Project Gallery:',
                visitProject: 'Visit Project',
                closeModal: 'Close modal'
            }
        };
        // Initialize after DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.modal = document.getElementById('project-modal');
        if (!this.modal) {
            // Modal not found - probably not needed on this page (e.g., trainings page)
            console.log('Project modal not found - not needed on this page');
            return;
        }

        // Initialize lightbox
        this.initLightbox();

        // Get current language
        this.getCurrentLanguage();

        // Setup close button
        const closeButton = this.modal.querySelector('.modal-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.closeModal();
            });
        }

        // Handle escape key globally
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.closeModal();
            }
            if (e.key === 'Escape' && this.lightbox && this.lightbox.open) {
                this.closeLightbox();
            }
        });

        // Handle browser back button on mobile - let browser handle it naturally
        // Removed cancel event to avoid conflicts

        // Handle backdrop clicks
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Setup focus trap
        this.setupFocusTrap();
    }

    async getCurrentLanguage() {
        try {
            const { getCurrentLanguage } = await import('./languageManager.js');
            this.currentLanguage = getCurrentLanguage();
        } catch (error) {
            console.warn('Could not import language manager, defaulting to French');
            this.currentLanguage = 'fr';
        }
    }

    openModal(projectData, language = null) {
        // Check if modal is available before proceeding
        if (!this.modal) {
            console.warn('Cannot open modal: modal not initialized');
            return;
        }

        if (language) {
            this.currentLanguage = language;
        } else {
            this.getCurrentLanguage();
        }

        // Store current scroll position (simplified)
        this.scrollPosition = window.pageYOffset;

        // Store current focus
        this.focusBeforeModal = document.activeElement;

        // Populate modal with project data
        this.populateModal(projectData);

        // Show modal
        this.modal.showModal();
        this.activeModal = 'project-modal';

        // Simple body scroll prevention
        document.body.classList.add('modal-open');

        // Focus on close button
        const closeButton = this.modal.querySelector('.modal-close');
        if (closeButton) {
            closeButton.focus();
        }
    }

    closeModal() {
        if (!this.activeModal) return;

        // Ultra simple approach - no animations, immediate action
        this.modal.close();
        this.activeModal = null;
        
        // Restore body immediately
        document.body.className = document.body.className.replace('modal-open', '');
        document.body.removeAttribute('style');
        document.documentElement.removeAttribute('style');
        
        // Restore scroll position
        if (this.scrollPosition !== undefined) {
            window.scrollTo(0, this.scrollPosition);
        }
        
        // Restore focus
        if (this.focusBeforeModal) {
            this.focusBeforeModal.focus();
            this.focusBeforeModal = null;
        }
    }

    populateModal(projectData) {
        const t = this.translations[this.currentLanguage];

        // Update modal title
        const modalTitle = this.modal.querySelector('#modal-title');
        if (modalTitle) {
            modalTitle.textContent = `${t.projectDetails} - ${projectData.title}`;
        }

        // Update project image
        this.updateProjectImage(projectData);

        // Update project description
        const descElement = this.modal.querySelector('#modal-project-desc');
        if (descElement && projectData.description) {
            descElement.textContent = projectData.description;
        }

        // Update technologies
        this.updateTechnologies(projectData, t);

        // Update AI Assistant
        this.updateAIAssistant(projectData, t);

        // Update project link
        this.updateProjectLink(projectData, t);

        // Update gallery
        this.updateGallery(projectData, t);

        // Update accessibility attributes
        const closeButton = this.modal.querySelector('.modal-close');
        if (closeButton) {
            closeButton.setAttribute('aria-label', t.closeModal);
        }
    }

    updateProjectImage(projectData) {
        const imageContainer = this.modal.querySelector('#modal-project-image');
        if (imageContainer && projectData.image) {
            imageContainer.innerHTML = `
                <img src="${projectData.image}" 
                     alt="${projectData.title}" 
                     class="modal-project-img">
            `;
        } else if (imageContainer) {
            imageContainer.innerHTML = '';
        }
    }

    updateTechnologies(projectData, translations) {
        const titleElement = this.modal.querySelector('#modal-technologies-title');
        const listElement = this.modal.querySelector('#modal-technologies-list');
        
        if (titleElement) {
            titleElement.textContent = translations.technologies;
        }

        if (listElement && projectData.technologies) {
            listElement.innerHTML = projectData.technologies.map(tech => 
                `<span class="tech-tag">${tech}</span>`
            ).join('');
        }
    }

    updateAIAssistant(projectData, translations) {
        const titleElement = this.modal.querySelector('#modal-ai-title');
        const listElement = this.modal.querySelector('#modal-ai-list');
        
        if (titleElement) {
            titleElement.textContent = translations.aiAssistant;
        }

        if (listElement && projectData.AIAssistant) {
            listElement.innerHTML = projectData.AIAssistant.map(ai => 
                `<span class="ai-tag">${ai}</span>`
            ).join('');
        }
    }

    updateProjectLink(projectData, translations) {
        const linkContainer = this.modal.querySelector('#modal-project-link-container');
        const titleElement = this.modal.querySelector('#modal-link-title');
        const linkElement = this.modal.querySelector('#modal-project-link');
        const linkTextElement = this.modal.querySelector('#modal-link-text');

        if (projectData.link && projectData.link.trim() !== '') {
            if (linkContainer) linkContainer.style.display = 'block';
            if (titleElement) titleElement.textContent = translations.projectLink;
            if (linkElement) linkElement.href = projectData.link;
            if (linkTextElement) linkTextElement.textContent = translations.visitProject;
        } else {
            if (linkContainer) linkContainer.style.display = 'none';
        }
    }

    updateGallery(projectData, translations) {
        const galleryContainer = this.modal.querySelector('#modal-project-gallery-container');
        const titleElement = this.modal.querySelector('#modal-gallery-title');
        const galleryElement = this.modal.querySelector('#modal-gallery');

        if (projectData.gallery && projectData.gallery.length > 0) {
            if (galleryContainer) galleryContainer.style.display = 'block';
            if (titleElement) titleElement.textContent = translations.projectGallery;
            
            if (galleryElement) {
                galleryElement.innerHTML = projectData.gallery.map((image, index) => `
                    <div class="gallery-item" data-index="${index}">
                        <img src="${image}" alt="${projectData.title} - Image ${index + 1}" class="gallery-image" data-lightbox-index="${index}">
                    </div>
                `).join('');

                // Store images for lightbox
                this.currentImages = projectData.gallery;

                // Add event listeners to images
                const galleryImages = galleryElement.querySelectorAll('.gallery-image');
                galleryImages.forEach((img, index) => {
                    img.addEventListener('click', () => {
                        this.openLightbox(index, projectData.title);
                    });
                });

                // Initialize gallery controls if more than one image
                if (projectData.gallery.length > 1) {
                    this.initGalleryControls(projectData.gallery.length);
                }
            }
        } else {
            if (galleryContainer) galleryContainer.style.display = 'none';
        }
    }

    initGalleryControls(imageCount) {
        const controlsContainer = this.modal.querySelector('#gallery-controls');
        const dotsContainer = this.modal.querySelector('#gallery-dots');
        const prevBtn = this.modal.querySelector('.gallery-prev');
        const nextBtn = this.modal.querySelector('.gallery-next');

        if (controlsContainer) controlsContainer.style.display = 'flex';

        // Create dots for navigation
        if (dotsContainer) {
            dotsContainer.innerHTML = Array.from({ length: imageCount }, (_, index) => `
                <button class="gallery-dot ${index === 0 ? 'active' : ''}" 
                        data-index="${index}" 
                        aria-label="Go to image ${index + 1}">
                </button>
            `).join('');

            // Add click handlers to dots
            dotsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('gallery-dot')) {
                    const index = parseInt(e.target.dataset.index);
                    this.goToGallerySlide(index);
                }
            });
        }

        // Add navigation button handlers
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevGallerySlide());
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextGallerySlide());
        }

        this.currentGalleryIndex = 0;
        this.maxGalleryIndex = imageCount - 1;
    }

    goToGallerySlide(index) {
        const gallery = this.modal.querySelector('#modal-gallery');
        const dots = this.modal.querySelectorAll('.gallery-dot');
        
        if (gallery) {
            const itemWidth = gallery.querySelector('.gallery-item').offsetWidth + 16; // Include gap
            gallery.scrollTo({
                left: index * itemWidth,
                behavior: 'smooth'
            });
        }

        // Update active dot
        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === index);
        });

        this.currentGalleryIndex = index;
    }

    nextGallerySlide() {
        const nextIndex = this.currentGalleryIndex === this.maxGalleryIndex ? 0 : this.currentGalleryIndex + 1;
        this.goToGallerySlide(nextIndex);
    }

    prevGallerySlide() {
        const prevIndex = this.currentGalleryIndex === 0 ? this.maxGalleryIndex : this.currentGalleryIndex - 1;
        this.goToGallerySlide(prevIndex);
    }

    setupFocusTrap() {
        this.modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && this.activeModal) {
                const focusableElements = Array.from(this.modal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                ));

                if (focusableElements.length === 0) return;

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }

    // ==================== LIGHTBOX METHODS ====================

    initLightbox() {
        this.lightbox = document.getElementById('lightbox');
        if (!this.lightbox) {
            console.error('Lightbox not found');
            return;
        }

        const lightboxClose = document.getElementById('lightbox-close');
        const lightboxPrev = document.getElementById('lightbox-prev');
        const lightboxNext = document.getElementById('lightbox-next');

        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                this.closeLightbox();
            });
        }

        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', () => {
                this.previousImage();
            });
        }

        if (lightboxNext) {
            lightboxNext.addEventListener('click', () => {
                this.nextImage();
            });
        }

        // Close lightbox on backdrop click
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });

        // Handle arrow keys
        document.addEventListener('keydown', (e) => {
            if (this.lightbox && this.lightbox.open) {
                if (e.key === 'ArrowLeft') {
                    this.previousImage();
                } else if (e.key === 'ArrowRight') {
                    this.nextImage();
                }
            }
        });
    }

    openLightbox(imageIndex, projectTitle) {
        if (!this.lightbox || !this.currentImages || this.currentImages.length === 0) {
            console.error('Lightbox or images not available');
            return;
        }

        this.currentImageIndex = imageIndex;
        this.displayLightboxImage();
        
        // Use showModal() to put lightbox in top layer
        this.lightbox.showModal();
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        if (!this.lightbox) return;
        
        this.lightbox.close();
        
        // Force body scroll restoration on mobile
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.height = '';
        document.body.style.width = '';
        
        // Force scroll restoration on mobile
        if (window.scrollY !== undefined) {
            window.scrollTo(0, window.scrollY);
        }
    }

    displayLightboxImage() {
        if (!this.currentImages || this.currentImages.length === 0) return;

        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxCounter = document.getElementById('lightbox-counter');

        if (lightboxImage) {
            lightboxImage.src = this.currentImages[this.currentImageIndex];
            lightboxImage.alt = `Image ${this.currentImageIndex + 1}`;
        }

        if (lightboxCounter) {
            lightboxCounter.textContent = `${this.currentImageIndex + 1} / ${this.currentImages.length}`;
        }

        // Show/hide navigation arrows
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        
        if (prevBtn) {
            prevBtn.style.display = this.currentImages.length > 1 ? 'block' : 'none';
        }
        if (nextBtn) {
            nextBtn.style.display = this.currentImages.length > 1 ? 'block' : 'none';
        }
    }

    nextImage() {
        if (!this.currentImages || this.currentImages.length <= 1) return;
        
        this.currentImageIndex = (this.currentImageIndex + 1) % this.currentImages.length;
        this.displayLightboxImage();
    }

    previousImage() {
        if (!this.currentImages || this.currentImages.length <= 1) return;
        
        this.currentImageIndex = this.currentImageIndex === 0 ? 
            this.currentImages.length - 1 : this.currentImageIndex - 1;
        this.displayLightboxImage();
    }
}

// Initialize and export global modal manager
export const modalManager = new ModalManager();