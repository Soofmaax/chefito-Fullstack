export interface Recipe {
  id: string;
  title: string;
  description: string;
  cuisine: string;
  difficulty: 'easy' | 'medium' | 'hard';
  cookingTime: number; // in minutes
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  nutritionInfo: NutritionInfo;
  tags: string[];
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  rating: number;
  reviewCount: number;
}

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  optional?: boolean;
}

export interface NutritionInfo {
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber: number; // grams
  sugar: number; // grams
}

export interface RecipeVariant {
  id: string;
  originalRecipeId: string;
  type: 'vegan' | 'gluten-free' | 'kids' | 'low-carb' | 'dairy-free';
  title: string;
  description: string;
  modifiedIngredients: Ingredient[];
  modifiedInstructions: string[];
  nutritionInfo: NutritionInfo;
}

export interface RecipeListItem {
  id: string;
  title: string;
  description: string;
  cuisine: string;
  difficulty: Recipe['difficulty'];
  cookingTime: number;
  servings: number;
  tags: string[];
  imageUrl?: string;
  rating: number;
  reviewCount: number;
}