// Rock.Scot Service Worker
// Caches assets for offline & fast load

const CACHE_NAME = 'rockscot-cache-v1';
const ASSETS_TO_CACHE = [
  '/', 
  '/index.html',
  '/manifest.json',
  '/css/styles.css',
  '/js/app.js',
  '/js/config.js',
  // Background images
  '/assets/images/background/background1.jpg',
  '/assets/images/background/background2.jpg',
  '/assets/images/background/background3.jpg',
  '/assets/images/background/background4.jpg',
  '/assets/images/background/background5.jpg',
  '/assets/images/background/background6.jpg',
  '/assets/images/background/background7.jpg',
  // DJ images
  '/assets/images/crew/dj_alex.jpg',
  '/assets/images/crew/dj_andy.jpg',
  '/assets/images/crew/dj_stevie.jpg',
  '/assets/images/crew/dj_mhairi.jpg',
  '/assets/images/crew/dj_jude.jpg',
  '/assets/images/crew/dj_chris.jpg',
  '/assets/images/crew/dj_cal.jpg',
  '/assets/images/crew/dj_blue.jpg',
  // Branding
  '/assets/images/branding/logo_ultra_wide.png'
];

// Install event – cache all assets
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching assets...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event – cleanup old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if(key !== CACHE_NAME) {
          console.log('[SW] Removing old cache:', key);
          return caches.delete(key);
        }
      })
    ))
  );
  return self.clients.claim();
});

// Fetch event – respond from cache first, fallback to network
self.addEventListener('fetch', event => {
  const request = event.request;

  // Only cache GET requests
  if(request.method !== 'GET') return;

  event.respondWith(
    caches.match(request)
      .then(cached => {
        if(cached) return cached;

        return fetch(request)
          .then(networkResponse => {
            // Don't cache streaming audio
            if(request.url.includes('broadcast.radio')) return networkResponse;

            return caches.open(CACHE_NAME).then(cache => {
              cache.put(request, networkResponse.clone());
              return networkResponse;
            });
          })
          .catch(() => {
            // Fallback page if offline
            if(request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});
