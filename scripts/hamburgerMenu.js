// hamburgerMenu.js - Version ultra-simple
export function initializeHamburgerMenu() {
    console.log('Initializing simple hamburger menu...');
    
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');

    if (!hamburgerMenu || !navMenu) {
        console.error('Menu elements not found');
        return;
    }

    // Nettoyer l'état au chargement (au cas où il resterait des classes active)
    hamburgerMenu.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';

    // Ouvrir le menu
    function openMenu() {
        hamburgerMenu.classList.add('active');
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Fermer le menu
    function closeMenuAction() {
        hamburgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
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
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenuAction();
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
    const translations = {
        'fr': {
            'home': 'Accueil',
            'certifications': 'Certifications',
            'experience': 'Expérience Professionnelle',
            'education': 'Éducation',
            'trainings': 'Formations',
            'skills': 'Compétences Techniques',
            'frameworks': 'Frameworks',
            'tools': 'Outils',
            'architectures': 'Architectures',
            'softSkills': 'Compétences Transversales',
            'projects': 'Projets',
            'languages': 'Langues',
            'howto': 'HowTo',
            'howto-genai': 'GenAI pour le SDLC',
            'howto-veille': 'Veille tech',
            'contact': 'Contact'
        },
        'en': {
            'home': 'Home',
            'certifications': 'Certifications',
            'experience': 'Professional Experience',
            'education': 'Education',
            'trainings': 'Trainings',
            'skills': 'Technical Skills',
            'frameworks': 'Frameworks',
            'tools': 'Tools',
            'architectures': 'Architectures',
            'softSkills': 'Soft Skills',
            'projects': 'Projects',
            'languages': 'Languages',
            'howto': 'HowTo',
            'howto-genai': 'GenAI for SDLC',
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
}