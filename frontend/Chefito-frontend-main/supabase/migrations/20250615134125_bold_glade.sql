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

-- Conversion de la table recipes
ALTER TABLE public.recipes
ALTER COLUMN title TYPE jsonb USING jsonb_build_object('fr', title);

ALTER TABLE public.recipes
ALTER COLUMN description TYPE jsonb USING jsonb_build_object('fr', description);

-- Conversion de la table categories
ALTER TABLE public.categories
ALTER COLUMN name TYPE jsonb USING jsonb_build_object('fr', name);

ALTER TABLE public.categories
ALTER COLUMN description TYPE jsonb USING jsonb_build_object('fr', description);

-- Mise à jour des contraintes pour s'assurer que les champs jsonb ne sont pas null
ALTER TABLE public.recipes
ALTER COLUMN title SET NOT NULL;

ALTER TABLE public.recipes
ALTER COLUMN description SET DEFAULT '{}'::jsonb;

ALTER TABLE public.categories
ALTER COLUMN name SET NOT NULL;

ALTER TABLE public.categories
ALTER COLUMN description SET DEFAULT '{}'::jsonb;