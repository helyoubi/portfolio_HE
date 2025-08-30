// pageLoader.js
import { loadPortfolioData } from './dataLoader.js';
import { updateNavigationLanguage } from './hamburgerMenu.js';
import { reinitializeDynamicElements } from './main.js?v=2025080830';

// Load trainings page
export async function loadTrainingsPage(language = 'fr') {
    const data = await loadPortfolioData();
    if (!data) return;

    const personalInfo = data.personalInfo;
    
    // Update personal info in hero section
    updatePersonalInfo(personalInfo, language);
    
    // Load trainings content
    const trainingsContainer = document.getElementById('trainings-container');
    const trainings = data.trainings[language];
    
    if (trainingsContainer && trainings) {
        trainingsContainer.innerHTML = renderAllTrainings(trainings);
    }
    
    // Set last update date
    updateLastModified();
    
    // Update navigation language
    updateNavigationLanguage(language);
    
    // Setup language switcher
    setupLanguageSwitcher(language, 'trainings');
    reinitializeDynamicElements();
}

// Load projects page
export async function loadProjectsPage(language = 'fr') {
    const data = await loadPortfolioData();
    if (!data) return;

    const personalInfo = data.personalInfo;
    
    // Update personal info in hero section
    updatePersonalInfo(personalInfo, language);
    
    // Load projects content
    const projectsContainer = document.getElementById('projects-container');
    const projects = data.projects[language];
    
    if (projectsContainer && projects) {
        projectsContainer.innerHTML = renderAllProjects(projects);
    }
    
    // Set last update date
    updateLastModified();
    
    // Update navigation language
    updateNavigationLanguage(language);
    
    // Setup language switcher
    setupLanguageSwitcher(language, 'projects');
    reinitializeDynamicElements();
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
function renderAllProjects(projects) {
    return projects.map(project => `
        <div class="project-card">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p><strong>${project.technologies ? 'Technologies:' : 'Technologies:'}</strong> ${project.technologies ? project.technologies.join(', ') : ''}</p>
            ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">Voir le projet</a>` : ''}
        </div>
    `).join('');
}

// Update last modified date
function updateLastModified() {
    const lastUpdateElement = document.getElementById('last-update');
    if (lastUpdateElement) {
        const lastUpdateDate = new Date(document.lastModified);
        lastUpdateElement.innerHTML = `Last updated: ${lastUpdateDate.toLocaleDateString()} ${lastUpdateDate.toLocaleTimeString()}`;
    }
}

// Setup language switcher for specific pages
function setupLanguageSwitcher(currentLanguage, pageType) {
    const languageSwitcher = document.getElementById('languageSwitcher');
    if (languageSwitcher) {
        // Set the flag based on the current language
        languageSwitcher.innerHTML = `<img src="assets/icons/${currentLanguage === 'fr' ? 'en' : 'fr'}.png" alt="${currentLanguage === 'fr' ? 'English' : 'French'} Flag">`;
        languageSwitcher.onclick = () => {
            const newLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
            if (pageType === 'trainings') {
                loadTrainingsPage(newLanguage);
            } else if (pageType === 'projects') {
                loadProjectsPage(newLanguage);
            }
        };
    }
}