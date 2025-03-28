const Student = require('../models/Student');
const Course = require('../models/Course');

exports.login = async (req, res) => {
    const { usn, password } = req.body;
    try {
        console.log('Login request received:', { usn });

        const student = await Student.findOne({ usn });
        if (!student) {
            console.error('Invalid credentials:', { usn });
            return res.status(401).json({ message: 'Invalid USN or password' });
        }

        // Direct password comparison without bcrypt
        if (password !== student.password) {
            console.error('Invalid password for USN:', usn);
            return res.status(401).json({ message: 'Invalid USN or password' });
        }

        const course = await Course.findOne({ name: student.course });
        if (!course) {
            console.error('Course not found:', { courseName: student.course });
            return res.status(404).json({ message: 'Course not found for the student' });
        }

        console.log('Login successful:', { usn: student.usn, course: student.course });

        return res.status(200).json({
            usn: student.usn,
            course: student.course,
            role: 'student',
            name: student.name,
            subjects: course.subjects,
        });
    } catch (error) {
        console.error('Unexpected error during login:', error.message, error.stack);
        return res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
    }
};

exports.getStudentInfo = async (req, res) => {
    const { usn } = req.query;
    try {
        console.log('Fetching student information for USN:', usn);

        const student = await Student.findOne({ usn });
        if (!student) {
            console.error('Student not found for USN:', usn);
            return res.status(404).json({ message: 'Student not found' });
        }

        console.log('Student information retrieved successfully:', { usn: student.usn });

        return res.status(200).json({
            name: student.name,
            usn: student.usn,
            course: student.course,
            year: student.year,
        });
    } catch (error) {
        console.error('Unexpected error while fetching student information:', error.message, error.stack);
        return res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
    }
};

exports.getStudentAcademicDetails = async (req, res) => {
    const { usn } = req.query;

    try {
        const student = await Student.findOne({ usn });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const course = await Course.findOne({ name: student.course });
        if (!course) {
            return res.status(404).json({ message: 'Course not found for the student' });
        }

        const academicYears = course.academicYears;
        const subjects = course.subjects.filter(subject => subject.semester === student.year.toString());
        const semesters = [...new Set(subjects.map(subject => subject.semester))];

        res.status(200).json({ academicYears, semesters });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching academic details', error });
    }
};