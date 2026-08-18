const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { formatUserResponse } = require('../utils/adminSeed');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists with this email' });
  }

  const user = await User.create({ name, email, password });

  res.status(201).json(formatUserResponse(user, generateToken(user._id)));
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.json(formatUserResponse(user, generateToken(user._id)));
};

const getProfile = async (req, res) => {
  res.json(formatUserResponse(req.user));
};

const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.name = req.body.name ?? user.name;
  user.bio = req.body.bio ?? user.bio;

  if (req.body.personalityTraits) {
    user.personalityTraits = { ...user.personalityTraits.toObject(), ...req.body.personalityTraits };
  }

  const updatedUser = await user.save();
  res.json(formatUserResponse(updatedUser));
};

module.exports = { registerUser, loginUser, getProfile, updateProfile };
