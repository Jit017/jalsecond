import React from 'react';
import { ChatMessage as ChatMessageType } from '../types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          message.isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
        <span className="text-xs opacity-75 mt-1 block">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}