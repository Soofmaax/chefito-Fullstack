import React from 'react';
import { motion } from 'framer-motion';
import { Star, Check, Crown, Zap, Users, Clock, ChefHat, Sparkles } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../hooks/useLanguage';
import { t } from '../lib/utils/i18n';
import { PageHeader } from '../components/common';
import { Button, Card, CardContent, Badge } from '../components/ui';

const PremiumPage: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const features = [
    {
      icon: Zap,
      title: t('premium.unlimited_recipes', currentLanguage),
      description: t('premium.unlimited_recipes_desc', currentLanguage),
    },
    {
      icon: Users,
      title: t('premium.collaboration', currentLanguage),
      description: t('premium.collaboration_desc', currentLanguage),
    },
    {
      icon: ChefHat,
      title: t('premium.ai_assistant', currentLanguage),
      description: t('premium.ai_assistant_desc', currentLanguage),
    },
    {
      icon: Clock,
      title: t('premium.meal_planning', currentLanguage),
      description: t('premium.meal_planning_desc', currentLanguage),
    },
    {
      icon: Sparkles,
      title: t('premium.exclusive_content', currentLanguage),
      description: t('premium.exclusive_content_desc', currentLanguage),
    },
    {
      icon: Crown,
      title: t('premium.priority_support', currentLanguage),
      description: t('premium.priority_support_desc', currentLanguage),
    },
  ];

  const plans = [
    {
      name: t('premium.monthly', currentLanguage),
      price: '9.99',
      period: t('premium.per_month', currentLanguage),
      popular: false,
      features: [
        t('premium.feature_unlimited', currentLanguage),
        t('premium.feature_collaboration', currentLanguage),
        t('premium.feature_ai', currentLanguage),
        t('premium.feature_planning', currentLanguage),
      ],
    },
    {
      name: t('premium.yearly', currentLanguage),
      price: '99.99',
      period: t('premium.per_year', currentLanguage),
      popular: true,
      savings: t('premium.save_17', currentLanguage),
      features: [
        t('premium.feature_unlimited', currentLanguage),
        t('premium.feature_collaboration', currentLanguage),
        t('premium.feature_ai', currentLanguage),
        t('premium.feature_planning', currentLanguage),
        t('premium.feature_exclusive', currentLanguage),
        t('premium.feature_support', currentLanguage),
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t('page.premium.title', currentLanguage)} - Chefito</title>
        <meta name="description" content={t('page.premium.description', currentLanguage)} />
        <meta property="og:title" content={`${t('page.premium.title', currentLanguage)} - Chefito`} />
        <meta property="og:description" content={t('page.premium.description', currentLanguage)} />
      </Helmet>

      <div className="min-h-screen bg-background dark:bg-background-dark">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-warning-50 via-primary-50 to-secondary-50 dark:from-warning-900/20 dark:via-primary-900/20 dark:to-secondary-900/20">
          <div className="absolute inset-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.1, scale: 1 }}
              transition={{ duration: 2 }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-warning-300 rounded-full blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.1, scale: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-300 rounded-full blur-3xl"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 bg-warning-100 dark:bg-warning-900/30 rounded-full px-4 py-2 mb-6">
                <Star className="w-5 h-5 text-warning-600" />
                <span className="text-warning-700 dark:text-warning-300 font-medium">
                  {t('premium.upgrade_now', currentLanguage)}
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-6">
                Chefito <span className="text-warning-600">Premium</span>
              </h1>

              <p className="text-xl md:text-2xl text-text-secondary dark:text-text-dark-secondary max-w-3xl mx-auto mb-8">
                {t('premium.hero_subtitle', currentLanguage)}
              </p>

              <Button size="lg" className="mb-8">
                <Star className="w-5 h-5 mr-2" />
                {t('premium.start_trial', currentLanguage)}
              </Button>

              <p className="text-sm text-text-secondary dark:text-text-dark-secondary">
                {t('premium.no_commitment', currentLanguage)}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-surface dark:bg-surface-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-6">
                {t('premium.features_title', currentLanguage)}
              </h2>
              <p className="text-xl text-text-secondary dark:text-text-dark-secondary max-w-3xl mx-auto">
                {t('premium.features_subtitle', currentLanguage)}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-large transition-all duration-300">
                      <CardContent className="p-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-warning-100 dark:bg-warning-900/30 rounded-2xl mb-6">
                          <IconComponent className="w-8 h-8 text-warning-600 dark:text-warning-400" />
                        </div>
                        <h3 className="text-xl font-display font-semibold text-text-primary dark:text-text-dark-primary mb-4">
                          {feature.title}
                        </h3>
                        <p className="text-text-secondary dark:text-text-dark-secondary">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-6">
                {t('premium.pricing_title', currentLanguage)}
              </h2>
              <p className="text-xl text-text-secondary dark:text-text-dark-secondary">
                {t('premium.pricing_subtitle', currentLanguage)}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge variant="primary" className="px-4 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        {t('premium.most_popular', currentLanguage)}
                      </Badge>
                    </div>
                  )}

                  <Card className={`h-full ${plan.popular ? 'ring-2 ring-primary-500 shadow-large' : ''}`}>
                    <CardContent className="p-8">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-2">
                          {plan.name}
                        </h3>
                        {plan.savings && (
                          <div className="text-success-600 dark:text-success-400 text-sm font-medium mb-2">
                            {plan.savings}
                          </div>
                        )}
                        <div className="flex items-baseline justify-center">
                          <span className="text-4xl font-bold text-text-primary dark:text-text-dark-primary">
                            €{plan.price}
                          </span>
                          <span className="text-text-secondary dark:text-text-dark-secondary ml-2">
                            {plan.period}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <Check className="w-5 h-5 text-success-600 dark:text-success-400 mr-3 flex-shrink-0" />
                            <span className="text-text-primary dark:text-text-dark-primary">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        fullWidth
                        variant={plan.popular ? 'primary' : 'outline'}
                        size="lg"
                      >
                        {t('premium.choose_plan', currentLanguage)}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mt-12"
            >
              <p className="text-text-secondary dark:text-text-dark-secondary mb-4">
                {t('premium.money_back', currentLanguage)}
              </p>
              <div className="flex justify-center space-x-8 text-sm text-text-secondary dark:text-text-dark-secondary">
                <span>✓ {t('premium.cancel_anytime', currentLanguage)}</span>
                <span>✓ {t('premium.secure_payment', currentLanguage)}</span>
                <span>✓ {t('premium.instant_access', currentLanguage)}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-primary-500 to-secondary-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                {t('premium.cta_title', currentLanguage)}
              </h2>
              <p className="text-xl text-white/90 mb-8">
                {t('premium.cta_subtitle', currentLanguage)}
              </p>
              <Button variant="secondary" size="lg">
                <Star className="w-5 h-5 mr-2" />
                {t('premium.start_free_trial', currentLanguage)}
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PremiumPage;