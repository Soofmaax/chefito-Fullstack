/**
 * Performance monitoring and optimization utilities
 */

// Web Vitals tracking
export interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

/**
 * Track Core Web Vitals
 */
export const trackWebVitals = (metric: WebVitalsMetric) => {
  // Log metrics in development
  if (process.env.NODE_ENV === 'development') {
  }

  // Send to analytics service in production
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }
  }
};

/**
 * Measure and report performance metrics
 */
export const measurePerformance = (name: string, fn: () => void | Promise<void>) => {
  const start = performance.now();
  
  const finish = () => {
    const duration = performance.now() - start;
    
    // Track long tasks (>50ms)
    if (duration > 50) {
      // Long task detected
    }
  };

  const result = fn();
  
  if (result instanceof Promise) {
    return result.finally(finish);
  } else {
    finish();
    return result;
  }
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
};

/**
 * Throttle function for performance optimization
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Intersection Observer for lazy loading
 */
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '50px',
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

/**
 * Preload critical resources
 */
export const preloadResource = (href: string, as: string, type?: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  
  document.head.appendChild(link);
};

/**
 * Prefetch resources for future navigation
 */
export const prefetchResource = (href: string) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  
  document.head.appendChild(link);
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get connection information for adaptive loading
 */
export const getConnectionInfo = () => {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (!connection) {
    return { effectiveType: '4g', saveData: false };
  }
  
  return {
    effectiveType: connection.effectiveType,
    saveData: connection.saveData,
    downlink: connection.downlink,
    rtt: connection.rtt,
  };
};

/**
 * Adaptive loading based on connection
 */
export const shouldLoadHighQuality = () => {
  const { effectiveType, saveData } = getConnectionInfo();
  
  if (saveData) return false;
  if (effectiveType === 'slow-2g' || effectiveType === '2g') return false;
  
  return true;
};

/**
 * Bundle size analyzer helper
 */
export const logBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    // This would be replaced by actual bundle analysis in build process
    // Bundle analysis available in build process
  }
};

/**
 * Memory usage monitoring
 */
export const monitorMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    // Memory usage monitoring for development
  }
};