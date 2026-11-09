// Service Worker für Wurfball-Rettung.
// Bei jeder Änderung an den Dateien VERSION hochzählen, sonst sehen installierte Apps nichts.
const VERSION = '1.0.0';
const CACHE = 'wurfball-rettung-' + VERSION;
const FONT_CACHE = 'wurfball-rettung-fonts';
const FILES = [
  './',
  'index.html',
  'manifest.webmanifest',
  'assets/a01.png',
  'assets/a02.png',
  'assets/a07.png',
  'assets/a08.png',
  'assets/bg0.jpg',
  'assets/bg1.jpg',
  'assets/bg2.jpg',
  'assets/bg3.jpg',
  'assets/body.png',
  'assets/f01.png',
  'assets/f02.png',
  'assets/fx0.png',
  'assets/fx1.png',
  'assets/fx2.png',
  'assets/head.png',
  'assets/ic_bar.png',
  'assets/ic_ring.png',
  'assets/ic_whistle.png',
  'assets/kf0.png',
  'assets/kf1.png',
  'assets/kf2.png',
  'assets/kf3.png',
  'assets/kh0.png',
  'assets/kh1.png',
  'assets/kh2.png',
  'assets/kk0.png',
  'assets/kk1.png',
  'assets/kk2.png',
  'assets/kladde.png',
  'assets/kladde_clip.png',
  'assets/kt0.png',
  'assets/kt1.png',
  'assets/kt2.png',
  'assets/kw0.png',
  'assets/kw1.png',
  'assets/kw2.png',
  'assets/sa2.png',
  'assets/sa3.png',
  'assets/sa4.png',
  'assets/sa7.png',
  'assets/sa8.png',
  'assets/sh0.png',
  'assets/sh1.png',
  'assets/sh2.png',
  'assets/sh3.png',
  'assets/sh4.png',
  'assets/sh5.png',
  'assets/sh6.png',
  'assets/sh7.png',
  'assets/sh8.png',
  'assets/sh9.png',
  'assets/ss0.png',
  'assets/ss1.png',
  'assets/ss2.png',
  'assets/ss3.png',
  'assets/ss4.png',
  'icons/apple-touch-icon.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
];

// Neue Version: alle Dateien vorab laden. Aktiv wird sie erst, wenn die Seite
// "SKIP_WAITING" schickt (passiert automatisch im Startmenü).
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// Alte Versionen aufräumen
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('wurfball-rettung-') && k !== CACHE && k !== FONT_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Schrift von Google Fonts: aus dem Cache, im Hintergrund auffrischen
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(caches.open(FONT_CACHE).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== location.origin) return;

  // Seite selbst: zuerst aus dem Netz (damit Updates schnell ankommen), offline aus dem Cache
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(() => caches.match('index.html', {cacheName: CACHE})));
    return;
  }
  // Bilder und übrige Dateien: aus dem Cache dieser Version
  event.respondWith(caches.match(req, {cacheName: CACHE}).then(hit => hit || fetch(req)));
});
