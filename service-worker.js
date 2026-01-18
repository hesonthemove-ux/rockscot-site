const CACHE_NAME = 'rockscot-v1';
const STATIC_ASSETS = [
    './index.html',
    './manifest.json',
    './css/styles.css',
    './js/app.js',
    './js/config.js',
    './js/player.js',
    './js/ui.js',
    './js/crew.js',
    './js/wire.js',
    './js/ads.js',
    './js/modals.js',
    './assets/images/branding/logo_ultra_wide.png',
    './assets/images/background/background1.jpg',
    './assets/images/background/background2.jpg',
    './assets/images/background/background3.jpg',
    './assets/images/background/background4.jpg',
    './assets/images/background/background5.jpg',
    './assets/images/background/background6.jpg',
    './assets/images/background/background7.jpg',
    './assets/images/crew/dj_alex.jpg',
    './assets/images/crew/dj_andy.jpg',
    './assets/images/crew/dj_stevie.jpg',
    './assets/images/crew/dj_mhairi.jpg',
    './assets/images/crew/dj_jude.jpg',
    './assets/images/crew/dj_chris.jpg',
    './assets/images/crew/dj_cal.jpg',
    './assets/images/crew/dj_blue.jpg'
];

// --- INSTALL ---
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// --- ACTIVATE ---
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => 
            Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

// --- FETCH ---
self.addEventListener('fetch', event => {
    const req = event.request;

    // Let audio stream bypass cache for live playback
    if (req.url.includes('caledonia-tx-ltd')) {
        return;
    }

    event.respondWith(
        caches.match(req).then(cached => {
            return cached || fetch(req).then(response => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(req, response.clone());
                    return response;
                });
            });
        }).catch(() => {
            // Optional fallback if offline
            if (req.destination === 'document') return caches.match('./index.html');
        })
    );
});
