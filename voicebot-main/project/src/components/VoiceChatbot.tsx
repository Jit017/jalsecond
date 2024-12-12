import React, { useState, useCallback } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types/chat';
import { ChatMessage } from './ChatMessage';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';
import { generateResponse } from '../utils/chatResponses';

export function VoiceChatbot() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  
  const handleUserInput = useCallback((text: string) => {
    // Add user message
    const userMessage: ChatMessageType = {
      text,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Generate and add bot response
    const response = generateResponse(text);
    const botMessage: ChatMessageType = {
      text: response,
      isUser: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMessage]);

    // Speak the response
    if (!isMuted) {
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const {
    isListening,
    isMuted,
    toggleListening,
    toggleMute
  } = useVoiceRecognition(handleUserInput);

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Jal Saanjhevni Assistant</h2>
          <div className="flex gap-2">
            <button
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <button
              onClick={toggleListening}
              className={`p-2 rounded-full transition-colors ${
                isListening ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'
              }`}
              title={isListening ? "Stop listening" : "Start listening"}
            >
              {isListening ? <Mic size={20} /> : <MicOff size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          {isListening 
            ? "Listening... Speak now"
            : "Click the microphone icon to start speaking"}
        </p>
      </div>
    </div>
  );
}