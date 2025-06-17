import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, Clock, Users, Star } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { t } from '../lib/utils/i18n';
import { PageHeader } from '../components/common';
import { Input, Button, Card, CardContent, Badge } from '../components/ui';
import RecipeCard from '../components/ui/RecipeCard';

const SearchPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const trendingSearches = [
    'pasta carbonara',
    'ratatouille',
    'chocolate cake',
    'sushi',
    'pizza margherita',
    'beef bourguignon',
  ];

  const recentSearches = [
    'tiramisu',
    'coq au vin',
    'pad thai',
  ];

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      setQuery(searchQuery);
      performSearch(searchQuery);
    }
  }, [searchParams]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock search results
      setResults([]);
      setIsSearching(false);
    }, 1000);
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setSearchParams({ q: searchQuery });
  };

  const handleTrendingClick = (trend: string) => {
    handleSearch(trend);
  };

  return (
    <>
      <Helmet>
        <title>{t('nav.search', currentLanguage)} - Chefito</title>
        <meta name="description" content={t('page.search.description', currentLanguage)} />
        <meta property="og:title" content={`${t('nav.search', currentLanguage)} - Chefito`} />
        <meta property="og:description" content={t('page.search.description', currentLanguage)} />
      </Helmet>

      <div className="min-h-screen bg-background dark:bg-background-dark">
        {/* Header */}
        <PageHeader 
          titleKey="nav.search"
          subtitleKey="page.search.subtitle"
          className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Card className="p-8">
              <div className="flex gap-4">
                <Input
                  placeholder={t('search.placeholder', currentLanguage)}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
                  leftIcon={<Search className="w-5 h-5" />}
                  className="flex-1"
                  size="lg"
                />
                <Button
                  onClick={() => handleSearch(query)}
                  loading={isSearching}
                  size="lg"
                  className="px-8"
                >
                  {t('search.search', currentLanguage)}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Search Results */}
          {query && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-display font-semibold text-text-primary dark:text-text-dark-primary mb-6">
                {t('search.results_for', currentLanguage)} "{query}"
              </h2>

              {isSearching ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <div className="h-48 bg-neutral-200 dark:bg-neutral-700 rounded-t-2xl"></div>
                      <CardContent className="p-6">
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
                        <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded mb-4"></div>
                        <div className="flex gap-4">
                          <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded flex-1"></div>
                          <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded flex-1"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((recipe, index) => (
                    <motion.div
                      key={recipe.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                    >
                      <RecipeCard recipe={recipe} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <Search className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-neutral-600 dark:text-neutral-400 mb-2">
                    {t('search.no_results', currentLanguage)}
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-500">
                    {t('search.try_different_terms', currentLanguage)}
                  </p>
                </Card>
              )}
            </motion.div>
          )}

          {/* Trending Searches */}
          {!query && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-display font-semibold text-text-primary dark:text-text-dark-primary">
                  {t('search.trending', currentLanguage)}
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {trendingSearches.map((trend, index) => (
                  <motion.button
                    key={trend}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    onClick={() => handleTrendingClick(trend)}
                    className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors duration-200"
                  >
                    {trend}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-secondary-600" />
                <h2 className="text-2xl font-display font-semibold text-text-primary dark:text-text-dark-primary">
                  {t('search.recent', currentLanguage)}
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {recentSearches.map((recent, index) => (
                  <motion.button
                    key={recent}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    onClick={() => handleTrendingClick(recent)}
                    className="px-4 py-2 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 rounded-full hover:bg-secondary-200 dark:hover:bg-secondary-900/50 transition-colors duration-200"
                  >
                    {recent}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;