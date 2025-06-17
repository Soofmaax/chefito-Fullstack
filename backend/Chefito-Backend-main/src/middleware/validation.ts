import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ApiResponse } from '../types/api';
import { logger } from '../config/logger';

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        logger.warn('Validation error', { errors: errorMessages, body: req.body });

        const response: ApiResponse = {
          success: false,
          error: 'Données invalides',
          data: errorMessages,
        };

        return res.status(400).json(response);
      }

      logger.error('Unexpected validation error', error);
      next(error);
    }
  };
};

export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        logger.warn('Query validation error', { errors: errorMessages, query: req.query });

        const response: ApiResponse = {
          success: false,
          error: 'Paramètres de requête invalides',
          data: errorMessages,
        };

        return res.status(400).json(response);
      }

      logger.error('Unexpected query validation error', error);
      next(error);
    }
  };
};

export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        logger.warn('Params validation error', { errors: errorMessages, params: req.params });

        const response: ApiResponse = {
          success: false,
          error: 'Paramètres d\'URL invalides',
          data: errorMessages,
        };

        return res.status(400).json(response);
      }

      logger.error('Unexpected params validation error', error);
      next(error);
    }
  };
};