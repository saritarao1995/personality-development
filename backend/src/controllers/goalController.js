const Goal = require('../models/Goal');

const getGoals = async (req, res) => {
  const goals = await Goal.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(goals);
};

const getGoalById = async (req, res) => {
  const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });

  if (!goal) {
    return res.status(404).json({ message: 'Goal not found' });
  }

  res.json(goal);
};

const createGoal = async (req, res) => {
  const goal = await Goal.create({ ...req.body, user: req.user._id });
  res.status(201).json(goal);
};

const updateGoal = async (req, res) => {
  const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });

  if (!goal) {
    return res.status(404).json({ message: 'Goal not found' });
  }

  Object.assign(goal, req.body);
  const updatedGoal = await goal.save();
  res.json(updatedGoal);
};

const deleteGoal = async (req, res) => {
  const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });

  if (!goal) {
    return res.status(404).json({ message: 'Goal not found' });
  }

  await goal.deleteOne();
  res.json({ message: 'Goal removed' });
};

module.exports = { getGoals, getGoalById, createGoal, updateGoal, deleteGoal };
