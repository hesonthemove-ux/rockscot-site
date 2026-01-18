const CACHE_NAME = 'rockscot-cache-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './css/styles.css',
    './js/app.js',
    './manifest.json',
    './assets/images/branding/logo_ultra_wide.png',
    './assets/images/background/background1.jpg',
    './assets/images/background/background2.jpg',
    './assets/images/background/background3.jpg',
    './assets/images/background/background4.jpg',
    './assets/images/background/background5.jpg',
    './assets/images/background/background6.jpg',
    './assets/images/background/background7.jpg',
    './assets/images/djs/dj_alex.jpg',
    './assets/images/djs/dj_andy.jpg'
    // Add other DJ images here
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(cached => cached || fetch(e.request))
    );
});
