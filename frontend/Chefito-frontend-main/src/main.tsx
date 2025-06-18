import React from 'react';
import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Service Worker for PWA functionality
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, show toast notification
                const showToast = (window as any).showAppToast;
                if (showToast) {
                  showToast({
                    type: 'info',
                    title: 'Nouvelle version disponible',
                    message: 'Une mise à jour de Chefito est prête à être installée.',
                    duration: 0, // Persistent until user action
                    action: {
                      label: 'Mettre à jour',
                      onClick: () => {
                        newWorker.postMessage({ type: 'SKIP_WAITING' });
                        window.location.reload();
                      }
                    }
                  });
                } else {
                  // Fallback to confirm dialog if toast system not ready
                  if (confirm('Une nouvelle version de Chefito est disponible. Voulez-vous la charger ?')) {
                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                    window.location.reload();
                  }
                }
              }
            });
          }
        });
      })
      .catch(() => {
      });
  });
}

// Track Web Vitals for performance monitoring (only in production)
if (process.env.NODE_ENV === 'production') {
  // Dynamically import web-vitals to avoid issues in development
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    // Import performance tracking utility
    import('./lib/utils/performance').then(({ trackWebVitals }) => {
      getCLS(trackWebVitals);
      getFID(trackWebVitals);
      getFCP(trackWebVitals);
      getLCP(trackWebVitals);
      getTTFB(trackWebVitals);
    });
  }).catch(() => {
  });
}

// Initialize accessibility features in development
if (process.env.NODE_ENV === 'development') {
  // Load axe-core for accessibility testing in development
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOMClient, 1000);
  }).catch(() => {
  });
}

ReactDOMClient.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);