importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js')

workbox.skipWaiting()
workbox.clientsClaim()

workbox.precaching.precacheAndRoute([])

// workbox.routing.registerRoute(
//   new RegExp('https://api.mapbox.com/(.*)'),
//   workbox.strategies.cacheFirst({
//     cacheName: 'mapbox',
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxEntries: 30
//       }),
//       new workbox.cacheableResponse.Plugin({
//         statuses: [0, 200]
//       })
//     ]
//   })
// )

workbox.routing.registerRoute(
  new RegExp('https://ucarecdn.com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'uploadcare',
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
