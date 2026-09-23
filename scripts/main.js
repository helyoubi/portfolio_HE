// main.js
import { initializeThemeToggle } from './themeToggle.js?v=20260920T1347';
import { initializeHamburgerMenu } from './hamburgerMenu.js?v=20260920T1347';

document.addEventListener('DOMContentLoaded', () => {
    initializeThemeToggle();
    initializeHamburgerMenu();

    // Fix mobile viewport height issue for hamburger menu
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 100);
    });

    // Delegation includes links rendered after data loading and language changes.
    document.addEventListener('click', (event) => {
        const anchor = event.target.closest('a[href^="#"]');
        if (!anchor || anchor.closest('.nav-links')) return;
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.getElementById(decodeURIComponent(href.slice(1)));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        if (anchor.classList.contains('skip-link')) target.focus({ preventScroll: true });
    });

    // Scroll-to-Top Button
    const scrollToTop = document.getElementById('scrollToTop');
    if (scrollToTop) {
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

    // Reveal sections on scroll
    const sections = document.querySelectorAll('.section');
    const revealSections = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealSections);
    revealSections(); // Trigger on load

    // Load GitHub Copilot & Claude Code credit
    const copilotCredit = document.getElementById('copilot-credit');
    if (copilotCredit) {
        copilotCredit.innerHTML = `
            <img src="assets/icons/githubcopilot_icon.png" alt="GitHub Copilot" class="copilot-icon">
            <img src="assets/icons/claude_code_icon.png" alt="Claude Code" class="copilot-icon">
            <span>Personal portfolio built with AI assistance</span>
        `;
    }
});

// Register service worker for PWA / offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(() => {
            /* Fail silently — SW is progressive enhancement */
        });
    });
}


