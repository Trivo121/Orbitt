// database/seedData.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../backend/models/User');
const Confession = require('../backend/models/Confession');
const Match = require('../backend/models/Match');

async function seedDatabase() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Confession.deleteMany({});
    await Match.deleteMany({});

    // Create sample users
    const hashedPassword = await bcrypt.hash('testPassword123', 10);
    const users = [
      {
        email: 'john.doe@ksrmce.ac.in',
        password: hashedPassword,
        fullName: 'John Doe',
        username: 'johndoe',
        collegeRollNo: '2X9Y1A001',
        interests: ['Technology', 'Music', 'Photography'],
        goals: ['Learn Web Development', 'Start a Startup'],
        hobbies: ['Coding', 'Guitar', 'Hiking'],
        matchPreferences: {
          lookingFor: ['Collaboration', 'Study Partner'],
          preferredInterests: ['Technology', 'Entrepreneurship']
        }
      },
      {
        email: 'jane.smith@ksrmce.ac.in',
        password: hashedPassword,
        fullName: 'Jane Smith',
        username: 'janesmith',
        collegeRollNo: '2X9Y1A002',
        interests: ['Design', 'Art', 'Marketing'],
        goals: ['Become a UX Designer', 'Learn Digital Marketing'],
        hobbies: ['Painting', 'Graphic Design', 'Yoga']
      }
    ];

    await User.insertMany(users);

    console.log('Database seeded successfully');
    return true;
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

module.exports = seedDatabase;