/*
  # Convert text columns to multilingual JSONB format

  1. Database Changes
    - Convert recipes.title from text to jsonb
    - Convert recipes.description from text to jsonb  
    - Convert categories.name from text to jsonb
    - Convert categories.description from text to jsonb

  2. Data Migration
    - Preserve existing data by wrapping in French language object
    - Set appropriate defaults for empty fields

  3. Performance
    - Recreate dependent views
    - Add basic indexes for multilingual queries
*/

-- Step 1: Drop dependent view
DROP VIEW IF EXISTS public.recipes_with_categories;

-- Step 2: Simple conversion without complex validation
-- Convert recipes.title (assuming it might already be jsonb or text)
DO $$
BEGIN
  -- Add temp column
  ALTER TABLE public.recipes ADD COLUMN title_new jsonb;
  
  -- Simple conversion - if it's already jsonb, keep it, otherwise wrap in French
  UPDATE public.recipes 
  SET title_new = CASE 
    WHEN title IS NULL THEN '{"fr": "Recette sans titre"}'::jsonb
    WHEN jsonb_typeof(title) = 'object' THEN title
    ELSE jsonb_build_object('fr', COALESCE(title->>'', 'Recette sans titre'))
  END;
  
  -- Replace column
  ALTER TABLE public.recipes DROP COLUMN title;
  ALTER TABLE public.recipes RENAME COLUMN title_new TO title;
  ALTER TABLE public.recipes ALTER COLUMN title SET NOT NULL;
END $$;

-- Step 3: Convert recipes.description
DO $$
BEGIN
  -- Add temp column
  ALTER TABLE public.recipes ADD COLUMN description_new jsonb;
  
  -- Simple conversion
  UPDATE public.recipes 
  SET description_new = CASE 
    WHEN description IS NULL THEN '{}'::jsonb
    WHEN jsonb_typeof(description) = 'object' THEN description
    ELSE CASE 
      WHEN description->>'{}' = '' OR description->>'{}' IS NULL THEN '{}'::jsonb
      ELSE jsonb_build_object('fr', description->>'{}')
    END
  END;
  
  -- Replace column
  ALTER TABLE public.recipes DROP COLUMN description;
  ALTER TABLE public.recipes RENAME COLUMN description_new TO description;
  ALTER TABLE public.recipes ALTER COLUMN description SET NOT NULL;
  ALTER TABLE public.recipes ALTER COLUMN description SET DEFAULT '{}'::jsonb;
END $$;

-- Step 4: Convert categories.name
DO $$
BEGIN
  -- Add temp column
  ALTER TABLE public.categories ADD COLUMN name_new jsonb;
  
  -- Simple conversion
  UPDATE public.categories 
  SET name_new = CASE 
    WHEN name IS NULL THEN '{"fr": "Catégorie sans nom"}'::jsonb
    WHEN jsonb_typeof(name) = 'object' THEN name
    ELSE jsonb_build_object('fr', COALESCE(name->>'', 'Catégorie sans nom'))
  END;
  
  -- Replace column
  ALTER TABLE public.categories DROP COLUMN name;
  ALTER TABLE public.categories RENAME COLUMN name_new TO name;
  ALTER TABLE public.categories ALTER COLUMN name SET NOT NULL;
END $$;

-- Step 5: Convert categories.description
DO $$
BEGIN
  -- Add temp column
  ALTER TABLE public.categories ADD COLUMN description_new jsonb;
  
  -- Simple conversion
  UPDATE public.categories 
  SET description_new = CASE 
    WHEN description IS NULL THEN '{}'::jsonb
    WHEN jsonb_typeof(description) = 'object' THEN description
    ELSE CASE 
      WHEN description->>'{}' = '' OR description->>'{}' IS NULL THEN '{}'::jsonb
      ELSE jsonb_build_object('fr', description->>'{}')
    END
  END;
  
  -- Replace column
  ALTER TABLE public.categories DROP COLUMN description;
  ALTER TABLE public.categories RENAME COLUMN description_new TO description;
  ALTER TABLE public.categories ALTER COLUMN description SET NOT NULL;
  ALTER TABLE public.categories ALTER COLUMN description SET DEFAULT '{}'::jsonb;
END $$;

-- Step 6: Recreate the view
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

-- Step 7: Grant permissions
GRANT SELECT ON public.recipes_with_categories TO authenticated;
GRANT SELECT ON public.recipes_with_categories TO anon;

-- Step 8: Add basic indexes for performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_recipes_title_gin ON public.recipes USING GIN (title);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_categories_name_gin ON public.categories USING GIN (name);