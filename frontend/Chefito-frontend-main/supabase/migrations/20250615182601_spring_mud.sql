/*
  # Convert text columns to JSONB for multilingual support

  1. Database Changes
    - Convert recipes.title from text to jsonb
    - Convert recipes.description from text to jsonb  
    - Convert categories.name from text to jsonb
    - Convert categories.description from text to jsonb

  2. Data Migration
    - Preserve existing French content as default language
    - Handle NULL and empty values appropriately
    - Maintain data integrity during conversion

  3. View Recreation
    - Recreate recipes_with_categories view with new column types
    - Maintain all existing functionality
*/

-- Step 1: Drop the dependent view first
DROP VIEW IF EXISTS public.recipes_with_categories;

-- Step 2: Add temporary columns for the conversion
ALTER TABLE public.recipes ADD COLUMN title_temp jsonb;
ALTER TABLE public.recipes ADD COLUMN description_temp jsonb;
ALTER TABLE public.categories ADD COLUMN name_temp jsonb;
ALTER TABLE public.categories ADD COLUMN description_temp jsonb;

-- Step 3: Populate temporary columns with converted data using jsonb_build_object
-- For recipes.title (should not be empty)
UPDATE public.recipes 
SET title_temp = CASE 
  WHEN title IS NULL OR title = '' THEN 
    jsonb_build_object('fr', 'Recette sans titre')
  ELSE 
    jsonb_build_object('fr', title)
END;

-- For recipes.description (can be empty)
UPDATE public.recipes 
SET description_temp = CASE 
  WHEN description IS NULL OR description = '' THEN 
    '{}'::jsonb
  ELSE 
    jsonb_build_object('fr', description)
END;

-- For categories.name (should not be empty)
UPDATE public.categories 
SET name_temp = CASE 
  WHEN name IS NULL OR name = '' THEN 
    jsonb_build_object('fr', 'Catégorie sans nom')
  ELSE 
    jsonb_build_object('fr', name)
END;

-- For categories.description (can be empty)
UPDATE public.categories 
SET description_temp = CASE 
  WHEN description IS NULL OR description = '' THEN 
    '{}'::jsonb
  ELSE 
    jsonb_build_object('fr', description)
END;

-- Step 4: Drop old columns and rename temporary columns
ALTER TABLE public.recipes DROP COLUMN title;
ALTER TABLE public.recipes DROP COLUMN description;
ALTER TABLE public.categories DROP COLUMN name;
ALTER TABLE public.categories DROP COLUMN description;

ALTER TABLE public.recipes RENAME COLUMN title_temp TO title;
ALTER TABLE public.recipes RENAME COLUMN description_temp TO description;
ALTER TABLE public.categories RENAME COLUMN name_temp TO name;
ALTER TABLE public.categories RENAME COLUMN description_temp TO description;

-- Step 5: Set constraints and defaults
ALTER TABLE public.recipes 
ALTER COLUMN title SET NOT NULL;

ALTER TABLE public.recipes 
ALTER COLUMN description SET DEFAULT '{}'::jsonb;

ALTER TABLE public.recipes 
ALTER COLUMN description SET NOT NULL;

ALTER TABLE public.categories 
ALTER COLUMN name SET NOT NULL;

ALTER TABLE public.categories 
ALTER COLUMN description SET DEFAULT '{}'::jsonb;

ALTER TABLE public.categories 
ALTER COLUMN description SET NOT NULL;

-- Step 6: Ensure no NULL values remain
UPDATE public.recipes 
SET description = '{}'::jsonb 
WHERE description IS NULL;

UPDATE public.categories 
SET description = '{}'::jsonb 
WHERE description IS NULL;

-- Step 7: Recreate the recipes_with_categories view
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

-- Step 8: Grant appropriate permissions on the recreated view
GRANT SELECT ON public.recipes_with_categories TO authenticated;
GRANT SELECT ON public.recipes_with_categories TO anon;