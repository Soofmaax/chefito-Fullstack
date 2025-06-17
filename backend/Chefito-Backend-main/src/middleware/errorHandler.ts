import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/api';
import { logger } from '../config/logger';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Erreur interne du serveur';

  // Log de l'erreur avec contexte
  logger.error('API Error', {
    message,
    statusCode,
    stack: error.stack,
    url: req.originalUrl,
    method: req.method,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    body: req.body,
    query: req.query,
    params: req.params,
  });

  const response: ApiResponse = {
    success: false,
    error: message,
  };

  // En développement, inclure la stack trace
  if (process.env.NODE_ENV === 'development') {
    response.data = {
      stack: error.stack,
    };
  }

  res.status(statusCode).json(response);
};

export const notFound = (req: Request, res: Response) => {
  logger.warn('Route not found', {
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  const response: ApiResponse = {
    success: false,
    error: `Route ${req.originalUrl} non trouvée`,
  };

  res.status(404).json(response);
};

export const createError = (message: string, statusCode: number = 500): AppError => {
  const error: AppError = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};

// Gestionnaire d'erreurs non capturées
export const setupErrorHandlers = () => {
  process.on('uncaughtException', (error) => {
    logger.fatal('Uncaught Exception', error);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.fatal('Unhandled Rejection', { reason, promise });
    process.exit(1);
  });
};