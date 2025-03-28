const express = require('express');
const { addStudents } = require('../controllers/addStudentController');
const router = express.Router();

router.post('/addStudents', addStudents);

module.exports = router;
