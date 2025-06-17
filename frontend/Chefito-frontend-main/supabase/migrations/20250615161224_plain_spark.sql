/*
  # Migration vers support multilingue

  1. Modifications des tables
    - Conversion des colonnes `title` et `description` de la table `recipes` vers jsonb
    - Conversion des colonnes `name` et `description` de la table `categories` vers jsonb
    - Conservation des données existantes en français avec la clé 'fr'

  2. Sécurité
    - Aucune modification des politiques RLS existantes
    - Les contraintes d'unicité restent inchangées pour les slugs

  3. Notes importantes
    - Les données existantes seront préservées et converties au format jsonb
    - Le slug reste en format text pour maintenir la compatibilité des URLs
    - Cette migration est réversible si nécessaire
*/

-- Étape 1: Supprimer la vue qui dépend des colonnes à modifier
DROP VIEW IF EXISTS public.recipes_with_categories;

-- Étape 2: Conversion de la table recipes
ALTER TABLE public.recipes
ALTER COLUMN title TYPE jsonb USING jsonb_build_object('fr', title);

ALTER TABLE public.recipes
ALTER COLUMN description TYPE jsonb USING jsonb_build_object('fr', COALESCE(description, ''));

-- Étape 3: Conversion de la table categories
ALTER TABLE public.categories
ALTER COLUMN name TYPE jsonb USING jsonb_build_object('fr', name);

ALTER TABLE public.categories
ALTER COLUMN description TYPE jsonb USING jsonb_build_object('fr', COALESCE(description, ''));

-- Étape 4: Mise à jour des contraintes pour s'assurer que les champs jsonb ne sont pas null
ALTER TABLE public.recipes
ALTER COLUMN title SET NOT NULL;

ALTER TABLE public.recipes
ALTER COLUMN description SET DEFAULT '{}'::jsonb;

ALTER TABLE public.categories
ALTER COLUMN name SET NOT NULL;

ALTER TABLE public.categories
ALTER COLUMN description SET DEFAULT '{}'::jsonb;

-- Étape 5: Recréer la vue avec les nouveaux types de colonnes
CREATE VIEW public.recipes_with_categories AS
SELECT 
  r.id,
  r.title,
  r.slug,
  r.description,
  r.ingredients,
  r.instructions,
  r.cooking_time,
  r.servings,
  r.difficulty,
  r.tags,
  r.image_url,
  r.category_id,
  r.author_id,
  r.approved,
  r.featured,
  r.views,
  r.ratings_avg,
  r.ratings_count,
  r.created_at,
  r.updated_at,
  c.name as category_name,
  c.slug as category_slug
FROM public.recipes r
LEFT JOIN public.categories c ON r.category_id = c.id;

-- Étape 6: Accorder les permissions appropriées sur la vue recréée
GRANT SELECT ON public.recipes_with_categories TO authenticated;
GRANT SELECT ON public.recipes_with_categories TO anon;