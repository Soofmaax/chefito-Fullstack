import { logger } from './logger';

// Environment variables will be injected by Vite
const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const startTime = performance.now();
  
  try {
    // Check if API URL is configured
    if (!API_BASE_URL || API_BASE_URL === 'https://your-worker.your-subdomain.workers.dev') {
      throw new Error('API URL not configured');
    }

    // Add auth header if user is logged in
    const token = localStorage.getItem('sb-token');
    const headers = {
      ...options.headers,
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });

    // Log performance metrics
    const duration = performance.now() - startTime;
    try {
      await logger.performance('api_request', duration, {
        url,
        method: options.method || 'GET',
        status: response.status,
      });
    } catch {
    }

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new Error(error?.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    // Log error with sanitized details
    try {
      await logger.error('API Request Failed', {
        url,
        method: options.method || 'GET',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } catch {
    }
    throw error;
  }
}

// Text-to-speech using ElevenLabs via our Cloudflare Worker
export async function textToSpeech(text: string, voice = 'default') {
  try {
    const response = await fetchWithAuth('/tts', {
      method: 'POST',
      body: JSON.stringify({ text, voice }),
    });

    return response.blob();
  } catch {
    throw new Error('Text-to-speech service is currently unavailable');
  }
}

// Speech recognition (simplified, would be expanded in real implementation)
export function startSpeechRecognition() {
  return new Promise<string>((resolve, reject) => {
    if (!('webkitSpeechRecognition' in window)) {
      reject(new Error('Speech recognition not supported in this browser'));
      return;
    }

    // @ts-ignore - TypeScript doesn't know about webkitSpeechRecognition
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      resolve(transcript);
    };

    recognition.onerror = (event: any) => {
      reject(new Error(`Speech recognition error: ${event.error}`));
    };

    recognition.start();
  });
}

// RevenueCat integration (simplified for frontend)
export async function checkSubscriptionStatus(userId: string) {
  try {
    const response = await fetchWithAuth('/subscription/status', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
    
    return response.json();
  } catch {
    return { isPremium: false, error: 'Service unavailable' };
  }
}

export async function upgradeToPremium() {
  try {
    const response = await fetchWithAuth('/subscription/upgrade', {
      method: 'POST',
    });
    
    return response.json();
  } catch {
    throw new Error('Premium upgrade service is currently unavailable');
  }
}

// Analytics tracking (Pica integration)
export async function trackEvent(eventName: string, properties: Record<string, any> = {}) {
  try {
    await fetchWithAuth('/analytics/track', {
      method: 'POST',
      body: JSON.stringify({ event: eventName, properties }),
    });
  } catch {
  }
}

// Recipe management
export async function getCategories() {
  try {
    const response = await fetchWithAuth('/categories');
    return response.json();
  } catch {
    return [];
  }
}

export async function submitRecipe(recipeData: any) {
  const response = await fetchWithAuth('/recipes', {
    method: 'POST',
    body: JSON.stringify(recipeData),
  });
  return response.json();
}

export async function uploadImage(bucket: string, path: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('bucket', bucket);
  formData.append('path', path);

  const response = await fetchWithAuth('/upload', {
    method: 'POST',
    body: formData,
  });
  return response.json();
}

export async function incrementRecipeView(userId: string, recipeId: string) {
  try {
    const response = await fetchWithAuth('/recipes/view', {
      method: 'POST',
      body: JSON.stringify({ userId, recipeId }),
    });
    return response.json();
  } catch {
    return { success: false };
  }
}

export async function canUserViewRecipe(userId: string, recipeId: string) {
  try {
    const response = await fetchWithAuth('/recipes/can-view', {
      method: 'POST',
      body: JSON.stringify({ userId, recipeId }),
    });
    return response.json();
  } catch {
    return { canView: true }; // Default to allowing access if service is down
  }
}

export async function addComment(recipeId: string, userId: string, content: string) {
  const response = await fetchWithAuth('/recipes/comments', {
    method: 'POST',
    body: JSON.stringify({ recipeId, userId, content }),
  });
  return response.json();
}