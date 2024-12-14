import React from 'react';
import { Orbit, MessageCircle, Users } from 'lucide-react';
import { Sun, Moon } from 'lucide-react'; // Add these to your existing imports
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext'; // Assuming ThemeContext is imported correctly

// Feature Card Component
const FeatureCard = ({ icon, title, description, link }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`p-6 rounded-lg shadow-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl 
      ${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-black hover:bg-gray-100'}`}
    >
      <div className="mb-4 text-blue-500 text-3xl">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm opacity-70">{description}</p>

      {/* Add a button */}
      <div className="mt-4">
        <Link
          to={link}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

const HomePage = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div
      className={`min-h-screen relative transition-all ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
      style={{
        backgroundImage: isDarkMode
          ? 'radial-gradient(circle at center, rgba(30, 64, 175, 0.2) 0%, transparent 70%)'
          : 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      {/* Big Orbit Icon in Background */}
      <div className="absolute inset-0 flex justify-center items-center opacity-10">
        <Orbit
          size={800}
          className={`transform ${isDarkMode ? 'text-blue-900' : 'text-blue-300'}`}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <Orbit className="text-blue-500 animate-spin-slow" size={32} />
          <h1 className="text-2xl font-bold hover:text-blue-500 transition-all">Orbit</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all"
          >
            {isDarkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-blue-500" />}
          </button>
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12 text-center relative z-10">
        <h2 className="text-4xl font-bold">Find Your Perfect Connection</h2>

        <p className="text-xl mb-12 max-w-2xl mx-auto">
          Discover meaningful connections through our AI-powered matching system. Share, connect, and grow together.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <FeatureCard
            icon={<Orbit />}
            title="Find Your Orbit"
            description="Connect with like-minded campus peers"
            link="/find-friend"
          />
          <FeatureCard
            icon={<MessageCircle />}
            title="Cosmic Conversations"
            description="Secure, direct messaging platform"
            link="/cosmic-convo"
          />
          <FeatureCard
            icon={<Users />}
            title="Share Your Universe"
            description="Post anonymous stories and experiences"
            link="/share-universe"
          />
        </div>

        <div className="mt-12">
          <Link
            to="/login"
            className="px-8 py-3 bg-blue-600 text-white rounded-full text-lg hover:bg-blue-700 transition-all"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 p-6 text-center opacity-70">
        <p className="hover:opacity-100 transition-opacity">© 2024 Orbit. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;

