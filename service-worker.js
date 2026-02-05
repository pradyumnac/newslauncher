self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("launcher-cache").then((cache) => {
      return cache.addAll([
        "/newslauncher",
        "/newslauncher/manifest.json",
        "/newslauncher/img/favicon.png",
        "/newslauncher/quotes.js",
        "/newslauncher/quotes-worker.js",
        "/newslauncher/data/quotes.db.ascii.json",
        "/newslauncher/data/quotes-version.json",
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
