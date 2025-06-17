/**
 * Analytics utilities for tracking user interactions
 */

interface EventProperties {
  [key: string]: string | number | boolean;
}

/**
 * Track custom events for analytics
 */
export function trackEvent(eventName: string, properties?: EventProperties): void {
  // In a real app, this would send to your analytics service
  // For demo purposes, we'll log to console and localStorage
  
  const event = {
    name: eventName,
    properties: properties || {},
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
  };

  // Log to console for development
  console.log('📊 Analytics Event:', event);

  // Store in localStorage for demo purposes
  try {
    const existingEvents = JSON.parse(localStorage.getItem('chefito_analytics') || '[]');
    existingEvents.push(event);
    
    // Keep only last 100 events
    if (existingEvents.length > 100) {
      existingEvents.splice(0, existingEvents.length - 100);
    }
    
    localStorage.setItem('chefito_analytics', JSON.stringify(existingEvents));
  } catch (error) {
    console.warn('Failed to store analytics event:', error);
  }
}

/**
 * Track page views
 */
export function trackPageView(pageName: string, properties?: EventProperties): void {
  trackEvent('page_view', {
    page: pageName,
    ...properties,
  });
}

/**
 * Track CTA clicks
 */
export function trackCTAClick(ctaName: string, location: string, properties?: EventProperties): void {
  trackEvent('cta_clicked', {
    cta_name: ctaName,
    location,
    ...properties,
  });
}

/**
 * Track recipe interactions
 */
export function trackRecipeInteraction(action: string, recipeId: string, properties?: EventProperties): void {
  trackEvent('recipe_interaction', {
    action,
    recipe_id: recipeId,
    ...properties,
  });
}

/**
 * Track voice assistant usage
 */
export function trackVoiceAssistant(action: 'start' | 'stop' | 'command', properties?: EventProperties): void {
  trackEvent('voice_assistant', {
    action,
    ...properties,
  });
}

/**
 * Get analytics data (for demo purposes)
 */
export function getAnalyticsData(): any[] {
  try {
    return JSON.parse(localStorage.getItem('chefito_analytics') || '[]');
  } catch {
    return [];
  }
}

/**
 * Clear analytics data
 */
export function clearAnalyticsData(): void {
  localStorage.removeItem('chefito_analytics');
}

/**
 * Check if user has consented to cookies
 */
export function hasConsentedToCookies(): boolean {
  return localStorage.getItem('cookie_consent') === 'accepted';
}

/**
 * Get cookie consent status
 */
export function getCookieConsentStatus(): 'accepted' | 'declined' | null {
  const consent = localStorage.getItem('cookie_consent');
  return consent as 'accepted' | 'declined' | null;
}

/**
 * Enhanced tracking that respects cookie consent
 */
export function trackEventWithConsent(eventName: string, properties?: EventProperties): void {
  // Always allow essential tracking (like cookie consent itself)
  const essentialEvents = ['cookie_consent', 'page_view'];
  
  if (essentialEvents.includes(eventName) || hasConsentedToCookies()) {
    trackEvent(eventName, properties);
  } else {
    // Log to console for development but don't store
    console.log('📊 Analytics Event (not stored - no consent):', {
      name: eventName,
      properties: properties || {},
    });
  }
}