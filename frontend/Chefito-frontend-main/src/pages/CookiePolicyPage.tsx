import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Cookie, Settings, Eye, Shield, Trash2, Mail } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../hooks/useLanguage';

const CookiePolicyPage: React.FC = () => {
  const { t } = useLanguage();
  const lastUpdated = new Date().toLocaleDateString('fr-FR');

  const sections = [
    {
      id: 'what_are_cookies',
      titleKey: 'legal.cookies.sections.what_are_cookies',
      icon: Cookie,
      content: `
        Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez un site web. 
        Ils permettent au site de se souvenir de vos actions et préférences pendant une période donnée.
        
        Chefito utilise les cookies pour améliorer votre expérience culinaire et personnaliser nos services.
      `
    },
    {
      id: 'how_we_use',
      titleKey: 'legal.cookies.sections.how_we_use',
      icon: Eye,
      content: `
        Nous utilisons les cookies pour :
        • Mémoriser vos préférences de langue et de thème
        • Maintenir votre session de connexion
        • Analyser l'utilisation de notre site pour l'améliorer
        • Personnaliser les recommandations de recettes
        • Mesurer l'efficacité de nos fonctionnalités
        • Assurer la sécurité de votre compte
      `
    },
    {
      id: 'types_of_cookies',
      titleKey: 'legal.cookies.sections.types_of_cookies',
      icon: Settings,
      content: `
        Types de cookies que nous utilisons :
        
        Cookies essentiels :
        • Nécessaires au fonctionnement du site
        • Ne peuvent pas être désactivés
        • Incluent l'authentification et la sécurité
        
        Cookies de performance :
        • Collectent des informations sur l'utilisation du site
        • Nous aident à améliorer nos services
        • Données anonymisées uniquement
        
        Cookies de fonctionnalité :
        • Mémorisent vos préférences
        • Améliorent votre expérience utilisateur
        • Incluent la langue et les paramètres d'affichage
        
        Cookies analytiques :
        • Nous aident à comprendre comment vous utilisez Chefito
        • Permettent d'optimiser nos fonctionnalités
        • Données agrégées et anonymes
      `
    },
    {
      id: 'managing_cookies',
      titleKey: 'legal.cookies.sections.managing_cookies',
      icon: Shield,
      content: `
        Vous avez le contrôle total sur les cookies :
        
        Dans Chefito :
        • Utilisez notre centre de préférences des cookies
        • Activez/désactivez les catégories de cookies
        • Modifiez vos choix à tout moment
        
        Dans votre navigateur :
        • Bloquez tous les cookies
        • Supprimez les cookies existants
        • Configurez des exceptions pour certains sites
        
        Note : Désactiver certains cookies peut affecter le fonctionnement du site.
      `
    }
  ];

  const handleManageCookies = () => {
    // In a real app, this would open the cookie preferences modal
    console.log('Opening cookie preferences...');
  };

  const handleClearCookies = () => {
    // Clear Chefito-specific cookies
    const chefitoKeys = Object.keys(localStorage).filter(key => key.startsWith('chefito_'));
    chefitoKeys.forEach(key => localStorage.removeItem(key));
    
    // Show confirmation
    alert('Cookies Chefito supprimés avec succès !');
  };

  return (
    <>
      <Helmet>
        <title>{t('legal.cookies.title')} - Chefito</title>
        <meta name="description" content="Politique des cookies de Chefito - Comment nous utilisons les cookies" />
        <meta property="og:title" content={`${t('legal.cookies.title')} - Chefito`} />
        <meta property="og:description" content="Découvrez comment Chefito utilise les cookies pour améliorer votre expérience" />
      </Helmet>

      <div className="min-h-screen bg-background dark:bg-background-dark">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <PageHeader
              titleKey="legal.cookies.title"
              className="text-center"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center text-text-secondary dark:text-text-dark-secondary mt-4"
            >
              {t('legal.cookies.last_updated', { date: lastUpdated })}
            </motion.p>
          </div>
        </section>

        {/* Cookie Management Section */}
        <section className="py-16 bg-surface dark:bg-surface-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card variant="elevated" padding="lg">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-warning-100 dark:bg-warning-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Cookie className="w-8 h-8 text-warning-600 dark:text-warning-400" />
                  </div>
                  
                  <h2 className="text-2xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-4">
                    Gérez vos préférences de cookies
                  </h2>
                  
                  <p className="text-text-secondary dark:text-text-dark-secondary mb-8">
                    Contrôlez quels cookies Chefito peut utiliser pour personnaliser votre expérience culinaire.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleManageCookies}
                      icon={<Settings className="w-5 h-5" />}
                    >
                      Gérer les préférences
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleClearCookies}
                      icon={<Trash2 className="w-5 h-5" />}
                    >
                      Supprimer les cookies
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {sections.map((section, index) => {
                const IconComponent = section.icon;
                
                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card variant="default" padding="lg">
                      <CardContent>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                          </div>
                          
                          <div className="flex-1">
                            <h2 className="text-2xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-4">
                              {t(section.titleKey)}
                            </h2>
                            
                            <div className="prose prose-neutral dark:prose-invert max-w-none">
                              <div className="text-text-secondary dark:text-text-dark-secondary leading-relaxed whitespace-pre-line">
                                {section.content}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Browser Instructions */}
        <section className="py-24 bg-surface dark:bg-surface-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-6">
                Gérer les cookies dans votre navigateur
              </h2>
              <p className="text-lg text-text-secondary dark:text-text-dark-secondary">
                Instructions pour les navigateurs les plus populaires
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  browser: 'Chrome',
                  instructions: 'Paramètres > Confidentialité et sécurité > Cookies et autres données de sites'
                },
                {
                  browser: 'Firefox',
                  instructions: 'Paramètres > Vie privée et sécurité > Cookies et données de sites'
                },
                {
                  browser: 'Safari',
                  instructions: 'Préférences > Confidentialité > Gérer les données de sites web'
                },
                {
                  browser: 'Edge',
                  instructions: 'Paramètres > Cookies et autorisations de site > Cookies et données stockées'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card variant="default" padding="md">
                    <CardContent>
                      <h3 className="font-semibold text-text-primary dark:text-text-dark-primary mb-2">
                        {item.browser}
                      </h3>
                      <p className="text-sm text-text-secondary dark:text-text-dark-secondary">
                        {item.instructions}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-6">
                Questions sur les cookies ?
              </h2>
              <p className="text-lg text-text-secondary dark:text-text-dark-secondary mb-8">
                Notre équipe est disponible pour répondre à vos questions sur notre utilisation des cookies.
              </p>
              <a
                href="mailto:privacy@chefito.app"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contactez-nous
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CookiePolicyPage;