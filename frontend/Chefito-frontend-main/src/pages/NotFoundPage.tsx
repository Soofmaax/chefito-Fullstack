import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Search, ChefHat, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../hooks/useLanguage';
import { t } from '../lib/utils/i18n';
import { Button } from '../components/ui';

const NotFoundPage: React.FC = () => {
  const { currentLanguage } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('page.404.title', currentLanguage)} - Chefito</title>
        <meta name="description" content={t('page.404.description', currentLanguage)} />
        <meta property="og:title" content={`${t('page.404.title', currentLanguage)} - Chefito`} />
        <meta property="og:description" content={t('page.404.description', currentLanguage)} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-primary-50 to-secondary-50 dark:from-background-dark dark:via-primary-900/20 dark:to-secondary-900/20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* 404 Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="relative">
              {/* Large 404 */}
              <div className="text-8xl md:text-9xl font-display font-bold text-primary-200 dark:text-primary-800 select-none">
                404
              </div>
              
              {/* Chef Hat Icon */}
              <motion.div
                initial={{ rotate: -10, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5, type: 'spring', stiffness: 200 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center shadow-large">
                  <ChefHat className="w-10 h-10 text-white" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-4">
              {t('page.404.title', currentLanguage)}
            </h1>
            <p className="text-xl text-text-secondary dark:text-text-dark-secondary mb-2">
              {t('page.404.subtitle', currentLanguage)}
            </p>
            <p className="text-text-secondary dark:text-text-dark-secondary">
              {t('page.404.description', currentLanguage)}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              as={Link}
              to="/"
              size="lg"
              icon={<Home className="w-5 h-5" />}
              className="min-w-[200px]"
            >
              {t('page.404.go_home', currentLanguage)}
            </Button>

            <Button
              as={Link}
              to="/recipes"
              variant="outline"
              size="lg"
              icon={<Search className="w-5 h-5" />}
              className="min-w-[200px]"
            >
              {t('page.404.browse_recipes', currentLanguage)}
            </Button>
          </motion.div>

          {/* Popular Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="border-t border-neutral-200 dark:border-neutral-700 pt-8"
          >
            <p className="text-sm text-text-secondary dark:text-text-dark-secondary mb-4">
              {t('page.404.popular_pages', currentLanguage)}:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { to: '/recipes', label: t('nav.recipes', currentLanguage) },
                { to: '/search', label: t('nav.search', currentLanguage) },
                { to: '/submit', label: t('nav.submit', currentLanguage) },
                { to: '/premium', label: t('nav.premium', currentLanguage) },
                { to: '/about', label: t('nav.about', currentLanguage) },
                { to: '/contact', label: t('nav.contact', currentLanguage) },
              ].map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                >
                  <Link
                    to={link.to}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-text-primary dark:text-text-dark-primary hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Fun Fact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-12 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-2xl border border-primary-200 dark:border-primary-800"
          >
            <p className="text-sm text-primary-700 dark:text-primary-300">
              <strong>{t('page.404.fun_fact', currentLanguage)}:</strong> {t('page.404.fun_fact_text', currentLanguage)}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFoundPage;