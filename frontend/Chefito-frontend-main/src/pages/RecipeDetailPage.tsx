import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, Users, Star, ChefHat, Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRecipe, useIncrementRecipeViews } from '../hooks/useRecipes';
import { useLanguage } from '../hooks/useLanguage';
import { getLocalizedText, t } from '../lib/utils/i18n';
import { formatTime } from '../lib/utils';
import { LazyImage } from '../components/ui/LazyImage';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent } from '../components/ui/Card';
import { Loader } from '../components/ui/Loader';
import { trackRecipeInteraction } from '../lib/utils/analytics';

const RecipeDetailPage: React.FC = () => {
  const { categorySlug, recipeSlug } = useParams<{
    categorySlug: string;
    recipeSlug: string;
  }>();
  const { currentLanguage } = useLanguage();
  
  const { data: recipe, isLoading, error } = useRecipe(categorySlug!, recipeSlug!);
  const incrementViews = useIncrementRecipeViews();

  // Incrémenter les vues quand la recette est chargée
  useEffect(() => {
    if (recipe) {
      incrementViews.mutate(recipe.id);
      trackRecipeInteraction('view_detail', recipe.id, {
        recipe_title: getLocalizedText(recipe.title, currentLanguage),
        category: categorySlug || 'unknown',
        difficulty: recipe.difficulty.toLowerCase(),
      });
    }
  }, [recipe, incrementViews, categorySlug, currentLanguage]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader variant="spinner" size="lg" text="Chargement de la recette..." />
      </div>
    );
  }

  if (error || !recipe) {
    return <Navigate to="/404" replace />;
  }

  const title = getLocalizedText(recipe.title, currentLanguage);
  const description = getLocalizedText(recipe.description, currentLanguage);
  const categoryName = getLocalizedText(recipe.categoryName || {}, currentLanguage);

  // Schema.org JSON-LD pour le SEO
  const recipeSchema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": title,
    "description": description,
    "image": recipe.imageUrl,
    "author": {
      "@type": "Organization",
      "name": "Chefito"
    },
    "datePublished": recipe.createdAt,
    "prepTime": `PT${recipe.cookingTime}M`,
    "cookTime": `PT${recipe.cookingTime}M`,
    "totalTime": `PT${recipe.cookingTime}M`,
    "recipeYield": recipe.servings,
    "recipeCategory": categoryName,
    "recipeCuisine": "International",
    "nutrition": {
      "@type": "NutritionInformation"
    },
    "recipeIngredient": recipe.ingredients.map(ing => `${ing.amount} ${ing.unit} ${ing.name}`),
    "recipeInstructions": recipe.instructions.map((instruction, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "text": instruction.description
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": recipe.ratingsAvg,
      "ratingCount": recipe.ratingsCount
    }
  };

  return (
    <>
      <Helmet>
        <title>{title} - Recette {categoryName} | Chefito</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${title} - Recette ${categoryName}`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={recipe.imageUrl} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://chefito.app/recipes/${categorySlug}/${recipeSlug}`} />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(recipeSchema)}
        </script>
      </Helmet>

      <article className="min-h-screen bg-background dark:bg-background-dark">
        {/* Hero Section */}
        <section className="relative h-96 md:h-[500px] overflow-hidden">
          <LazyImage
            src={recipe.imageUrl || 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1200'}
            alt={`Photo de la recette ${title}`}
            className="w-full h-full object-cover"
            containerClassName="w-full h-full"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap items-center gap-3 mb-4"
              >
                <Badge variant="primary" className="bg-primary-500 text-white">
                  {categoryName}
                </Badge>
                <Badge 
                  variant={recipe.difficulty === 'Easy' ? 'success' : recipe.difficulty === 'Medium' ? 'warning' : 'error'}
                  className="text-white"
                >
                  {t(`recipe.difficulty.${recipe.difficulty.toLowerCase()}`, currentLanguage)}
                </Badge>
                {recipe.featured && (
                  <Badge variant="secondary" className="bg-secondary-500 text-white">
                    {t('recipe.featured', currentLanguage)}
                  </Badge>
                )}
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-5xl font-display font-bold mb-4"
              >
                {title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl"
              >
                {description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center gap-6 text-white/90"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{formatTime(recipe.cookingTime)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{recipe.servings} portions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-warning-400" />
                  <span>{recipe.ratingsAvg.toFixed(1)} ({recipe.ratingsCount} avis)</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Ingredients */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-1"
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-display font-semibold text-text-primary dark:text-text-dark-primary mb-6 flex items-center gap-2">
                      <ChefHat className="w-6 h-6 text-primary-500" />
                      {t('recipe.ingredients', currentLanguage)}
                    </h2>
                    
                    <ul className="space-y-3" role="list">
                      {recipe.ingredients.map((ingredient, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                          className="flex items-start gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                        >
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                          <div className="flex-1">
                            <span className="font-medium text-text-primary dark:text-text-dark-primary">
                              {ingredient.amount} {ingredient.unit} {ingredient.name}
                            </span>
                            {ingredient.notes && (
                              <p className="text-sm text-text-secondary dark:text-text-dark-secondary mt-1">
                                {ingredient.notes}
                              </p>
                            )}
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Instructions */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="lg:col-span-2"
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-display font-semibold text-text-primary dark:text-text-dark-primary flex items-center gap-2">
                        <Play className="w-6 h-6 text-primary-500" />
                        {t('recipe.instructions', currentLanguage)}
                      </h2>
                      
                      <Button
                        variant="primary"
                        icon={<Play className="w-4 h-4" />}
                        onClick={() => trackRecipeInteraction('start_cooking', recipe.id)}
                      >
                        {t('recipe.startCooking', currentLanguage)}
                      </Button>
                    </div>
                    
                    <div className="space-y-6">
                      {recipe.instructions.map((instruction, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                          className="flex gap-4 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-semibold">
                            {instruction.step}
                          </div>
                          
                          <div className="flex-1">
                            <p className="text-text-primary dark:text-text-dark-primary leading-relaxed">
                              {instruction.description}
                            </p>
                            
                            {instruction.timers && instruction.timers.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {instruction.timers.map((timer, timerIndex) => (
                                  <Badge
                                    key={timerIndex}
                                    variant="outline"
                                    className="flex items-center gap-1"
                                  >
                                    <Clock className="w-3 h-3" />
                                    {timer.duration} min - {timer.label}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            
                            {instruction.tips && instruction.tips.length > 0 && (
                              <div className="mt-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                                <p className="text-sm text-primary-700 dark:text-primary-300 font-medium mb-1">
                                  💡 Conseil :
                                </p>
                                {instruction.tips.map((tip, tipIndex) => (
                                  <p key={tipIndex} className="text-sm text-primary-600 dark:text-primary-400">
                                    {tip}
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default RecipeDetailPage;