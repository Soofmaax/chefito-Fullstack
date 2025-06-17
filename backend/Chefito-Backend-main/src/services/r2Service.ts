import { r2Config } from '../config/r2';
import { Recipe, RecipeListItem, RecipeVariant } from '../types/recipe';
import { createError } from '../middleware/errorHandler';

// Mock data for when R2 is not configured
const mockRecipes: Recipe[] = [
  {
    id: 'pizza-margherita',
    title: 'Pizza Margherita Classique',
    description: 'Une délicieuse pizza italienne traditionnelle avec mozzarella, tomates et basilic frais.',
    cuisine: 'Italian',
    difficulty: 'medium',
    cookingTime: 45,
    servings: 4,
    ingredients: [
      { name: 'Pâte à pizza', amount: 1, unit: 'pièce' },
      { name: 'Sauce tomate', amount: 200, unit: 'ml' },
      { name: 'Mozzarella', amount: 200, unit: 'g' },
      { name: 'Basilic frais', amount: 10, unit: 'feuilles' },
      { name: 'Huile d\'olive', amount: 2, unit: 'cuillères à soupe' }
    ],
    instructions: [
      'Préchauffer le four à 245°C',
      'Étaler la pâte à pizza sur une plaque',
      'Étaler la sauce tomate uniformément',
      'Ajouter la mozzarella en morceaux',
      'Cuire 12-15 minutes jusqu\'à ce que les bords soient dorés',
      'Garnir de basilic frais avant de servir'
    ],
    nutritionInfo: {
      calories: 280,
      protein: 12,
      carbs: 35,
      fat: 10,
      fiber: 2,
      sugar: 3
    },
    tags: ['vegetarian', 'italian', 'pizza', 'comfort-food'],
    imageUrl: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    author: 'Chef Mario',
    rating: 4.5,
    reviewCount: 120
  },
  {
    id: 'pasta-carbonara',
    title: 'Pâtes Carbonara',
    description: 'Un plat de pâtes italien crémeux avec des œufs, du parmesan et des lardons.',
    cuisine: 'Italian',
    difficulty: 'easy',
    cookingTime: 20,
    servings: 2,
    ingredients: [
      { name: 'Spaghetti', amount: 200, unit: 'g' },
      { name: 'Lardons', amount: 100, unit: 'g' },
      { name: 'Œufs', amount: 2, unit: 'pièces' },
      { name: 'Parmesan râpé', amount: 50, unit: 'g' },
      { name: 'Poivre noir', amount: 1, unit: 'pincée' }
    ],
    instructions: [
      'Faire cuire les spaghetti selon les instructions',
      'Faire revenir les lardons dans une poêle',
      'Battre les œufs avec le parmesan',
      'Mélanger les pâtes chaudes avec les lardons',
      'Ajouter le mélange œuf-parmesan hors du feu',
      'Servir immédiatement avec du poivre'
    ],
    nutritionInfo: {
      calories: 520,
      protein: 25,
      carbs: 45,
      fat: 28,
      fiber: 3,
      sugar: 2
    },
    tags: ['italian', 'pasta', 'quick', 'comfort-food'],
    imageUrl: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
    author: 'Chef Luigi',
    rating: 4.8,
    reviewCount: 89
  }
];

export class R2Service {
  private s3 = r2Config.client;
  private bucketName = r2Config.bucketName;
  private isConfigured = r2Config.isConfigured;

