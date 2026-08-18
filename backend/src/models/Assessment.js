const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['big-five', 'self-awareness', 'communication'],
      default: 'big-five',
    },
    answers: [{
      questionId: Number,
      score: { type: Number, min: 1, max: 5 },
    }],
    results: {
      openness: { type: Number, default: 0 },
      conscientiousness: { type: Number, default: 0 },
      extraversion: { type: Number, default: 0 },
      agreeableness: { type: Number, default: 0 },
      neuroticism: { type: Number, default: 0 },
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Assessment', assessmentSchema);
