const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  interests: [{
    type: String,
    trim: true
  }],
  goals: [{
    type: String,
    trim: true
  }],
  hobbies: [{
    type: String,
    trim: true
  }],
  profile: {
    bio: String,
    age: Number,
    location: String,
    profilePicture: {
      type: String,  // Path to uploaded profile picture
      default: null
    }
  },
  anonymousId: {
    type: String,
    unique: true
  },
  matchPreferences: {
    ageRange: {
      min: Number,
      max: Number
    },
    interestedIn: [String]
  },
  socialLinks: {
    linkedin: String,
    github: String,
    twitter: String
  },
  skills: [{
    type: String,
    trim: true
  }],
  educationDetails: {
    college: String,
    graduationYear: Number,
    department: String,
    currentSemester: Number
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Password hashing middleware
UserSchema.pre('save', async function(next) {
  // Only hash password if it has been modified
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  
  // Generate anonymous ID if not exists
  if (!this.anonymousId) {
    this.anonymousId = mongoose.Types.ObjectId().toString();
  }
  
  next();
});

// Method to check password
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to update last login
UserSchema.methods.updateLastLogin = async function() {
  this.lastLogin = new Date();
  await this.save();
};

// Create the model
const User = mongoose.model('User', UserSchema);

module.exports = User;