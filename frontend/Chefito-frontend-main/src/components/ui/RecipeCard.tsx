import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, UserPlus } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
import { formatTime } from '../../lib/utils';
import { useLanguage } from '../../hooks/useLanguage';
import type { Recipe } from '../../types';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { LazyImage } from './LazyImage';
import { trackCTAClick, trackRecipeInteraction } from '../../lib/utils/analytics';

interface RecipeCardProps {
  recipe: Recipe;
  featured?: boolean;
  className?: string;
  showCollaborate?: boolean;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  featured = false,
  className = '',
  showCollaborate = false,
  onSwipeLeft,
  onSwipeRight
}) => {
  const { currentLanguage, t, getLocalizedText } = useLanguage();
  
  const {
    id,
    slug,
    cookingTime,
    servings,
    difficulty,
    imageUrl,
    categorySlug,
    ratingsAvg,
  } = recipe;

  // Get localized content
  const title = getLocalizedText(recipe.title, currentLanguage);
  const description = getLocalizedText(recipe.description, currentLanguage);

  const handleRecipeClick = () => {
    trackRecipeInteraction('view', id, {
      recipe_title: title,
      category: categorySlug || 'unknown',
      difficulty: difficulty.toLowerCase(),
    });
  };

  const handleStartCollaboration = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    trackCTAClick('start_collaboration', 'recipe_card', {
      recipe_id: id,
      recipe_title: title,
    });
    
    // Generate a unique session ID
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Navigate to collaboration page
    window.location.href = `/collaborate/${sessionId}/${slug}`;
  };

  // Configure swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      onSwipeLeft?.();
      trackRecipeInteraction('swipe_left', id, { recipe_title: title });
    },
    onSwipedRight: () => {
      onSwipeRight?.();
      trackRecipeInteraction('swipe_right', id, { recipe_title: title });
    },
    trackMouse: false,
    trackTouch: true,
    delta: 50,
    preventScrollOnSwipe: false,
    rotationAngle: 0,
  });

  return (
    <motion.article
      {...swipeHandlers}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ 
        initial: { duration: 0.5, ease: 'easeOut' },
        hover: { duration: 0.25, ease: 'easeOut' }
      }}
      className={`group bg-surface dark:bg-surface-dark rounded-3xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-350 ease-warm touch-pan-y ${className}`}
      role="article"
      aria-labelledby={`recipe-title-${id}`}
    >
      <Link 
        to={`/recipes/${categorySlug}/${slug}`} 
        onClick={handleRecipeClick}
        className="block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-3xl"
        aria-describedby={`recipe-description-${id}`}
      >
        <div className="relative overflow-hidden">
          <LazyImage
            src={imageUrl || 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800'}
            alt={t('recipe.image_alt', { title })}
            className="w-full h-48 object-cover transition-transform duration-500 ease-warm group-hover:scale-110"
            containerClassName="h-48"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Swipe indicator (visible on mobile) */}
          <div className="absolute top-2 right-2 md:hidden">
            <div className="bg-black/20 backdrop-blur-sm rounded-full p-2">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" />
                <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
          
          {featured && (
            <motion.div 
              className="absolute top-3 left-3 bg-primary-700 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-soft"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              role="badge"
              aria-label={t('recipe.featured_aria_label')}
            >
              {t('recipe.featured')}
            </motion.div>
          )}
          
          <motion.div 
            className={`absolute bottom-0 left-0 right-0 p-3 ${featured ? 'bg-primary/90' : 'bg-secondary/90'} text-white backdrop-blur-sm`}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-sm font-medium" role="text">
              {t(`recipe.difficulty.${difficulty.toLowerCase()}`)}
            </span>
          </motion.div>
        </div>
        
        <div className="p-6">
          <motion.h3 
            id={`recipe-title-${id}`}
            className="text-lg font-display font-semibold text-text-primary dark:text-text-dark-primary mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            id={`recipe-description-${id}`}
            className="text-text-secondary dark:text-text-dark-secondary text-sm mb-4 line-clamp-2 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {description}
          </motion.p>
          
          <motion.div 
            className="flex items-center justify-between text-sm text-text-secondary dark:text-text-dark-secondary mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            role="group"
            aria-label={t('recipe.info_aria_label')}
          >
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Clock className="w-4 h-4 mr-1.5 text-primary-600" aria-hidden="true" />
              <span>{formatTime(cookingTime)}</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Users className="w-4 h-4 mr-1.5 text-primary-600" aria-hidden="true" />
              <span>{servings} {t(servings > 1 ? 'recipe.servings_plural' : 'recipe.servings_singular')}</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Star className="w-4 h-4 mr-1.5 text-warning" aria-hidden="true" />
              <span>{ratingsAvg.toFixed(1)}</span>
            </motion.div>
          </motion.div>
          
          {showCollaborate && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={handleStartCollaboration}
                icon={<UserPlus className="w-4 h-4" />}
                aria-label={t('recipe.collaborate_aria_label', { title })}
              >
                {t('recipe.collaborate')}
              </Button>
            </motion.div>
          )}
        </div>
      </Link>
    </motion.article>
  );
};

export default RecipeCard;