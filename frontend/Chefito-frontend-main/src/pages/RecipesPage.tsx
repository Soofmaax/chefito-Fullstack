import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, SlidersHorizontal, Grid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../hooks/useLanguage';
import { PageHeader } from '../components/common';
import { Input, Button, Card } from '../components/ui';
import RecipeCard from '../components/ui/RecipeCard';
import { Loader } from '../components/ui/Loader';
import { useRecipes } from '../hooks/useRecipes';
import type { Recipe, Category } from '../types';

const RecipesPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const { 
    data: recipes = [], 
    isLoading: recipesLoading, 
    error: recipesError 
  } = useRecipes({
    search: searchQuery,
    category: selectedCategory,
    difficulty: selectedDifficulty,
  });

  const { 
    data: categories = [], 
    isLoading: categoriesLoading 
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      // This would be replaced with actual API call
      return [] as Category[];
    },
  });

  const filteredRecipes = recipes.filter((recipe: Recipe) => {
    const matchesSearch = !searchQuery || 
      recipe.title?.fr?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.title?.en?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description?.fr?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description?.en?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || recipe.categoryId === selectedCategory;
    const matchesDifficulty = !selectedDifficulty || recipe.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedDifficulty('');
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedDifficulty;

  return (
    <>
      <Helmet>
        <title>{t('recipes.page_title')} - Chefito</title>
        <meta name="description" content={t('recipes.page_description')} />
      </Helmet>

      <div className="min-h-screen bg-background dark:bg-background-dark">
        <PageHeader 
          titleKey="recipes.title"
          subtitleKey="recipes.subtitle"
          className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder={t('recipes.search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="w-5 h-5" />}
                  className="w-full"
                />
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                icon={<SlidersHorizontal className="w-5 h-5" />}
                className="lg:hidden"
              >
                {t('recipes.filters')}
              </Button>

              {/* View Mode Toggle */}
              <div className="flex rounded-xl border border-neutral-200 dark:border-neutral-700 p-1">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  icon={<Grid className="w-4 h-4" />}
                  className="rounded-lg"
                >
                  {t('recipes.grid_view')}
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  icon={<List className="w-4 h-4" />}
                  className="rounded-lg"
                >
                  {t('recipes.list_view')}
                </Button>
              </div>
            </div>

            {/* Filters Panel */}
            <AnimatePresence>
              {(showFilters || window.innerWidth >= 1024) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <Card className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Category Filter */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2">
                          {t('recipes.category')}
                        </label>
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-3 text-neutral-900 dark:text-neutral-100"
                        >
                          <option value="">{t('recipes.all_categories')}</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name?.fr || category.name?.en || 'Unknown'}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Difficulty Filter */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2">
                          {t('recipes.difficulty')}
                        </label>
                        <select
                          value={selectedDifficulty}
                          onChange={(e) => setSelectedDifficulty(e.target.value)}
                          className="w-full rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-3 text-neutral-900 dark:text-neutral-100"
                        >
                          <option value="">{t('recipes.all_difficulties')}</option>
                          <option value="Easy">{t('recipes.difficulty_easy')}</option>
                          <option value="Medium">{t('recipes.difficulty_medium')}</option>
                          <option value="Hard">{t('recipes.difficulty_hard')}</option>
                        </select>
                      </div>

                      {/* Clear Filters */}
                      <div className="flex items-end">
                        {hasActiveFilters && (
                          <Button
                            variant="outline"
                            onClick={clearFilters}
                            className="w-full"
                          >
                            {t('recipes.clear_filters')}
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-semibold text-text-primary dark:text-text-dark-primary">
                {filteredRecipes.length > 0 
                  ? t('recipes.results_count', { count: filteredRecipes.length })
                  : t('recipes.no_results')
                }
              </h2>
            </div>

            {/* Loading State */}
            {recipesLoading && (
              <div className="flex justify-center py-12">
                <Loader variant="spinner" size="lg" text={t('recipes.loading')} />
              </div>
            )}

            {/* Error State */}
            {recipesError && (
              <div className="text-center py-12">
                <p className="text-error-600 dark:text-error-400 mb-4">
                  {t('recipes.error_loading')}
                </p>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  {t('recipes.retry')}
                </Button>
              </div>
            )}

            {/* Recipes Grid/List */}
            {!recipesLoading && !recipesError && (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : 'space-y-6'
              }>
                <AnimatePresence>
                  {filteredRecipes.map((recipe, index) => (
                    <motion.div
                      key={recipe.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <RecipeCard
                        recipe={recipe}
                        featured={recipe.featured}
                        showCollaborate={true}
                        className={viewMode === 'list' ? 'flex flex-row' : ''}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Empty State */}
            {!recipesLoading && !recipesError && filteredRecipes.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-neutral-400" />
                </div>
                <h3 className="text-xl font-display font-semibold text-text-primary dark:text-text-dark-primary mb-4">
                  {t('recipes.no_recipes_found')}
                </h3>
                <p className="text-text-secondary dark:text-text-dark-secondary mb-6 max-w-md mx-auto">
                  {t('recipes.no_recipes_description')}
                </p>
                {hasActiveFilters && (
                  <Button
                    variant="primary"
                    onClick={clearFilters}
                  >
                    {t('recipes.clear_filters')}
                  </Button>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default RecipesPage;