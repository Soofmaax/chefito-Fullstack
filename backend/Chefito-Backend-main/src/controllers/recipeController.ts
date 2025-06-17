import { Request, Response, NextFunction } from 'express';
import { r2Service } from '../services/r2Service';
import { userService } from '../services/userService';
import { ApiResponse } from '../types/api';
import { RecipeViewRequest } from '../types/api';
import { AuthenticatedUser } from '../types/user';
import { logger } from '../config/logger';

interface AuthRequest extends Request {
  user?: AuthenticatedUser;
}

export class RecipeController {
  async getRecipes(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 20, cuisine, difficulty, maxCookingTime, tags } = req.query as any;
      
      logger.info('Fetching recipes', { 
        page, 
        limit, 
        filters: { cuisine, difficulty, maxCookingTime, tags } 
      });

      const recipes = await r2Service.listRecipes();
      
      // Apply filters
      let filteredRecipes = recipes;
      
      if (cuisine) {
        filteredRecipes = filteredRecipes.filter(recipe => 
          recipe.cuisine.toLowerCase().includes(cuisine.toLowerCase())
        );
      }
      
      if (difficulty) {
        filteredRecipes = filteredRecipes.filter(recipe => 
          recipe.difficulty === difficulty
        );
      }
      
      if (maxCookingTime) {
        filteredRecipes = filteredRecipes.filter(recipe => 
          recipe.cookingTime <= parseInt(maxCookingTime)
        );
      }
      
      if (tags && Array.isArray(tags)) {
        filteredRecipes = filteredRecipes.filter(recipe => 
          tags.some(tag => recipe.tags.includes(tag))
        );
      }

      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedRecipes = filteredRecipes.slice(startIndex, endIndex);

      logger.info('Recipes fetched successfully', { 
        total: recipes.length,
        filtered: filteredRecipes.length,
        returned: paginatedRecipes.length,
        page,
        limit
      });

      const response: ApiResponse = {
        success: true,
        data: paginatedRecipes,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getRecipeById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      logger.info('Fetching recipe by ID', { recipeId: id });
      
      const recipe = await r2Service.getRecipe(id);

      if (!recipe) {
        logger.warn('Recipe not found', { recipeId: id });
        const response: ApiResponse = {
          success: false,
          error: 'Recipe not found',
        };
        return res.status(404).json(response);
      }

      logger.info('Recipe fetched successfully', { recipeId: id });

      const response: ApiResponse = {
        success: true,
        data: recipe,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getRecipeVariants(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      logger.info('Fetching recipe variants', { recipeId: id });
      
      const variants = await r2Service.getRecipeVariants(id);

      logger.info('Recipe variants fetched successfully', { 
        recipeId: id,
        variantCount: variants.length 
      });

      const response: ApiResponse = {
        success: true,
        data: variants,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async recordRecipeView(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { recipeId }: RecipeViewRequest = req.body;
      
      logger.info('Recording recipe view', { 
        recipeId, 
        userId: req.user?.id || 'anonymous' 
      });

      // Verify recipe exists
      const recipe = await r2Service.getRecipe(recipeId);
      if (!recipe) {
        logger.warn('Recipe not found for view recording', { recipeId });
        const response: ApiResponse = {
          success: false,
          error: 'Recipe not found',
        };
        return res.status(404).json(response);
      }

      // Record view if user is authenticated
      if (req.user) {
        await userService.incrementRecipeView(req.user.id, recipeId);
        logger.info('Recipe view recorded for authenticated user', { 
          recipeId, 
          userId: req.user.id 
        });
      } else {
        logger.info('Recipe view recorded for anonymous user', { recipeId });
      }

      const response: ApiResponse = {
        success: true,
        message: 'Recipe view recorded successfully',
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

export const recipeController = new RecipeController();