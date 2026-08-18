const Assessment = require('../models/Assessment');
const User = require('../models/User');

const BIG_FIVE_QUESTIONS = [
  { id: 1, trait: 'extraversion', text: 'I feel comfortable in social situations' },
  { id: 2, trait: 'conscientiousness', text: 'I am organized and plan ahead' },
  { id: 3, trait: 'openness', text: 'I enjoy trying new experiences' },
  { id: 4, trait: 'agreeableness', text: 'I am considerate of others feelings' },
  { id: 5, trait: 'neuroticism', text: 'I often feel anxious or stressed' },
  { id: 6, trait: 'extraversion', text: 'I am outgoing and talkative' },
  { id: 7, trait: 'conscientiousness', text: 'I follow through on my commitments' },
  { id: 8, trait: 'openness', text: 'I appreciate art and creative ideas' },
  { id: 9, trait: 'agreeableness', text: 'I trust people easily' },
  { id: 10, trait: 'neuroticism', text: 'I get upset easily' },
];

const calculateResults = (answers) => {
  const traitScores = {
    openness: [],
    conscientiousness: [],
    extraversion: [],
    agreeableness: [],
    neuroticism: [],
  };

  answers.forEach((answer) => {
    const question = BIG_FIVE_QUESTIONS.find((q) => q.id === answer.questionId);
    if (question) {
      traitScores[question.trait].push(answer.score);
    }
  });

  const results = {};
  Object.keys(traitScores).forEach((trait) => {
    const scores = traitScores[trait];
    if (scores.length === 0) {
      results[trait] = 0;
      return;
    }
    const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length;
    results[trait] = Math.round((avg / 5) * 100);
  });

  return results;
};

const getQuestions = async (req, res) => {
  res.json(BIG_FIVE_QUESTIONS);
};

const getAssessments = async (req, res) => {
  const assessments = await Assessment.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(assessments);
};

const submitAssessment = async (req, res) => {
  const { answers, type = 'big-five' } = req.body;
  const results = calculateResults(answers);

  const assessment = await Assessment.create({
    user: req.user._id,
    type,
    answers,
    results,
  });

  const user = await User.findById(req.user._id);
  user.personalityTraits = results;
  await user.save();

  res.status(201).json(assessment);
};

module.exports = { getQuestions, getAssessments, submitAssessment };
