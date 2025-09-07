const CACHE_NAME = 'portfolio-cache-v20250907T192';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './trainings.html',
    './projects.html',
    './styles/main.css',
    './styles/themes.css',
    './styles/layout.css',
    './scripts/main.js',
    './scripts/themeToggle.js',
    './scripts/dataLoader.js',
    './scripts/formHandler.js',
    './scripts/hamburgerMenu.js',
    './scripts/pageLoader.js',
    './data/portfolioData.json',
    './assets/images/profile.jpg',
    './assets/resumes/Hamza_Elyoubi_CV.pdf',
    './assets/icons/en.png',
    './assets/icons/fr.png',
    './assets/icons/githubcopilot_icon.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    const url = event.request.url;
    
    // Use network-first strategy for CSS and JS files to ensure updates
    if (url.includes('.css') || url.includes('.js')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    // If fetch succeeds, update cache and return response
                    if (response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    // If network fails, fall back to cache
                    return caches.match(event.request);
                })
        );
    } else {
        // Use cache-first strategy for other assets
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                return cachedResponse || fetch(event.request);
            })
        );
    }
});
