// pageLoader.js
import { loadPortfolioData } from './dataLoader.js';
import { updateNavigationLanguage } from './hamburgerMenu.js';

// Load trainings page
export async function loadTrainingsPage(language) {
    // Import language manager to get current language if not provided
    if (!language) {
        const { getCurrentLanguage } = await import('./languageManager.js');
        language = getCurrentLanguage();
    }
    const data = await loadPortfolioData();
    if (!data) return;

    const personalInfo = data.personalInfo;
    
    // Update page title and meta
    updatePageMeta(language, 'trainings');
    
    // Update personal info in hero section
    updatePersonalInfo(personalInfo, language);
    
    // Load trainings content
    const trainingsContainer = document.getElementById('trainings-container');
    const trainings = data.trainings[language];
    
    if (trainingsContainer && trainings) {
        trainingsContainer.innerHTML = renderAllTrainings(trainings);
    }
    
    // Set last update date
    updateLastModified(language);
    
    // Clear footer content (to remove any CTA buttons)
    const footer = document.getElementById('main-footer');
    if (footer) footer.innerHTML = '';
    
    // Remove any CTA buttons from the entire page
    removeAllCTAButtons();
    
    // Update navigation language
    updateNavigationLanguage(language);
    
    // Setup language switcher
    setupLanguageSwitcher(language, 'trainings');
}

// Load projects page
export async function loadProjectsPage(language) {
    // Import language manager to get current language if not provided
    if (!language) {
        const { getCurrentLanguage } = await import('./languageManager.js');
        language = getCurrentLanguage();
    }
    const data = await loadPortfolioData();
    if (!data) return;

    const personalInfo = data.personalInfo;
    
    // Update page title and meta
    updatePageMeta(language, 'projects');
    
    // Update personal info in hero section
    updatePersonalInfo(personalInfo, language);
    
    // Load projects content
    const projectsContainer = document.getElementById('projects-container');
    const projects = data.projects[language];
    
    if (projectsContainer && projects) {
        projectsContainer.innerHTML = renderAllProjects(projects, language);
    }
    
    // Set last update date
    updateLastModified(language);
    
    // Clear footer content (to remove any CTA buttons)
    const footer = document.getElementById('main-footer');
    if (footer) footer.innerHTML = '';
    
    // Remove any CTA buttons from the entire page
    removeAllCTAButtons();
    
    // Update navigation language
    updateNavigationLanguage(language);
    
    // Setup language switcher
    setupLanguageSwitcher(language, 'projects');
}

// Update personal information in hero section
function updatePersonalInfo(personalInfo, language) {
    const profileImage = document.getElementById('profileImage');
    const personalName = document.getElementById('personalName');
    const personalTitle = document.getElementById('personalTitle');
    const titleNote = document.getElementById('titleNote');
    const personalBio = document.getElementById('personalBio');
    
    if (profileImage) profileImage.src = personalInfo.profileImage;
    if (personalName) personalName.textContent = personalInfo.name[language];
    if (personalTitle) personalTitle.textContent = personalInfo.title[language];
    if (titleNote && personalInfo.titleNote) titleNote.textContent = personalInfo.titleNote[language];
    if (personalBio) personalBio.textContent = personalInfo.bio[language];
    
    // Remove any CTA buttons that might exist
    const ctaButtons = document.querySelectorAll('.cta-btn, .contact-btn, .download-btn');
    ctaButtons.forEach(button => button.remove());
}

// Render all trainings without pagination
function renderAllTrainings(trainings) {
    return trainings.map(training => `
        <div class="education-card training-card">
            <h3>${training.institution}</h3>
            <p>${training.title}</p>
            <span style='font-size:0.95em;opacity:0.8;'>${training.date || ''}</span>
            ${training.badgeUrl && training.badgeImg ? 
                `<a href="${training.badgeUrl}" target="_blank" rel="noopener noreferrer">
                    <img src="${training.badgeImg}" alt="Training Badge" style="width:70px;height:auto;margin-top:0.5rem;display:block;margin-left:auto;margin-right:auto;">
                </a>` : ''}
        </div>
    `).join('');
}

