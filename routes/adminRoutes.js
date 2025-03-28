const express = require('express');
const {
    updateFeedbackTypeStatus,
    fetchFeedbackTypeStatuses,
} = require('../controllers/adminController');
const router = express.Router();

router.post('/feedback-type-status', updateFeedbackTypeStatus);
router.get('/feedback-type-status', fetchFeedbackTypeStatuses);

module.exports = router;
