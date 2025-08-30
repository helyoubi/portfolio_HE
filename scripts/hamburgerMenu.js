// hamburgerMenu.js
export function initializeHamburgerMenu() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');
    const closeMenu = document.getElementById('closeMenu');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Check if all required elements exist
    if (!hamburgerMenu || !navMenu || !closeMenu) {
        console.warn('Hamburger menu elements not found, retrying in 100ms...');
        
        // Retry mechanism - try again after DOM is fully loaded
        setTimeout(() => {
            const retryElements = {
                hamburgerMenu: document.getElementById('hamburgerMenu'),
                navMenu: document.getElementById('navMenu'),
                closeMenu: document.getElementById('closeMenu')
            };
            
            if (retryElements.hamburgerMenu && retryElements.navMenu && retryElements.closeMenu) {
                console.log('Hamburger menu elements found on retry, initializing...');
                initializeHamburgerMenuWithElements(retryElements.hamburgerMenu, retryElements.navMenu, retryElements.closeMenu);
            } else {
                console.error('Hamburger menu elements still not found after retry');
            }
        }, 100);
        return;
    }

    initializeHamburgerMenuWithElements(hamburgerMenu, navMenu, closeMenu);
}

function initializeHamburgerMenuWithElements(hamburgerMenu, navMenu, closeMenu) {
    console.log('Initializing hamburger menu with elements...');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Toggle menu function
    function toggleMenu() {
        hamburgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Close menu function
    function closeMenuFunction() {
        hamburgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners
    hamburgerMenu.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', closeMenuFunction);

    // Close menu when clicking on nav links
    if (navLinks && navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Check if it's a page navigation (.html files) or section navigation (starts with #)
                if (href && href.includes('.html')) {
                    // Page navigation - let the browser handle it naturally
                    closeMenuFunction();
                    return;
                } else if (href && href.startsWith('#')) {
                    // Section navigation - prevent default and scroll
                    e.preventDefault();
                    
                    // Wait a bit for content to be loaded if needed
                    setTimeout(() => {
                        // Smooth scroll to section
                        const targetElement = document.querySelector(href);
                        if (targetElement) {
                            const headerOffset = 80; // Account for any fixed headers
                            const elementPosition = targetElement.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                            
                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                        } else {
                            console.warn(`Section ${href} not found`);
                        }
                        
                        // Close menu after navigation
                        closeMenuFunction();
                        
                        // Update active link
                        if (navLinks) {
                            navLinks.forEach(navLink => navLink.classList.remove('active'));
                            link.classList.add('active');
                        }
                    }, 100);
                } else if (href && href.startsWith('/')) {
                    // Handle root navigation
                    closeMenuFunction();
                }
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburgerMenu.contains(e.target)) {
            closeMenuFunction();
        }
    });

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenuFunction();
        }
    });

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
    
    // Initial active link update
    updateActiveLink();
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