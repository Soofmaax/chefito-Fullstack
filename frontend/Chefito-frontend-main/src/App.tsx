import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './hooks/useAuth';
import { LanguageProvider } from './hooks/useLanguage';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import VoiceAssistant from './components/ui/VoiceAssistant';
import BottomNavigation from './components/ui/BottomNavigation';
import CookieConsent from './components/ui/CookieConsent';
import { AccessibilitySkipLink } from './components/ui/AccessibilitySkipLink';
import { Loader } from './components/ui/Loader';
import { ToastContainer } from './components/ui/Toast';
import { useToast } from './hooks/useToast';
import { trackPageView } from './lib/utils/analytics';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { 
  generateOrganizationStructuredData, 
  generateWebsiteStructuredData,
  generateHreflangTags 
} from './lib/utils/seo';

// Lazy load pages for code splitting
const HomePage = React.lazy(() => import('./pages/HomePage'));
const RecipesPage = React.lazy(() => import('./pages/RecipesPage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage'));
const RecipeDetailPage = React.lazy(() => import('./pages/RecipeDetailPage'));
const CookingModePage = React.lazy(() => import('./pages/CookingModePage'));
const SubmitRecipePage = React.lazy(() => import('./pages/SubmitRecipePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SignupPage = React.lazy(() => import('./pages/SignupPage'));
const ForgotPasswordPage = React.lazy(() => import('./pages/ForgotPasswordPage'));
const AdminPage = React.lazy(() => import('./pages/AdminPage'));
const PremiumPage = React.lazy(() => import('./pages/PremiumPage'));
const PricingPage = React.lazy(() => import('./pages/PricingPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const PrivacyPage = React.lazy(() => import('./pages/PrivacyPage'));
const TermsPage = React.lazy(() => import('./pages/TermsPage'));
const CookiePolicyPage = React.lazy(() => import('./pages/CookiePolicyPage'));
const AccountPage = React.lazy(() => import('./pages/AccountPage'));
const CollaboratePage = React.lazy(() => import('./pages/CollaboratePage'));
const AuditPage = React.lazy(() => import('./pages/AuditPage'));
const ThemeTestPage = React.lazy(() => import('./pages/ThemeTestPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

// Create React Query client with optimized configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Analytics tracking component
const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    const pageName = location.pathname === '/' ? 'home' : location.pathname.slice(1);
    trackPageView(pageName, {
      path: location.pathname,
      search: location.search,
    });
  }, [location]);

  return null;
};

// SEO and Hreflang component
const SEOManager: React.FC = () => {
  const location = useLocation();
  
  // Generate structured data
  const organizationData = generateOrganizationStructuredData();
  const websiteData = generateWebsiteStructuredData();
  const supportedLanguages = ['fr', 'en', 'es', 'de', 'it'];
  
  // Generate hreflang tags for current path
  const hreflangTags = generateHreflangTags(location.pathname, supportedLanguages);

  return (
    <Helmet>
      {/* Hreflang tags for multilingual SEO */}
      {hreflangTags.map((tag, index) => (
        <link key={index} {...tag} />
      ))}
      
      {/* Canonical URL */}
      <link rel="canonical" href={`https://chefito.app${location.pathname}`} />
      
      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>
      
      {/* Structured Data - Website */}
      <script type="application/ld+json">
        {JSON.stringify(websiteData)}
      </script>
    </Helmet>
  );
};

// Loading fallback component
const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background-dark">
    <Loader variant="spinner" size="lg" text="Chargement de la page..." />
  </div>
);

function App() {
  const { toasts, showToast, removeToast } = useToast();

  // Expose showToast globally for use in main.tsx
  useEffect(() => {
    (window as any).showAppToast = showToast;
    
    return () => {
      delete (window as any).showAppToast;
    };
  }, [showToast]);

  // Initialize accessibility features
  useEffect(() => {
    // Set up focus management for keyboard navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip to main content with Alt+S
      if (event.altKey && event.key === 's') {
        event.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LanguageProvider>
            <AuthProvider>
              <ErrorBoundary>
                <ScrollToTop>
                  <AnalyticsTracker />
                  <SEOManager />
                  
                  {/* Skip links for accessibility */}
                  <AccessibilitySkipLink href="#main-content">
                    Aller au contenu principal
                  </AccessibilitySkipLink>
                  <AccessibilitySkipLink href="#main-navigation">
                    Aller à la navigation
                  </AccessibilitySkipLink>
                  
                  <div className="flex flex-col min-h-screen bg-background dark:bg-background-dark">
                    <Helmet>
                      <title>Chefito - Your AI-Powered Cooking Assistant</title>
                      <meta name="description" content="Discover recipes, follow step-by-step voice instructions, and become a better cook with Chefito." />
                      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                      <meta name="theme-color" content="#D35400" />
                      
                      {/* Open Graph */}
                      <meta property="og:title" content="Chefito - Your AI-Powered Cooking Assistant" />
                      <meta property="og:description" content="Discover recipes, follow step-by-step voice instructions, and become a better cook with Chefito." />
                      <meta property="og:type" content="website" />
                      <meta property="og:url" content="https://chefito.app" />
                      <meta property="og:image" content="https://chefito.app/og-image.jpg" />
                      
                      {/* Twitter Card */}
                      <meta name="twitter:card" content="summary_large_image" />
                      <meta name="twitter:title" content="Chefito - Your AI-Powered Cooking Assistant" />
                      <meta name="twitter:description" content="Discover recipes, follow step-by-step voice instructions, and become a better cook with Chefito." />
                      <meta name="twitter:image" content="https://chefito.app/twitter-image.jpg" />
                      
                      {/* Preload critical resources */}
                      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                      <link rel="preload" href="/fonts/crimson-pro-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                      
                      {/* DNS prefetch for external resources */}
                      <link rel="dns-prefetch" href="//images.pexels.com" />
                      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
                      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
                    </Helmet>
                    
                    <Header />
                    
                    <main 
                      id="main-content" 
                      className="flex-grow pb-20 md:pb-0"
                      role="main"
                      tabIndex={-1}
                    >
                      <Suspense fallback={<PageLoader />}>
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/recipes" element={<RecipesPage />} />
                          <Route path="/search" element={<SearchPage />} />
                          <Route path="/recipes/:categorySlug/:recipeSlug" element={<RecipeDetailPage />} />
                          <Route path="/cooking/:recipeSlug" element={<CookingModePage />} />
                          <Route path="/collaborate/:sessionId/:recipeSlug" element={<CollaboratePage />} />
                          <Route path="/submit" element={<SubmitRecipePage />} />
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/signup" element={<SignupPage />} />
                          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                          <Route path="/admin" element={<AdminPage />} />
                          <Route path="/premium" element={<PremiumPage />} />
                          <Route path="/pricing" element={<PricingPage />} />
                          <Route path="/about" element={<AboutPage />} />
                          <Route path="/contact" element={<ContactPage />} />
                          <Route path="/privacy" element={<PrivacyPage />} />
                          <Route path="/legal/privacy" element={<PrivacyPage />} />
                          <Route path="/terms" element={<TermsPage />} />
                          <Route path="/legal/terms" element={<TermsPage />} />
                          <Route path="/cookies" element={<CookiePolicyPage />} />
                          <Route path="/legal/cookies" element={<CookiePolicyPage />} />
                          <Route path="/account" element={<AccountPage />} />
                          <Route path="/audit" element={<AuditPage />} />
                          <Route path="/theme-test" element={<ThemeTestPage />} />
                          <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                      </Suspense>
                    </main>
                    
                    <Footer />
                    
                    {/* Global Components */}
                    <VoiceAssistant />
                    <BottomNavigation />
                    <CookieConsent />
                    
                    {/* Toast Notifications */}
                    <ToastContainer toasts={toasts} onClose={removeToast} />
                  </div>
                </ScrollToTop>
              </ErrorBoundary>
            </AuthProvider>
          </LanguageProvider>
        </BrowserRouter>
        
        {/* React Query DevTools (only in development) */}
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;