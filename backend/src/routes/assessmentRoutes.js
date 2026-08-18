const express = require('express');
const {
  getQuestions,
  getAssessments,
  submitAssessment,
} = require('../controllers/assessmentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/questions', getQuestions);
router.route('/').get(getAssessments).post(submitAssessment);

module.exports = router;
