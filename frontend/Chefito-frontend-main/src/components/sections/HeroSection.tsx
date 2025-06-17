import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ChefHat, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { LazyImage } from '../ui/LazyImage';
import { useLanguage } from '../../hooks/useLanguage';
import { trackCTAClick } from '../../lib/utils/analytics';

/**
 * Hero section with Lingo.dev translations
 */
export const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  const handleCTAClick = (ctaType: string) => {
    trackCTAClick(ctaType, 'hero_section');
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary-50 to-secondary-50 dark:from-background-dark dark:via-primary-900/20 dark:to-secondary-900/20"
      aria-labelledby="hero-title"
    >
      {/* Enhanced Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-300 to-warning-300 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ opacity: 0.12, scale: 1, rotate: 0 }}
          transition={{ duration: 3, delay: 0.5, ease: 'easeOut' }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-secondary-300 to-success-300 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 4, delay: 1, ease: 'easeOut' }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary-200/30 to-transparent rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Enhanced Badge animé */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-primary-200 dark:border-primary-700 shadow-lg"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            aria-hidden="true"
          >
            <Sparkles className="w-5 h-5 text-primary-600" />
          </motion.div>
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-300 tracking-wide">
            ✨ {t('home.hero.badge')}
          </span>
        </motion.div>

        {/* Enhanced Titre principal */}
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-6 leading-tight"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-block"
          >
            {t('home.hero.title')}
          </motion.span>
        </motion.h1>

        {/* Enhanced Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="text-xl md:text-2xl text-text-secondary dark:text-text-dark-secondary mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          {t('home.hero.subtitle')}
        </motion.p>

        {/* Enhanced Boutons CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              as={Link}
              to="/recipes"
              variant="primary"
              size="lg"
              icon={<ChefHat className="w-5 h-5" />}
              className="min-w-[220px] shadow-xl hover:shadow-2xl transition-all duration-300"
              onClick={() => handleCTAClick('explore_recipes')}
              aria-describedby="cta-primary-description"
            >
              {t('home.hero.cta.primary')}
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                aria-hidden="true"
              >
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.div>
            </Button>
            <span id="cta-primary-description" className="sr-only">
              {t('home.hero.cta.primary_description')}
            </span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              as={Link}
              to="/about"
              variant="outline"
              size="lg"
              icon={<Play className="w-5 h-5" />}
              className="min-w-[220px] backdrop-blur-sm bg-white/10 hover:bg-white/20 border-2"
              onClick={() => handleCTAClick('watch_demo')}
              aria-describedby="cta-secondary-description"
            >
              {t('home.hero.cta.secondary')}
            </Button>
            <span id="cta-secondary-description" className="sr-only">
              {t('home.hero.cta.secondary_description')}
            </span>
          </motion.div>
        </motion.div>

        {/* Enhanced Image/Illustration héro */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: 'easeOut' }}
          className="relative max-w-5xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.02, rotateY: 5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-neutral-800 p-8 backdrop-blur-sm"
          >
            <LazyImage
              src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt={t('home.hero.image_alt')}
              className="w-full h-auto rounded-2xl"
              containerClassName="rounded-2xl"
            />
            
            {/* Enhanced Overlay avec éléments UI simulés */}
            <div className="absolute inset-8 rounded-2xl bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="text-white p-6"
                role="group"
                aria-label={t('home.hero.ai_interaction_aria_label')}
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 bg-success-400 rounded-full shadow-lg"
                  />
                  <span className="text-sm font-medium">{t('home.hero.ai_status')}</span>
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 0.8 }}
                  className="text-lg font-medium"
                >
                  "{t('home.hero.ai_quote')}"
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Éléments flottants */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 1.4, ease: 'easeOut' }}
            whileHover={{ scale: 1.1, rotate: 2 }}
            className="absolute -left-6 top-1/4 bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-xl border border-neutral-200 dark:border-neutral-700 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="w-10 h-10 bg-gradient-to-r from-success-400 to-success-600 rounded-full flex items-center justify-center shadow-lg"
                aria-hidden="true"
              >
                <ChefHat className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <motion.p
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-lg font-bold text-text-primary dark:text-text-dark-primary"
                >
                  2,847
                </motion.p>
                <p className="text-sm text-text-secondary dark:text-text-dark-secondary">{t('home.hero.recipes_count_label')}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 1.6, ease: 'easeOut' }}
            whileHover={{ scale: 1.1, rotate: -2 }}
            className="absolute -right-6 bottom-1/4 bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-xl border border-neutral-200 dark:border-neutral-700 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-10 h-10 bg-gradient-to-r from-warning-400 to-warning-600 rounded-full flex items-center justify-center shadow-lg"
                aria-hidden="true"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <motion.p
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="text-lg font-bold text-text-primary dark:text-text-dark-primary"
                >
                  4.9/5
                </motion.p>
                <p className="text-sm text-text-secondary dark:text-text-dark-secondary">{t('home.hero.rating_label')}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        role="button"
        aria-label={t('home.hero.scroll_down_aria_label')}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }
        }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-text-secondary/60 dark:border-text-dark-secondary/60 rounded-full flex justify-center backdrop-blur-sm cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
