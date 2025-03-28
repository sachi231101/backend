const express = require('express');
const { submitFeedback, getFeedbacks, getFilteredFeedback, getCoursesAndProfessors, getFilteredFeedbackWithAverage, getSemesters, getProfessorsByCourse, getSemestersByCourse, getYears, getFeedbackTypes } = require('../controllers/feedbackController'); // Import getFilteredFeedback and getYears
const router = express.Router();

router.post('/submit-feedback', submitFeedback); // Route to handle feedback submission
router.get('/getFeedbacks', getFeedbacks); // Route to fetch feedbacks
router.get('/filtered-feedback', getFilteredFeedback); // New route for filtered feedback
router.get('/courses-and-professors', getCoursesAndProfessors); // Route to fetch courses and professors
router.get('/filtered-feedback-with-average', getFilteredFeedbackWithAverage); // Route for filtered feedback with average ratings
router.get('/semesters', getSemesters); // Route to fetch unique semesters
router.get('/professors-by-course', getProfessorsByCourse); // Route to fetch professors by course
router.get('/semesters-by-course', getSemestersByCourse); // Route to fetch semesters by course
router.get('/years', getYears); // Route to fetch unique years
router.get('/feedback-types', getFeedbackTypes); // Route to fetch unique feedback types

module.exports = router;
