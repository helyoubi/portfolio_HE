// howtoLoader.js - Loads and manages HowTo content
import { getCurrentLanguage, initializeLanguageSwitcher } from './languageManager.js';
import { initializeThemeToggle } from './themeToggle.js';
import { initializeHamburgerMenu, updateNavigationLanguage } from './hamburgerMenu.js';

let portfolioData = null;
let currentTab = 'github-copilot';

// Initialize the HowTo page
export async function initializeHowToPage() {
    try {
        // Initialize theme and menu
        initializeThemeToggle();
        initializeHamburgerMenu();

        // Load portfolio data
        const response = await fetch('./data/portfolioData.json');
        portfolioData = await response.json();

        // Get current language
        const currentLanguage = getCurrentLanguage();

        // Initialize language switcher with callback
        initializeLanguageSwitcher((newLanguage) => {
            renderHowToPage(newLanguage);
            updateNavigationLanguage(newLanguage);
            loadLastUpdate(newLanguage);
        });

        // Render page content
        renderHowToPage(currentLanguage);

        // Update navigation language
        updateNavigationLanguage(currentLanguage);

        // Setup tab navigation
        setupTabNavigation();

        // Load last update
        loadLastUpdate(currentLanguage);

    } catch (error) {
        console.error('Error initializing HowTo page:', error);
    }
}

// Render the HowTo page content
function renderHowToPage(language) {
    console.log('Rendering HowTo page with language:', language);

    if (!portfolioData || !portfolioData.howto) {
        console.error('HowTo data not found');
        return;
    }

    const howtoData = portfolioData.howto[language];

    // Update page header
    updatePageHeader(language);

    // Render current tab content
    renderTabContent(currentTab, language);
}

// Update page header (title and subtitle)
function updatePageHeader(language) {
    const translations = {
        'en': {
            mainTitle: 'HowTo: AI in Development',
            mainSubtitle: 'Discover how I leverage AI tools to enhance my development workflow'
        },
        'fr': {
            mainTitle: 'HowTo : IA en Développement',
            mainSubtitle: 'Découvrez comment j\'exploite les outils IA pour améliorer mon flux de développement'
        }
    };

    const titleEl = document.getElementById('howto-main-title');
    const subtitleEl = document.getElementById('howto-main-subtitle');

    if (titleEl) titleEl.textContent = translations[language].mainTitle;
    if (subtitleEl) subtitleEl.textContent = translations[language].mainSubtitle;
}

// Setup tab navigation
function setupTabNavigation() {
    const tabs = document.querySelectorAll('.howto-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');

            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Update current tab
            currentTab = tabName;

            // Render tab content
            const currentLanguage = getCurrentLanguage();
            renderTabContent(tabName, currentLanguage);
        });
    });
}

// Render tab content
function renderTabContent(tabName, language) {
    const contentContainer = document.getElementById('howtoContent');
    if (!contentContainer) return;

    const howtoData = portfolioData.howto[language];
    const tabData = howtoData[tabName];

    if (!tabData) {
        contentContainer.innerHTML = '<p>Content not found</p>';
        return;
    }

    // Build HTML for sections
    let sectionsHTML = '';

    tabData.sections.forEach((section, index) => {
        sectionsHTML += `
            <section class="howto-section" data-section-index="${index}">
                <h3 class="howto-section-heading">${section.heading}</h3>
                <div class="howto-section-content">${formatContent(section.content)}</div>
            </section>
        `;
    });

    // Update content with title, subtitle, and sections
    contentContainer.innerHTML = `
        <div class="howto-tab-header">
            <h2 class="howto-tab-title">${tabData.title}</h2>
            <p class="howto-tab-subtitle">${tabData.subtitle}</p>
        </div>
        <div class="howto-sections">
            ${sectionsHTML}
        </div>
    `;

    // Scroll to top of content
    contentContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Format content with markdown-like syntax
function formatContent(content) {
    if (!content) return '';

    // Convert markdown-style formatting to HTML
    let formatted = content
        // Bold text (**text**)
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        // Code blocks (```code```)
        .replace(/```\n?([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        // Inline code (`code`)
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // Line breaks
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');

    return `<p>${formatted}</p>`;
}

// Load last update information
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
