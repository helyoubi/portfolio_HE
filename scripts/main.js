// main.js
import { initializeThemeToggle } from './themeToggle.js?v=2025080830';
import { initializeHamburgerMenu } from './hamburgerMenu.js?v=2025080830';

document.addEventListener('DOMContentLoaded', () => {
    initializeThemeToggle();
    initializeHamburgerMenu();

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll-to-Top Button
    const scrollToTop = document.getElementById('scrollToTop');
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

    // Load GitHub Copilot credit
    const copilotCredit = document.getElementById('copilot-credit');
    if (copilotCredit) {
        copilotCredit.innerHTML = `
            <img src="assets/icons/githubcopilot_icon.png" alt="GitHub Copilot" class="copilot-icon">
            <span>Developed with the help of GitHub Copilot</span>
        `;
    }
});

