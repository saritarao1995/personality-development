const JournalEntry = require('../models/JournalEntry');

const getJournalEntries = async (req, res) => {
  const entries = await JournalEntry.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(entries);
};

const getJournalEntryById = async (req, res) => {
  const entry = await JournalEntry.findOne({ _id: req.params.id, user: req.user._id });

  if (!entry) {
    return res.status(404).json({ message: 'Journal entry not found' });
  }

  res.json(entry);
};

const createJournalEntry = async (req, res) => {
  const entry = await JournalEntry.create({ ...req.body, user: req.user._id });
  res.status(201).json(entry);
};

const updateJournalEntry = async (req, res) => {
  const entry = await JournalEntry.findOne({ _id: req.params.id, user: req.user._id });

  if (!entry) {
    return res.status(404).json({ message: 'Journal entry not found' });
  }

  Object.assign(entry, req.body);
  const updatedEntry = await entry.save();
  res.json(updatedEntry);
};

const deleteJournalEntry = async (req, res) => {
  const entry = await JournalEntry.findOne({ _id: req.params.id, user: req.user._id });

  if (!entry) {
    return res.status(404).json({ message: 'Journal entry not found' });
  }

  await entry.deleteOne();
  res.json({ message: 'Journal entry removed' });
};

module.exports = {
  getJournalEntries,
  getJournalEntryById,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
};
