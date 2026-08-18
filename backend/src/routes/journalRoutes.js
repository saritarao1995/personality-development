const express = require('express');
const {
  getJournalEntries,
  getJournalEntryById,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
} = require('../controllers/journalController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/').get(getJournalEntries).post(createJournalEntry);
router.route('/:id').get(getJournalEntryById).put(updateJournalEntry).delete(deleteJournalEntry);

module.exports = router;
