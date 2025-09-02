// hamburgerMenu.js - Version ultra-simple
export function initializeHamburgerMenu() {
    console.log('Initializing simple hamburger menu...');
    
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');
    const closeMenu = document.getElementById('closeMenu');

    if (!hamburgerMenu || !navMenu || !closeMenu) {
        console.error('Menu elements not found');
        return;
    }

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

    // Événements
    hamburgerMenu.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMenuAction);
    
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