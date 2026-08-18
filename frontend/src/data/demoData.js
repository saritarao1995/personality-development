export const DEMO_PERSONALITY_TRAITS = {
  openness: 78,
  conscientiousness: 65,
  extraversion: 52,
  agreeableness: 84,
  neuroticism: 38,
};

export const DEMO_GOALS = [
  {
    _id: 'demo-1',
    title: 'Improve public speaking',
    description: 'Practice speaking in front of a mirror for 10 minutes daily.',
    category: 'communication',
    status: 'in-progress',
    progress: 45,
    targetDate: '2026-09-01',
  },
  {
    _id: 'demo-2',
    title: 'Build morning routine',
    description: 'Wake up at 6 AM and follow a structured morning habit stack.',
    category: 'habits',
    status: 'in-progress',
    progress: 70,
    targetDate: '2026-08-30',
  },
  {
    _id: 'demo-3',
    title: 'Read 12 personal growth books',
    description: 'Finish one book per month focused on self-improvement.',
    category: 'other',
    status: 'completed',
    progress: 100,
    targetDate: '2026-06-01',
  },
];

export const DEMO_JOURNAL_ENTRIES = [
  {
    _id: 'demo-j1',
    title: 'A productive day',
    content: 'Today I practiced active listening in my team meeting. I noticed how much clearer communication became when I focused fully on others.',
    mood: 'great',
    tags: ['communication', 'work'],
    createdAt: '2026-08-17T10:00:00.000Z',
  },
  {
    _id: 'demo-j2',
    title: 'Reflection on patience',
    content: 'I felt frustrated during a difficult conversation, but I paused before reacting. That small moment of mindfulness made a big difference.',
    mood: 'good',
    tags: ['mindfulness', 'emotions'],
    createdAt: '2026-08-16T18:30:00.000Z',
  },
];

export const ASSESSMENT_QUESTIONS = [
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

export const calculateAssessmentResults = (answers) => {
  const traitScores = {
    openness: [],
    conscientiousness: [],
    extraversion: [],
    agreeableness: [],
    neuroticism: [],
  };

  answers.forEach((answer) => {
    const question = ASSESSMENT_QUESTIONS.find((q) => q.id === answer.questionId);
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
