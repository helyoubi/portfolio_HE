// veilleLoader.js - Loads and renders Veille (Tech Watch) content
import { getCurrentLanguage, initializeLanguageSwitcher } from './languageManager.js';
import { initializeThemeToggle } from './themeToggle.js';
import { initializeHamburgerMenu, updateNavigationLanguage } from './hamburgerMenu.js';

let portfolioData = null;

export async function initializeVeillePage() {
    try {
        initializeThemeToggle();
        initializeHamburgerMenu();

        const response = await fetch('./data/portfolioData.json');
        portfolioData = await response.json();

        const currentLanguage = getCurrentLanguage();

        initializeLanguageSwitcher((newLang) => {
            renderVeillePage(newLang);
            updateNavigationLanguage(newLang);
            loadLastUpdate(newLang);
        });

        renderVeillePage(currentLanguage);
        updateNavigationLanguage(currentLanguage);
        loadLastUpdate(currentLanguage);
        initializeScrollToTop();

    } catch (error) {
        console.error('Error initializing Veille page:', error);
    }
}

function renderVeillePage(language) {
    if (!portfolioData || !portfolioData.veille) {
        console.error('Veille data not found');
        return;
    }

    const veilleData = portfolioData.veille[language];
    if (!veilleData) return;

    const titleEl = document.getElementById('veille-main-title');
    const subtitleEl = document.getElementById('veille-main-subtitle');
    const contentContainer = document.getElementById('veilleContent');

    if (titleEl) titleEl.textContent = veilleData.title;
    if (subtitleEl) subtitleEl.textContent = veilleData.subtitle;

    let sectionsHTML = '';
    veilleData.sections.forEach((section, index) => {
        sectionsHTML += `
            <section class="howto-section" data-section-index="${index}">
                <h3 class="howto-section-heading">${section.heading}</h3>
                <div class="howto-section-content">${formatContent(section.content)}</div>
            </section>
        `;
    });

    contentContainer.innerHTML = `
        <div class="howto-sections">
            ${sectionsHTML}
        </div>
    `;
}

function formatContent(content) {
    if (!content) return '';

    let formatted = content
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/```\n?([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');

    return `<p>${formatted}</p>`;
}

function loadLastUpdate(language) {
    const lastUpdateElement = document.getElementById('last-update');
    if (!lastUpdateElement) return;

    const translations = {
        'en': 'Last updated on',
        'fr': 'Dernière mise à jour le'
    };

    const now = new Date();
    const formattedDate = language === 'fr'
        ? now.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
        : now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    lastUpdateElement.innerHTML = `
        <p>${translations[language]} <span class="update-date">${formattedDate}</span></p>
    `;
}

function initializeScrollToTop() {
    const scrollToTop = document.getElementById('scrollToTop');
    if (!scrollToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTop.classList.add('show');
        } else {
            scrollToTop.classList.remove('show');
        }
    });

    scrollToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
