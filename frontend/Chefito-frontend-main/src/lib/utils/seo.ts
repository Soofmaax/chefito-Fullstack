/**
 * SEO utilities and structured data helpers
 */

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'recipe';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Generate structured data for recipes
 */
export const generateRecipeStructuredData = (recipe: any) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.description,
    image: recipe.imageUrl,
    author: {
      '@type': 'Person',
      name: recipe.authorName || 'Chefito',
    },
    datePublished: recipe.createdAt,
    dateModified: recipe.updatedAt,
    prepTime: `PT${recipe.cookingTime}M`,
    cookTime: `PT${recipe.cookingTime}M`,
    totalTime: `PT${recipe.cookingTime}M`,
    recipeYield: recipe.servings,
    recipeCategory: recipe.categoryName,
    recipeCuisine: 'International',
    difficulty: recipe.difficulty,
    recipeIngredient: recipe.ingredients?.map((ing: any) => `${ing.amount} ${ing.unit} ${ing.name}`),
    recipeInstructions: recipe.instructions?.map((inst: any, index: number) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: inst.description,
    })),
    nutrition: {
      '@type': 'NutritionInformation',
      servingSize: '1 portion',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: recipe.ratingsAvg,
      ratingCount: recipe.ratingsCount,
    },
    video: recipe.videoUrl ? {
      '@type': 'VideoObject',
      name: `Comment faire ${recipe.title}`,
      description: recipe.description,
      thumbnailUrl: recipe.imageUrl,
      contentUrl: recipe.videoUrl,
    } : undefined,
  };
};

/**
 * Generate structured data for organization
 */
export const generateOrganizationStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Chefito',
    description: 'Your AI-Powered Cooking Assistant',
    url: 'https://chefito.app',
    logo: 'https://chefito.app/logo.png',
    sameAs: [
      'https://twitter.com/chefito',
      'https://facebook.com/chefito',
      'https://instagram.com/chefito',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+33-1-23-45-67-89',
      contactType: 'Customer Service',
      availableLanguage: ['French', 'English', 'Spanish', 'German', 'Italian'],
    },
  };
};

/**
 * Generate structured data for website
 */
export const generateWebsiteStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Chefito',
    description: 'Your AI-Powered Cooking Assistant',
    url: 'https://chefito.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://chefito.app/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
};

/**
 * Generate breadcrumb structured data
 */
export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
};

/**
 * Generate FAQ structured data
 */
export const generateFAQStructuredData = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

/**
 * Generate meta tags for SEO
 */
export const generateMetaTags = (seoData: SEOData) => {
  const tags = [
    { name: 'description', content: seoData.description },
    { name: 'keywords', content: seoData.keywords?.join(', ') },
    
    // Open Graph
    { property: 'og:title', content: seoData.title },
    { property: 'og:description', content: seoData.description },
    { property: 'og:type', content: seoData.type || 'website' },
    { property: 'og:url', content: seoData.url },
    { property: 'og:image', content: seoData.image },
    { property: 'og:site_name', content: 'Chefito' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: seoData.title },
    { name: 'twitter:description', content: seoData.description },
    { name: 'twitter:image', content: seoData.image },
    
    // Article specific
    ...(seoData.type === 'article' ? [
      { property: 'article:author', content: seoData.author },
      { property: 'article:published_time', content: seoData.publishedTime },
      { property: 'article:modified_time', content: seoData.modifiedTime },
    ] : []),
  ];

  return tags.filter(tag => tag.content);
};

/**
 * Generate canonical URL
 */
export const generateCanonicalUrl = (path: string) => {
  const baseUrl = 'https://chefito.app';
  return `${baseUrl}${path}`;
};

/**
 * Generate hreflang tags for multilingual SEO
 */
export const generateHreflangTags = (path: string, languages: string[]) => {
  const baseUrl = 'https://chefito.app';
  
  return languages.map(lang => ({
    rel: 'alternate',
    hreflang: lang,
    href: `${baseUrl}/${lang}${path}`,
  }));
};

/**
 * Validate and clean URL for SEO
 */
export const cleanUrl = (url: string) => {
  return url
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Generate sitemap entry
 */
export const generateSitemapEntry = (url: string, lastmod?: string, changefreq?: string, priority?: string) => {
  return {
    url,
    lastmod: lastmod || new Date().toISOString().split('T')[0],
    changefreq: changefreq || 'weekly',
    priority: priority || '0.5',
  };
};