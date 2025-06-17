import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX,
  Timer,
  ChefHat,
  ArrowLeft,
  Check
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { LazyImage } from '../components/ui/LazyImage';
import { useLanguage } from '../hooks/useLanguage';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';
import { trackPageView, trackRecipeInteraction } from '../lib/utils/analytics';

const CookingModePage: React.FC = () => {
  const { recipeSlug } = useParams<{ recipeSlug: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isListening, startListening, stopListening } = useVoiceAssistant();

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  // Mock recipe data - in real app, fetch from API
  const recipe = {
    id: '1',
    title: { fr: 'Pasta Carbonara', en: 'Pasta Carbonara' },
    description: { fr: 'Un classique italien authentique', en: 'An authentic Italian classic' },
    imageUrl: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: 25,
    servings: 4,
    instructions: [
      {
        step: 1,
        description: 'Faire bouillir une grande casserole d\'eau salée',
        duration: 5,
        tips: ['Utilisez beaucoup d\'eau', 'Salez généreusement']
      },
      {
        step: 2,
        description: 'Couper le bacon en petits lardons',
        duration: 3,
        tips: ['Coupez en dés réguliers']
      },
      {
        step: 3,
        description: 'Faire revenir les lardons dans une poêle',
        duration: 5,
        tips: ['Pas besoin d\'huile', 'Laissez dorer']
      },
      {
        step: 4,
        description: 'Cuire les pâtes selon les instructions',
        duration: 8,
        tips: ['Al dente', 'Réservez l\'eau de cuisson']
      },
      {
        step: 5,
        description: 'Mélanger œufs, parmesan et poivre',
        duration: 2,
        tips: ['Battez bien', 'Poivre généreux']
      },
      {
        step: 6,
        description: 'Mélanger pâtes chaudes avec la préparation',
        duration: 2,
        tips: ['Hors du feu', 'Mélangez rapidement']
      }
    ]
  };

  useEffect(() => {
    trackPageView('cooking_mode', {
      recipe_slug: recipeSlug,
      recipe_title: recipe.title.fr,
    });
  }, [recipeSlug]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev ? prev - 1 : 0);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    trackRecipeInteraction(isPlaying ? 'pause' : 'play', recipe.id, {
      current_step: currentStep + 1,
    });
  };

  const handleNextStep = () => {
    if (currentStep < recipe.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
      trackRecipeInteraction('next_step', recipe.id, {
        from_step: currentStep + 1,
        to_step: currentStep + 2,
      });
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      trackRecipeInteraction('previous_step', recipe.id, {
        from_step: currentStep + 1,
        to_step: currentStep,
      });
    }
  };

  const handleCompleteStep = () => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(currentStep);
    setCompletedSteps(newCompleted);
    
    trackRecipeInteraction('complete_step', recipe.id, {
      step_number: currentStep + 1,
    });

    // Auto advance to next step
    if (currentStep < recipe.instructions.length - 1) {
      setTimeout(() => handleNextStep(), 500);
    }
  };

  const handleStartTimer = (duration: number) => {
    setTimer(duration * 60); // Convert minutes to seconds
    trackRecipeInteraction('start_timer', recipe.id, {
      duration_minutes: duration,
      step: currentStep + 1,
    });
  };

  const currentInstruction = recipe.instructions[currentStep];
  const progress = ((currentStep + 1) / recipe.instructions.length) * 100;

  return (
    <>
      <Helmet>
        <title>Mode Cuisine - {recipe.title.fr} | Chefito</title>
        <meta name="description" content={`Cuisinez ${recipe.title.fr} avec l'assistant vocal Chefito`} />
      </Helmet>

      <div className="min-h-screen bg-background dark:bg-background-dark">
        {/* Header */}
        <div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                icon={<ArrowLeft className="w-5 h-5" />}
                aria-label="Retour"
              >
                Retour
              </Button>
              
              <div className="text-center">
                <h1 className="text-lg font-display font-semibold text-text-primary dark:text-text-dark-primary">
                  {recipe.title.fr}
                </h1>
                <p className="text-sm text-text-secondary dark:text-text-dark-secondary">
                  Étape {currentStep + 1} sur {recipe.instructions.length}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                  icon={isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  aria-label={isMuted ? "Activer le son" : "Couper le son"}
                />
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                <motion.div
                  className="bg-primary-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recipe Image */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-0">
                  <LazyImage
                    src={recipe.imageUrl}
                    alt={recipe.title.fr}
                    className="w-full h-64 object-cover rounded-t-2xl"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-display font-semibold mb-2">
                      {recipe.title.fr}
                    </h2>
                    <p className="text-text-secondary dark:text-text-dark-secondary">
                      {recipe.description.fr}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Timer */}
              <AnimatePresence>
                {timer !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Card className="bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-700">
                      <CardContent className="text-center">
                        <Timer className="w-8 h-8 mx-auto mb-2 text-warning-600" />
                        <div className="text-3xl font-bold text-warning-700 dark:text-warning-400">
                          {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                        </div>
                        <p className="text-sm text-warning-600 dark:text-warning-400">
                          Minuteur actif
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Current Step */}
            <div className="space-y-6">
              <Card className="bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-700">
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                      {currentStep + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-800 dark:text-primary-200">
                        Étape {currentStep + 1}
                      </h3>
                      <p className="text-sm text-primary-600 dark:text-primary-400">
                        {currentInstruction.duration} minutes
                      </p>
                    </div>
                  </div>

                  <p className="text-lg text-primary-900 dark:text-primary-100 mb-4 leading-relaxed">
                    {currentInstruction.description}
                  </p>

                  {currentInstruction.tips && (
                    <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 mb-4">
                      <h4 className="font-medium text-text-primary dark:text-text-dark-primary mb-2">
                        💡 Conseils
                      </h4>
                      <ul className="space-y-1">
                        {currentInstruction.tips.map((tip, index) => (
                          <li key={index} className="text-sm text-text-secondary dark:text-text-dark-secondary">
                            • {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-3">
                    {currentInstruction.duration && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStartTimer(currentInstruction.duration)}
                        icon={<Timer className="w-4 h-4" />}
                      >
                        Minuteur
                      </Button>
                    )}
                    
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleCompleteStep}
                      icon={<Check className="w-4 h-4" />}
                      disabled={completedSteps.has(currentStep)}
                    >
                      {completedSteps.has(currentStep) ? 'Terminé' : 'Marquer comme terminé'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Controls */}
              <Card>
                <CardContent>
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handlePreviousStep}
                      disabled={currentStep === 0}
                      icon={<SkipBack className="w-5 h-5" />}
                      aria-label="Étape précédente"
                    />

                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handlePlayPause}
                      icon={isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                      className="w-16 h-16 rounded-full"
                      aria-label={isPlaying ? "Pause" : "Lecture"}
                    />

                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleNextStep}
                      disabled={currentStep === recipe.instructions.length - 1}
                      icon={<SkipForward className="w-5 h-5" />}
                      aria-label="Étape suivante"
                    />
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-text-secondary dark:text-text-dark-secondary">
                      Utilisez les commandes vocales : "Suivant", "Précédent", "Minuteur"
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Steps Overview */}
              <Card>
                <CardContent>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <ChefHat className="w-5 h-5" />
                    Toutes les étapes
                  </h3>
                  <div className="space-y-2">
                    {recipe.instructions.map((instruction, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentStep(index)}
                        className={`w-full text-left p-3 rounded-xl transition-all ${
                          index === currentStep
                            ? 'bg-primary-100 dark:bg-primary-900/30 border-primary-300 dark:border-primary-700'
                            : completedSteps.has(index)
                            ? 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-700'
                            : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'
                        } border`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            completedSteps.has(index)
                              ? 'bg-success-600 text-white'
                              : index === currentStep
                              ? 'bg-primary-600 text-white'
                              : 'bg-neutral-300 dark:bg-neutral-600 text-neutral-600 dark:text-neutral-300'
                          }`}>
                            {completedSteps.has(index) ? <Check className="w-3 h-3" /> : index + 1}
                          </div>
                          <span className={`text-sm ${
                            index === currentStep
                              ? 'text-primary-800 dark:text-primary-200 font-medium'
                              : completedSteps.has(index)
                              ? 'text-success-700 dark:text-success-300'
                              : 'text-text-secondary dark:text-text-dark-secondary'
                          }`}>
                            {instruction.description}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookingModePage;