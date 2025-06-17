import { Router } from 'express';
import recipeRoutes from './recipeRoutes';
import userRoutes from './userRoutes';
import commentRoutes from './commentRoutes';
import { ApiResponse } from '../types/api';

const router = Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Vérification de l'état de l'API
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API fonctionnelle
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
 *                         status:
 *                           type: string
 *                           example: OK
 *                         timestamp:
 *                           type: string
 *                           format: date-time
 *                         version:
 *                           type: string
 *                           example: 1.0.0
 *                         database:
 *                           type: string
 *                           example: Connected
 */
router.get('/health', (req, res) => {
  const response: ApiResponse = {
    success: true,
    data: {
      status: 'OK',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      database: 'Connected',
    },
  };
  res.json(response);
});

// Routes API
router.use('/recipes', recipeRoutes);
router.use('/user', userRoutes);
router.use('/comments', commentRoutes);

export default router;