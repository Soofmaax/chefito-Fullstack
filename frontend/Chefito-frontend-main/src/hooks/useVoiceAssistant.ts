import { useState, useEffect, useCallback, useRef } from 'react';
import { trackVoiceAssistant } from '../lib/utils/analytics';

interface VoiceAssistantHook {
  isListening: boolean;
  transcript: string;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  clearTranscript: () => void;
  confidence: number;
}

/**
 * Hook for voice recognition with enhanced error handling and accessibility
 */
export const useVoiceAssistant = (): VoiceAssistantHook => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [isSupported, setIsSupported] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check for browser support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'fr-FR'; // Default to French, can be made dynamic
      recognition.maxAlternatives = 1;
      
      recognition.onstart = () => {
        setIsListening(true);
        trackVoiceAssistant('start');
      };
      
      recognition.onend = () => {
        setIsListening(false);
        trackVoiceAssistant('stop');
      };
      
      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcriptPart = result[0].transcript;
          
          if (result.isFinal) {
            finalTranscript += transcriptPart;
            setConfidence(result[0].confidence);
            trackVoiceAssistant('command', { 
              command: transcriptPart,
              confidence: result[0].confidence 
            });
          } else {
            interimTranscript += transcriptPart;
          }
        }
        
        setTranscript(finalTranscript || interimTranscript);
        
        // Auto-stop after 10 seconds of silence
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
          if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
          }
        }, 10000);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
        
        // Handle specific errors
        switch (event.error) {
          case 'not-allowed':
            alert('Microphone access denied. Please allow microphone access to use voice features.');
            break;
          case 'no-speech':
            // No speech detected
            break;
          case 'network':
            // Network error occurred
            break;
          default:
            // Unknown error
        }
      };
      
      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isListening]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch {
        // Failed to start recognition
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  const clearTranscript = useCallback(() => {
    setTranscript('');
    setConfidence(0);
  }, []);

  return {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    clearTranscript,
    confidence,
  };
};

export default useVoiceAssistant;