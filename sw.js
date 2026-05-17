const CACHE_NAME = 'portfolio-cache-v20260517T180';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './trainings.html',
    './projects.html',
    './howto.html',
    './veille.html',
    './manifest.json',
    './styles/main.css',
    './styles/themes.css',
    './styles/layout.css',
    './scripts/main.js',
    './scripts/themeToggle.js',
    './scripts/dataLoader.js',
    './scripts/formHandler.js',
    './scripts/hamburgerMenu.js',
    './scripts/languageManager.js',
    './scripts/pageLoader.js',
    './data/portfolioData.json',
    './assets/images/profile.jpg',
    './assets/icons/favicon.svg',
    './assets/icons/en.png',
    './assets/icons/fr.png',
    './assets/icons/githubcopilot_icon.png',
    './assets/icons/claude_code_icon.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Some static hosts (e.g. `serve`) issue 301/308 from /index.html → /.
// A redirected Response cannot be served back from a SW (spec rejects it),
// so we re-wrap it into a non-redirected Response before caching.
async function cachePut(cache, url) {
    try {
        const response = await fetch(url, { cache: 'reload' });
        if (!response.ok) return;
        if (response.redirected) {
            const body = await response.blob();
            const clean = new Response(body, {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers
            });
            await cache.put(url, clean);
        } else {
            await cache.put(url, response);
        }
    } catch (err) {
        console.warn('[sw] skip caching', url, err);
    }
}

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async cache => {
            await Promise.all(ASSETS_TO_CACHE.map(url => cachePut(cache, url)));
            await self.skipWaiting();
        })
    );
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        Promise.all([
            caches.keys().then(names => Promise.all(
                names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
            )),
            self.clients.claim()
        ])
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    // Only intercept GETs — leave POST (Formspree, etc.) to the network.
    if (event.request.method !== 'GET') return;

    const url = event.request.url;
    const isNavigation = event.request.mode === 'navigate';
    const isHtml = url.endsWith('.html') || (isNavigation && !url.match(/\.[a-z0-9]+$/i));

    // Network-first for navigations, HTML pages, CSS, and JS — keep them fresh,
    // and never serve a redirected cached response (browsers reject those).
    if (isNavigation || isHtml || url.includes('.css') || url.includes('.js')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    if (response.status === 200 && !response.redirected) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                })
                .catch(() => caches.match(event.request))
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
