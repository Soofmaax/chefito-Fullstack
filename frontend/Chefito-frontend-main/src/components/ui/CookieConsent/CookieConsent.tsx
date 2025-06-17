import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Shield, Eye } from 'lucide-react';
import { Button } from '../Button';
import { cn } from '../../../lib/utils/cn';
import { trackEvent } from '../../../lib/utils/analytics';
import { useLanguage } from '../../../hooks/useLanguage';

interface CookieConsentProps {
  className?: string;
}

/**
 * Cookie consent banner component with GDPR compliance
 */
export const CookieConsent: React.FC<CookieConsentProps> = ({ className }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consentChoice = localStorage.getItem('cookie_consent');
    
    if (!consentChoice) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsLoaded(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
    
    setIsLoaded(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    
    trackEvent('cookie_consent', {
      action: 'accepted',
      timestamp: new Date().toISOString(),
    });
    
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    
    trackEvent('cookie_consent', {
      action: 'declined',
      timestamp: new Date().toISOString(),
    });
    
    setIsVisible(false);
  };

  const handleDismiss = () => {
    // Just hide for this session, don't save preference
    setIsVisible(false);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 30,
            duration: 0.6 
          }}
          className={cn(
            'fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50',
            className
          )}
        >
          <div className="relative bg-white/95 dark:bg-neutral-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-neutral-200/50 dark:border-neutral-700/50 overflow-hidden">
            {/* Gradient accent border */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 rounded-2xl p-[2px]">
              <div className="bg-white dark:bg-neutral-800 rounded-2xl h-full w-full" />
            </div>
            
            <div className="relative p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Cookie className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-display font-semibold text-text-primary dark:text-text-dark-primary">
                      🍪 {t('cookies.title')}
                    </h3>
                    <p className="text-xs text-text-secondary dark:text-text-dark-secondary">
                      {t('cookies.gdpr_compliant')}
                    </p>
                  </div>
                </div>
                
                <motion.button
                  onClick={handleDismiss}
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={t('cookies.dismiss')}
                >
                  <X className="w-4 h-4 text-neutral-500" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="mb-6">
                <p className="text-sm text-text-secondary dark:text-text-dark-secondary leading-relaxed mb-3">
                  {t('cookies.description')}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-text-secondary dark:text-text-dark-secondary">
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-success-500" />
                    <span>{t('cookies.secure')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-primary-500" />
                    <span>{t('cookies.transparent')}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button
                    onClick={handleAccept}
                    variant="primary"
                    size="sm"
                    fullWidth
                    className="shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {t('cookies.accept_all')}
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button
                    onClick={handleDecline}
                    variant="outline"
                    size="sm"
                    fullWidth
                    className="border-2"
                  >
                    {t('cookies.decline')}
                  </Button>
                </motion.div>
              </div>

              {/* Privacy policy link */}
              <div className="mt-4 text-center">
                <a
                  href="/privacy"
                  className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors underline"
                >
                  {t('cookies.privacy_policy_link')}
                </a>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary-500/10 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-secondary-500/10 to-transparent rounded-tr-full" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;