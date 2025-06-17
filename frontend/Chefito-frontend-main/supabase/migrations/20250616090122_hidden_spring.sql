/*
  # Convert text columns to JSONB for multilingual support

  1. New Tables
    - No new tables created
    
  2. Modified Tables
    - `recipes` table: Convert `title` and `description` columns from text to JSONB
    - `categories` table: Convert `name` and `description` columns from text to JSONB
    
  3. Views
    - Recreate `recipes_with_categories` view with updated column types
    
  4. Security
    - Maintain existing RLS policies
    - Grant appropriate permissions on recreated view
    
  5. Performance
    - Add GIN indexes for JSONB columns to improve search performance
*/

-- Step 1: Drop dependent view
DROP VIEW IF EXISTS public.recipes_with_categories;

-- Step 2: Convert recipes.title to JSONB
DO $$
BEGIN
  -- Check if column exists and get its type
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'recipes' AND column_name = 'title' AND table_schema = 'public'
  ) THEN
    -- Add temp column
    ALTER TABLE public.recipes ADD COLUMN title_new jsonb;
    
    -- Convert existing data
    UPDATE public.recipes 
    SET title_new = CASE 
      WHEN title IS NULL THEN '{"fr": "Recette sans titre"}'::jsonb
      ELSE jsonb_build_object('fr', title::text)
    END;
    
    -- Replace column
    ALTER TABLE public.recipes DROP COLUMN title;
    ALTER TABLE public.recipes RENAME COLUMN title_new TO title;
    ALTER TABLE public.recipes ALTER COLUMN title SET NOT NULL;
  END IF;
END $$;

-- Step 3: Convert recipes.description to JSONB
DO $$
BEGIN
  -- Check if column exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'recipes' AND column_name = 'description' AND table_schema = 'public'
  ) THEN
    -- Add temp column
    ALTER TABLE public.recipes ADD COLUMN description_new jsonb;
    
    -- Convert existing data
    UPDATE public.recipes 
    SET description_new = CASE 
      WHEN description IS NULL OR description = '' THEN '{}'::jsonb
      ELSE jsonb_build_object('fr', description::text)
    END;
    
    -- Replace column
    ALTER TABLE public.recipes DROP COLUMN description;
    ALTER TABLE public.recipes RENAME COLUMN description_new TO description;
    ALTER TABLE public.recipes ALTER COLUMN description SET NOT NULL;
    ALTER TABLE public.recipes ALTER COLUMN description SET DEFAULT '{}'::jsonb;
  END IF;
END $$;

-- Step 4: Convert categories.name to JSONB
DO $$
BEGIN
  -- Check if column exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'categories' AND column_name = 'name' AND table_schema = 'public'
  ) THEN
    -- Add temp column
    ALTER TABLE public.categories ADD COLUMN name_new jsonb;
    
    -- Convert existing data
    UPDATE public.categories 
    SET name_new = CASE 
      WHEN name IS NULL THEN '{"fr": "Catégorie sans nom"}'::jsonb
      ELSE jsonb_build_object('fr', name::text)
    END;
    
    -- Replace column
    ALTER TABLE public.categories DROP COLUMN name;
    ALTER TABLE public.categories RENAME COLUMN name_new TO name;
    ALTER TABLE public.categories ALTER COLUMN name SET NOT NULL;
  END IF;
END $$;

-- Step 5: Convert categories.description to JSONB
DO $$
BEGIN
  -- Check if column exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'categories' AND column_name = 'description' AND table_schema = 'public'
  ) THEN
    -- Add temp column
    ALTER TABLE public.categories ADD COLUMN description_new jsonb;
    
    -- Convert existing data
    UPDATE public.categories 
    SET description_new = CASE 
      WHEN description IS NULL OR description = '' THEN '{}'::jsonb
      ELSE jsonb_build_object('fr', description::text)
    END;
    
    -- Replace column
    ALTER TABLE public.categories DROP COLUMN description;
    ALTER TABLE public.categories RENAME COLUMN description_new TO description;
    ALTER TABLE public.categories ALTER COLUMN description SET NOT NULL;
    ALTER TABLE public.categories ALTER COLUMN description SET DEFAULT '{}'::jsonb;
  END IF;
END $$;

-- Step 6: Recreate the view with updated column types
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

-- Step 7: Grant permissions on the recreated view
GRANT SELECT ON public.recipes_with_categories TO authenticated;
GRANT SELECT ON public.recipes_with_categories TO anon;

-- Step 8: Add GIN indexes for JSONB columns (without CONCURRENTLY)
CREATE INDEX IF NOT EXISTS idx_recipes_title_gin ON public.recipes USING GIN (title);
CREATE INDEX IF NOT EXISTS idx_recipes_description_gin ON public.recipes USING GIN (description);
CREATE INDEX IF NOT EXISTS idx_categories_name_gin ON public.categories USING GIN (name);
CREATE INDEX IF NOT EXISTS idx_categories_description_gin ON public.categories USING GIN (description);

-- Step 9: Add specific language indexes for better performance
CREATE INDEX IF NOT EXISTS idx_recipes_title_fr ON public.recipes USING GIN ((title -> 'fr'));
CREATE INDEX IF NOT EXISTS idx_recipes_title_en ON public.recipes USING GIN ((title -> 'en'));
CREATE INDEX IF NOT EXISTS idx_categories_name_fr ON public.categories USING GIN ((name -> 'fr'));
CREATE INDEX IF NOT EXISTS idx_categories_name_en ON public.categories USING GIN ((name -> 'en'));