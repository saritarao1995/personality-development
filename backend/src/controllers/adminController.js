const User = require('../models/User');
const Goal = require('../models/Goal');
const JournalEntry = require('../models/JournalEntry');
const Assessment = require('../models/Assessment');

const getStats = async (req, res) => {
  const [totalUsers, totalGoals, totalJournalEntries, totalAssessments, recentUsers] =
    await Promise.all([
      User.countDocuments(),
      Goal.countDocuments(),
      JournalEntry.countDocuments(),
      Assessment.countDocuments(),
      User.find().sort({ createdAt: -1 }).limit(5).select('-password'),
    ]);

  const adminCount = await User.countDocuments({ role: 'admin' });

  res.json({
    totalUsers,
    adminCount,
    totalGoals,
    totalJournalEntries,
    totalAssessments,
    recentUsers,
  });
};

const getUsers = async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
};

const updateUserRole = async (req, res) => {
  const { role } = req.body;

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user._id.toString() === req.user._id.toString()) {
    return res.status(400).json({ message: 'You cannot change your own role' });
  }

  user.role = role;
  await user.save();

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  });
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user._id.toString() === req.user._id.toString()) {
    return res.status(400).json({ message: 'You cannot delete your own account' });
  }

  await Goal.deleteMany({ user: user._id });
  await JournalEntry.deleteMany({ user: user._id });
  await Assessment.deleteMany({ user: user._id });
  await user.deleteOne();

  res.json({ message: 'User deleted successfully' });
};

module.exports = { getStats, getUsers, updateUserRole, deleteUser };
