import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useLanguage } from '../hooks/useLanguage';
import { trackCTAClick } from '../lib/utils/analytics';

const PricingPage: React.FC = () => {
  const { t } = useLanguage();

  const plans = [
    {
      name: t('pricing.free.name'),
      price: t('pricing.free.price'),
      period: t('pricing.free.period'),
      description: t('pricing.free.description'),
      features: [
        '2 recettes par semaine',
        'Assistant vocal de base',
        'Recherche de recettes',
        'Accès application mobile'
      ],
      cta: t('pricing.free.cta'),
      popular: false,
      icon: Star,
      color: 'neutral',
    },
    {
      name: t('pricing.standard.name'),
      price: t('pricing.standard.price'),
      period: t('pricing.standard.period'),
      description: t('pricing.standard.description'),
      features: [
        'Recettes illimitées',
        'Assistant vocal avancé',
        'Accès hors ligne',
        'Planification des repas',
        'Listes de courses',
        'Support prioritaire'
      ],
      cta: t('pricing.standard.cta'),
      popular: true,
      icon: Zap,
      color: 'primary',
    },
    {
      name: t('pricing.pro.name'),
      price: t('pricing.pro.price'),
      period: t('pricing.pro.period'),
      description: t('pricing.pro.description'),
      features: [
        'Tout dans Standard',
        'Coach culinaire IA',
        'Recommandations personnalisées',
        'Analyses avancées',
        'Accès API',
        'Options marque blanche'
      ],
      cta: t('pricing.pro.cta'),
      popular: false,
      icon: Crown,
      color: 'secondary',
    },
  ];

  const handlePlanSelect = (planName: string) => {
    trackCTAClick('select_plan', 'pricing_page', {
      plan_name: planName,
    });
    
    // In a real app, this would redirect to payment or signup
    console.log(`Selected plan: ${planName}`);
  };

  const getIconColor = (color: string) => {
    const colorMap = {
      neutral: 'text-neutral-600 dark:text-neutral-400',
      primary: 'text-primary-600 dark:text-primary-400',
      secondary: 'text-secondary-600 dark:text-secondary-400',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.neutral;
  };

  const getCardVariant = (popular: boolean) => {
    return popular ? 'elevated' : 'default';
  };

  return (
    <>
      <Helmet>
        <title>{t('pricing.title')} - Chefito</title>
        <meta name="description" content={t('pricing.subtitle')} />
        <meta property="og:title" content={`${t('pricing.title')} - Chefito`} />
        <meta property="og:description" content={t('pricing.subtitle')} />
      </Helmet>

      <div className="min-h-screen bg-background dark:bg-background-dark">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PageHeader
              titleKey="pricing.title"
              subtitleKey="pricing.subtitle"
            />
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => {
                const IconComponent = plan.icon;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative"
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge variant="primary" size="lg">
                          {t('pricing.popular')}
                        </Badge>
                      </div>
                    )}
                    
                    <Card 
                      variant={getCardVariant(plan.popular)} 
                      padding="lg" 
                      interactive
                      className={`h-full ${plan.popular ? 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-background-dark' : ''}`}
                    >
                      <CardContent className="text-center">
                        {/* Plan Icon */}
                        <div className="mb-6">
                          <div className={`w-16 h-16 mx-auto rounded-2xl bg-${plan.color}-100 dark:bg-${plan.color}-900/30 flex items-center justify-center`}>
                            <IconComponent className={`w-8 h-8 ${getIconColor(plan.color)}`} />
                          </div>
                        </div>

                        {/* Plan Name */}
                        <h3 className="text-2xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-2">
                          {plan.name}
                        </h3>

                        {/* Plan Description */}
                        <p className="text-text-secondary dark:text-text-dark-secondary mb-6">
                          {plan.description}
                        </p>

                        {/* Price */}
                        <div className="mb-8">
                          <div className="flex items-baseline justify-center">
                            <span className="text-4xl font-bold text-text-primary dark:text-text-dark-primary">
                              {plan.price}
                            </span>
                            <span className="text-text-secondary dark:text-text-dark-secondary ml-2">
                              {plan.period}
                            </span>
                          </div>
                          {index > 0 && (
                            <p className="text-sm text-success-600 dark:text-success-400 mt-2">
                              {t('pricing.free_trial')}
                            </p>
                          )}
                        </div>

                        {/* Features */}
                        <div className="space-y-4 mb-8">
                          {plan.features.map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                              className="flex items-center"
                            >
                              <Check className="w-5 h-5 text-success-600 dark:text-success-400 mr-3 flex-shrink-0" />
                              <span className="text-text-secondary dark:text-text-dark-secondary text-left">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <Button
                          variant={plan.popular ? 'primary' : 'outline'}
                          size="lg"
                          fullWidth
                          onClick={() => handlePlanSelect(plan.name)}
                          className={plan.popular ? 'shadow-lg hover:shadow-xl' : ''}
                        >
                          {plan.cta}
                        </Button>

                        {/* Additional Info */}
                        {index > 0 && (
                          <div className="mt-4 space-y-1">
                            <p className="text-xs text-text-secondary dark:text-text-dark-secondary">
                              {t('pricing.no_credit_card')}
                            </p>
                            <p className="text-xs text-text-secondary dark:text-text-dark-secondary">
                              {t('pricing.cancel_anytime')}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-surface dark:bg-surface-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-6">
                Questions Fréquentes
              </h2>
              <p className="text-lg text-text-secondary dark:text-text-dark-secondary">
                Tout ce que vous devez savoir sur nos plans tarifaires
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  question: "Puis-je changer de plan à tout moment ?",
                  answer: "Oui, vous pouvez mettre à niveau ou rétrograder votre plan à tout moment. Les changements prennent effet immédiatement."
                },
                {
                  question: "Y a-t-il des frais cachés ?",
                  answer: "Non, nos prix sont transparents. Aucun frais caché, aucun engagement à long terme."
                },
                {
                  question: "Que se passe-t-il si j'annule mon abonnement ?",
                  answer: "Vous conservez l'accès à votre plan jusqu'à la fin de votre période de facturation actuelle."
                },
                {
                  question: "L'essai gratuit nécessite-t-il une carte de crédit ?",
                  answer: "Non, vous pouvez commencer votre essai gratuit sans fournir d'informations de paiement."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card variant="default" padding="lg">
                    <CardContent>
                      <h3 className="text-lg font-semibold text-text-primary dark:text-text-dark-primary mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-text-secondary dark:text-text-dark-secondary leading-relaxed">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PricingPage;