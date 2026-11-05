// Scoped to the GitHub Pages project directory, not the github.io root.
const CACHE = 'moe-zdorovie-pages-v1';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon.svg'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('moe-zdorovie-pages-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const u = new URL(event.request.url);
  if (event.request.method !== 'GET' || u.origin !== self.location.origin || !u.pathname.startsWith(new URL('./', self.registration.scope).pathname)) return;
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
