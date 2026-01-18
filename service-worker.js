const CACHE_NAME = 'rockscot-cache-v1';
const ASSETS_TO_CACHE = [
    // HTML
    '/',
    '/index.html',

    // CSS
    '/css/styles.css',

    // JS
    '/js/app.js',
    '/js/config.js',
    '/js/crew.js',
    '/js/modals.js',
    '/js/player.js',
    '/js/state.js',
    '/js/ui.js',
    '/js/views.js',
    '/js/wire.js',
    '/js/ads.js',

    // Logo & Branding
    '/assets/images/branding/logo_ultra_wide.png',

    // Backgrounds
    '/assets/images/background/background1.jpg',
    '/assets/images/background/background2.jpg',
    '/assets/images/background/background3.jpg',
    '/assets/images/background/background4.jpg',
    '/assets/images/background/background5.jpg',
    '/assets/images/background/background6.jpg',
    '/assets/images/background/background7.jpg',

    // Crew
    '/assets/images/crew/dj_alex.jpg',
    '/assets/images/crew/dj_andy.jpg',
    '/assets/images/crew/dj_stevie.jpg',
    '/assets/images/crew/dj_mhairi.jpg',
    '/assets/images/crew/dj_jude.jpg',
    '/assets/images/crew/dj_chris.jpg',
    '/assets/images/crew/dj_cal.jpg',
    '/assets/images/crew/dj_blue.jpg'
];

// Install Service Worker and cache files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate SW and clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            )
        )
    );
    self.clients.claim();
});

// Fetch from cache first, fallback to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;
            return fetch(event.request)
                .then(response => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                })
                .catch(() => {
                    // Optional: fallback image for images if offline
                    if (event.request.destination === 'image') {
                        return '/assets/images/background/background1.jpg';
                    }
                });
        })
    );
});
