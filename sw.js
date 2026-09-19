// Wrench Rush - Offline Service Worker
const CACHE_NAME = 'wrench-rush-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './static/css/game.css',
  './static/js/audio.js',
  './static/js/particles.js',
  './static/js/tools.js',
  './static/js/upgrades.js',
  './static/js/vehicles.js',
  './static/js/game.js',
  './static/assets/icon-192.png',
  './static/assets/icon-512.png',
  './static/assets/banner.jpg',
  './static/assets/screenshot-mobile.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
