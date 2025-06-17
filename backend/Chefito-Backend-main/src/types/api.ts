export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface RecipeViewRequest {
  recipeId: string;
}

export interface ProfileUpdateRequest {
  full_name?: string;
  avatar_url?: string;
  preferences?: Record<string, any>;
  premium?: boolean;
  premium_until?: string;
}