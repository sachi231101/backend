const express = require('express');
const { getQuestionsByFeedbackType } = require('../controllers/questionController');
const router = express.Router();

router.get('/:feedbackType', getQuestionsByFeedbackType); // Ensure this matches the frontend request

module.exports = router;
