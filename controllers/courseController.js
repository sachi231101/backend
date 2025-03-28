const Course = require('../models/Course');

exports.getAcademicYears = async (req, res) => {
    try {
        const courses = await Course.find({}, 'academicYears');
        const academicYears = [...new Set(courses.flatMap(course => course.academicYears))].sort(); // Ensure unique and sorted
        if (!academicYears || academicYears.length === 0) {
            return res.status(404).json({ message: 'No academic years found' });
        }
        res.status(200).json({ academicYears });
    } catch (error) {
        console.error('Error fetching academic years:', error.message);
        res.status(500).json({ message: 'Error fetching academic years', error });
    }
};

exports.getSemesters = async (req, res) => {
    const { academicYear } = req.params;

    try {
        const courses = await Course.find({ academicYears: academicYear }, 'subjects');
        const semesters = [...new Set(
            courses.flatMap(course =>
                course.subjects.map(subject => subject.semester)
            )
        )].sort(); // Ensure unique and sorted
        if (!semesters || semesters.length === 0) {
            return res.status(404).json({ message: 'No semesters found for the given academic year' });
        }
        res.status(200).json({ semesters });
    } catch (error) {
        console.error('Error fetching semesters:', error.message);
        res.status(500).json({ message: 'Error fetching semesters', error });
    }
};

exports.getSubjects = async (req, res) => {
    const { semester } = req.params;
    const { course } = req.query;

    try {
        console.log('Fetching subjects for semester:', semester, 'and course:', course); // Debug log

        const normalizedSemester = semester.trim().toLowerCase();
        const courseData = await Course.findOne({ name: course }, 'subjects');
        if (!courseData) {
            console.error('Course not found:', course); // Debug log
            return res.status(404).json({ message: `Course not found: ${course}` });
        }

        const subjects = courseData.subjects.filter(subject =>
            subject.semester.trim().toLowerCase() === normalizedSemester
        );
        if (!subjects || subjects.length === 0) {
            console.error('No subjects found for semester:', semester); // Debug log
            return res.status(404).json({ message: `No subjects found for semester: ${semester}` });
        }

        console.log('Subjects fetched successfully:', subjects); // Debug log
        res.status(200).json({ subjects });
    } catch (error) {
        console.error('Error fetching subjects:', error.message); // Debug log
        res.status(500).json({ message: 'Error fetching subjects', error });
    }
};

