import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Users, Video, Mic, MicOff, VideoOff, Share2, Clock, ChefHat, Play, Pause } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../hooks/useLanguage';
import { t } from '../lib/utils/i18n';
import { Button, Card, CardContent, Avatar, Badge } from '../components/ui';

const CollaboratePage: React.FC = () => {
  const { sessionId, recipeSlug } = useParams();
  const { currentLanguage } = useLanguage();
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock recipe data
  const recipe = {
    title: { fr: 'Ratatouille Provençale', en: 'Provençal Ratatouille' },
    instructions: [
      { step: 1, description: 'Préparer tous les légumes en les coupant en dés' },
      { step: 2, description: 'Faire chauffer l\'huile d\'olive dans une grande poêle' },
      { step: 3, description: 'Faire revenir les oignons jusqu\'à ce qu\'ils soient translucides' },
      { step: 4, description: 'Ajouter les aubergines et courgettes, cuire 10 minutes' },
      { step: 5, description: 'Incorporer les tomates et les herbes de Provence' },
    ],
  };

  // Mock participants
  const participants = [
    { id: '1', name: 'Marie Dubois', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg', isHost: true },
    { id: '2', name: 'Thomas Martin', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', isHost: false },
    { id: '3', name: 'Sophie Laurent', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', isHost: false },
  ];

  useEffect(() => {
    // Simulate connection
    const timer = setTimeout(() => setIsConnected(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleNextStep = () => {
    if (currentStep < recipe.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const shareSession = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    // Show toast notification
  };

  return (
    <>
      <Helmet>
        <title>{t('page.collaborate.title', currentLanguage)} - Chefito</title>
        <meta name="description" content={t('page.collaborate.description', currentLanguage)} />
        <meta property="og:title" content={`${t('page.collaborate.title', currentLanguage)} - Chefito`} />
        <meta property="og:description" content={t('page.collaborate.description', currentLanguage)} />
      </Helmet>

      <div className="min-h-screen bg-background dark:bg-background-dark">
        {!isConnected ? (
          // Loading/Connecting State
          <div className="min-h-screen flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6">
                <Users className="w-10 h-10 text-primary-600 dark:text-primary-400 animate-pulse" />
              </div>
              <h1 className="text-2xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-4">
                {t('collaborate.connecting', currentLanguage)}
              </h1>
              <p className="text-text-secondary dark:text-text-dark-secondary">
                {t('collaborate.preparing_session', currentLanguage)}
              </p>
            </motion.div>
          </div>
        ) : (
          // Main Collaboration Interface
          <div className="grid grid-cols-1 lg:grid-cols-4 h-screen">
            {/* Video Grid */}
            <div className="lg:col-span-3 bg-neutral-900 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-full">
                {participants.map((participant, index) => (
                  <motion.div
                    key={participant.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="relative bg-neutral-800 rounded-2xl overflow-hidden"
                  >
                    {/* Video placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                      <Avatar
                        src={participant.avatar}
                        alt={participant.name}
                        size="xl"
                      />
                    </div>
                    
                    {/* Participant info */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium text-sm">
                            {participant.name}
                          </span>
                          {participant.isHost && (
                            <Badge variant="primary" className="text-xs">
                              <ChefHat className="w-3 h-3 mr-1" />
                              Host
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Controls */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex items-center gap-4 bg-neutral-800/90 backdrop-blur-sm rounded-2xl px-6 py-4"
                >
                  <Button
                    variant={isMuted ? 'danger' : 'ghost'}
                    size="md"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:bg-white/10"
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </Button>
                  
                  <Button
                    variant={isVideoOff ? 'danger' : 'ghost'}
                    size="md"
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className="text-white hover:bg-white/10"
                  >
                    {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={shareSession}
                    className="text-white hover:bg-white/10"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Recipe Panel */}
            <div className="lg:col-span-1 bg-surface dark:bg-surface-dark border-l border-neutral-200 dark:border-neutral-700 flex flex-col">
              {/* Recipe Header */}
              <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
                <h2 className="text-xl font-display font-semibold text-text-primary dark:text-text-dark-primary mb-2">
                  {recipe.title[currentLanguage]}
                </h2>
                <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-text-dark-secondary">
                  <Clock className="w-4 h-4" />
                  <span>Étape {currentStep + 1} sur {recipe.instructions.length}</span>
                </div>
              </div>

              {/* Current Step */}
              <div className="flex-1 p-6">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {currentStep + 1}
                    </div>
                    <h3 className="font-medium text-text-primary dark:text-text-dark-primary">
                      Étape {currentStep + 1}
                    </h3>
                  </div>
                  
                  <p className="text-text-secondary dark:text-text-dark-secondary leading-relaxed">
                    {recipe.instructions[currentStep].description}
                  </p>
                </motion.div>

                {/* Step Controls */}
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevStep}
                      disabled={currentStep === 0}
                      className="flex-1"
                    >
                      Précédent
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleNextStep}
                      disabled={currentStep === recipe.instructions.length - 1}
                      className="flex-1"
                    >
                      Suivant
                    </Button>
                  </div>

                  <Button
                    variant={isPlaying ? 'secondary' : 'primary'}
                    size="md"
                    fullWidth
                    onClick={() => setIsPlaying(!isPlaying)}
                    icon={isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  >
                    {isPlaying ? 'Pause' : 'Démarrer'} l'assistant vocal
                  </Button>
                </div>
              </div>

              {/* Participants List */}
              <div className="p-6 border-t border-neutral-200 dark:border-neutral-700">
                <h3 className="font-medium text-text-primary dark:text-text-dark-primary mb-4">
                  Participants ({participants.length})
                </h3>
                <div className="space-y-3">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-3">
                      <Avatar
                        src={participant.avatar}
                        alt={participant.name}
                        size="sm"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-text-primary dark:text-text-dark-primary">
                            {participant.name}
                          </span>
                          {participant.isHost && (
                            <Badge variant="primary" className="text-xs">
                              Host
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CollaboratePage;