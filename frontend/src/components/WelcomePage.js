import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Orbit } from 'lucide-react';
import { useTheme } from './ThemeContext';

const WelcomePage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate(); 

  const handleGetStarted = () => {
    navigate('/home'); // Navigate to home page when clicked
  };

  const handleLearnMore = () => {
    // Optional: You can create an about page or implement a modal
    alert('Learn More functionality coming soon!');
  };
  
  return (
    <div className={`min-h-screen flex flex-col justify-center items-center 
      ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}
      transition-colors duration-300 ease-in-out`}
    >
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 transition-all"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      
      <div className="text-center max-w-2xl px-6">
        <div className="flex justify-center mb-8">
          <Orbit 
            className={`w-24 h-24 ${
              isDarkMode 
                ? 'text-blue-400 animate-pulse' 
                : 'text-blue-600 animate-spin'
            }`} 
          />
        </div>
        
        <h1 className={`
          text-4xl md:text-5xl font-bold mb-6 
          ${isDarkMode 
            ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600' 
            : 'text-gray-800'
          }`}
        >
          Welcome to Orbit
        </h1>
        
        <p className={`
          text-xl leading-relaxed mb-10
          ${isDarkMode 
            ? 'text-gray-300' 
            : 'text-gray-600'
          }`}
        >
          Your journey, your peers, your stories.
          Let's make your campus connections timeless.
        </p>
        
        <div className="flex justify-center space-x-4">
          <button 
            onClick={handleGetStarted}
            className={`
            px-6 py-3 rounded-full font-semibold transition-all
            ${isDarkMode 
              ? 'bg-blue-600 text-white hover:bg-blue-700 ' 
              : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md'
            }`}
          >
            Get Started
          </button>
          <button 
            onClick={handleLearnMore}
            className={`
            px-6 py-3 rounded-full font-semibold border-2 transition-all
            ${isDarkMode 
              ? 'border-blue-400 text-blue-400 hover:bg-blue-900/30' 
              : 'border-blue-500 text-blue-500 hover:bg-blue-50'
            }`}
          >
            Learn More
          </button>
        </div>
      </div>
      
      <footer className={`
        absolute bottom-4 text-center w-full
        ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
      `}>
        © {new Date().getFullYear()} Orbit. All rights reserved.
      </footer>
    </div>
  );
};

export default WelcomePage;