// hamburgerMenu.js - Version ultra-simple
export function initializeHamburgerMenu() {
    console.log('Initializing simple hamburger menu...');
    
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');

    if (!hamburgerMenu || !navMenu) {
        console.error('Menu elements not found');
        return;
    }

    if (hamburgerMenu.dataset.initialized) return;
    hamburgerMenu.dataset.initialized = 'true';
    navMenu.inert = true;

    // Nettoyer l'état au chargement (au cas où il resterait des classes active)
    hamburgerMenu.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';

    // Ouvrir le menu
    function openMenu() {
        hamburgerMenu.classList.add('active');
        navMenu.classList.add('active');
        navMenu.inert = false;
        hamburgerMenu.setAttribute('aria-expanded', 'true');
        hamburgerMenu.setAttribute('aria-label', document.documentElement.lang === 'fr' ? 'Fermer le menu' : 'Close menu');
        document.body.style.overflow = 'hidden';
        navMenu.querySelector('a')?.focus();
    }

    // Fermer le menu
    function closeMenuAction() {
        hamburgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
        navMenu.inert = true;
        hamburgerMenu.setAttribute('aria-expanded', 'false');
        hamburgerMenu.setAttribute('aria-label', document.documentElement.lang === 'fr' ? 'Ouvrir le menu' : 'Open menu');
        document.body.style.overflow = '';
    }

    // Événements - le hamburger ouvre ET ferme le menu
    hamburgerMenu.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            closeMenuAction();
        } else {
            openMenu();
        }
    });
    
    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburgerMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                closeMenuAction();
            }
        }
    });

    // Fermer avec Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && navMenu.classList.contains('active')) {
            const controls = [hamburgerMenu, ...navMenu.querySelectorAll('a, button')].filter(element => element.getClientRects().length);
            if (e.shiftKey && document.activeElement === controls[0]) { e.preventDefault(); controls.at(-1).focus(); }
            else if (!e.shiftKey && document.activeElement === controls.at(-1)) { e.preventDefault(); controls[0].focus(); }
        }
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenuAction();
            hamburgerMenu.focus();
        }
    });

    // Fermer le menu quand on clique sur les liens de navigation (sauf les parents de sous-menus)
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const parentLi = link.closest('.has-children');
            // Si c'est le lien parent (ex: HowTo) avec href="#", ne pas fermer le menu ici
            if (parentLi && link.getAttribute('href') === '#') {
                // allow the parent click handler to toggle the submenu
                return;
            }

            // Fermer le menu après un petit délai pour permettre à la navigation de commencer
            setTimeout(closeMenuAction, 100);
        });
    });

    // Toggle sub-menus when clicking the parent item (useful for mobile / burger menu)
    const parentLinks = document.querySelectorAll('.nav-links .has-children > a');
    parentLinks.forEach(pl => {
        pl.addEventListener('click', (e) => {
            // Only intercept if link is non-navigable (href="#")
            if (pl.getAttribute('href') === '#') {
                e.preventDefault();
                const parent = pl.parentElement;
                const isOpen = parent.classList.toggle('open');
                pl.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            }
        });
    });

    console.log('Simple hamburger menu initialized');
}

// Fonction pour mettre à jour les textes de navigation (simplifiée)
export function updateNavigationLanguage(language) {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    const titles = {
        'ai.html': { fr: 'Expertise IA — Hamza Elyoubi', en: 'AI Expertise — Hamza Elyoubi' },
        'index.html': { fr: 'Hamza Elyoubi — Ingénieur Java senior & Tech Lead', en: 'Hamza Elyoubi — Senior Java Software Engineer & Tech Lead' },
        'howto.html': { fr: 'Pratiques IA — Hamza Elyoubi', en: 'AI engineering practices — Hamza Elyoubi' },
        'veille.html': { fr: 'Veille technologique — Hamza Elyoubi', en: 'Technology watch — Hamza Elyoubi' }
    };
    if (titles[page]) document.title = titles[page][language];
    if (page === 'index.html') {
        document.querySelector('meta[name="description"]')?.setAttribute('content', language === 'fr'
            ? 'Hamza Elyoubi, ingénieur Java senior et Tech Lead à Nantes. Java, Spring Boot, Quarkus : expérience, projets web et mobiles, contact.'
            : 'Hamza Elyoubi, Senior Java Software Engineer and Tech Lead in Nantes. Java, Spring Boot, Quarkus: experience, web and mobile projects, contact.');
    }
    const skip = document.querySelector('.skip-link');
    if (skip) skip.textContent = language === 'fr' ? 'Aller au contenu' : 'Skip to content';
    const quickLinks = document.querySelector('.quick-nav');
    if (quickLinks) {
        quickLinks.setAttribute('aria-label', language === 'fr' ? 'Accès rapide' : 'Quick navigation');
        quickLinks.innerHTML = `
            <a class="quick-nav__brand" href="index.html"><svg class="quick-nav__mark" viewBox="0 0 64 64" width="36" height="36" aria-hidden="true" focusable="false"><use href="assets/icons/signature.svg#signature"></use></svg><span>Hamza Elyoubi</span></a>
            <div class="quick-nav__links">
                <a class="quick-nav__experience" href="index.html#experience">${language === 'fr' ? 'Expérience' : 'Experience'}</a>
                <a href="projects.html"${page === 'projects.html' ? ' aria-current="page"' : ''}>${language === 'fr' ? 'Projets' : 'Projects'}</a>
                <a href="assets/resumes/Hamza-Elyoubi-Tech-Lead-Java-2026.pdf" target="_blank" rel="noopener noreferrer" aria-label="${language === 'fr' ? 'Consulter le CV (PDF, français)' : 'Read résumé (PDF, French)'}">${language === 'fr' ? 'CV' : 'Résumé'}</a>
                <a class="quick-nav__contact" href="index.html#contact">Contact</a>
            </div>`;
    }
    const theme = document.getElementById('themeToggle');
    if (theme) theme.setAttribute('aria-label', language === 'fr'
        ? (document.body.dataset.theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre')
        : (document.body.dataset.theme === 'dark' ? 'Use light theme' : 'Use dark theme'));
    const top = document.getElementById('scrollToTop');
    if (top) top.setAttribute('aria-label', language === 'fr' ? 'Retour en haut' : 'Back to top');

    const translations = {
        'fr': {
            'home': 'Accueil',
            'experience': 'Expérience',
            'ai': 'Expertise IA',
            'skills': 'Compétences',
            'worksParent': 'Projets & Formations',
            'projects': 'Projets',
            'trainings': 'Formations',
            'resourcesParent': 'Ressources',
            'howto-genai': 'Pratiques IA',
            'howto-veille': 'Veille tech',
            'contact': 'Contact'
        },
        'en': {
            'home': 'Home',
            'experience': 'Experience',
            'ai': 'AI Expertise',
            'skills': 'Skills',
            'worksParent': 'Projects & Learning',
            'projects': 'Projects',
            'trainings': 'Courses',
            'resourcesParent': 'Resources',
            'howto-genai': 'AI practices',
            'howto-veille': 'Tech Watch',
            'contact': 'Contact'
        }
    };
    
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const section = link.getAttribute('data-section');
        if (section && translations[language] && translations[language][section]) {
            link.textContent = translations[language][section];
        }
    });

    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.setAttribute('aria-label', language === 'fr' ? 'Navigation principale' : 'Main navigation');
    }

    const hamburgerMenu = document.getElementById('hamburgerMenu');
    if (hamburgerMenu) {
        const isOpen = hamburgerMenu.getAttribute('aria-expanded') === 'true';
        hamburgerMenu.setAttribute('aria-label', language === 'fr'
            ? (isOpen ? 'Fermer le menu' : 'Ouvrir le menu')
            : (isOpen ? 'Close menu' : 'Open menu'));
    }

    const creditSpan = document.querySelector('#copilot-credit span');
    if (creditSpan) {
        creditSpan.textContent = language === 'fr'
            ? 'Portfolio personnel développé avec l\'assistance de l\'IA'
            : 'Personal portfolio built with AI assistance';
    }

    const copyright = document.querySelector('.copyright p');
    if (copyright) {
        copyright.innerHTML = language === 'fr'
            ? '&copy; 2026 Hamza Elyoubi. Tous droits réservés.'
            : '&copy; 2026 Hamza Elyoubi. All rights reserved.';
    }
}
