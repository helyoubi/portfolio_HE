// main.js
import { initializeThemeToggle } from './themeToggle.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeThemeToggle();

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Load GitHub Copilot credit
    const copilotCredit = document.getElementById('copilot-credit');
    if (copilotCredit) {
        copilotCredit.innerHTML = `
            <img src="assets/icons/githubcopilot_icon.png" alt="GitHub Copilot" class="copilot-icon">
            <span>Developed with the help of GitHub Copilot</span>
        `;
    }
});