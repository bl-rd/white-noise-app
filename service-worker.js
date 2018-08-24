const appCache = '0.0.2';
const expectedCaches = [appCache];

const filesToCache = [
  './',
  'index.html',
  'src/main.js',
  'src/pink-noise.js',
  'style/main.css',
  'images/circle-128.png',
  'images/circle-144.png',
  'images/circle-152.png',
  'images/circle-192.png',
  'images/circle-256.png',
  'images/circle-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(precache().catch(console.log));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      }))
    })
  )
});

self.addEventListener('fetch', event => {
  event.respondWith(fromCache(event.request));
});

function precache() {
  return caches.open(appCache)
    .then(cache => {
      return cache.addAll(filesToCache);
    });
}

function fromCache(request) {
  return caches.open(appCache)
    .then(cache => {
      return cache.match(request)
        .then(match => match || fetch(request));
    });
}