import { z } from 'zod';

// Schema pour les commentaires
export const commentSchema = z.object({
  content: z.string()
    .min(1, 'Le contenu du commentaire est requis')
    .max(1000, 'Le commentaire ne peut pas dépasser 1000 caractères')
    .trim(),
});

// Schema pour la mise à jour du profil
export const profileUpdateSchema = z.object({
  full_name: z.string()
    .min(1, 'Le nom complet est requis')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .trim()
    .optional(),
  avatar_url: z.string()
    .url('URL d\'avatar invalide')
    .optional(),
  preferences: z.record(z.any()).optional(),
  premium: z.boolean().optional(),
  premium_until: z.string()
    .datetime('Date invalide')
    .optional(),
});

// Schema pour l'enregistrement des vues
export const recipeViewSchema = z.object({
  recipeId: z.string()
    .min(1, 'ID de recette requis')
    .max(100, 'ID de recette trop long'),
});

// Schema pour les paramètres de pagination
export const paginationSchema = z.object({
  page: z.string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, 'La page doit être supérieure à 0')
    .default('1'),
  limit: z.string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0 && val <= 100, 'La limite doit être entre 1 et 100')
    .default('20'),
});

// Schema pour les filtres de recettes
export const recipeFiltersSchema = z.object({
  cuisine: z.string().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  maxCookingTime: z.string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, 'Le temps de cuisson doit être positif')
    .optional(),
  tags: z.string()
    .transform((val) => val.split(',').map(tag => tag.trim()))
    .optional(),
});

// Types dérivés des schemas
export type CommentInput = z.infer<typeof commentSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
export type RecipeViewInput = z.infer<typeof recipeViewSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type RecipeFiltersInput = z.infer<typeof recipeFiltersSchema>;