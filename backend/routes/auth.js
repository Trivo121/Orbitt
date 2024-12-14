// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Temporary storage for OTPs
const otpStorage = new Map();

// Function to generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP route
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  // Validate email (ensure it's a college email)
  if (!email.endsWith('@ksrmce.ac.in')) {
    return res.status(400).json({ message: 'Only college emails are allowed' });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  // Generate OTP
  const otp = generateOTP();
  
  // Store OTP with timestamp
  otpStorage.set(email, {
    otp,
    createdAt: Date.now()
  });

  // Send OTP via email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'OTP for Orbit Registration',
    text: `Your OTP is: ${otp}. It will expire in 10 minutes.`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// Verify OTP route
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  const storedOTP = otpStorage.get(email);

  if (!storedOTP) {
    return res.status(400).json({ message: 'No OTP request found' });
  }

  // Check OTP expiration (10 minutes)
  if (Date.now() - storedOTP.createdAt > 10 * 60 * 1000) {
    otpStorage.delete(email);
    return res.status(400).json({ message: 'OTP expired' });
  }

  if (storedOTP.otp !== otp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  // OTP is valid
  otpStorage.delete(email);
  res.status(200).json({ message: 'OTP verified successfully', verified: true });
});

// Extended Registration Route
router.post('/register', async (req, res) => {
  const { 
    email, 
    password, 
    fullName, 
    username, 
    collegeRollNo, 
    bio,
    interests,
    goals,
    hobbies
  } = req.body;

  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      fullName,
      username,
      collegeRollNo,
      bio,
      interests,
      goals,
      hobbies,
      profilePic: req.file ? req.file.path : null
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '30d' }
    );

    res.status(201).json({ 
      token, 
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

module.exports = router;