// Render all projects
function renderAllProjects(projects, language = 'fr') {
    const translations = {
        'fr': {
            technologies: 'Technologies:',
            aiAssistant: 'Assistant IA:',
            viewProject: 'Voir le projet'
        },
        'en': {
            technologies: 'Technologies:',
            aiAssistant: 'AI Assistant:',
            viewProject: 'View project'
        }
    };
    
    const t = translations[language];
    
    return projects.map(project => `
        <div class="project-card">
            <h3>${project.title}</h3>
            ${project.image ? `<img src="${project.image}" alt="${project.title} Logo" class="project-image">` : ''}
            <p>${project.description}</p>
            <p><strong>${t.technologies}</strong> ${project.technologies ? project.technologies.join(', ') : ''}</p>
            <p><strong>${t.aiAssistant}</strong> ${project.AIAssistant ? project.AIAssistant.join(', ') : ''}</p>
            ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">${t.viewProject}</a>` : ''}
        </div>
    `).join('');
}

// Update last modified date
function updateLastModified(language = 'fr') {
    const lastUpdateElement = document.getElementById('last-update');
    if (lastUpdateElement) {
        const lastUpdateDate = new Date(document.lastModified);
        const text = language === 'fr' ? 'Dernière mise à jour:' : 'Last updated:';
        lastUpdateElement.innerHTML = `${text} ${lastUpdateDate.toLocaleDateString()} ${lastUpdateDate.toLocaleTimeString()}`;
    }
}

// Setup language switcher for specific pages
function setupLanguageSwitcher(currentLanguage, pageType) {
    import('./languageManager.js').then(({ initializeLanguageSwitcher }) => {
        initializeLanguageSwitcher((newLanguage) => {
            if (pageType === 'trainings') {
                loadTrainingsPage(newLanguage);
            } else if (pageType === 'projects') {
                loadProjectsPage(newLanguage);
            }
        });
    });
}

// Function to remove all CTA buttons from the page
function removeAllCTAButtons() {
    // List of possible selectors for CTA buttons
    const ctaSelectors = [
        '.cta-btn',
        '.contact-btn', 
        '.download-btn',
        'button[href*="contact"]',
        'a[href*="contact"]',
        'button[href*="cv"]',
        'a[href*="cv"]',
        'a[href*="resume"]',
        'button[href*="resume"]',
        'a[download]',
        'button[download]'
    ];
    
    ctaSelectors.forEach(selector => {
        const buttons = document.querySelectorAll(selector);
        buttons.forEach(button => {
            // Check if the button text contains common CTA phrases
            const text = button.textContent.toLowerCase();
            if (text.includes('get in touch') || 
                text.includes('contact') || 
                text.includes('download') || 
                text.includes('cv') || 
                text.includes('resume')) {
                button.remove();
            }
        });
    });
    
    // Also check for any buttons in the hero section specifically
    const heroSection = document.querySelector('.hero, #home');
    if (heroSection) {
        const heroButtons = heroSection.querySelectorAll('button, a.btn, .cta-btn');
        heroButtons.forEach(button => {
            const text = button.textContent.toLowerCase();
            if (text.includes('get in touch') || 
                text.includes('contact') || 
                text.includes('download') || 
                text.includes('cv') || 
                text.includes('resume')) {
                button.remove();
            }
        });
    }
}

// Update page metadata and section titles
function updatePageMeta(language, pageType) {
    const translations = {
        'trainings': {
            'fr': {
                title: 'Formations & e-learning - Hamza Elyoubi',
                description: 'Formations professionnelles et e-learning de Hamza Elyoubi',
                keywords: 'Hamza Elyoubi, Formations, e-learning, Certifications, Développement professionnel',
                sectionTitle: 'Formations & e-learning'
            },
            'en': {
                title: 'Trainings & e-learning - Hamza Elyoubi',
                description: 'Professional trainings and e-learning of Hamza Elyoubi',
                keywords: 'Hamza Elyoubi, Trainings, e-learning, Certifications, Professional development',
                sectionTitle: 'Trainings & e-learning'
            }
        },
        'projects': {
            'fr': {
                title: 'Projets - Hamza Elyoubi',
                description: 'Projets et réalisations de Hamza Elyoubi',
                keywords: 'Hamza Elyoubi, Projets, Développement, Portfolio, Réalisations',
                sectionTitle: 'Projets'
            },
            'en': {
                title: 'Projects - Hamza Elyoubi',
                description: 'Projects and achievements of Hamza Elyoubi',
                keywords: 'Hamza Elyoubi, Projects, Development, Portfolio, Achievements',
                sectionTitle: 'Projects'
            }
        }
    };

    const pageTranslations = translations[pageType][language];
    
    // Update page title
    document.title = pageTranslations.title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', pageTranslations.description);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
        metaKeywords.setAttribute('content', pageTranslations.keywords);
    }
    
    // Update section title
    const sectionTitle = document.getElementById(pageType === 'trainings' ? 'trainingsTitle' : 'projectsTitle');
    if (sectionTitle) {
        sectionTitle.textContent = pageTranslations.sectionTitle;
    }
}