/*
  # Fix JSONB column structure for multilingual support

  1. Problem Analysis
    - The columns are already JSONB type but may contain invalid data
    - Need to ensure proper multilingual structure: {"fr": "text", "en": "text"}
    - Handle any malformed JSONB data gracefully

  2. Solution
    - Create functions to safely convert existing JSONB to proper multilingual format
    - Ensure all required fields have French fallbacks
    - Maintain data integrity throughout the process

  3. Changes
    - Standardize JSONB structure for multilingual support
    - Add proper constraints and defaults
    - Recreate dependent views
*/

-- Step 1: Drop the dependent view first
DROP VIEW IF EXISTS public.recipes_with_categories;

-- Step 2: Create a safe function to normalize JSONB to multilingual format
CREATE OR REPLACE FUNCTION normalize_multilingual_jsonb(
  input_jsonb jsonb, 
  fallback_text text DEFAULT '',
  lang_code text DEFAULT 'fr'
)
RETURNS jsonb
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE
  result jsonb;
  text_value text;
BEGIN
  -- Handle NULL input
  IF input_jsonb IS NULL THEN
    IF fallback_text = '' THEN
      RETURN '{}'::jsonb;
    ELSE
      RETURN jsonb_build_object(lang_code, fallback_text);
    END IF;
  END IF;
  
  -- If it's already a proper multilingual object, return as is
  IF jsonb_typeof(input_jsonb) = 'object' AND input_jsonb ? lang_code THEN
    RETURN input_jsonb;
  END IF;
  
  -- If it's a string value, convert to multilingual format
  IF jsonb_typeof(input_jsonb) = 'string' THEN
    text_value := input_jsonb #>> '{}';
    IF text_value IS NULL OR trim(text_value) = '' THEN
      IF fallback_text = '' THEN
        RETURN '{}'::jsonb;
      ELSE
        RETURN jsonb_build_object(lang_code, fallback_text);
      END IF;
    ELSE
      RETURN jsonb_build_object(lang_code, trim(text_value));
    END IF;
  END IF;
  
  -- If it's an empty object and we have fallback text
  IF input_jsonb = '{}'::jsonb AND fallback_text != '' THEN
    RETURN jsonb_build_object(lang_code, fallback_text);
  END IF;
  
  -- Return the input as is if it's already valid
  RETURN input_jsonb;
  
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

-- Step 3: Create a function to safely extract text from JSONB
CREATE OR REPLACE FUNCTION safe_jsonb_to_text(input_jsonb jsonb)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  -- Handle NULL
  IF input_jsonb IS NULL THEN
    RETURN '';
  END IF;
  
  -- If it's a string, extract it
  IF jsonb_typeof(input_jsonb) = 'string' THEN
    RETURN input_jsonb #>> '{}';
  END IF;
  
  -- If it's an object, try to get French text first, then any text
  IF jsonb_typeof(input_jsonb) = 'object' THEN
    IF input_jsonb ? 'fr' THEN
      RETURN input_jsonb ->> 'fr';
    ELSIF input_jsonb ? 'en' THEN
      RETURN input_jsonb ->> 'en';
    ELSE
      -- Get the first available text value
      RETURN (SELECT value FROM jsonb_each_text(input_jsonb) LIMIT 1);
    END IF;
  END IF;
  
  RETURN '';
EXCEPTION
  WHEN OTHERS THEN
    RETURN '';
END;
$$;

-- Step 4: Add temporary columns for the conversion
ALTER TABLE public.recipes ADD COLUMN title_temp jsonb;
ALTER TABLE public.recipes ADD COLUMN description_temp jsonb;
ALTER TABLE public.categories ADD COLUMN name_temp jsonb;
ALTER TABLE public.categories ADD COLUMN description_temp jsonb;

-- Step 5: Populate temporary columns with normalized data
-- For recipes.title (should not be empty)
UPDATE public.recipes 
SET title_temp = normalize_multilingual_jsonb(title, 'Recette sans titre', 'fr');

-- For recipes.description (can be empty)
UPDATE public.recipes 
SET description_temp = normalize_multilingual_jsonb(description, '', 'fr');

-- For categories.name (should not be empty)
UPDATE public.categories 
SET name_temp = normalize_multilingual_jsonb(name, 'Catégorie sans nom', 'fr');

