const CACHE_NAME = 'rockscot-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/styles.css',
  '/js/app.js',
  '/js/config.js',
  '/js/crew.js',
  '/js/modals.js',
  '/js/player.js',
  '/js/state.js',
  '/js/ui.js',
  '/js/views.js',
  '/js/wire.js',
  '/assets/images/branding/logo_ultra_wide.png',
  // Background images
  '/assets/images/background/background1.jpg',
  '/assets/images/background/background2.jpg',
  '/assets/images/background/background3.jpg',
  '/assets/images/background/background4.jpg',
  '/assets/images/background/background5.jpg',
  '/assets/images/background/background6.jpg',
  '/assets/images/background/background7.jpg',
  // Crew DJ images
  '/assets/images/crew/dj_alex.jpg',
  '/assets/images/crew/dj_andy.jpg',
  '/assets/images/crew/dj_stevie.jpg',
  '/assets/images/crew/dj_mhairi.jpg',
  '/assets/images/crew/dj_jude.jpg',
  '/assets/images/crew/dj_chris.jpg',
  '/assets/images/crew/dj_cal.jpg',
  '/assets/images/crew/dj_blue.jpg'
];

// Install event - cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch event - serve cached assets
self.addEventListener('fetch', event => {
  if (event.request.url.includes('player.broadcast.radio')) {
    // Do not cache audio stream
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        return caches.open(CACHE_NAME).then(cache => {
          // Only cache GET requests
          if (event.request.method === 'GET') {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      }).catch(() => {
        // Optional: fallback page or image
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
