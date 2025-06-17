import { supabaseAdmin } from '../config/supabase';
import { UserProfile, UserStats } from '../types/user';
import { ProfileUpdateRequest } from '../types/api';
import { createError } from '../middleware/errorHandler';

export class UserService {
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data;
    } catch {
      throw createError('Failed to fetch user profile', 500);
    }
  }

  async updateUserProfile(
    userId: string, 
    updates: ProfileUpdateRequest
  ): Promise<UserProfile> {
    try {
      const { data, error } = await supabaseAdmin
        .from('profiles')
        .upsert({
          id: userId,
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch {
      throw createError('Failed to update user profile', 500);
    }
  }

  async getUserStats(userId: string): Promise<UserStats | null> {
    try {
      const { data, error } = await supabaseAdmin
        .from('user_stats')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data;
    } catch {
      throw createError('Failed to fetch user stats', 500);
    }
  }

  async incrementRecipeView(userId: string, recipeId: string): Promise<void> {
    try {
      // First get current stats or create new entry
      const { data: existingStats } = await supabaseAdmin
        .from('user_stats')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (existingStats) {
        // Update existing stats
        const { error } = await supabaseAdmin
          .from('user_stats')
          .update({
            recipes_viewed: existingStats.recipes_viewed + 1,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId);

        if (error) throw error;
      } else {
        // Create new stats entry
        const { error } = await supabaseAdmin
          .from('user_stats')
          .insert({
            user_id: userId,
            recipes_viewed: 1,
            recipes_cooked: 0,
            favorite_recipes: [],
          });

        if (error) throw error;
      }
    } catch {
      throw createError('Failed to update recipe view count', 500);
    }
  }

  async addFavoriteRecipe(userId: string, recipeId: string): Promise<void> {
    try {
      const stats = await this.getUserStats(userId);
      const currentFavorites = stats?.favorite_recipes || [];

      if (!currentFavorites.includes(recipeId)) {
        currentFavorites.push(recipeId);

        const { error } = await supabaseAdmin
          .from('user_stats')
          .upsert({
            user_id: userId,
            favorite_recipes: currentFavorites,
            recipes_viewed: stats?.recipes_viewed || 0,
            recipes_cooked: stats?.recipes_cooked || 0,
            updated_at: new Date().toISOString(),
          });

        if (error) throw error;
      }
    } catch {
      throw createError('Failed to add favorite recipe', 500);
    }
  }
}

export const userService = new UserService();