  async listRecipes(): Promise<RecipeListItem[]> {
    if (!this.isConfigured) {
      // Return mock data when R2 is not configured
      return mockRecipes.map(recipe => ({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        cuisine: recipe.cuisine,
        difficulty: recipe.difficulty,
        cookingTime: recipe.cookingTime,
        servings: recipe.servings,
        tags: recipe.tags,
        imageUrl: recipe.imageUrl,
        rating: recipe.rating,
        reviewCount: recipe.reviewCount,
      }));
    }

    try {
      const params = {
        Bucket: this.bucketName,
        Prefix: 'recipes/',
      };

      const data = await this.s3!.listObjectsV2(params).promise();
      
      if (!data.Contents) {
        return [];
      }

      const recipes: RecipeListItem[] = [];

      for (const object of data.Contents) {
        if (object.Key && object.Key.endsWith('.json')) {
          try {
            const recipe = await this.getRecipe(this.extractRecipeId(object.Key));
            if (recipe) {
              recipes.push({
                id: recipe.id,
                title: recipe.title,
                description: recipe.description,
                cuisine: recipe.cuisine,
                difficulty: recipe.difficulty,
                cookingTime: recipe.cookingTime,
                servings: recipe.servings,
                tags: recipe.tags,
                imageUrl: recipe.imageUrl,
                rating: recipe.rating,
                reviewCount: recipe.reviewCount,
              });
            }
          } catch (error) {
            console.warn(`Failed to process recipe ${object.Key}:`, error);
          }
        }
      }

      return recipes;
    } catch (error) {
      console.error('Error listing recipes from R2:', error);
      throw createError('Failed to fetch recipes', 500);
    }
  }

  async getRecipe(recipeId: string): Promise<Recipe | null> {
    if (!this.isConfigured) {
      // Return mock data when R2 is not configured
      return mockRecipes.find(recipe => recipe.id === recipeId) || null;
    }

    try {
      const params = {
        Bucket: this.bucketName,
        Key: `recipes/${recipeId}.json`,
      };

      const data = await this.s3!.getObject(params).promise();
      
      if (!data.Body) {
        return null;
      }

      const recipeData = JSON.parse(data.Body.toString());
      return recipeData as Recipe;
    } catch (error: any) {
      if (error.statusCode === 404) {
        return null;
      }
      console.error(`Error fetching recipe ${recipeId} from R2:`, error);
      throw createError('Failed to fetch recipe', 500);
    }
  }

  async getRecipeVariants(recipeId: string): Promise<RecipeVariant[]> {
    if (!this.isConfigured) {
      // Return mock variants when R2 is not configured
      return [
        {
          id: `${recipeId}-vegan`,
          originalRecipeId: recipeId,
          type: 'vegan',
          title: 'Version Végane',
          description: 'Version végane de cette recette',
          modifiedIngredients: [],
          modifiedInstructions: [],
          nutritionInfo: {
            calories: 250,
            protein: 8,
            carbs: 35,
            fat: 8,
            fiber: 4,
            sugar: 3
          }
        }
      ];
    }

    try {
      const params = {
        Bucket: this.bucketName,
        Prefix: `variants/${recipeId}/`,
      };

      const data = await this.s3!.listObjectsV2(params).promise();
      
      if (!data.Contents) {
        return [];
      }

      const variants: RecipeVariant[] = [];

      for (const object of data.Contents) {
        if (object.Key && object.Key.endsWith('.json')) {
          try {
            const variantParams = {
              Bucket: this.bucketName,
              Key: object.Key,
            };

            const variantData = await this.s3!.getObject(variantParams).promise();
            if (variantData.Body) {
              const variant = JSON.parse(variantData.Body.toString()) as RecipeVariant;
              variants.push(variant);
            }
          } catch (error) {
            console.warn(`Failed to process variant ${object.Key}:`, error);
          }
        }
      }

      return variants;
    } catch (error) {
      console.error(`Error fetching variants for recipe ${recipeId}:`, error);
      throw createError('Failed to fetch recipe variants', 500);
    }
  }

  async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    if (!this.isConfigured) {
      throw createError('R2 not configured', 500);
    }

    try {
      const params = {
        Bucket: this.bucketName,
        Key: key,
        Expires: expiresIn,
      };

      return this.s3!.getSignedUrl('getObject', params);
    } catch (error) {
      console.error(`Error generating signed URL for ${key}:`, error);
      throw createError('Failed to generate signed URL', 500);
    }
  }

  private extractRecipeId(key: string): string {
    const parts = key.split('/');
    const filename = parts[parts.length - 1];
    return filename.replace('.json', '');
  }
}

export const r2Service = new R2Service();