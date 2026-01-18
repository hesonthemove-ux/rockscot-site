/* =====================================================
   Rock.Scot Service Worker
   Purpose:
   - Offline resilience
   - Asset caching
   - Faster repeat visits
   - Safe for GitHub Pages
===================================================== */

const CACHE_NAME = 'rockscot-v1';

/* Files we want cached immediately */
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/styles.css',
  './js/app.js',

  /* Images */
  './assets/images/logo_ultra_wide.png',

  './assets/images/background/background1.jpg',
  './assets/images/background/background2.jpg',
  './assets/images/background/background3.jpg',
  './assets/images/background/background4.jpg',
  './assets/images/background/background5.jpg',
  './assets/images/background/background6.jpg',
  './assets/images/background/background7.jpg'
];

/* ----------------------------------
   INSTALL
----------------------------------- */

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

/* ----------------------------------
   ACTIVATE
----------------------------------- */

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

/* ----------------------------------
   FETCH
----------------------------------- */

self.addEventListener('fetch', event => {

  /* Never cache audio streams */
  if (event.request.url.includes('broadcast.radio')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).then(fetchResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        })
      );
    }).catch(() => {
      /* Offline fallback (basic) */
      if (event.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
    })
  );
});
