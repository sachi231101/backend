const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const questionRoutes = require('./routes/questionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const addCourseRoutes = require('./routes/addCourseRoutes'); // Ensure this path is correct
const addStudentRoutes = require('./routes/addStudentRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes'); // Import feedback routes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

mongoose.connect('mongodb://localhost:27017/feedbackSystem', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
});

// Use routes
app.use('/api/students', studentRoutes); // Handles login and other student-related routes

// Optional: Add a redirect for `/api/login` to `/api/students/login`
app.post('/api/login', (req, res, next) => {
    req.url = '/students/login';
    next();
});

app.use('/api/courses', courseRoutes);
app.use('/api/questions', questionRoutes); // Ensure this matches the frontend request
app.use('/api/admin', adminRoutes);
app.use('/api/addCourse', addCourseRoutes); // Matches the frontend request
app.use('/api/addstudents', addStudentRoutes); // Handles add-students route
app.use('/api/feedback', feedbackRoutes); // Mount feedback routes

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});