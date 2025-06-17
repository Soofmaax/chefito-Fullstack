#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration du site
const SITE_URL = 'https://chefito.app';
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

// Pages statiques
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/recipes', priority: '0.9', changefreq: 'daily' },
  { url: '/search', priority: '0.8', changefreq: 'weekly' },
  { url: '/pricing', priority: '0.8', changefreq: 'monthly' },
  { url: '/about', priority: '0.7', changefreq: 'monthly' },
  { url: '/contact', priority: '0.6', changefreq: 'monthly' },
  { url: '/login', priority: '0.5', changefreq: 'yearly' },
  { url: '/signup', priority: '0.5', changefreq: 'yearly' },
  { url: '/legal/privacy', priority: '0.3', changefreq: 'yearly' },
  { url: '/legal/terms', priority: '0.3', changefreq: 'yearly' },
  { url: '/legal/cookies', priority: '0.3', changefreq: 'yearly' },
];

/**
 * Initialiser le client Supabase
 */
async function initSupabase() {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.warn('⚠️  Variables d\'environnement Supabase manquantes. Utilisation des données d\'exemple.');
      return null;
    }
    
    return createClient(supabaseUrl, supabaseKey);
  } catch (error) {
    console.warn('⚠️  Impossible d\'initialiser Supabase:', error.message);
    return null;
  }
}

/**
 * Récupérer les catégories depuis Supabase
 */
async function fetchCategories(supabase) {
  if (!supabase) return [];
  
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id, slug, updated_at')
      .order('slug');
    
    if (error) {
      console.warn('⚠️  Erreur lors de la récupération des catégories:', error.message);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.warn('⚠️  Erreur lors de la récupération des catégories:', error.message);
    return [];
  }
}

/**
 * Récupérer les recettes approuvées depuis Supabase
 */
async function fetchRecipes(supabase) {
  if (!supabase) return [];
  
  try {
    const { data, error } = await supabase
      .from('recipes_with_categories')
      .select('slug, category_slug, updated_at, created_at')
      .eq('approved', true)
      .order('updated_at', { ascending: false });
    
    if (error) {
      console.warn('⚠️  Erreur lors de la récupération des recettes:', error.message);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.warn('⚠️  Erreur lors de la récupération des recettes:', error.message);
    return [];
  }
}

/**
 * Données d'exemple en cas d'échec de connexion à Supabase
 */
function getExampleData() {
  return {
    categories: [
      { slug: 'entrees', updated_at: '2024-01-15T10:00:00Z' },
      { slug: 'plats-principaux', updated_at: '2024-01-15T10:00:00Z' },
      { slug: 'desserts', updated_at: '2024-01-15T10:00:00Z' },
      { slug: 'boissons', updated_at: '2024-01-15T10:00:00Z' },
    ],
    recipes: [
      { 
        slug: 'pasta-carbonara', 
        category_slug: 'plats-principaux', 
        updated_at: '2024-01-15T10:00:00Z' 
      },
      { 
        slug: 'tiramisu-classique', 
        category_slug: 'desserts', 
        updated_at: '2024-01-14T10:00:00Z' 
      },
      { 
        slug: 'salade-cesar', 
        category_slug: 'entrees', 
        updated_at: '2024-01-13T10:00:00Z' 
      },
      { 
        slug: 'smoothie-mangue', 
        category_slug: 'boissons', 
        updated_at: '2024-01-12T10:00:00Z' 
      },
    ]
  };
}

/**
 * Formater la date pour le sitemap
 */
function formatDate(dateString) {
  if (!dateString) return new Date().toISOString().split('T')[0];
  return new Date(dateString).toISOString().split('T')[0];
}

/**
 * Générer le XML du sitemap
 */
function generateSitemap(categories, recipes) {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Ajouter les pages statiques
  staticPages.forEach(page => {
    xml += `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Ajouter les pages de catégories
  categories.forEach(category => {
    xml += `
  <url>
    <loc>${SITE_URL}/recipes?category=${category.slug}</loc>
    <lastmod>${formatDate(category.updated_at)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  // Ajouter les pages de recettes
  recipes.forEach(recipe => {
    if (recipe.category_slug && recipe.slug) {
      xml += `
  <url>
    <loc>${SITE_URL}/recipes/${recipe.category_slug}/${recipe.slug}</loc>
    <lastmod>${formatDate(recipe.updated_at || recipe.created_at)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }
  });

  xml += `
</urlset>`;

  return xml;
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🚀 Génération du sitemap...');
  
  // Initialiser Supabase
  const supabase = await initSupabase();
  
  let categories = [];
  let recipes = [];
  
  if (supabase) {
    console.log('✅ Connexion à Supabase établie');
    
    // Récupérer les données depuis Supabase
    [categories, recipes] = await Promise.all([
      fetchCategories(supabase),
      fetchRecipes(supabase)
    ]);
    
    console.log(`📂 ${categories.length} catégories récupérées`);
    console.log(`📄 ${recipes.length} recettes récupérées`);
  } else {
    console.log('📝 Utilisation des données d\'exemple');
    const exampleData = getExampleData();
    categories = exampleData.categories;
    recipes = exampleData.recipes;
  }
  
  // Créer le répertoire public s'il n'existe pas
  const publicDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Générer et écrire le sitemap
  try {
    const sitemapXml = generateSitemap(categories, recipes);
    fs.writeFileSync(OUTPUT_PATH, sitemapXml, 'utf8');
    
    const totalUrls = staticPages.length + categories.length + recipes.length;
    console.log(`✅ Sitemap généré avec succès: ${OUTPUT_PATH}`);
    console.log(`📊 Total des URLs: ${totalUrls}`);
    console.log(`   - Pages statiques: ${staticPages.length}`);
    console.log(`   - Catégories: ${categories.length}`);
    console.log(`   - Recettes: ${recipes.length}`);
    
    // Valider le XML généré
    if (sitemapXml.includes('<url>') && sitemapXml.includes('</urlset>')) {
      console.log('✅ Structure XML valide');
    } else {
      console.warn('⚠️  Structure XML potentiellement invalide');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la génération du sitemap:', error);
    process.exit(1);
  }
}

// Exécuter le script
if (process.argv[1] === __filename) {
  main().catch(error => {
    console.error('❌ Erreur fatale:', error);
    process.exit(1);
  });
}

export { main, generateSitemap };