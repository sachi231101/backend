const express = require('express');
const { addCourse, updateCourse } = require('../controllers/addCourseController');
const router = express.Router();

// Update the route to include the `/api` prefix
router.post('/addCourse', addCourse); // Matches the `/api/addCourse` prefix in server.js
router.put('/updateCourse', updateCourse); // Add a PUT route for updating a course

module.exports = router;
