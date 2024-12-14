import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import WelcomePage from './components/WelcomePage';
import Homepage from './components/Homepage';
import LoginPage from './components/LoginPage';
import FindFriendPage from './components/FindFriendPage';
import ConfessionPage from './components/ConfessionPage';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/find-friend" element={<FindFriendPage />} />
          <Route path="/share-universe" element={<ConfessionPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;