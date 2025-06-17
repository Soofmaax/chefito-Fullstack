import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FileText, User, AlertTriangle, Shield, Gavel, Mail } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card, CardContent } from '../components/ui/Card';
import { useLanguage } from '../hooks/useLanguage';

const TermsPage: React.FC = () => {
  const { t } = useLanguage();
  const lastUpdated = new Date().toLocaleDateString('fr-FR');

  const sections = [
    {
      id: 'acceptance',
      titleKey: 'legal.terms.sections.acceptance',
      icon: FileText,
      content: `
        En accédant et en utilisant Chefito, vous acceptez d'être lié par ces conditions d'utilisation. 
        Si vous n'acceptez pas ces termes, veuillez ne pas utiliser notre service.
        
        Ces conditions peuvent être mises à jour périodiquement. Nous vous notifierons des changements 
        importants par email ou via notre application.
      `
    },
    {
      id: 'description',
      titleKey: 'legal.terms.sections.description',
      icon: Shield,
      content: `
        Chefito est une plateforme culinaire intelligente qui propose :
        • Un assistant vocal IA pour la cuisine
        • Une bibliothèque de recettes personnalisées
        • Des fonctionnalités de cuisine collaborative
        • Des outils de planification de repas
        • Un accès multilingue à notre contenu
        
        Nous nous réservons le droit de modifier, suspendre ou interrompre tout aspect du service.
      `
    },
    {
      id: 'user_accounts',
      titleKey: 'legal.terms.sections.user_accounts',
      icon: User,
      content: `
        Pour utiliser certaines fonctionnalités, vous devez créer un compte. Vous êtes responsable de :
        • Fournir des informations exactes et à jour
        • Maintenir la sécurité de votre mot de passe
        • Toutes les activités qui se produisent sous votre compte
        • Nous notifier immédiatement de tout usage non autorisé
        
        Vous devez avoir au moins 13 ans pour créer un compte.
      `
    },
    {
      id: 'prohibited_uses',
      titleKey: 'legal.terms.sections.prohibited_uses',
      icon: AlertTriangle,
      content: `
        Il est interdit d'utiliser Chefito pour :
        • Violer des lois ou réglementations
        • Publier du contenu offensant, illégal ou inapproprié
        • Tenter d'accéder à des systèmes non autorisés
        • Utiliser des robots ou scripts automatisés
        • Copier ou redistribuer notre contenu sans permission
        • Harceler ou menacer d'autres utilisateurs
      `
    },
    {
      id: 'content',
      titleKey: 'legal.terms.sections.content',
      icon: FileText,
      content: `
        Contenu de Chefito :
        • Nous possédons tous les droits sur le contenu de la plateforme
        • Vous pouvez utiliser notre contenu pour un usage personnel uniquement
        • La reproduction commerciale est interdite sans autorisation
        
        Votre contenu :
        • Vous conservez les droits sur le contenu que vous publiez
        • Vous nous accordez une licence pour utiliser votre contenu sur la plateforme
        • Vous garantissez avoir les droits nécessaires sur votre contenu
      `
    },
    {
      id: 'termination',
      titleKey: 'legal.terms.sections.termination',
      icon: Gavel,
      content: `
        Résiliation par vous :
        • Vous pouvez fermer votre compte à tout moment
        • La suppression est effective immédiatement
        • Certaines données peuvent être conservées pour des raisons légales
        
        Résiliation par nous :
        • Nous pouvons suspendre ou fermer votre compte en cas de violation
        • Nous vous notifierons avant la fermeture sauf en cas d'urgence
        • Vous conservez l'accès aux données exportables pendant 30 jours
      `
    },
    {
      id: 'disclaimer',
      titleKey: 'legal.terms.sections.disclaimer',
      icon: AlertTriangle,
      content: `
        Chefito est fourni "en l'état" sans garantie d'aucune sorte. Nous ne garantissons pas :
        • La disponibilité continue du service
        • L'exactitude de toutes les informations
        • L'absence d'erreurs ou de bugs
        • La compatibilité avec tous les appareils
        
        Utilisez les recettes et conseils culinaires à vos propres risques.
      `
    },
    {
      id: 'limitation',
      titleKey: 'legal.terms.sections.limitation',
      icon: Shield,
      content: `
        Dans la mesure permise par la loi, Chefito ne sera pas responsable de :
        • Dommages indirects, accessoires ou consécutifs
        • Perte de profits, données ou opportunités commerciales
        • Interruptions de service ou pertes de données
        
        Notre responsabilité totale ne dépassera pas le montant payé pour le service.
      `
    },
    {
      id: 'governing_law',
      titleKey: 'legal.terms.sections.governing_law',
      icon: Gavel,
      content: `
        Ces conditions sont régies par le droit français. Tout litige sera soumis à la juridiction 
        exclusive des tribunaux de Paris, France.
        
        Si une disposition de ces conditions est jugée invalide, les autres dispositions restent 
        en vigueur.
      `
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('legal.terms.title')} - Chefito</title>
        <meta name="description" content="Conditions d'utilisation de Chefito - Règles et conditions d'usage de notre plateforme" />
        <meta property="og:title" content={`${t('legal.terms.title')} - Chefito`} />
        <meta property="og:description" content="Consultez les conditions d'utilisation de Chefito" />
      </Helmet>

      <div className="min-h-screen bg-background dark:bg-background-dark">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <PageHeader
              titleKey="legal.terms.title"
              className="text-center"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center text-text-secondary dark:text-text-dark-secondary mt-4"
            >
              {t('legal.terms.last_updated', { date: lastUpdated })}
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
                Questions sur nos conditions ?
              </h2>
              <p className="text-lg text-text-secondary dark:text-text-dark-secondary mb-8">
                Notre équipe juridique est disponible pour clarifier nos conditions d'utilisation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:legal@chefito.app"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Équipe juridique
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary-600 text-primary-600 dark:text-primary-400 rounded-xl font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                >
                  Support général
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TermsPage;