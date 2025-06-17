import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SupportedLanguage = 'fr' | 'en' | 'es' | 'de' | 'it';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, LanguageConfig> = {
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
  },
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
  },
};

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  getLocalizedText: (obj: Record<string, string> | null | undefined, language: SupportedLanguage) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Translation cache
const translationCache: Record<SupportedLanguage, Record<string, any>> = {
  fr: {},
  en: {},
  es: {},
  de: {},
  it: {},
};

// Fallback translations for missing keys
const fallbackTranslations: Record<string, string> = {
  'common.loading': 'Loading...',
  'common.error': 'Error',
  'common.success': 'Success',
  'navigation.home': 'Home',
  'navigation.recipes': 'Recipes',
  'navigation.search': 'Search',
  'navigation.about': 'About',
  'navigation.contact': 'Contact',
  'navigation.login': 'Login',
  'navigation.profile': 'Profile',
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('fr');
  const [isLoading, setIsLoading] = useState(true);

  // Load translations for a specific language
  const loadTranslations = async (language: SupportedLanguage): Promise<Record<string, any>> => {
    if (translationCache[language] && Object.keys(translationCache[language]).length > 0) {
      return translationCache[language];
    }

    try {
      const response = await fetch(`/locales/${language}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${language}`);
      }
      const translations = await response.json();
      translationCache[language] = translations;
      return translations;
    } catch (error) {
      console.warn(`Failed to load translations for ${language}:`, error);
      
      // Return fallback translations if available
      if (language === 'en') {
        return fallbackTranslations;
      }
      
      // Try to load English as fallback
      try {
        const fallbackResponse = await fetch('/locales/en.json');
        if (fallbackResponse.ok) {
          const fallbackTranslations = await fallbackResponse.json();
          return fallbackTranslations;
        }
      } catch (fallbackError) {
        console.warn('Failed to load fallback translations:', fallbackError);
      }
      
      return {};
    }
  };

  // Initialize language from localStorage or browser preference
  useEffect(() => {
    const initializeLanguage = async () => {
      setIsLoading(true);
      
      // Get saved language from localStorage
      const savedLanguage = localStorage.getItem('chefito_language') as SupportedLanguage;
      
      // Get browser language
      const browserLanguage = navigator.language.split('-')[0] as SupportedLanguage;
      
      // Determine initial language
      const initialLanguage = 
        savedLanguage && SUPPORTED_LANGUAGES[savedLanguage] ? savedLanguage :
        SUPPORTED_LANGUAGES[browserLanguage] ? browserLanguage :
        'fr'; // Default fallback
      
      // Load translations for the initial language
      await loadTranslations(initialLanguage);
      
      setCurrentLanguage(initialLanguage);
      setIsLoading(false);
    };

    initializeLanguage();
  }, []);

  // Change language function
  const setLanguage = async (language: SupportedLanguage) => {
    if (!SUPPORTED_LANGUAGES[language]) {
      console.warn(`Unsupported language: ${language}`);
      return;
    }

    setIsLoading(true);
    
    try {
      // Load translations for the new language
      await loadTranslations(language);
      
      // Update state and localStorage
      setCurrentLanguage(language);
      localStorage.setItem('chefito_language', language);
      
      // Update document language
      document.documentElement.lang = language;
    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Translation function with nested key support and parameter interpolation
  const t = (key: string, params?: Record<string, string | number>): string => {
    const translations = translationCache[currentLanguage] || {};
    
    // Navigate through nested object using dot notation
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }
    
    // If translation not found, try fallback language (English)
    if (value === undefined && currentLanguage !== 'en') {
      const fallbackTranslations = translationCache['en'] || {};
      let fallbackValue: any = fallbackTranslations;
      
      for (const k of keys) {
        if (fallbackValue && typeof fallbackValue === 'object' && k in fallbackValue) {
          fallbackValue = fallbackValue[k];
        } else {
          fallbackValue = undefined;
          break;
        }
      }
      
      value = fallbackValue;
    }
    
    // If still not found, use hardcoded fallback or return key
    if (value === undefined) {
      value = fallbackTranslations[key] || key;
    }
    
    // Ensure we have a string
    if (typeof value !== 'string') {
      console.warn(`Translation key "${key}" did not resolve to a string:`, value);
      return key;
    }
    
    // Parameter interpolation
    if (params) {
      return value.replace(/\{(\w+)\}/g, (match: string, paramKey: string) => {
        return params[paramKey]?.toString() || match;
      });
    }
    
    return value;
  };

  // Get localized text from multilingual objects
  const getLocalizedText = (
    obj: Record<string, string> | null | undefined, 
    language: SupportedLanguage
  ): string => {
    if (!obj || typeof obj !== 'object') {
      return '';
    }
    
    // Try requested language first
    if (obj[language]) {
      return obj[language];
    }
    
    // Try fallback languages in order of preference
    const fallbackOrder: SupportedLanguage[] = ['en', 'fr', 'es', 'de', 'it'];
    
    for (const fallbackLang of fallbackOrder) {
      if (obj[fallbackLang]) {
        return obj[fallbackLang];
      }
    }
    
    // Return first available value
    const firstValue = Object.values(obj)[0];
    return firstValue || '';
  };

  const contextValue: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t,
    getLocalizedText,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default useLanguage;