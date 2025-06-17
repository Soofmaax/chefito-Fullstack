import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../hooks/useLanguage';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import { generateHreflangTags } from '../lib/utils/seo';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const supportedLanguages = ['fr', 'en', 'es', 'de', 'it'];

  return (
    <>
      <Helmet>
        <title>{t('home.hero.title')} - Chefito</title>
        <meta name="description" content={t('home.hero.subtitle')} />
        <link rel="canonical" href="https://chefito.app/" />
        
        {/* Hreflang tags for multilingual SEO */}
        {generateHreflangTags('/', supportedLanguages).map((tag, index) => (
          <link key={index} {...tag} />
        ))}
        
        {/* Open Graph */}
        <meta property="og:title" content={`${t('home.hero.title')} - Chefito`} />
        <meta property="og:description" content={t('home.hero.subtitle')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chefito.app/" />
        
        {/* Twitter Card */}
        <meta name="twitter:title" content={`${t('home.hero.title')} - Chefito`} />
        <meta name="twitter:description" content={t('home.hero.subtitle')} />
      </Helmet>
      
      <div className="min-h-screen">
        <HeroSection />
        <FeaturesSection />
      </div>
    </>
  );
};

export default HomePage;