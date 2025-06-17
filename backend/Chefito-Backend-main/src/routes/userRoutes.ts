import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';
import { validateBody } from '../middleware/validation';
import { profileUpdateSchema } from '../schemas/validation';

const router = Router();

// Toutes les routes utilisateur nécessitent une authentification
router.use(authenticateToken);

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Récupérer le profil utilisateur
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         user:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             email:
 *                               type: string
 *                         profile:
 *                           $ref: '#/components/schemas/UserProfile'
 *                         stats:
 *                           type: object
 *       401:
 *         description: Authentification requise
 */
router.get('/profile', userController.getProfile);

/**
 * @swagger
 * /api/user/profile:
 *   put:
 *     summary: Mettre à jour le profil utilisateur
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 maxLength: 100
 *               avatar_url:
 *                 type: string
 *                 format: uri
 *               preferences:
 *                 type: object
 *               premium:
 *                 type: boolean
 *               premium_until:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Profil mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Authentification requise
 */
router.put('/profile', 
  validateBody(profileUpdateSchema),
  userController.updateProfile
);

/**
 * @swagger
 * /api/user/stats:
 *   get:
 *     summary: Récupérer les statistiques utilisateur
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistiques récupérées avec succès
 *       401:
 *         description: Authentification requise
 */
router.get('/stats', userController.getUserStats);

export default router;