// Service worker: aplicația se deschide și fără internet (rețea întâi, cu rezervă din memoria locală)
const CACHE = 'proiect-electric-v2';
const MAIN = 'trikker.html';
const FILES = [MAIN, 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  if (new URL(r.url).origin !== location.origin) return;                       // Google Drive / alte site-uri: direct, fără service worker
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const net = fetch(r).then(resp => { if (resp.ok) cache.put(r, resp.clone()); return resp; });
    try { return await Promise.race([net, new Promise((_, rej) => setTimeout(() => rej(new Error('lent')), 4000))]); }   // semnal slab pe șantier: după 4 s folosim copia locală
    catch (_) { const m = (await cache.match(r, { ignoreSearch: true })) || (await cache.match(MAIN)); return m || net; }
  })());
});
