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
    
    const currentLanguage = getCurrentLanguage();
    
    // Mettre à jour l'icône du bouton
    languageSwitcher.innerHTML = `<img src="assets/icons/${currentLanguage === 'fr' ? 'en' : 'fr'}.png" alt="${currentLanguage === 'fr' ? 'English' : 'French'} Flag">`;
    
    // Gérer le clic
    languageSwitcher.onclick = () => {
        const newLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
        setCurrentLanguage(newLanguage);
        
        if (onLanguageChange) {
            onLanguageChange(newLanguage);
        }
        
        // Mettre à jour l'icône
        languageSwitcher.innerHTML = `<img src="assets/icons/${newLanguage === 'fr' ? 'en' : 'fr'}.png" alt="${newLanguage === 'fr' ? 'English' : 'French'} Flag">`;
    };
    
    return currentLanguage;
}