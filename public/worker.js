const CACHE_NAME = 'pwa-task-manager';
const urlsToCache = [
  '/',
  '/books'
];

// events
const INSTALL = 'install';
const FETCH = 'fetch';
const ACTIVATE = 'activate';

// Install a service worker
self.addEventListener(INSTALL, (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener(FETCH, (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Update a service worker
self.addEventListener(ACTIVATE, (event) => {
  const cacheWhitelist = ['pwa-task-manager'];
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.forEach((cacheName) => {
        if (cacheWhitelist.indexOf(cacheName) === -1) {
          return caches.delete(cacheName);
        }
      })
    ))
  );
});
