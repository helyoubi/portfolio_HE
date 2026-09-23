// themeToggle.js
export function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    if (!themeToggle || themeToggle.dataset.initialized) return;
    themeToggle.dataset.initialized = 'true';

    // Theme management
    const savedTheme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
    body.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';

    const updateLabel = () => themeToggle.setAttribute('aria-label', document.documentElement.lang === 'en'
        ? (body.dataset.theme === 'dark' ? 'Use light theme' : 'Use dark theme')
        : (body.dataset.theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'));
    updateLabel();
    themeToggle.addEventListener('click', () => {
        const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateLabel();
        themeToggle.innerHTML = newTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });
}