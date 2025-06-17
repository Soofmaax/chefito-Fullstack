import { Router } from 'express';
import { commentController } from '../controllers/commentController';
import { authenticateToken } from '../middleware/auth';
import { validateBody } from '../middleware/validation';
import { commentSchema } from '../schemas/validation';
import { commentLimiter } from '../config/rateLimiter';

const router = Router();

/**
 * @swagger
 * /api/comments/recipe/{recipeId}:
 *   get:
 *     summary: Récupérer les commentaires d'une recette
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la recette
 *     responses:
 *       200:
 *         description: Commentaires récupérés avec succès
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
 *                         $ref: '#/components/schemas/Comment'
 */
router.get('/recipe/:recipeId', commentController.getComments);

/**
 * @swagger
 * /api/comments/recipe/{recipeId}:
 *   post:
 *     summary: Créer un commentaire pour une recette
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la recette
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 maxLength: 1000
 *                 description: Contenu du commentaire
 *             required:
 *               - content
 *     responses:
 *       201:
 *         description: Commentaire créé avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Authentification requise
 *       429:
 *         description: Trop de commentaires postés
 */
router.post('/recipe/:recipeId', 
  commentLimiter,
  authenticateToken, 
  validateBody(commentSchema),
  commentController.createComment
);

/**
 * @swagger
 * /api/comments/{commentId}:
 *   put:
 *     summary: Modifier un commentaire
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du commentaire
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 maxLength: 1000
 *                 description: Nouveau contenu du commentaire
 *             required:
 *               - content
 *     responses:
 *       200:
 *         description: Commentaire modifié avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Authentification requise
 *       404:
 *         description: Commentaire non trouvé
 */
router.put('/:commentId', 
  authenticateToken, 
  validateBody(commentSchema),
  commentController.updateComment
);

export default router;