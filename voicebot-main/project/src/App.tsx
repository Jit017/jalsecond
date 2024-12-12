import React from 'react';
import { VoiceChatbot } from './components/VoiceChatbot';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Jal Saanjhevni Portal
        </h1>
        <p className="text-gray-600 mb-4">
          Welcome to Jal Saanjhevni. Use our voice assistant to get information about water conservation and management.
        </p>
        {/* Add your main content here */}
      </main>
      <VoiceChatbot />
    </div>
  );
}

export default App;