// ===============================
// Rock.Scot Service Worker
// ===============================

const CACHE_NAME = 'rockscot-cache-v1';

// Assets to cache for offline / PWA
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json',
    '/assets/images/logo_ultra_wide.png',
    '/assets/images/background/background1.jpg',
    '/assets/images/background/background2.jpg',
    '/assets/images/background/background3.jpg',
    '/assets/images/background/background4.jpg',
    '/assets/images/background/background5.jpg',
    '/assets/images/background/background6.jpg',
    '/assets/images/background/background7.jpg',
    '/assets/images/djs/dj_alex.jpg',
    '/assets/images/djs/dj_andy.jpg',
    '/assets/images/djs/dj_stevie.jpg',
    '/assets/images/djs/dj_mhairi.jpg',
    '/assets/images/djs/dj_jude.jpg',
    '/assets/images/djs/dj_chris.jpg',
    '/assets/images/djs/dj_cal.jpg',
    '/assets/images/djs/dj_blue.jpg'
];

// Install event - cache files
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('[Service Worker] Removing old cache', key);
                        return caches.delete(key);
                    }
                })
            )
        )
    );
    return self.clients.claim();
});

// Fetch event - serve cached assets first, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) return cached;
            return fetch(event.request)
                .then((response) => {
                    // Cache fetched files dynamically (optional)
                    return caches.open(CACHE_NAME).then((cache) => {
                        if (event.request.url.startsWith('http')) {
                            cache.put(event.request, response.clone());
                        }
                        return response;
                    });
                })
                .catch(() => {
                    // Optional fallback
                    if (event.request.destination === 'document') {
                        return caches.match('/index.html');
                    }
                });
        })
    );
});
