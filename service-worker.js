const CACHE_NAME = 'rockscot-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json',
  './css/styles.css',
  './js/app.js',
  './js/config.js',
  './js/player.js',
  './js/ui.js',
  './js/wire.js',
  './js/crew.js',
  './js/ads.js',
  './js/views.js',
  './js/modals.js',
  'https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Bebas+Neue&family=Inter:wght@400;700;900&display=swap',
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
  './assets/images/crew/dj_alex.jpg',
  './assets/images/crew/dj_andy.jpg',
  './assets/images/crew/dj_stevie.jpg',
  './assets/images/crew/dj_mhairi.jpg',
  './assets/images/crew/dj_jude.jpg',
  './assets/images/crew/dj_chris.jpg',
  './assets/images/crew/dj_cal.jpg',
  './assets/images/crew/dj_blue.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME)
            .map(k => caches.delete(k))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
