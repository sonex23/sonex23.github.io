const CACHE_NAME = "pwa_2_v2";
var urlsToCache = [
    "/",
    "/content.html",
    "/nav.html",
    "/index.html",
    "/footer.html",
    "/manifest.json",
    "/logo192.png",
    "/logo512.png",
    "/sw.js",
    "/pages/home.html",
    "/pages/sub-content.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/idb.js",
    "/js/idbController.js",
    "/js/api.js",
    "/js/main.js",
    "/img/ikon.png",
    "/img/logo.png",
    "/img/belanda.png",
    "/img/inggris.png",
    "/img/jerman.png",
    "/img/prancis.png",
    "/img/spanyol.png"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache)
        })
    );
});

self.addEventListener("fetch", function (event) {
    if (event.request.url.includes("api.football-data.org")) {
        event.respondWith(async function () {
            const cache = await caches.open(CACHE_NAME);
            const cachedresponse = await cache.match(event.request);
            if (cachedresponse) return cachedresponse;
            const networkResponse = await fetch(event.request);

            event.waitUntil(
                cache.put(event.request, networkResponse.clone())
            );
            return networkResponse;
        }());
    } else {
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            })
        );
    }
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});