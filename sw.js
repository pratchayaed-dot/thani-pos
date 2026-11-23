const CACHE = 'thani-pos-v4';
const CORE = ["./", "index.html", "dc-runtime.js", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "img/06b9aec421cfa3b525363595b43600cc.jpg", "img/28f73b57d165625c52a9f6fa61c21581.jpg", "img/6f50b2d4d220001bc5168659cdea0b8b.jpg", "img/7437662807a20e5520026f6ee7e23805.jpg", "img/b7588ad51647cc927bc75a8668cc6e20.jpg", "img/bajang.jpg", "img/d67c5661340ec7f538ea9265d4fbe1f0.jpg", "img/de8cf23b00ff0d6c5e4ae62d5407afe9.jpg", "img/egg.jpg", "img/f09a81d8d33776dab86966a561d8bb00.jpg", "img/fe121fc8b70ddb35fc919d488c6c45b4.png", "img/logo.png", "img/rice-crispy-sausage.jpg", "img/rice-crispy.jpg", "img/rice-full.jpg", "img/rice-mix.jpg", "img/rice-red-sausage.jpg", "img/rice-red.jpg"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).then((res) => { const cp = res.clone(); caches.open(CACHE).then((c) => c.put('index.html', cp)); return res; }).catch(() => caches.match('index.html')));
    return;
  }
  e.respondWith(
    caches.match(e.request).then((hit) => {
      const net = fetch(e.request).then((res) => {
        if (res && (res.ok || res.type === 'opaque')) { const cp = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, cp)); }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
