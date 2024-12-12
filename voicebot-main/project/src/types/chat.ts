export interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface VoiceRecognitionState {
  isListening: boolean;
  isMuted: boolean;
  recognition: SpeechRecognition | null;
}