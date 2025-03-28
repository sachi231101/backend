const express = require('express');
const { login, getStudentInfo, getStudentAcademicDetails } = require('../controllers/studentController');
const router = express.Router();

router.post('/login', login); // Ensure this matches the frontend request
router.get('/info', getStudentInfo);
router.get('/academic-details', getStudentAcademicDetails);

module.exports = router;
