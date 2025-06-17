import { Router } from 'express';
import { recipeController } from '../controllers/recipeController';
import { authenticateToken, optionalAuth } from '../middleware/auth';
import { validateBody, validateQuery } from '../middleware/validation';
import { recipeViewSchema, paginationSchema, recipeFiltersSchema } from '../schemas/validation';
import { viewLimiter } from '../config/rateLimiter';

const router = Router();

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Récupérer la liste des recettes
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Numéro de page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Nombre d'éléments par page
 *       - in: query
 *         name: cuisine
 *         schema:
 *           type: string
 *         description: Filtrer par cuisine
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [easy, medium, hard]
 *         description: Filtrer par difficulté
 *     responses:
 *       200:
 *         description: Liste des recettes récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Recipe'
 */
router.get('/', 
  validateQuery(paginationSchema.merge(recipeFiltersSchema)), 
  recipeController.getRecipes
);

/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     summary: Récupérer une recette par ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la recette
 *     responses:
 *       200:
 *         description: Recette récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Recette non trouvée
 */
router.get('/:id', recipeController.getRecipeById);

/**
 * @swagger
 * /api/recipes/{id}/variants:
 *   get:
 *     summary: Récupérer les variantes d'une recette
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la recette
 *     responses:
 *       200:
 *         description: Variantes récupérées avec succès
 */
router.get('/:id/variants', recipeController.getRecipeVariants);

/**
 * @swagger
 * /api/recipes/view:
 *   post:
 *     summary: Enregistrer une vue de recette
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipeId:
 *                 type: string
 *                 description: ID de la recette vue
 *             required:
 *               - recipeId
 *     responses:
 *       200:
 *         description: Vue enregistrée avec succès
 *       400:
 *         description: Données invalides
 *       429:
 *         description: Trop de requêtes
 */
router.post('/view', 
  viewLimiter,
  validateBody(recipeViewSchema),
  optionalAuth, 
  recipeController.recordRecipeView
);

export default router;