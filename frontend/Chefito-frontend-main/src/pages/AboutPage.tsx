import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Heart, Users, Lightbulb, Award, ChefHat, Code, Palette, Globe } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card, CardContent } from '../components/ui/Card';
import { LazyImage } from '../components/ui/LazyImage';
import { useLanguage } from '../hooks/useLanguage';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Heart,
      titleKey: 'about.values.accessibility.title',
      descriptionKey: 'about.values.accessibility.description',
      color: 'error',
    },
    {
      icon: Lightbulb,
      titleKey: 'about.values.innovation.title',
      descriptionKey: 'about.values.innovation.description',
      color: 'warning',
    },
    {
      icon: Users,
      titleKey: 'about.values.community.title',
      descriptionKey: 'about.values.community.description',
      color: 'success',
    },
    {
      icon: Award,
      titleKey: 'about.values.quality.title',
      descriptionKey: 'about.values.quality.description',
      color: 'primary',
    },
  ];

  const team = [
    {
      name: 'Marie Dubois',
      role: 'Chef Executive & Co-fondatrice',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: ChefHat,
      description: '15 ans d\'expérience en cuisine gastronomique',
    },
    {
      name: 'Thomas Martin',
      role: 'CTO & Co-fondateur',
      image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: Code,
      description: 'Expert en IA et développement logiciel',
    },
    {
      name: 'Sophie Laurent',
      role: 'Directrice Design UX',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: Palette,
      description: 'Spécialiste en expérience utilisateur culinaire',
    },
    {
      name: 'Alex Chen',
      role: 'Chef Produit International',
      image: 'https://images.pexels.com/photos/3778874/pexels-photo-3778874.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: Globe,
      description: 'Expert en localisation et marchés globaux',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
      success: 'bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400',
      warning: 'bg-warning-100 dark:bg-warning-900/30 text-warning-600 dark:text-warning-400',
      error: 'bg-error-100 dark:bg-error-900/30 text-error-600 dark:text-error-400',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  return (
    <>
      <Helmet>
        <title>{t('about.title')} - Chefito</title>
        <meta name="description" content={t('about.subtitle')} />
        <meta property="og:title" content={`${t('about.title')} - Chefito`} />
        <meta property="og:description" content={t('about.subtitle')} />
      </Helmet>

      <div className="min-h-screen bg-background dark:bg-background-dark">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PageHeader
              titleKey="about.title"
              subtitleKey="about.subtitle"
            />
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-6">
                  {t('about.mission.title')}
                </h2>
                <p className="text-lg text-text-secondary dark:text-text-dark-secondary leading-relaxed mb-8">
                  {t('about.mission.description')}
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                      2,847+
                    </div>
                    <div className="text-sm text-text-secondary dark:text-text-dark-secondary">
                      {t('home.features.stats.recipes')}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                      15,000+
                    </div>
                    <div className="text-sm text-text-secondary dark:text-text-dark-secondary">
                      {t('home.features.stats.users')}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <LazyImage
                  src="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Équipe Chefito en cuisine"
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 bg-surface dark:bg-surface-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-8">
                {t('about.story.title')}
              </h2>
              <p className="text-lg text-text-secondary dark:text-text-dark-secondary leading-relaxed">
                {t('about.story.description')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-6">
                {t('about.values.title')}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card variant="default" padding="lg" interactive className="h-full text-center">
                      <CardContent>
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                          className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${getColorClasses(value.color)}`}
                        >
                          <IconComponent className="w-8 h-8" />
                        </motion.div>

                        <h3 className="text-xl font-display font-semibold text-text-primary dark:text-text-dark-primary mb-4">
                          {t(value.titleKey)}
                        </h3>

                        <p className="text-text-secondary dark:text-text-dark-secondary leading-relaxed">
                          {t(value.descriptionKey)}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-surface dark:bg-surface-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-6">
                {t('about.team.title')}
              </h2>
              <p className="text-lg text-text-secondary dark:text-text-dark-secondary max-w-3xl mx-auto">
                {t('about.team.description')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => {
                const IconComponent = member.icon;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card variant="default" padding="lg" interactive className="h-full text-center">
                      <CardContent>
                        <div className="relative mb-6">
                          <LazyImage
                            src={member.image}
                            alt={member.name}
                            className="w-24 h-24 rounded-full mx-auto object-cover"
                          />
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center shadow-lg">
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                        </div>

                        <h3 className="text-lg font-display font-semibold text-text-primary dark:text-text-dark-primary mb-2">
                          {member.name}
                        </h3>

                        <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-3">
                          {member.role}
                        </p>

                        <p className="text-sm text-text-secondary dark:text-text-dark-secondary leading-relaxed">
                          {member.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;