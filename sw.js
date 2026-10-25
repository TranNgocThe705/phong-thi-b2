/* Phòng Thi B2 — Service Worker (PWA offline shell)
   Lưu ý: khi bump ?v= trong index.html, bump thêm hằng CACHE dưới đây để xoá cache cũ. */
const CACHE = "b2-pwa-20261025n";
const FONT_HOSTS = new Set(["fonts.googleapis.com", "fonts.gstatic.com"]);

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(["./", "./index.html"])).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  if(!sameOrigin && !FONT_HOSTS.has(url.hostname)) return; // không chặn API AI/Drive…

  // Điều hướng trang: network-first, rớt mạng thì dùng bản cache
  if(req.mode === "navigate"){
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put("./index.html", copy));
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
    );
    return;
  }

  // Asset cùng origin (?v= versioned → cache-first an toàn) + font Google: cache-first rồi cập nhật nền
  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        if(res && res.ok) caches.open(CACHE).then(c => c.put(req, res.clone()));
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
