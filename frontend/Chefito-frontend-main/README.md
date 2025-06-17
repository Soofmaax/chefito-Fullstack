# 🍳 Chefito - Your AI-Powered Cooking Assistant

<div align="center">
  <img src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg" alt="Chefito Logo" width="200" height="200" style="border-radius: 20px; object-fit: cover;">
  
  <h3>Discover recipes, follow step-by-step voice instructions, and become a better cook with Chefito.</h3>
  
  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-2.40.0-3ECF8E.svg)](https://supabase.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0.8-FF0055.svg)](https://www.framer.com/motion/)
  [![Vitest](https://img.shields.io/badge/Vitest-1.4.0-6E9F18.svg)](https://vitest.dev/)
  [![Lingo.dev](https://img.shields.io/badge/Lingo.dev-2.1.0-FF6B35.svg)](https://lingo.dev/)
</div>

## ✨ Features

- 🤖 **AI-Powered Voice Assistant** - Smart voice guidance through every cooking step with floating microphone
- 📚 **Extensive Recipe Library** - 2,847+ recipes from around the world
- 👥 **Collaborative Cooking** - Cook together with friends and family remotely
- 🌍 **Multilingual Support** - Available in French, English, Spanish, German, and Italian with Lingo.dev
- 🎨 **Premium Design** - Apple-level aesthetics with smooth animations
- 📱 **Fully Responsive** - Perfect experience on all devices with mobile-first BottomNavigation
- ♿ **Accessible** - WCAG AA compliant with keyboard navigation and comprehensive testing
- 🌙 **Dark Mode** - Beautiful dark theme support
- 📊 **Analytics** - Built-in event tracking for user interactions
- ⚡ **Performance** - Lighthouse CI integration for performance monitoring
- 👆 **Touch Gestures** - Swipe support on recipe cards for enhanced mobile interaction

## 🚀 Tech Stack

### Frontend
- **React 18.2** - Modern React with hooks and concurrent features
- **TypeScript 5.2** - Type-safe development
- **Vite 5.1** - Lightning-fast build tool
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion 11** - Production-ready motion library

### UI & Design
- **Custom Design System** - Consistent components and tokens
- **Class Variance Authority** - Type-safe component variants
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **React Swipeable** - Touch gesture support for mobile interactions

### Backend & Database
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **Row Level Security** - Secure data access patterns
- **Real-time subscriptions** - Live data updates

### Voice & AI
- **Web Speech API** - Native browser voice recognition
- **Custom Voice Assistant Hook** - Reusable voice interaction logic
- **Real-time Feedback** - Animated voice assistant with visual feedback

### Testing & Quality
- **Vitest** - Fast unit testing framework
- **Testing Library** - Component testing utilities
- **Lighthouse CI** - Automated performance auditing
- **ESLint** - Code linting with accessibility rules
- **Axe-core** - Automated accessibility testing

### Analytics & Monitoring
- **Custom Analytics** - Event tracking system
- **Performance Monitoring** - Web Vitals integration
- **User Interaction Tracking** - CTA and recipe interaction analytics

### State Management
- **React Query** - Server state management with caching
- **Zustand** - Lightweight client state management

### Internationalization
- **Lingo.dev** - Professional translation management platform
- **5 Languages** - French, English, Spanish, German, Italian
- **Localized Content** - Dynamic content translation with fallback system

### SEO & Performance
- **React Helmet Async** - Dynamic meta tag management
- **Structured Data** - JSON-LD for recipes, organization, and website
- **Hreflang Tags** - Multilingual SEO support
- **Dynamic Sitemap** - Generated from Supabase data
- **PWA Support** - Service Worker with update notifications

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Common components (PageHeader, ErrorBoundary)
│   ├── layout/          # Layout components (Header, Footer)
│   ├── sections/        # Page sections (Hero, Features)
│   └── ui/              # Design system components
│       ├── Avatar/      # Avatar component with tests
│       ├── Badge/       # Badge component
│       ├── Button/      # Button component with tests
│       ├── Card/        # Card component with tests
│       ├── Input/       # Input component with tests
│       ├── Loader/      # Loading component
│       ├── Modal/       # Accessible modal component
│       ├── Toast/       # Toast notification system
│       ├── LazyImage/   # Optimized image loading
│       ├── LanguageSelector/ # Language switcher with Lingo.dev
│       ├── VoiceAssistant/   # Floating voice assistant
│       ├── BottomNavigation/ # Mobile navigation bar
│       ├── AccessibilitySkipLink/ # Skip navigation links
│       └── CookieConsent/    # GDPR compliant cookie consent
├── hooks/               # Custom React hooks
│   ├── useAuth.tsx      # Authentication hook
│   ├── useLanguage.tsx  # Language management with Lingo.dev integration
│   ├── useRecipes.ts    # Recipe data management
│   ├── useToast.ts      # Toast notification hook
│   └── useVoiceAssistant.ts # Voice recognition hook
├── lib/                 # Utilities and configurations
│   ├── constants/       # Design tokens and constants
│   ├── stores/          # Zustand global state stores
│   ├── utils/           # Utility functions
│   │   ├── analytics.ts # Analytics tracking utilities
│   │   ├── cn.ts        # Class name utilities
│   │   ├── focus.ts     # Focus management utilities
│   │   ├── performance.ts # Performance monitoring
│   │   └── seo.ts       # SEO and structured data utilities
│   └── supabase.ts      # Supabase client
├── pages/               # Page components
│   ├── HomePage.tsx     # Landing page with hero and features
│   ├── RecipesPage.tsx  # Recipe listing
│   ├── RecipeDetailPage.tsx # Recipe details with JSON-LD
│   ├── SearchPage.tsx   # Search functionality
│   ├── PricingPage.tsx  # Premium pricing plans
│   ├── LoginPage.tsx    # Authentication
│   ├── AccountPage.tsx  # User account
│   ├── PremiumPage.tsx  # Premium features
│   ├── AboutPage.tsx    # About us
│   ├── ContactPage.tsx  # Contact form
│   ├── PrivacyPage.tsx  # Privacy policy
│   ├── TermsPage.tsx    # Terms of service
│   ├── CookiePolicyPage.tsx # Cookie policy
│   ├── CollaboratePage.tsx  # Collaborative cooking
│   ├── AdminPage.tsx    # Admin dashboard
│   ├── AuditPage.tsx    # Frontend audit tool
│   └── NotFoundPage.tsx # 404 error page
├── types/               # TypeScript type definitions
└── App.tsx              # Main application component with SEO integration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for backend)
- Lingo.dev account (for translations)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/chefito.git
   cd chefito
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your credentials:
   ```env
   # Supabase
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Lingo.dev
   VITE_LINGO_PROJECT_ID=your_lingo_project_id
   VITE_LINGO_API_KEY=your_lingo_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage
- `npm run test:a11y` - Run accessibility tests
- `npm run lighthouse` - Run Lighthouse CI audit
- `npm run analyze` - Analyze bundle size
- `npm run sitemap` - Generate sitemap
- `npm run lingo:sync` - Sync translations with Lingo.dev
- `npm run lingo:pull` - Pull latest translations
- `npm run lingo:push` - Push new translation keys

## 🌍 Internationalization with Lingo.dev

Chefito uses **Lingo.dev** for professional translation management:

### Features
- **Professional Translation Management** - Centralized translation workflow
- **Real-time Updates** - Translations update without app rebuilds
- **Collaboration Tools** - Team-based translation management
- **Quality Assurance** - Built-in translation validation
- **Fallback System** - Graceful degradation when translations are unavailable

### Supported Languages
- 🇫🇷 **French** (Français) - Default language
- 🇺🇸 **English** - Fully supported
- 🇪🇸 **Spanish** (Español) - Fully supported
- 🇩🇪 **German** (Deutsch) - Fully supported
- 🇮🇹 **Italian** (Italiano) - Fully supported

### Usage

```typescript
import { useLanguage } from './hooks/useLanguage';

const { currentLanguage, setLanguage, t } = useLanguage();

// Use translations
const title = t('home.hero.title');
const subtitle = t('home.hero.subtitle');

// With parameters
const greeting = t('welcome.message', { name: 'John' });

// Change language
setLanguage('es');
```

### Translation Management

1. **Add new translation keys** in your components:
   ```typescript
   const message = t('new.translation.key');
   ```

2. **Push keys to Lingo.dev**:
   ```bash
   npm run lingo:push
   ```

3. **Translate in Lingo.dev dashboard**
   - Professional translators can work on translations
   - Review and approve translations
   - Manage translation workflow

4. **Pull updated translations**:
   ```bash
   npm run lingo:pull
   ```

### Fallback System

The app includes a comprehensive fallback system:
- **Primary**: Lingo.dev translations
- **Secondary**: Built-in fallback translations
- **Tertiary**: English fallback
- **Final**: Translation key itself

## 📱 Mobile Experience

### BottomNavigation
- **Fixed Bottom Bar** - Quick access to main sections
- **Animated Transitions** - Smooth navigation with Framer Motion
- **Active State Indicators** - Clear visual feedback
- **Accessibility** - Full keyboard and screen reader support

### Touch Gestures
- **Swipe Support** - Recipe cards support left/right swipe gestures
- **Touch Optimized** - All interactions designed for touch devices
- **Responsive Design** - Adapts to all screen sizes

## 🧪 Testing

Chefito includes comprehensive testing for all UI components:

### Running Tests

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run accessibility tests
npm run test:a11y
```

### Test Coverage

- **Button Component** - Variants, interactions, accessibility
- **Input Component** - Validation, icons, keyboard navigation
- **Card Component** - Composition, interactive states
- **Header Component** - Navigation, responsive behavior

### Testing Philosophy

- **Accessibility First** - All components tested for ARIA compliance
- **User Interactions** - Click, keyboard, and focus management
- **Responsive Design** - Mobile and desktop behavior
- **Error States** - Validation and error handling

## 📊 Performance & Analytics

### Lighthouse CI

Automated performance monitoring with configurable thresholds:

```bash
npm run lighthouse
```

**Performance Targets:**
- Performance: 80%+
- Accessibility: 90%+
- Best Practices: 80%+
- SEO: 80%+

### Analytics Tracking

Built-in event tracking for:
- **Page Views** - Automatic tracking on route changes
- **CTA Clicks** - Hero buttons, pricing CTAs
- **Recipe Interactions** - View, collaborate, rate, swipe gestures
- **Voice Assistant** - Start, stop, commands

### Web Vitals Monitoring

Automatic tracking of Core Web Vitals:
- **CLS** - Cumulative Layout Shift
- **FID** - First Input Delay
- **FCP** - First Contentful Paint
- **LCP** - Largest Contentful Paint
- **TTFB** - Time to First Byte

## 🎙️ Voice Assistant

### Features
- **Floating Microphone** - Always accessible in bottom-right corner
- **Visual Feedback** - Pulsing animations and waveforms
- **Real-time Transcript** - Shows what the assistant heard
- **Smart Commands** - Recipe navigation and cooking assistance

### Usage
```typescript
import { useVoiceAssistant } from './hooks/useVoiceAssistant';

const { isListening, startListening, stopListening, transcript } = useVoiceAssistant();
```

## 🔍 SEO & Structured Data

### Features
- **Dynamic Meta Tags** - React Helmet Async for all pages
- **Structured Data** - JSON-LD for recipes, organization, website
- **Hreflang Tags** - Multilingual SEO support
- **Canonical URLs** - Proper URL canonicalization
- **Dynamic Sitemap** - Generated from Supabase data

### Implementation
```typescript
import { generateRecipeStructuredData, generateHreflangTags } from './lib/utils/seo';

// In RecipeDetailPage
const structuredData = generateRecipeStructuredData(recipe);
const hreflangTags = generateHreflangTags(pathname, supportedLanguages);
```

## 🎨 Design System

Chefito uses a comprehensive design system with:

### Color Palette
- **Primary**: Paprika gold (#D35400)
- **Secondary**: Cinnamon (#8B4513)
- **Success**: Wild mint (#7FB069)
- **Warning**: Saffron (#EAB308)
- **Error**: Tomato red (#E74C3C)

### Typography
- **Display**: Crimson Pro (serif)
- **Body**: Inter (sans-serif)
- **Mono**: JetBrains Mono

### Components
All components follow consistent patterns:
- Type-safe variants with CVA
- Accessible by default
- Consistent spacing (8px grid)
- Smooth animations with Framer Motion
- Comprehensive test coverage

## 💰 Pricing Plans

### Free Plan
- 2 recipes per week
- Basic voice assistant
- Recipe search
- Mobile app access

### Standard Plan ($9.99/month)
- Unlimited recipes
- Advanced voice assistant
- Offline access
- Meal planning
- Shopping lists

### Pro Plan ($19.99/month)
- Everything in Standard
- AI cooking coach
- Personalized recommendations
- Advanced analytics
- API access

## 🔒 Security & Privacy

- **Row Level Security** - Database access controlled at row level
- **GDPR Compliant** - Full privacy controls and data portability
- **Secure Authentication** - Supabase Auth with email/password
- **Data Encryption** - All data encrypted in transit and at rest

## 📱 Progressive Web App

Chefito is a full PWA with:
- **Service Worker** - Offline functionality and caching
- **App Manifest** - Install on home screen
- **Push Notifications** - Recipe reminders and updates
- **Background Sync** - Sync data when connection restored
- **Update Notifications** - Non-intrusive update prompts via Toast

## 📱 Responsive Design

Chefito is fully responsive with breakpoints:
- **Mobile**: 320px - 768px (with BottomNavigation)
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## ♿ Accessibility

- **WCAG 2.1 AA** compliant
- **Keyboard navigation** throughout
- **Screen reader** optimized
- **High contrast** support
- **Focus management** for modals and dropdowns
- **Skip links** for main content navigation
- **Automated testing** with axe-core
- **Manual testing** guidelines included

### Accessibility Features

- **Skip Links** - Jump to main content and navigation
- **Focus Management** - Proper focus trapping in modals
- **ARIA Labels** - Comprehensive labeling for screen readers
- **Semantic HTML** - Proper use of headings, landmarks, and roles
- **Color Contrast** - WCAG AA compliant color combinations
- **Keyboard Support** - Full keyboard navigation support

## 🚀 Deployment

### Netlify (Recommended)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables

### Performance Optimization

- **Code Splitting** - Automatic route-based splitting
- **Image Optimization** - Lazy loading with intersection observer
- **Bundle Analysis** - Vite bundle analyzer
- **Lighthouse CI** - Automated performance monitoring
- **Web Vitals** - Real-time performance tracking

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Run Lighthouse audit: `npm run lighthouse`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Code Quality

- **TypeScript** - Strict type checking
- **ESLint** - Code linting with accessibility rules
- **Prettier** - Code formatting
- **Vitest** - Unit testing
- **Lighthouse CI** - Performance auditing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pexels** - Beautiful stock photos
- **Lucide** - Gorgeous icon library
- **Supabase** - Amazing backend platform
- **Lingo.dev** - Professional translation management
- **Vercel** - Inspiration for great developer experience
- **Framer Motion** - Smooth animations
- **Tailwind CSS** - Utility-first styling

## 📞 Support

- 📧 **Email**: hello@chefito.com
- 💬 **Discord**: [Join our community](https://discord.gg/chefito)
- 📖 **Documentation**: [docs.chefito.com](https://docs.chefito.com)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/your-username/chefito/issues)

## 🏆 Hackathon Ready

This project is optimized for hackathon presentations:

- **🎯 Demo-Ready** - Polished UI with smooth animations
- **📊 Analytics** - Built-in event tracking
- **🎙️ Voice Features** - Interactive voice assistant
- **📱 Mobile-First** - Responsive design with touch gestures
- **⚡ Performance** - Lighthouse CI integration
- **🧪 Tested** - Comprehensive test coverage
- **♿ Accessible** - WCAG compliant
- **🌍 International** - Multi-language support with Lingo.dev
- **🔍 SEO-Optimized** - Structured data and hreflang tags

---

<div align="center">
  <p>Made with ❤️ by the Chefito team</p>
  <p>© 2024 Chefito. All rights reserved.</p>
  <p><strong>Ready for Production! 🚀</strong></p>
</div>