import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Chefito API',
      version: '1.0.0',
      description: 'API backend pour l\'assistant culinaire Chefito',
      contact: {
        name: 'Équipe Chefito',
        email: 'contact@chefito.com',
      },
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://api.chefito.com' 
          : `http://localhost:${process.env.PORT || 3001}`,
        description: process.env.NODE_ENV === 'production' ? 'Production' : 'Development',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Indique si la requête a réussi',
            },
            data: {
              description: 'Données de la réponse',
            },
            error: {
              type: 'string',
              description: 'Message d\'erreur si applicable',
            },
            message: {
              type: 'string',
              description: 'Message informatif',
            },
          },
          required: ['success'],
        },
        Recipe: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            cuisine: { type: 'string' },
            difficulty: { 
              type: 'string',
              enum: ['easy', 'medium', 'hard']
            },
            cookingTime: { type: 'integer' },
            servings: { type: 'integer' },
            ingredients: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  amount: { type: 'number' },
                  unit: { type: 'string' },
                  optional: { type: 'boolean' }
                }
              }
            },
            instructions: {
              type: 'array',
              items: { type: 'string' }
            },
            tags: {
              type: 'array',
              items: { type: 'string' }
            },
            imageUrl: { type: 'string' },
            rating: { type: 'number' },
            reviewCount: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Comment: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            content: { type: 'string' },
            user_id: { type: 'string' },
            recipe_id: { type: 'string' },
            approved: { type: 'boolean' },
            created_at: { type: 'string', format: 'date-time' }
          }
        },
        UserProfile: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            full_name: { type: 'string' },
            avatar_url: { type: 'string' },
            preferences: { type: 'object' },
            premium: { type: 'boolean' },
            premium_until: { type: 'string', format: 'date-time' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        }
      },
    },
    tags: [
      {
        name: 'Health',
        description: 'Endpoints de santé de l\'API',
      },
      {
        name: 'Recipes',
        description: 'Gestion des recettes',
      },
      {
        name: 'Comments',
        description: 'Gestion des commentaires',
      },
      {
        name: 'User',
        description: 'Gestion des utilisateurs et profils',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Chemins vers les fichiers contenant les annotations
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Chefito API Documentation',
  }));

  // Endpoint pour récupérer le JSON de la spec
  app.get('/api/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
};