/*
  # Convert text columns to JSONB for multilingual support

  1. Database Changes
    - Convert `recipes.title` from text to jsonb
    - Convert `recipes.description` from text to jsonb  
    - Convert `categories.name` from text to jsonb
    - Convert `categories.description` from text to jsonb
    - Recreate dependent view `recipes_with_categories`

  2. Data Migration
    - Preserve existing text data by wrapping in French locale object
    - Handle NULL and empty values appropriately
    - Set proper defaults and constraints

  3. Security
    - Maintain existing RLS policies
    - Preserve view permissions
*/

-- Step 1: Drop the dependent view first
DROP VIEW IF EXISTS public.recipes_with_categories;

-- Step 2: Add temporary columns for the conversion
ALTER TABLE public.recipes ADD COLUMN title_temp jsonb;
ALTER TABLE public.recipes ADD COLUMN description_temp jsonb;
ALTER TABLE public.categories ADD COLUMN name_temp jsonb;
ALTER TABLE public.categories ADD COLUMN description_temp jsonb;

-- Step 3: Populate temporary columns with converted data
UPDATE public.recipes 
SET title_temp = CASE 
  WHEN title IS NULL OR trim(title) = '' THEN 
    '{"fr": "Recette sans titre"}'::jsonb
  ELSE 
    ('{"fr": "' || replace(replace(title, '"', '\"'), E'\n', '\\n') || '"}')::jsonb
END;

UPDATE public.recipes 
SET description_temp = CASE 
  WHEN description IS NULL OR trim(description) = '' THEN 
    '{}'::jsonb
  ELSE 
    ('{"fr": "' || replace(replace(description, '"', '\"'), E'\n', '\\n') || '"}')::jsonb
END;

UPDATE public.categories 
SET name_temp = CASE 
  WHEN name IS NULL OR trim(name) = '' THEN 
    '{"fr": "Catégorie sans nom"}'::jsonb
  ELSE 
    ('{"fr": "' || replace(replace(name, '"', '\"'), E'\n', '\\n') || '"}')::jsonb
END;

UPDATE public.categories 
SET description_temp = CASE 
  WHEN description IS NULL OR trim(description) = '' THEN 
    '{}'::jsonb
  ELSE 
    ('{"fr": "' || replace(replace(description, '"', '\"'), E'\n', '\\n') || '"}')::jsonb
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

-- Step 6: Recreate the recipes_with_categories view
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

-- Step 7: Grant appropriate permissions on the recreated view
GRANT SELECT ON public.recipes_with_categories TO authenticated;
GRANT SELECT ON public.recipes_with_categories TO anon;

-- Step 8: Update any NULL description fields to empty JSONB
UPDATE public.recipes 
SET description = '{}'::jsonb 
WHERE description IS NULL;

UPDATE public.categories 
SET description = '{}'::jsonb 
WHERE description IS NULL;