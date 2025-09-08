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
                if (cachedResponse) {
                    return cachedResponse;
                }
                
                return fetch(event.request).catch(error => {
                    console.warn('Failed to fetch resource:', event.request.url, error);
                    // For image resources, return a fallback or just let it fail gracefully
                    if (event.request.url.includes('.png') || event.request.url.includes('.jpg') || event.request.url.includes('.jpeg')) {
                        // Return a simple transparent 1x1 PNG as fallback
                        return new Response(
                            new Uint8Array([
                                137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1,
                                8, 6, 0, 0, 0, 31, 21, 196, 137, 0, 0, 0, 13, 73, 68, 65, 84, 8, 215, 99, 248, 15, 0, 0, 1, 0, 1, 84, 103, 21, 203, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130
                            ]),
                            {
                                status: 200,
                                statusText: 'OK',
                                headers: { 'Content-Type': 'image/png' }
                            }
                        );
                    }
                    // For other resources, return a basic error response instead of throwing
                    return new Response('Resource not found', {
                        status: 404,
                        statusText: 'Not Found'
                    });
                });
            }).catch(error => {
                console.error('Service worker error:', error);
                return new Response('Service worker error', {
                    status: 500,
                    statusText: 'Internal Server Error'
                });
            })
        );
    }
});
