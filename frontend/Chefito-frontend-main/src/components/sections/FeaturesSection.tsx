import React from 'react';
import { motion } from 'framer-motion';
import { Brain, BookOpen, Users, Mic, Timer, Star } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { Card, CardContent } from '../ui/Card';

/**
 * Features section with Lingo.dev translations
 */
export const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Brain,
      titleKey: 'home.features.ai.title',
      descriptionKey: 'home.features.ai.description',
      color: 'primary',
      delay: 0.1,
    },
    {
      icon: BookOpen,
      titleKey: 'home.features.recipes.title',
      descriptionKey: 'home.features.recipes.description',
      color: 'secondary',
      delay: 0.2,
    },
    {
      icon: Users,
      titleKey: 'home.features.collaboration.title',
      descriptionKey: 'home.features.collaboration.description',
      color: 'success',
      delay: 0.3,
    },
    {
      icon: Mic,
      titleKey: 'home.features.voice.title',
      descriptionKey: 'home.features.voice.description',
      color: 'warning',
      delay: 0.4,
    },
    {
      icon: Timer,
      titleKey: 'home.features.timer.title',
      descriptionKey: 'home.features.timer.description',
      color: 'error',
      delay: 0.5,
    },
    {
      icon: Star,
      titleKey: 'home.features.quality.title',
      descriptionKey: 'home.features.quality.description',
      color: 'primary',
      delay: 0.6,
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
      secondary: 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400',
      success: 'bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400',
      warning: 'bg-warning-100 dark:bg-warning-900/30 text-warning-600 dark:text-warning-400',
      error: 'bg-error-100 dark:bg-error-900/30 text-error-600 dark:text-error-400',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  return (
    <section className="py-24 bg-surface dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-6">
            {t('home.features.title')}
          </h2>
          <p className="text-xl text-text-secondary dark:text-text-dark-secondary max-w-3xl mx-auto leading-relaxed">
            {t('home.features.subtitle')}
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  duration: 0.6, 
                  delay: feature.delay,
                  ease: 'easeOut' 
                }}
              >
                <Card 
                  variant="default" 
                  padding="lg"
                  interactive
                  className="h-full hover:shadow-large transition-all duration-350"
                >
                  <CardContent className="text-center">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${getColorClasses(feature.color)}`}
                    >
                      <IconComponent className="w-8 h-8" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-display font-semibold text-text-primary dark:text-text-dark-primary mb-4">
                      {t(feature.titleKey)}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary dark:text-text-dark-secondary leading-relaxed">
                      {t(feature.descriptionKey)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Statistics section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '2,847', labelKey: 'home.features.stats.recipes' },
            { number: '15,000+', labelKey: 'home.features.stats.users' },
            { number: '4.9/5', labelKey: 'home.features.stats.satisfaction' },
            { number: '24/7', labelKey: 'home.features.stats.support' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: 0.6 + index * 0.1,
                ease: 'easeOut' 
              }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-primary-600 dark:text-primary-400 mb-2">
                {stat.number}
              </div>
              <div className="text-text-secondary dark:text-text-dark-secondary font-medium">
                {t(stat.labelKey)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
