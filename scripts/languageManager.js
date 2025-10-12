// languageManager.js - Gestionnaire simple de langue avec localStorage
export function getCurrentLanguage() {
    return localStorage.getItem('language') || 'fr';
}

export function setCurrentLanguage(language) {
    localStorage.setItem('language', language);
}

export function initializeLanguageSwitcher(onLanguageChange) {
    const languageSwitcher = document.getElementById('languageSwitcher');
    if (!languageSwitcher) return;

    // Fonction pour mettre à jour l'icône
    const updateIcon = () => {
        const lang = getCurrentLanguage();
        languageSwitcher.innerHTML = `<img src="assets/icons/${lang === 'fr' ? 'en' : 'fr'}.png" alt="${lang === 'fr' ? 'English' : 'French'} Flag">`;
    };

    // Mettre à jour l'icône au chargement
    updateIcon();

    // Gérer le clic
    languageSwitcher.onclick = () => {
        // Récupérer la langue actuelle à chaque clic
        const currentLang = getCurrentLanguage();
        const newLanguage = currentLang === 'fr' ? 'en' : 'fr';
        setCurrentLanguage(newLanguage);

        if (onLanguageChange) {
            onLanguageChange(newLanguage);
        }

        // Mettre à jour l'icône
        updateIcon();
    };

    return getCurrentLanguage();
}