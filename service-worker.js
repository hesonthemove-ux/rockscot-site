// ROCK.SCOT SERVICE WORKER
const CACHE_NAME = 'rockscot-cache-v1';
const ASSETS_TO_CACHE = [
    '/', // index.html
    '/index.html',
    '/css/styles.css',
    '/js/app.js',
    '/manifest.json',

    // Branding
    '/images/branding/logo_ultra_wide.png',

    // Backgrounds
    '/images/background/background1.jpg',
    '/images/background/background2.jpg',
    '/images/background/background3.jpg',
    '/images/background/background4.jpg',
    '/images/background/background5.jpg',
    '/images/background/background6.jpg',
    '/images/background/background7.jpg',

    // DJ images
    '/images/djs/dj_andy.jpg',
    '/images/djs/dj_alex.jpg',
    '/images/djs/dj_stevie.jpg',
    '/images/djs/dj_mhairi.jpg',
    '/images/djs/dj_jude.jpg',
    '/images/djs/dj_chris.jpg',
    '/images/djs/dj_cal.jpg',
    '/images/djs/dj_blue.jpg'
];

// Install SW and cache assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

// Activate SW and remove old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if(key !== CACHE_NAME) return caches.delete(key);
            })
        ))
    );
    self.clients.claim();
});

// Fetch from cache, fallback to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(res => res || fetch(event.request))
            .catch(() => {
                // Optional fallback
                if(event.request.destination === 'image') {
                    return '/images/branding/logo_ultra_wide.png';
                }
            })
    );
});
