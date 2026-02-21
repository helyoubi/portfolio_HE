// main.js
import { initializeThemeToggle } from './themeToggle.js?v=20251013T1119';
import { initializeHamburgerMenu } from './hamburgerMenu.js?v=20251013T1119';

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

    // Smooth scroll - only for anchor links that are not navigation menu links
    document.querySelectorAll('a[href^="#"]:not(.nav-links a)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            // Only process internal anchor links (starting with #)
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
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
            <span>Developed with the help of GitHub Copilot & Claude Code</span>
        `;
    }
});

