// Secure frontend logger that sends logs to backend instead of directly to CloudWatch
// This prevents exposing AWS credentials in the frontend

interface LogData {
  level: 'INFO' | 'ERROR' | 'PERFORMANCE';
  message: string;
  data?: any;
  error?: any;
  action?: string;
  duration?: number;
  metadata?: any;
  environment: string;
  timestamp: number;
}

// Sanitize PII from log data
const sanitizeData = (data: any): any => {
  if (!data) return data;
  
  const piiFields = ['email', 'password', 'name', 'phone', 'address', 'ip'];
  const sanitized = { ...data };

  // Recursively sanitize objects
  Object.keys(sanitized).forEach(key => {
    if (piiFields.includes(key.toLowerCase())) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof sanitized[key] === 'object') {
      sanitized[key] = sanitizeData(sanitized[key]);
    }
  });

  return sanitized;
};

// Send logs to backend API instead of directly to CloudWatch
const sendLogToBackend = async (logData: LogData) => {
  try {
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    if (!API_BASE_URL) {
      console.warn('API URL not configured, logging to console instead');
      console.log('[LOG]', logData);
      return;
    }

    await fetch(`${API_BASE_URL}/logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logData),
    });
  } catch (error) {
    // Fallback to console logging if backend is unavailable
    console.warn('Failed to send log to backend, falling back to console:', error);
    console.log('[LOG]', logData);
  }
};

export const logger = {
  info: async (message: string, data?: any) => {
    const sanitizedData = sanitizeData(data);
    const logData: LogData = {
      level: 'INFO',
      message,
      data: sanitizedData,
      environment: import.meta.env.MODE,
      timestamp: Date.now(),
    };

    await sendLogToBackend(logData);
  },

  error: async (message: string, error?: any) => {
    const sanitizedError = sanitizeData(error);
    const logData: LogData = {
      level: 'ERROR',
      message,
      error: {
        message: error?.message,
        stack: error?.stack,
        ...sanitizedError,
      },
      environment: import.meta.env.MODE,
      timestamp: Date.now(),
    };

    await sendLogToBackend(logData);
  },

  performance: async (action: string, duration: number, metadata?: any) => {
    const sanitizedMetadata = sanitizeData(metadata);
    const logData: LogData = {
      level: 'PERFORMANCE',
      action,
      duration,
      metadata: sanitizedMetadata,
      environment: import.meta.env.MODE,
      timestamp: Date.now(),
    };

    await sendLogToBackend(logData);
  },
};