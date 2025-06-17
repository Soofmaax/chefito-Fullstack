import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, MessageCircle } from 'lucide-react';
import { cn } from '../../../lib/utils/cn';
import { useVoiceAssistant } from '../../../hooks/useVoiceAssistant';
import { useLanguage } from '../../../hooks/useLanguage';

interface VoiceAssistantProps {
  className?: string;
}

/**
 * Enhanced Floating Voice Assistant component with beautiful animations
 */
export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ className }) => {
  const { isListening, startListening, stopListening, transcript, isSupported } = useVoiceAssistant();
  const { t } = useLanguage();
  const [showTranscript, setShowTranscript] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (transcript) {
      setShowTranscript(true);
      const timer = setTimeout(() => setShowTranscript(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [transcript]);

  useEffect(() => {
    // Show hint after 3 seconds if not listening
    if (!isListening) {
      const timer = setTimeout(() => setShowHint(true), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowHint(false);
    }
  }, [isListening]);

  const handleToggleListening = () => {
    setShowHint(false);
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className={cn('fixed bottom-6 right-6 z-50', className)}>
      {/* Enhanced Transcript Display */}
      <AnimatePresence>
        {showTranscript && transcript && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 30, scale: 0.8, rotateX: -15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute bottom-24 right-0 bg-gradient-to-r from-white to-primary-50 dark:from-neutral-800 dark:to-primary-900/20 rounded-2xl p-4 shadow-2xl border border-primary-200 dark:border-primary-700 max-w-xs backdrop-blur-md"
          >
            <div className="flex items-start gap-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Volume2 className="w-4 h-4 text-white" />
              </motion.div>
              <div className="flex-1">
                <p className="text-xs font-medium text-primary-600 dark:text-primary-400 mb-1">
                  {t('voice_assistant.heard')}:
                </p>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                  "{transcript}"
                </p>
              </div>
            </div>
            {/* Speech bubble arrow */}
            <div className="absolute bottom-0 right-6 transform translate-y-full">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary-200 dark:border-t-primary-700"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Hint Bubble */}
      <AnimatePresence>
        {showHint && !isListening && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="absolute bottom-24 right-0 bg-gradient-to-r from-secondary-500 to-primary-600 text-white rounded-2xl p-4 shadow-xl max-w-xs"
          >
            <div className="flex items-start gap-3">
              <MessageCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium mb-1">{t('voice_assistant.try_saying')}:</p>
                <p className="text-xs opacity-90">{t('voice_assistant.commands')}</p>
              </div>
            </div>
            {/* Speech bubble arrow */}
            <div className="absolute bottom-0 right-6 transform translate-y-full">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary-600"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Listening Status */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute bottom-24 right-0 bg-gradient-to-r from-error-500 to-error-600 text-white rounded-full px-6 py-3 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-3 h-3 bg-white rounded-full"
              />
              <span className="text-sm font-semibold tracking-wide">{t('voice_assistant.listening')}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Main Voice Button */}
      <motion.button
        onClick={handleToggleListening}
        className={cn(
          'relative w-18 h-18 rounded-full shadow-2xl transition-all duration-500',
          'focus:outline-none focus:ring-4 focus:ring-primary-500/40',
          'backdrop-blur-sm border-2',
          isListening
            ? 'bg-gradient-to-r from-error-500 to-error-600 hover:from-error-600 hover:to-error-700 border-error-300'
            : 'bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 border-primary-300'
        )}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        aria-label={isListening ? t('voice_assistant.stop_listening') : t('voice_assistant.start_listening')}
      >
        {/* Enhanced Pulsing Animation when Listening */}
        {isListening && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-error-400"
              animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-error-300"
              animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-error-200"
              animate={{ scale: [1, 2.4, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
          </>
        )}

        {/* Idle glow effect */}
        {!isListening && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}

        {/* Enhanced Icon */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <motion.div
            animate={isListening ? { scale: [1, 1.2, 1] } : { rotate: [0, 5, -5, 0] }}
            transition={{ 
              scale: { duration: 0.6, repeat: isListening ? Infinity : 0 },
              rotate: { duration: 4, repeat: Infinity }
            }}
          >
            {isListening ? (
              <MicOff className="w-7 h-7 text-white drop-shadow-lg" />
            ) : (
              <Mic className="w-7 h-7 text-white drop-shadow-lg" />
            )}
          </motion.div>
        </div>

        {/* Enhanced Waveform Animation */}
        {isListening && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-0.5 bg-white/40 rounded-full"
                  animate={{
                    height: [6, 20, 6],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default VoiceAssistant;