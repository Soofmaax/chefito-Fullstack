import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Recipe, Category } from '../types';

// Query keys for React Query
export const recipeKeys = {
  all: ['recipes'] as const,
  lists: () => [...recipeKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...recipeKeys.lists(), filters] as const,
  details: () => [...recipeKeys.all, 'detail'] as const,
  detail: (id: string) => [...recipeKeys.details(), id] as const,
  categories: ['categories'] as const,
  featured: ['recipes', 'featured'] as const,
};

/**
 * Hook for fetching recipes with React Query
 */
export const useRecipes = (filters?: {
  category?: string;
  difficulty?: string;
  search?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}) => {
  return useQuery({
    queryKey: recipeKeys.list(filters || {}),
    queryFn: async () => {
      let query = supabase
        .from('recipes_with_categories')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (filters?.category) {
        query = query.eq('category_slug', filters.category);
      }

      if (filters?.difficulty) {
        query = query.eq('difficulty', filters.difficulty);
      }

      if (filters?.search) {
        query = query.or(`title->>fr.ilike.%${filters.search}%,title->>en.ilike.%${filters.search}%`);
      }

      if (filters?.featured) {
        query = query.eq('featured', true);
      }

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Recipe[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook for fetching a single recipe
 */
export const useRecipe = (categorySlug: string, recipeSlug: string) => {
  return useQuery({
    queryKey: recipeKeys.detail(`${categorySlug}/${recipeSlug}`),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recipes_with_categories')
        .select('*')
        .eq('category_slug', categorySlug)
        .eq('slug', recipeSlug)
        .eq('approved', true)
        .single();

      if (error) throw error;
      return data as Recipe;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!(categorySlug && recipeSlug),
  });
};

/**
 * Hook for fetching categories
 */
export const useCategories = () => {
  return useQuery({
    queryKey: recipeKeys.categories,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name->fr', { ascending: true });

      if (error) throw error;
      return data as Category[];
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

/**
 * Hook for fetching featured recipes
 */
export const useFeaturedRecipes = (limit = 6) => {
  return useQuery({
    queryKey: [...recipeKeys.featured, limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recipes_with_categories')
        .select('*')
        .eq('approved', true)
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as Recipe[];
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

/**
 * Hook for recipe search with debouncing
 */
export const useRecipeSearch = (searchTerm: string, enabled = true) => {
  return useQuery({
    queryKey: ['recipes', 'search', searchTerm],
    queryFn: async () => {
      if (!searchTerm.trim()) return [];

      const { data, error } = await supabase
        .from('recipes_with_categories')
        .select('*')
        .eq('approved', true)
        .or(`title->>fr.ilike.%${searchTerm}%,title->>en.ilike.%${searchTerm}%,description->>fr.ilike.%${searchTerm}%,description->>en.ilike.%${searchTerm}%`)
        .order('views', { ascending: false })
        .limit(20);

      if (error) throw error;
      return data as Recipe[];
    },
    enabled: enabled && searchTerm.length >= 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook for incrementing recipe views
 */
export const useIncrementRecipeViews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recipeId: string) => {
      const { error } = await supabase.rpc('increment_recipe_views', {
        recipe_id: recipeId,
      });

      if (error) throw error;
    },
    onSuccess: (_, recipeId) => {
      // Invalidate and refetch recipe data
      queryClient.invalidateQueries({ queryKey: recipeKeys.details() });
    },
  });
};

/**
 * Hook for prefetching recipes
 */
export const usePrefetchRecipe = () => {
  const queryClient = useQueryClient();

  return (categorySlug: string, recipeSlug: string) => {
    queryClient.prefetchQuery({
      queryKey: recipeKeys.detail(`${categorySlug}/${recipeSlug}`),
      queryFn: async () => {
        const { data, error } = await supabase
          .from('recipes_with_categories')
          .select('*')
          .eq('category_slug', categorySlug)
          .eq('slug', recipeSlug)
          .eq('approved', true)
          .single();

        if (error) throw error;
        return data as Recipe;
      },
      staleTime: 10 * 60 * 1000,
    });
  };
};