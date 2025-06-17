export type User = {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  premium: boolean;
  premiumUntil: string | null;
  recipesViewedThisWeek: number;
  admin: boolean;
  preferences: UserPreferences | null;
};

export type UserPreferences = {
  dietaryRestrictions?: string[];
  allergies?: string[];
  cookingLevel?: string;
  favoriteCategories?: string[];
  notificationPreferences?: {
    email: boolean;
    browser: boolean;
  };
  theme?: 'light' | 'dark' | 'system';
  language?: string;
};

export type Recipe = {
  id: string;
  title: Record<string, string>;
  slug: string;
  description: Record<string, string>;
  ingredients: Ingredient[];
  instructions: Instruction[];
  cookingTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  categoryId: string;
  categoryName?: Record<string, string>;
  categorySlug?: string;
  imageUrl: string | null;
  authorId: string | null;
  approved: boolean;
  featured: boolean;
  views: number;
  ratingsAvg: number;
  ratingsCount: number;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: Record<string, string>;
  slug: string;
  description: Record<string, string> | null;
  imageUrl: string | null;
};

export type Ingredient = {
  name: string;
  amount: string;
  unit: string;
  notes?: string;
  substitutes?: string[];
};

export type Instruction = {
  step: number;
  description: string;
  imageUrl?: string;
  timers?: {
    duration: number;
    label: string;
  }[];
  tips?: string[];
  dangerLevel?: 'safe' | 'caution' | 'danger';
};

export type Comment = {
  id: string;
  recipeId: string;
  userId: string;
  userName?: string;
  userAvatarUrl?: string;
  content: string;
  approved: boolean;
  createdAt: string;
};

export type RecipeView = {
  id: string;
  userId: string;
  recipeId: string;
  createdAt: string;
  weekNumber: number;
  year: number;
};

// Types utilitaires pour la gestion multilingue
export type LocalizedString = Record<string, string>;

export type SupportedLanguage = 'fr' | 'en' | 'es' | 'de' | 'it';

export type LanguageConfig = {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
};