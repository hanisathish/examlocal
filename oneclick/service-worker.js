self.addEventListener("install", function(event) {
	event.waitUntil(
		caches.open("pwa").then(function(cache) {
			return cache.addAll([
				"http://exam.hanishasoftwares.com/",
				"http://exam.hanishasoftwares.com/oneclick/style.css",
				"http://exam.hanishasoftwares.com/oneclick/script.js",
			]);
		})
	);
});

self.addEventListener("fetch", function(event) {
	event.respondWith(
		caches.open("pwa").then(function(cache) {
			return cache.match(event.request).then(function(response) {
				cache.addAll([event.request.url]);

				if(response) {
					return response;
				}

				return fetch(event.request);
			});
		})
	);
});