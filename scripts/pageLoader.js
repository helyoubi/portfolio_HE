// pageLoader.js
import { loadPortfolioData } from './dataLoader.js';
import { updateNavigationLanguage } from './hamburgerMenu.js';
import { modalManager } from './modalManager.js';

// Load trainings page
export async function loadTrainingsPage(language) {
    // Import language manager to get current language if not provided
    if (!language) {
        const { getCurrentLanguage } = await import('./languageManager.js');
        language = getCurrentLanguage();
    }
    const data = await loadPortfolioData();
    if (!data) {
        const container = document.getElementById('trainings-container') || document.getElementById('projects-container');
        if (container) container.innerHTML = language === 'fr'
            ? '<p role="alert">Le contenu n’a pas pu être chargé. Rechargez la page ou utilisez le lien Contact.</p>'
            : '<p role="alert">Content could not be loaded. Reload the page or use the Contact link.</p>';
        return;
    }

    // Update page title and meta
    updatePageMeta(language, 'trainings');

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
    if (!data) {
        const container = document.getElementById('trainings-container') || document.getElementById('projects-container');
        if (container) container.innerHTML = language === 'fr'
            ? '<p role="alert">Le contenu n’a pas pu être chargé. Rechargez la page ou utilisez le lien Contact.</p>'
            : '<p role="alert">Content could not be loaded. Reload the page or use the Contact link.</p>';
        return;
    }

    // Update page title and meta
    updatePageMeta(language, 'projects');

    // Load projects content
    const projectsContainer = document.getElementById('projects-container');
    const projects = data.projects[language];

    if (projectsContainer && projects) {
        projectsContainer.innerHTML = renderAllProjects(projects, language);
        const page = data.projectPage[language];
        document.getElementById('projectsTitle').textContent = page.title;
        document.getElementById('projects-intro').textContent = page.intro;
        document.getElementById('projects-note').textContent = page.note;
    }

    // Set last update date
    updateLastModified(language);

    // Clear footer content (to remove any CTA buttons)
    const footer = document.getElementById('main-footer');
    if (footer) footer.innerHTML = '';

    // Update navigation language
    updateNavigationLanguage(language);

    // Setup language switcher
    setupLanguageSwitcher(language, 'projects');

}

// Render all trainings without pagination
function renderAllTrainings(trainings, language) {
    return trainings.map(training => `
        <div class="education-card training-card">
            <h2>${training.institution}</h2>
            <p>${training.title}</p>
            <span style='font-size:0.95em;opacity:0.8;'>${training.date || ''}</span>
            ${training.badgeUrl && training.badgeImg ? 
                `<a href="${training.badgeUrl}" target="_blank" rel="noopener noreferrer">
                    <img src="${training.badgeImg}" alt="${training.title}" loading="lazy" decoding="async" style="width:70px;height:auto;margin-top:0.5rem;display:block;margin-left:auto;margin-right:auto;">
                </a>` : ''}
        </div>
    `).join('');
}

// Make the purpose, stack and available next steps visible without opening a modal.
function renderAllProjects(projects, language = 'fr') {
    const t = language === 'fr'
        ? { details: 'Explorer le projet', site: 'Ouvrir le site', contact: 'En discuter', technologies: 'Technologies' }
        : { details: 'Explore project', site: 'Open website', contact: 'Discuss this project', technologies: 'Technologies' };
    return projects.map((project, index) => `
        <article class="project-card">
            <img src="${project.image}" alt="${project.title}" class="project-image" width="640" height="360" loading="lazy" decoding="async">
            <div class="project-card__body">
                <p class="project-category">${project.category}</p>
                <h2>${project.title}</h2>
                <p class="project-summary">${project.summary}</p>
                <ul class="project-stack" aria-label="${t.technologies}">
                    ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                </ul>
                <p class="project-availability">${project.availability}</p>
                <div class="project-actions">
                    <button type="button" class="view-details-btn" data-project-index="${index}" data-language="${language}" aria-label="${t.details} : ${project.title}" onclick="window.openProjectModal(${index}, '${language}')">${t.details}</button>
                    ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer">${t.site}<span class="sr-only"> — ${project.title}</span></a>` : `<a href="index.html#contact">${t.contact}<span class="sr-only"> — ${project.title}</span></a>`}
                </div>
            </div>
        </article>
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
                title: 'Courses & learning - Hamza Elyoubi',
                description: 'Professional trainings and e-learning of Hamza Elyoubi',
                keywords: 'Hamza Elyoubi, Trainings, e-learning, Certifications, Professional development',
                sectionTitle: 'Courses & learning'
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

// Global function to open project modal
window.openProjectModal = async function(projectIndex, language) {

    try {
        const data = await loadPortfolioData();
        if (!data || !data.projects || !data.projects[language]) {
            console.error('Project data not found');
            return;
        }

        const project = data.projects[language][projectIndex];
        if (!project) {
            console.error(`Project at index ${projectIndex} not found`);
            return;
        }

        modalManager.openModal(project, language);
    } catch (error) {
        console.error('Error opening project modal:', error);
    }
};