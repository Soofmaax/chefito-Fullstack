/*
  # Fix multilingual support migration

  This migration converts text columns to jsonb for multilingual support while handling view dependencies.

  1. Database Changes
    - Drop dependent view `recipes_with_categories`
    - Convert `recipes.title` and `recipes.description` to jsonb format
    - Convert `categories.name` and `categories.description` to jsonb format
    - Preserve existing French content with 'fr' key
    - Recreate the view with updated column types

  2. Data Preservation
    - All existing data is preserved in French ('fr' key)
    - Default values set for new jsonb columns
    - Constraints maintained for data integrity
*/

-- Step 1: Drop the dependent view
DROP VIEW IF EXISTS public.recipes_with_categories;

-- Step 2: Convert recipes table columns to jsonb
ALTER TABLE public.recipes
ALTER COLUMN title TYPE jsonb USING jsonb_build_object('fr', title);

ALTER TABLE public.recipes
ALTER COLUMN description TYPE jsonb USING jsonb_build_object('fr', COALESCE(description, ''));

-- Step 3: Convert categories table columns to jsonb
ALTER TABLE public.categories
ALTER COLUMN name TYPE jsonb USING jsonb_build_object('fr', name);

ALTER TABLE public.categories
ALTER COLUMN description TYPE jsonb USING jsonb_build_object('fr', COALESCE(description, ''));

-- Step 4: Update constraints and defaults
ALTER TABLE public.recipes
ALTER COLUMN title SET NOT NULL;

ALTER TABLE public.recipes
ALTER COLUMN description SET DEFAULT '{}'::jsonb;

ALTER TABLE public.categories
ALTER COLUMN name SET NOT NULL;

ALTER TABLE public.categories
ALTER COLUMN description SET DEFAULT '{}'::jsonb;

-- Step 5: Recreate the recipes_with_categories view with updated column types
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

-- Step 6: Grant appropriate permissions on the recreated view
GRANT SELECT ON public.recipes_with_categories TO authenticated;
GRANT SELECT ON public.recipes_with_categories TO anon;