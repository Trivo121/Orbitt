import React, { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { useTheme } from './ThemeContext';

const FindFriendPage: React.FC = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [matches, setMatches] = useState([
    { id: 1, interests: ['Tech', 'Movies', 'Travel'], compatibility: 85 },
    { id: 2, interests: ['Reading', 'Music', 'Cooking'], compatibility: 72 },
  ]);

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Search className="mr-3 text-blue-500" /> Find Your Match
        </h1>

        <div className="mb-6 flex">
          <input 
            type="text" 
            placeholder="Search interests, hobbies..." 
            className="w-full p-3 rounded-l-lg border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-6 rounded-r-lg">
            Search
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map(match => (
            <div 
              key={match.id} 
              className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-xl font-semibold">Match #{match.id}</span>
                <span className="text-green-600">{match.compatibility}% Match</span>
              </div>
              <div className="mb-3">
                <h3 className="font-bold">Interests:</h3>
                <div className="flex flex-wrap gap-2">
                  {match.interests.map(interest => (
                    <span 
                      key={interest} 
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <button className="w-full flex items-center justify-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                <UserPlus className="mr-2" /> Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindFriendPage;