import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { cn } from '../../../lib/utils/cn';
import { SUPPORTED_LANGUAGES, type SupportedLanguage, useLanguage } from '../../../hooks/useLanguage';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'default' | 'compact';
  showLabel?: boolean;
}

/**
 * Language Selector component with Lingo.dev integration
 */
export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className,
  variant = 'default',
  showLabel = true,
}) => {
  const { currentLanguage, setLanguage, isLoading } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (language: SupportedLanguage) => {
    setLanguage(language);
    setIsOpen(false);
  };

  const currentLangConfig = SUPPORTED_LANGUAGES[currentLanguage];

  if (isLoading) {
    return (
      <div className={cn('flex items-center gap-2 px-3 py-2', className)}>
        <div className="w-5 h-5 animate-spin rounded-full border-2 border-neutral-300 border-t-primary-600" />
        <span className="text-sm text-neutral-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      {/* Main button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-250',
          'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700',
          'hover:bg-neutral-50 dark:hover:bg-neutral-700',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          variant === 'compact' && 'px-2 py-1.5'
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className={cn('text-neutral-600 dark:text-neutral-400', variant === 'compact' ? 'w-4 h-4' : 'w-5 h-5')} />
        
        <span className="text-lg">{currentLangConfig.flag}</span>
        
        {showLabel && variant !== 'compact' && (
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {currentLangConfig.nativeName}
          </span>
        )}
        
        <ChevronDown 
          className={cn(
            'w-4 h-4 text-neutral-500 transition-transform duration-200',
            isOpen && 'rotate-180'
          )} 
        />
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn(
              'absolute top-full mt-2 w-48 bg-white dark:bg-neutral-800',
              'border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg',
              'py-2 z-50',
              'right-0' // Aligned to the right
            )}
            role="listbox"
            aria-label="Available languages"
          >
            {Object.entries(SUPPORTED_LANGUAGES).map(([code, config]) => (
              <motion.button
                key={code}
                onClick={() => handleLanguageChange(code as SupportedLanguage)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-2.5 text-left',
                  'hover:bg-neutral-50 dark:hover:bg-neutral-700',
                  'transition-colors duration-150',
                  currentLanguage === code && 'bg-primary-50 dark:bg-primary-900/20'
                )}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
                role="option"
                aria-selected={currentLanguage === code}
              >
                <span className="text-xl">{config.flag}</span>
                
                <div className="flex-1">
                  <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {config.nativeName}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {config.name}
                  </div>
                </div>
                
                {currentLanguage === code && (
                  <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;