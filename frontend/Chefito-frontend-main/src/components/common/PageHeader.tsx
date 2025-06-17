import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';

interface PageHeaderProps {
  titleKey: string;
  subtitleKey?: string;
  className?: string;
}

/**
 * Composant d'en-tête de page avec traduction automatique
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  titleKey,
  subtitleKey,
  className = '',
}) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`text-center py-16 ${className}`}
    >
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-6"
      >
        {t(titleKey)}
      </motion.h1>
      
      {subtitleKey && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-text-secondary dark:text-text-dark-secondary max-w-3xl mx-auto leading-relaxed"
        >
          {t(subtitleKey)}
        </motion.p>
      )}
    </motion.div>
  );
};

export default PageHeader;