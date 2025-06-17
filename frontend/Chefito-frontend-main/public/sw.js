const CACHE_NAME = 'chefito-v1.0.0';
const STATIC_CACHE = 'chefito-static-v1.0.0';
const DYNAMIC_CACHE = 'chefito-dynamic-v1.0.0';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Add critical CSS and JS files here
];

// Install event - cache static assets
self.addEventListener('install', (event) => {

  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((error) => {
        // Error caching static assets
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {

  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {

        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(request)
            .then((response) => {
              // Cache successful responses
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(DYNAMIC_CACHE)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  });
              }
              return response;
            })
            .catch(() => {
              // Return offline page for navigation requests
              return caches.match('/offline.html');
            });
        })
    );
    return;
  }

  // Handle other requests (API, images, etc.)
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then((response) => {
            // Only cache successful responses
            if (response.status === 200) {
              const responseClone = response.clone();
              
              // Cache images and API responses
              if (
                request.url.includes('/api/') ||
                request.destination === 'image' ||
                request.url.includes('pexels.com')
              ) {
                caches.open(DYNAMIC_CACHE)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  });
              }
            }
            
            return response;
          })
          .catch((error) => {
            // Fetch failed
            
            // Return placeholder for images
            if (request.destination === 'image') {
              return new Response(
                '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#6b7280">Image non disponible</text></svg>',
                { headers: { 'Content-Type': 'image/svg+xml' } }
              );
            }
            
            throw error;
          });
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {

  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync tasks
      handleBackgroundSync()
    );
  }
});

// Push notifications
self.addEventListener('push', (event) => {

  
  const options = {
    body: event.data ? event.data.text() : 'Nouvelle notification de Chefito',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explorer',
        icon: '/icons/explore-action.png'
      },
      {
        action: 'close',
        title: 'Fermer',
        icon: '/icons/close-action.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Chefito', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {

  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/recipes')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handling for skip waiting
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Helper function for background sync
async function handleBackgroundSync() {
  try {
    // Handle any pending offline actions
    // Handling background sync tasks
    
    // Example: Sync offline recipe submissions
    const pendingSubmissions = await getStoredSubmissions();
    
    for (const submission of pendingSubmissions) {
      try {
        await submitRecipe(submission);
        await removeStoredSubmission(submission.id);
      } catch (error) {
        // Failed to sync submission
      }
    }
  } catch (error) {
    // Background sync failed
  }
}

// Helper functions for offline storage
async function getStoredSubmissions() {
  // Implementation would depend on your offline storage strategy
  return [];
}

async function submitRecipe(submission) {
  // Implementation for submitting recipe to API
  return fetch('/api/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(submission),
  });
}

async function removeStoredSubmission(id) {
  // Implementation for removing stored submission

}