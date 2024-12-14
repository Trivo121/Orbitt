const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Middleware imports
const authMiddleware = require('./middleware/authMiddleware');

// Route imports
const authRoutes = require('./routes/auth');
const confessionRoutes = require('./routes/confession');
const matchRoutes = require('./routes/match');
const messageRoutes = require('./routes/message');

// Utility imports
const { seedDatabase } = require('./database/seedData');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to MongoDB');
    await seedDatabase(); // Seed the database with initial data
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/confessions', confessionRoutes); // Anonymous confession routes
app.use('/api/matches', matchRoutes); // Find a friend routes
app.use('/api/messages', authMiddleware, messageRoutes); // Messaging routes (protected)

// Serve static frontend files (optional, for deployment)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  );
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
