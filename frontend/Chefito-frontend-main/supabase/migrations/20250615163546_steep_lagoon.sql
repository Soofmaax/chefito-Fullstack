/*
  # Convert text columns to jsonb for multilingual support

  1. Database Changes
    - Convert recipes.title from text to jsonb
    - Convert recipes.description from text to jsonb  
    - Convert categories.name from text to jsonb
    - Convert categories.description from text to jsonb

  2. Data Migration
    - Preserve existing French content as 'fr' key in JSON objects
    - Handle empty strings and null values properly
    - Maintain data integrity during conversion

  3. View Updates
    - Recreate recipes_with_categories view with new column types
    - Maintain same functionality with updated schema

  4. Constraints
    - Set appropriate NOT NULL constraints
    - Set default values for optional fields
*/

-- Step 1: Drop the dependent view
DROP VIEW IF EXISTS public.recipes_with_categories;

-- Step 2: Convert recipes table columns to jsonb
-- Handle title conversion (should not be empty)
ALTER TABLE public.recipes
ALTER COLUMN title TYPE jsonb USING 
  CASE 
    WHEN title IS NULL OR title = '' THEN '{"fr": "Recette sans titre"}'::jsonb
    ELSE jsonb_build_object('fr', title)
  END;

-- Handle description conversion (can be empty)
ALTER TABLE public.recipes
ALTER COLUMN description TYPE jsonb USING 
  CASE 
    WHEN description IS NULL OR description = '' THEN '{}'::jsonb
    ELSE jsonb_build_object('fr', description)
  END;

-- Step 3: Convert categories table columns to jsonb
-- Handle name conversion (should not be empty)
ALTER TABLE public.categories
ALTER COLUMN name TYPE jsonb USING 
  CASE 
    WHEN name IS NULL OR name = '' THEN '{"fr": "Catégorie sans nom"}'::jsonb
    ELSE jsonb_build_object('fr', name)
  END;

-- Handle description conversion (can be empty)
ALTER TABLE public.categories
ALTER COLUMN description TYPE jsonb USING 
  CASE 
    WHEN description IS NULL OR description = '' THEN '{}'::jsonb
    ELSE jsonb_build_object('fr', description)
  END;

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