import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Shield, Eye, Lock, Users, FileText, Mail } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card, CardContent } from '../components/ui/Card';
import { useLanguage } from '../hooks/useLanguage';

const PrivacyPage: React.FC = () => {
  const { t } = useLanguage();
  const lastUpdated = new Date().toLocaleDateString('fr-FR');

  const sections = [
    {
      id: 'introduction',
      titleKey: 'legal.privacy.sections.introduction',
      icon: FileText,
      content: `
        Chez Chefito, nous nous engageons à protéger votre vie privée et vos données personnelles. 
        Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et 
        protégeons vos informations lorsque vous utilisez notre service.
      `
    },
    {
      id: 'data_collection',
      titleKey: 'legal.privacy.sections.data_collection',
      icon: Eye,
      content: `
        Nous collectons les informations suivantes :
        • Informations de compte (nom, email, préférences)
        • Données d'utilisation (recettes consultées, interactions)
        • Informations techniques (adresse IP, type de navigateur)
        • Données vocales (uniquement lors de l'utilisation de l'assistant vocal)
      `
    },
    {
      id: 'data_usage',
      titleKey: 'legal.privacy.sections.data_usage',
      icon: Users,
      content: `
        Nous utilisons vos données pour :
        • Fournir et améliorer nos services
        • Personnaliser votre expérience culinaire
        • Vous envoyer des communications importantes
        • Analyser l'utilisation pour améliorer notre plateforme
        • Assurer la sécurité de nos services
      `
    },
    {
      id: 'data_sharing',
      titleKey: 'legal.privacy.sections.data_sharing',
      icon: Shield,
      content: `
        Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos informations 
        uniquement dans les cas suivants :
        • Avec votre consentement explicite
        • Pour se conformer aux obligations légales
        • Pour protéger nos droits et notre sécurité
        • Avec des prestataires de services de confiance (sous contrat strict)
      `
    },
    {
      id: 'security',
      titleKey: 'legal.privacy.sections.security',
      icon: Lock,
      content: `
        Nous mettons en place des mesures de sécurité robustes :
        • Chiffrement des données en transit et au repos
        • Authentification à deux facteurs disponible
        • Audits de sécurité réguliers
        • Accès limité aux données personnelles
        • Surveillance continue des menaces
      `
    },
    {
      id: 'your_rights',
      titleKey: 'legal.privacy.sections.your_rights',
      icon: Users,
      content: `
        Conformément au RGPD, vous avez le droit de :
        • Accéder à vos données personnelles
        • Rectifier des informations inexactes
        • Supprimer vos données (droit à l'oubli)
        • Limiter le traitement de vos données
        • Portabilité de vos données
        • Vous opposer au traitement
      `
    },
    {
      id: 'contact',
      titleKey: 'legal.privacy.sections.contact',
      icon: Mail,
      content: `
        Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits :
        
        Email : privacy@chefito.app
        Adresse : 123 Rue Culinaire, 75001 Paris, France
        Téléphone : +33 1 23 45 67 89
        
        Nous nous engageons à répondre à vos demandes dans les 30 jours.
      `
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('legal.privacy.title')} - Chefito</title>
        <meta name="description" content="Politique de confidentialité de Chefito - Protection de vos données personnelles" />
        <meta property="og:title" content={`${t('legal.privacy.title')} - Chefito`} />
        <meta property="og:description" content="Découvrez comment Chefito protège vos données personnelles et respecte votre vie privée" />
      </Helmet>

      <div className="min-h-screen bg-background dark:bg-background-dark">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <PageHeader
              titleKey="legal.privacy.title"
              subtitleKey="legal.privacy.last_updated"
              className="text-center"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center text-text-secondary dark:text-text-dark-secondary mt-4"
            >
              {t('legal.privacy.last_updated', { date: lastUpdated })}
            </motion.p>
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

        {/* Contact Section */}
        <section className="py-24 bg-surface dark:bg-surface-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-6">
                Des questions sur votre vie privée ?
              </h2>
              <p className="text-lg text-text-secondary dark:text-text-dark-secondary mb-8">
                Notre équipe est là pour vous aider à comprendre comment nous protégeons vos données.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:privacy@chefito.app"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contactez notre équipe
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary-600 text-primary-600 dark:text-primary-400 rounded-xl font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                >
                  Centre d'aide
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPage;