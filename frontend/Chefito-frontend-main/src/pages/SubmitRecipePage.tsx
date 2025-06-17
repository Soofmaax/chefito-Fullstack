import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useForm, useFieldArray } from 'react-hook-form';
import { 
  Plus, 
  Minus, 
  Upload, 
  Clock, 
  Users, 
  ChefHat,
  AlertCircle,
  CheckCircle,
  Image as ImageIcon,
  X
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../hooks/useAuth';
import { t } from '../lib/utils/i18n';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import PageHeader from '../components/common/PageHeader';
import type { Ingredient, Instruction } from '../types';

interface RecipeFormData {
  title: string;
  description: string;
  cookingTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  tags: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  imageFile?: FileList;
}

/**
 * Page de soumission de recette avec formulaire complet
 */
const SubmitRecipePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const { user } = useAuth();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<RecipeFormData>({
    defaultValues: {
      title: '',
      description: '',
      cookingTime: 30,
      servings: 4,
      difficulty: 'Medium',
      category: '',
      tags: '',
      ingredients: [{ name: '', amount: '', unit: '', notes: '' }],
      instructions: [{ step: 1, description: '', tips: [] }]
    }
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient
  } = useFieldArray({
    control,
    name: 'ingredients'
  });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction
  } = useFieldArray({
    control,
    name: 'instructions'
  });

  // Redirection si non connecté
  React.useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/submit');
    }
  }, [user, navigate]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue('imageFile', undefined);
  };

  const onSubmit = async (data: RecipeFormData) => {
    try {
      setIsSubmitting(true);
      
      // Simulation d'envoi de données
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Recipe submitted:', data);
      setSubmitSuccess(true);
      
      // Redirection après succès
      setTimeout(() => {
        navigate('/recipes');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting recipe:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const difficultyOptions = [
    { value: 'Easy', label: t('recipe.difficulty.easy', currentLanguage), color: 'success' },
    { value: 'Medium', label: t('recipe.difficulty.medium', currentLanguage), color: 'warning' },
    { value: 'Hard', label: t('recipe.difficulty.hard', currentLanguage), color: 'error' }
  ];

  const categoryOptions = [
    { value: 'appetizers', label: 'Entrées' },
    { value: 'main-dishes', label: 'Plats principaux' },
    { value: 'desserts', label: 'Desserts' },
    { value: 'beverages', label: 'Boissons' },
    { value: 'snacks', label: 'Collations' },
    { value: 'salads', label: 'Salades' }
  ];

  if (!user) {
    return null; // Redirection en cours
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background-dark">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-success-600 dark:text-success-400" />
          </motion.div>
          
          <h1 className="text-3xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-4">
            Recette soumise avec succès !
          </h1>
          
          <p className="text-text-secondary dark:text-text-dark-secondary mb-6">
            Votre recette a été envoyée pour modération. Vous recevrez une notification une fois qu'elle sera approuvée.
          </p>
          
          <Button onClick={() => navigate('/recipes')} variant="primary">
            Retour aux recettes
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('page.submit.title', currentLanguage)} - Chefito</title>
        <meta name="description" content="Partagez vos recettes préférées avec la communauté Chefito" />
      </Helmet>

      <div className="min-h-screen bg-background dark:bg-background-dark">
        <PageHeader 
          titleKey="page.submit.title"
          subtitleKey="Partagez vos recettes préférées avec la communauté Chefito"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Informations de base */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Informations de base</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Titre */}
                  <Input
                    label="Titre de la recette"
                    placeholder="Ex: Ratatouille Provençale Traditionnelle"
                    required
                    error={errors.title?.message}
                    {...register('title', { 
                      required: 'Le titre est obligatoire',
                      minLength: { value: 5, message: 'Le titre doit faire au moins 5 caractères' }
                    })}
                  />

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2">
                      Description
                      <span className="text-error-500 ml-1">*</span>
                    </label>
                    <textarea
                      className="w-full rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-3 text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-250"
                      rows={4}
                      placeholder="Décrivez votre recette, son origine, ses particularités..."
                      {...register('description', { 
                        required: 'La description est obligatoire',
                        minLength: { value: 20, message: 'La description doit faire au moins 20 caractères' }
                      })}
                    />
                    {errors.description && (
                      <p className="mt-2 text-sm text-error-600 dark:text-error-400">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Métadonnées */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Input
                      label="Temps de cuisson (minutes)"
                      type="number"
                      min="1"
                      leftIcon={<Clock className="w-4 h-4" />}
                      error={errors.cookingTime?.message}
                      {...register('cookingTime', { 
                        required: 'Le temps de cuisson est obligatoire',
                        min: { value: 1, message: 'Le temps doit être positif' }
                      })}
                    />

                    <Input
                      label="Nombre de portions"
                      type="number"
                      min="1"
                      leftIcon={<Users className="w-4 h-4" />}
                      error={errors.servings?.message}
                      {...register('servings', { 
                        required: 'Le nombre de portions est obligatoire',
                        min: { value: 1, message: 'Le nombre doit être positif' }
                      })}
                    />

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2">
                        Difficulté
                        <span className="text-error-500 ml-1">*</span>
                      </label>
                      <select
                        className="w-full rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-3 text-base text-neutral-900 dark:text-neutral-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-250"
                        {...register('difficulty', { required: 'La difficulté est obligatoire' })}
                      >
                        {difficultyOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Catégorie et tags */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2">
                        Catégorie
                        <span className="text-error-500 ml-1">*</span>
                      </label>
                      <select
                        className="w-full rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-3 text-base text-neutral-900 dark:text-neutral-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-250"
                        {...register('category', { required: 'La catégorie est obligatoire' })}
                      >
                        <option value="">Sélectionner une catégorie</option>
                        {categoryOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Input
                      label="Tags (séparés par des virgules)"
                      placeholder="végétarien, méditerranéen, été"
                      helperText="Ajoutez des mots-clés pour faciliter la recherche"
                      {...register('tags')}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Photo de la recette</CardTitle>
                </CardHeader>
                <CardContent>
                  {!imagePreview ? (
                    <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-xl p-8 text-center">
                      <ImageIcon className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                        Ajoutez une photo appétissante de votre recette
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="recipe-image"
                        {...register('imageFile')}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('recipe-image')?.click()}
                        icon={<Upload className="w-4 h-4" />}
                      >
                        Choisir une image
                      </Button>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Aperçu de la recette"
                        className="w-full h-64 object-cover rounded-xl"
                      />
                      <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        onClick={removeImage}
                        icon={<X className="w-4 h-4" />}
                        className="absolute top-4 right-4"
                      >
                        Supprimer
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Ingrédients */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{t('recipe.ingredients', currentLanguage)}</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendIngredient({ name: '', amount: '', unit: '', notes: '' })}
                    icon={<Plus className="w-4 h-4" />}
                  >
                    Ajouter
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ingredientFields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl"
                      >
                        <div className="md:col-span-4">
                          <Input
                            placeholder="Nom de l'ingrédient"
                            {...register(`ingredients.${index}.name`, { 
                              required: 'Le nom est obligatoire' 
                            })}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Input
                            placeholder="Quantité"
                            {...register(`ingredients.${index}.amount`, { 
                              required: 'La quantité est obligatoire' 
                            })}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Input
                            placeholder="Unité"
                            {...register(`ingredients.${index}.unit`)}
                          />
                        </div>
                        <div className="md:col-span-3">
                          <Input
                            placeholder="Notes (optionnel)"
                            {...register(`ingredients.${index}.notes`)}
                          />
                        </div>
                        <div className="md:col-span-1 flex items-center">
                          {ingredientFields.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeIngredient(index)}
                              icon={<Minus className="w-4 h-4" />}
                              className="text-error-600 hover:text-error-700"
                            />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{t('recipe.instructions', currentLanguage)}</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendInstruction({ 
                      step: instructionFields.length + 1, 
                      description: '', 
                      tips: [] 
                    })}
                    icon={<Plus className="w-4 h-4" />}
                  >
                    Ajouter une étape
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {instructionFields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </div>
                          <h4 className="font-medium text-text-primary dark:text-text-dark-primary">
                            Étape {index + 1}
                          </h4>
                          {instructionFields.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeInstruction(index)}
                              icon={<Minus className="w-4 h-4" />}
                              className="text-error-600 hover:text-error-700 ml-auto"
                            />
                          )}
                        </div>
                        
                        <textarea
                          className="w-full rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-3 text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-250"
                          rows={3}
                          placeholder="Décrivez cette étape en détail..."
                          {...register(`instructions.${index}.description`, { 
                            required: 'La description de l\'étape est obligatoire' 
                          })}
                        />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Boutons de soumission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => navigate(-1)}
                className="min-w-[150px]"
              >
                Annuler
              </Button>
              
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isSubmitting}
                icon={<ChefHat className="w-5 h-5" />}
                className="min-w-[200px]"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Publier la recette'}
              </Button>
            </motion.div>

            {/* Note d'information */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5" />
                <div className="text-sm text-primary-800 dark:text-primary-200">
                  <p className="font-medium mb-1">Note importante</p>
                  <p>
                    Votre recette sera examinée par notre équipe avant publication. 
                    Assurez-vous que toutes les informations sont correctes et que 
                    les instructions sont claires et détaillées.
                  </p>
                </div>
              </div>
            </motion.div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SubmitRecipePage;