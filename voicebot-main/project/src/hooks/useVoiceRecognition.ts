import { useState, useEffect, useCallback } from 'react';
import { VoiceRecognitionState } from '../types/chat';

export function useVoiceRecognition(onResult: (text: string) => void) {
  const [state, setState] = useState<VoiceRecognitionState>({
    isListening: false,
    isMuted: false,
    recognition: null,
  });

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.error('Speech recognition is not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false; // Changed to false to better handle individual commands
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      onResult(text);
      setState(prev => ({ ...prev, isListening: false }));
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setState(prev => ({ ...prev, isListening: false }));
    };

    recognition.onend = () => {
      setState(prev => ({ ...prev, isListening: false }));
    };

    setState(prev => ({ ...prev, recognition }));

    return () => {
      recognition.abort();
    };
  }, [onResult]);

  const toggleListening = useCallback(() => {
    if (state.recognition) {
      if (state.isListening) {
        state.recognition.stop();
      } else {
        state.recognition.start();
      }
      setState(prev => ({ ...prev, isListening: !prev.isListening }));
    }
  }, [state.recognition, state.isListening]);

  const toggleMute = useCallback(() => {
    setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
    if (!state.isMuted) {
      window.speechSynthesis.cancel();
    }
  }, [state.isMuted]);

  return {
    ...state,
    toggleListening,
    toggleMute,
  };
}