-- For categories.description (can be empty)
UPDATE public.categories 
SET description_temp = normalize_multilingual_jsonb(description, '', 'fr');

-- Step 6: Verify all conversions were successful
DO $$
DECLARE
  recipe_count integer;
  category_count integer;
  recipe_empty_titles integer;
  category_empty_names integer;
BEGIN
  SELECT COUNT(*) INTO recipe_count FROM public.recipes WHERE title_temp IS NULL OR description_temp IS NULL;
  SELECT COUNT(*) INTO category_count FROM public.categories WHERE name_temp IS NULL OR description_temp IS NULL;
  
  -- Check for empty required fields
  SELECT COUNT(*) INTO recipe_empty_titles 
  FROM public.recipes 
  WHERE title_temp = '{}'::jsonb OR safe_jsonb_to_text(title_temp) = '';
  
  SELECT COUNT(*) INTO category_empty_names 
  FROM public.categories 
  WHERE name_temp = '{}'::jsonb OR safe_jsonb_to_text(name_temp) = '';
  
  IF recipe_count > 0 OR category_count > 0 THEN
    RAISE EXCEPTION 'Data conversion failed: % recipes and % categories have NULL temp columns', recipe_count, category_count;
  END IF;
  
  IF recipe_empty_titles > 0 THEN
    RAISE EXCEPTION 'Found % recipes with empty titles after conversion', recipe_empty_titles;
  END IF;
  
  IF category_empty_names > 0 THEN
    RAISE EXCEPTION 'Found % categories with empty names after conversion', category_empty_names;
  END IF;
END $$;

-- Step 7: Drop old columns and rename temporary columns
ALTER TABLE public.recipes DROP COLUMN title CASCADE;
ALTER TABLE public.recipes DROP COLUMN description CASCADE;
ALTER TABLE public.categories DROP COLUMN name CASCADE;
ALTER TABLE public.categories DROP COLUMN description CASCADE;

ALTER TABLE public.recipes RENAME COLUMN title_temp TO title;
ALTER TABLE public.recipes RENAME COLUMN description_temp TO description;
ALTER TABLE public.categories RENAME COLUMN name_temp TO name;
ALTER TABLE public.categories RENAME COLUMN description_temp TO description;

-- Step 8: Set constraints and defaults
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

-- Step 9: Ensure no NULL values remain
UPDATE public.recipes 
SET description = '{}'::jsonb 
WHERE description IS NULL;

UPDATE public.categories 
SET description = '{}'::jsonb 
WHERE description IS NULL;

-- Step 10: Recreate the recipes_with_categories view
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

-- Step 11: Grant appropriate permissions on the recreated view
GRANT SELECT ON public.recipes_with_categories TO authenticated;
GRANT SELECT ON public.recipes_with_categories TO anon;

-- Step 12: Clean up the helper functions
DROP FUNCTION IF EXISTS normalize_multilingual_jsonb(jsonb, text, text);
DROP FUNCTION IF EXISTS safe_jsonb_to_text(jsonb);

-- Step 13: Add helpful comments to the new columns
COMMENT ON COLUMN public.recipes.title IS 'Recipe title in multiple languages (JSONB format: {"fr": "Titre", "en": "Title"})';
COMMENT ON COLUMN public.recipes.description IS 'Recipe description in multiple languages (JSONB format: {"fr": "Description", "en": "Description"})';
COMMENT ON COLUMN public.categories.name IS 'Category name in multiple languages (JSONB format: {"fr": "Nom", "en": "Name"})';
COMMENT ON COLUMN public.categories.description IS 'Category description in multiple languages (JSONB format: {"fr": "Description", "en": "Description"})';

-- Step 14: Add indexes for better performance on multilingual queries
CREATE INDEX IF NOT EXISTS idx_recipes_title_fr ON public.recipes USING GIN ((title->'fr'));
CREATE INDEX IF NOT EXISTS idx_recipes_title_en ON public.recipes USING GIN ((title->'en'));
CREATE INDEX IF NOT EXISTS idx_categories_name_fr ON public.categories USING GIN ((name->'fr'));
CREATE INDEX IF NOT EXISTS idx_categories_name_en ON public.categories USING GIN ((name->'en'));