import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '../lib/supabase';
import { getCurrentWeekNumber, getCurrentYear } from '../lib/utils';

interface FreemiumStatus {
  recipesViewedThisWeek: number;
  canViewRecipe: boolean;
  recipesRemaining: number;
  isPremium: boolean;
  weeklyLimit: number;
}

export const useFreemiumStatus = (): FreemiumStatus => {
  const { user } = useAuth();
  const [status, setStatus] = useState<FreemiumStatus>({
    recipesViewedThisWeek: 0,
    canViewRecipe: true,
    recipesRemaining: 2,
    isPremium: false,
    weeklyLimit: 2,
  });

  useEffect(() => {
    const fetchViewStatus = async () => {
      if (!user) {
        // Anonymous users get limited access
        setStatus({
          recipesViewedThisWeek: 0,
          canViewRecipe: true,
          recipesRemaining: 2,
          isPremium: false,
          weeklyLimit: 2,
        });
        return;
      }

      try {
        const currentWeek = getCurrentWeekNumber();
        const currentYear = getCurrentYear();

        // Check if user is premium
        const isPremium = user.premium && user.premiumUntil 
          ? new Date(user.premiumUntil) > new Date() 
          : false;

        // Get user's recipe views for current week
        const { data: views, error } = await supabase
          .from('recipe_views')
          .select('id')
          .eq('user_id', user.id)
          .eq('week_number', currentWeek)
          .eq('year', currentYear);

        if (error) {
          console.error('Error fetching recipe views:', error);
          return;
        }

        const recipesViewedThisWeek = views?.length || 0;
        const weeklyLimit = isPremium ? 50 : 2; // Premium users get 50 recipes per week
        const canViewRecipe = recipesViewedThisWeek < weeklyLimit;
        const recipesRemaining = Math.max(0, weeklyLimit - recipesViewedThisWeek);

        setStatus({
          recipesViewedThisWeek,
          canViewRecipe,
          recipesRemaining,
          isPremium,
          weeklyLimit,
        });
      } catch (error) {
        console.error('Error in fetchViewStatus:', error);
      }
    };

    fetchViewStatus();
  }, [user]);

  return status;
};

export const trackRecipeView = async (recipeId: string, userId?: string) => {
  if (!userId) return;

  try {
    const currentWeek = getCurrentWeekNumber();
    const currentYear = getCurrentYear();

    // Insert or update recipe view
    const { error } = await supabase
      .from('recipe_views')
      .upsert({
        user_id: userId,
        recipe_id: recipeId,
        week_number: currentWeek,
        year: currentYear,
      }, {
        onConflict: 'user_id,recipe_id,week_number,year'
      });

    if (error) {
      console.error('Error tracking recipe view:', error);
    }
  } catch (error) {
    console.error('Error in trackRecipeView:', error);
  }
};