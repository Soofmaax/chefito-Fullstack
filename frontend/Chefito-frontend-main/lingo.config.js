export default {
  // Configuration Lingo.dev pour Chefito
  projectId: process.env.VITE_LINGO_PROJECT_ID || 'chefito-project',
  apiKey: process.env.VITE_LINGO_API_KEY || '',
  
  // Langues supportées
  languages: ['fr', 'en', 'es', 'de', 'it'],
  defaultLanguage: 'fr',
  
  // Dossiers de traduction
  translationFiles: {
    input: './src/locales',
    output: './src/locales/generated'
  },
  
  // Configuration avancée
  fallbackLanguage: 'en',
  interpolation: {
    prefix: '{{',
    suffix: '}}'
  },
  
  // Namespaces pour organiser les traductions
  namespaces: [
    'common',
    'navigation',
    'home',
    'recipes',
    'auth',
    'profile',
    'admin',
    'pricing',
    'legal'
  ],
  
  // Options de développement
  development: {
    enableHotReload: true,
    showMissingKeys: true,
    logLevel: 'warn'
  }
};