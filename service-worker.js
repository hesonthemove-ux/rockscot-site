const CACHE_NAME = 'rockscot-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/styles.css',
  './js/app.js',
  './manifest.json',
  './assets/images/branding/logo_ultra_wide.png',
  // Background images
  './assets/images/background/background1.jpg',
  './assets/images/background/background2.jpg',
  './assets/images/background/background3.jpg',
  './assets/images/background/background4.jpg',
  './assets/images/background/background5.jpg',
  './assets/images/background/background6.jpg',
  './assets/images/background/background7.jpg',
  // DJ images
  './assets/images/djs/dj_alex.jpg',
  './assets/images/djs/dj_andy.jpg',
  './assets/images/djs/dj_stevie.jpg',
  './assets/images/djs/dj_mhairi.jpg',
  './assets/images/djs/dj_jude.jpg',
  './assets/images/djs/dj_chris.jpg',
  './assets/images/djs/dj_cal.jpg',
  './assets/images/djs/dj_blue.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(cachedRes => cachedRes || fetch(e.request))
      .catch(() => {
        // fallback for offline HTML requests
        if(e.request.mode === 'navigate') return caches.match('./index.html');
      })
  );
});
