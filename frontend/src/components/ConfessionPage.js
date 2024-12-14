import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { useTheme } from './ThemeContext';

const ConfessionPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [confession, setConfession] = useState('');
  const [confessions, setConfessions] = useState([
    {
      id: 1,
      text: "I've always been afraid to share my true feelings, but this platform gives me hope.",
      timestamp: new Date().toLocaleString()
    }
  ]);

  const handleSubmitConfession = () => {
    if (confession.trim()) {
      setConfessions([
        ...confessions,
        {
          id: confessions.length + 1,
          text: confession,
          timestamp: new Date().toLocaleString()
        }
      ]);
      setConfession('');
    }
  };

  return (
    <div
      className={`min-h-screen p-6 transition-all ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
      style={{
        backgroundImage: isDarkMode
          ? 'radial-gradient(circle at center, rgba(30, 64, 175, 0.2) 0%, transparent 70%)'
          : 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6 flex items-center">
          <MessageCircle className="mr-3 text-blue-500" /> Anonymous Confessions
        </h1>

        <div className="mb-6">
          <textarea
            placeholder="Share your story anonymously..."
            className={`w-full p-3 rounded-lg border min-h-[150px] transition-all ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                : 'bg-gray-100 border-gray-300 text-black placeholder-gray-500'
            }`}
            value={confession}
            onChange={(e) => setConfession(e.target.value)}
          />
          <button
            onClick={handleSubmitConfession}
            className="mt-2 w-full bg-blue-500 text-white p-3 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all"
          >
            <Send className="mr-2" /> Submit Confession
          </button>
        </div>

        <div className="space-y-4">
          {confessions.map((conf) => (
            <div
              key={conf.id}
              className={`p-4 rounded-lg shadow transition-all ${
                isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
              }`}
            >
              <p>{conf.text}</p>
              <small className="text-gray-500 block text-right mt-2">
                Posted: {conf.timestamp}
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfessionPage;
