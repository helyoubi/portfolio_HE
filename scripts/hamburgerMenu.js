// hamburgerMenu.js - Simplified robust version
let isInitialized = false;
let currentHandlers = {
    toggle: null,
    close: null,
    outsideClick: null,
    escapeKey: null
};

export function initializeHamburgerMenu() {
    console.log('Initializing hamburger menu...');
    
    if (isInitialized) {
        console.log('Hamburger menu already initialized, skipping');
        return;
    }
    
    // Clean up any existing handlers
    cleanupEventListeners();
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupHamburgerMenu);
    } else {
        setupHamburgerMenu();
    }
}

function cleanupEventListeners() {
    if (currentHandlers.toggle) {
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        if (hamburgerMenu) {
            hamburgerMenu.removeEventListener('click', currentHandlers.toggle);
        }
    }
    
    if (currentHandlers.close) {
        const closeMenu = document.getElementById('closeMenu');
        if (closeMenu) {
            closeMenu.removeEventListener('click', currentHandlers.close);
        }
    }
    
    if (currentHandlers.outsideClick) {
        document.removeEventListener('click', currentHandlers.outsideClick);
    }
    
    if (currentHandlers.escapeKey) {
        document.removeEventListener('keydown', currentHandlers.escapeKey);
    }
    
    // Reset handlers
    currentHandlers = {
        toggle: null,
        close: null,
        outsideClick: null,
        escapeKey: null
    };
}

function setupHamburgerMenu() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');
    const closeMenu = document.getElementById('closeMenu');
    const navLinks = document.querySelectorAll('.nav-links a');

    console.log('Elements found:', { 
        hamburgerMenu: !!hamburgerMenu, 
        navMenu: !!navMenu, 
        closeMenu: !!closeMenu,
        navLinksCount: navLinks.length
    });

    if (!hamburgerMenu || !navMenu || !closeMenu) {
        console.error('Required hamburger menu elements not found');
        return;
    }

    // Menu manipulation functions
    function openMenu() {
        console.log('Opening menu');
        hamburgerMenu.classList.add('active');
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenuAction() {
        console.log('Closing menu');
        hamburgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    function toggleMenu() {
        console.log('Toggling menu');
        const isActive = navMenu.classList.contains('active');
        if (isActive) {
            closeMenuAction();
        } else {
            openMenu();
        }
    }

    // Create event handlers
    currentHandlers.toggle = function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    };

    currentHandlers.close = function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeMenuAction();
    };

    currentHandlers.outsideClick = function(e) {
        if (!navMenu.contains(e.target) && !hamburgerMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                closeMenuAction();
            }
        }
    };

    currentHandlers.escapeKey = function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenuAction();
        }
    };

    // Attach event listeners
    hamburgerMenu.addEventListener('click', currentHandlers.toggle);
    closeMenu.addEventListener('click', currentHandlers.close);
    document.addEventListener('click', currentHandlers.outsideClick);
    document.addEventListener('keydown', currentHandlers.escapeKey);

    console.log('Event listeners attached successfully');
    
    // Mark as initialized
    isInitialized = true;

    // Handle navigation links
    if (navLinks && navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href && href.includes('.html')) {
                    // Page navigation - close menu
                    closeMenuAction();
                } else if (href && href.startsWith('#')) {
                    // Section navigation - handle smooth scroll
                    e.preventDefault();
                    e.stopPropagation();
                    
                    setTimeout(() => {
                        const targetElement = document.querySelector(href);
                        if (targetElement) {
                            const headerOffset = 80;
                            const elementPosition = targetElement.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                            
                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                        } else {
                            console.warn(`Section ${href} not found`);
                        }
                        
                        closeMenuAction();
                        
                        // Update active link
                        navLinks.forEach(navLink => navLink.classList.remove('active'));
                        link.classList.add('active');
                    }, 100);
                } else if (href && href.startsWith('/')) {
                    // Root navigation
                    closeMenuAction();
                }
            });
        });
    }

    // Update active link based on scroll position
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        const currentNavLinks = document.querySelectorAll('.nav-links a');

        if (sections.length === 0 || currentNavLinks.length === 0) return;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial update
}

// Update navigation titles based on language
export function updateNavigationLanguage(language) {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (!navLinks || navLinks.length === 0) {
        console.warn('Navigation links not found, skipping language update');
        return;
    }
    
    // Update navigation link texts
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
    
    navLinks.forEach(link => {
        const section = link.getAttribute('data-section');
        if (section && translations[language] && translations[language][section]) {
            link.textContent = translations[language][section];
        }
    });
}