workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

workbox.routing.registerRoute(
  new RegExp('https://api.tiles.mapbox.com/mapbox-gl-js/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'mapbox-gl',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
)

workbox.googleAnalytics.initialize()
