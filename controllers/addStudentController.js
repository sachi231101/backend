const Student = require('../models/Student');

exports.addStudents = async (req, res) => {
    const { students } = req.body;

    if (!Array.isArray(students) || students.length === 0) {
        return res.status(400).json({ message: 'Invalid or empty student data' });
    }

    const invalidStudents = students.filter(student => !student.course || typeof student.course !== 'string');
    if (invalidStudents.length > 0) {
        return res.status(400).json({ message: 'Each student must have a valid course.' });
    }

    try {
        await Student.insertMany(students, { ordered: false });
        res.status(201).json({ message: 'Students added successfully' });
    } catch (error) {
        console.error('Error adding students:', error.message);
        res.status(500).json({ message: 'Error adding students', error: error.message });
    }
};
