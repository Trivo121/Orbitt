const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  matchScore: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  commonInterests: [String],
  status: {
    type: String,
    enum: ['Pending', 'Matched', 'Rejected'],
    default: 'Pending'
  },
  matchedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Match = mongoose.model('Match', MatchSchema);

module.exports = Match;