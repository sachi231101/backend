const express = require('express');
const {
    getAcademicYears,
    getSemesters,
    getSubjects,
    addCourse,
} = require('../controllers/courseController');
const router = express.Router();

router.get('/academic-years', getAcademicYears);
router.get('/semesters/:academicYear', getSemesters);
router.get('/subjects/:semester', getSubjects); // Ensure this matches the frontend request

module.exports = router;
