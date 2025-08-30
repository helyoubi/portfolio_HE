// hamburgerMenu.js
export function initializeHamburgerMenu() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');
    const closeMenu = document.getElementById('closeMenu');
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
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('href');
            
            // Wait a bit for content to be loaded if needed
            setTimeout(() => {
                // Smooth scroll to section
                const targetElement = document.querySelector(targetSection);
                if (targetElement) {
                    const headerOffset = 80; // Account for any fixed headers
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    console.warn(`Section ${targetSection} not found`);
                }
                
                // Close menu after navigation
                closeMenuFunction();
                
                // Update active link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                link.classList.add('active');
            }, 100);
        });
    });

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

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
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
    const navTitle = document.getElementById('navTitle');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (navTitle) {
        navTitle.textContent = language === 'fr' ? 'Navigation' : 'Navigation';
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