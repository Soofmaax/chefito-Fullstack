/*
  # Convert text columns to JSONB for multilingual support

  1. Database Changes
    - Convert recipes.title from text to jsonb
    - Convert recipes.description from text to jsonb  
    - Convert categories.name from text to jsonb
    - Convert categories.description from text to jsonb

  2. Data Migration
    - Wrap existing text content in French locale object
    - Handle NULL and empty values appropriately
    - Use safe conversion methods to avoid JSON parsing errors

  3. View Updates
    - Recreate recipes_with_categories view with new column types
    - Maintain all existing functionality

  4. Security
    - Preserve existing RLS policies
    - Maintain view permissions
*/

-- Step 1: Drop the dependent view first
DROP VIEW IF EXISTS public.recipes_with_categories;

-- Step 2: Create a safe function to convert text to jsonb
CREATE OR REPLACE FUNCTION safe_text_to_jsonb(input_text text, lang_code text DEFAULT 'fr', fallback_text text DEFAULT '')
RETURNS jsonb
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  -- Handle NULL or empty input
  IF input_text IS NULL OR length(trim(input_text)) = 0 THEN
    IF fallback_text = '' THEN
      RETURN '{}'::jsonb;
    ELSE
      RETURN jsonb_build_object(lang_code, fallback_text);
    END IF;
  END IF;
  
  -- Clean the input text to avoid JSON issues
  input_text := trim(input_text);
  
  -- Build the jsonb object safely
  RETURN jsonb_build_object(lang_code, input_text);
EXCEPTION
  WHEN OTHERS THEN
    -- If anything goes wrong, return fallback
    IF fallback_text = '' THEN
      RETURN '{}'::jsonb;
    ELSE
      RETURN jsonb_build_object(lang_code, fallback_text);
    END IF;
END;
$$;

-- Step 3: Add temporary columns for the conversion
ALTER TABLE public.recipes ADD COLUMN title_temp jsonb;
ALTER TABLE public.recipes ADD COLUMN description_temp jsonb;
ALTER TABLE public.categories ADD COLUMN name_temp jsonb;
ALTER TABLE public.categories ADD COLUMN description_temp jsonb;

-- Step 4: Populate temporary columns using the safe conversion function
-- For recipes.title (should not be empty)
UPDATE public.recipes 
SET title_temp = safe_text_to_jsonb(title, 'fr', 'Recette sans titre');

-- For recipes.description (can be empty)
UPDATE public.recipes 
SET description_temp = safe_text_to_jsonb(description, 'fr', '');

-- For categories.name (should not be empty)
UPDATE public.categories 
SET name_temp = safe_text_to_jsonb(name, 'fr', 'Catégorie sans nom');

-- For categories.description (can be empty)
UPDATE public.categories 
SET description_temp = safe_text_to_jsonb(description, 'fr', '');

-- Step 5: Verify all conversions were successful
DO $$
DECLARE
  recipe_count integer;
  category_count integer;
BEGIN
  SELECT COUNT(*) INTO recipe_count FROM public.recipes WHERE title_temp IS NULL OR description_temp IS NULL;
  SELECT COUNT(*) INTO category_count FROM public.categories WHERE name_temp IS NULL OR description_temp IS NULL;
  
  IF recipe_count > 0 OR category_count > 0 THEN
    RAISE EXCEPTION 'Data conversion failed: % recipes and % categories have NULL temp columns', recipe_count, category_count;
  END IF;
END $$;

-- Step 6: Drop old columns and rename temporary columns
ALTER TABLE public.recipes DROP COLUMN title CASCADE;
ALTER TABLE public.recipes DROP COLUMN description CASCADE;
ALTER TABLE public.categories DROP COLUMN name CASCADE;
ALTER TABLE public.categories DROP COLUMN description CASCADE;

ALTER TABLE public.recipes RENAME COLUMN title_temp TO title;
ALTER TABLE public.recipes RENAME COLUMN description_temp TO description;
ALTER TABLE public.categories RENAME COLUMN name_temp TO name;
ALTER TABLE public.categories RENAME COLUMN description_temp TO description;

-- Step 7: Set constraints and defaults
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

-- Step 8: Recreate the recipes_with_categories view
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

-- Step 9: Grant appropriate permissions on the recreated view
GRANT SELECT ON public.recipes_with_categories TO authenticated;
GRANT SELECT ON public.recipes_with_categories TO anon;

-- Step 10: Clean up the helper function
DROP FUNCTION IF EXISTS safe_text_to_jsonb(text, text, text);

-- Step 11: Add helpful comments to the new columns
COMMENT ON COLUMN public.recipes.title IS 'Recipe title in multiple languages (JSONB format: {"fr": "Titre", "en": "Title"})';
COMMENT ON COLUMN public.recipes.description IS 'Recipe description in multiple languages (JSONB format: {"fr": "Description", "en": "Description"})';
COMMENT ON COLUMN public.categories.name IS 'Category name in multiple languages (JSONB format: {"fr": "Nom", "en": "Name"})';
COMMENT ON COLUMN public.categories.description IS 'Category description in multiple languages (JSONB format: {"fr": "Description", "en": "Description"})';