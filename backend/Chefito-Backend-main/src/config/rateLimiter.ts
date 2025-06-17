import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { ApiResponse } from '../types/api';

// Rate limiter général
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes par IP
  message: {
    success: false,
    error: 'Trop de requêtes, veuillez réessayer plus tard.',
  } as ApiResponse,
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter pour l'authentification
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 tentatives de connexion par IP
  message: {
    success: false,
    error: 'Trop de tentatives de connexion, veuillez réessayer plus tard.',
  } as ApiResponse,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

// Rate limiter pour les commentaires
export const commentLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // 10 commentaires par IP
  message: {
    success: false,
    error: 'Trop de commentaires postés, veuillez réessayer plus tard.',
  } as ApiResponse,
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter pour les vues de recettes
export const viewLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // 30 vues par minute par IP
  message: {
    success: false,
    error: 'Trop de vues enregistrées, veuillez ralentir.',
  } as ApiResponse,
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for login
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    error: 'Trop de tentatives de connexion, veuillez réessayer plus tard.',
  } as ApiResponse,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

// Rate limiter for recipe submission
export const submitRecipeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    error: 'Trop de soumissions, veuillez réessayer plus tard.',
  } as ApiResponse,
  standardHeaders: true,
  legacyHeaders: false,
});