const Course = require('../models/Course');

exports.addCourse = async (req, res) => {
    try {
        console.log('Incoming request body:', req.body); // Log the incoming request

        const courseData = req.body;

        // Validate required fields
        if (!courseData.name || typeof courseData.name !== 'string') {
            return res.status(400).json({ message: 'Course name is required and must be a string.' });
        }

        if (!Array.isArray(courseData.academicYears) || courseData.academicYears.length === 0) {
            return res.status(400).json({ message: 'Academic years are required and must be an array.' });
        }

        if (!Array.isArray(courseData.subjects) || courseData.subjects.length === 0) {
            return res.status(400).json({ message: 'Subjects are required and must be an array.' });
        }

        // Map and validate subjects
        const subjects = courseData.subjects.map(subject => {
            if (!subject.name || !subject.semester || !subject.subjectCode || !subject.professorName) {
                throw new Error('Each subject must have name, semester, subjectCode, and professorName.');
            }
            return {
                name: subject.name,
                semester: subject.semester,
                subjectCode: subject.subjectCode,
                professorName: subject.professorName,
            };
        });

        // Dynamically create a course entry based on the course name
        console.log(`Creating entry for course: ${courseData.name}`);
        const course = new Course({
            name: courseData.name,
            academicYears: courseData.academicYears,
            subjects: subjects,
        });

        // Save to the database
        await course.save();

        res.status(201).json({ message: `Course ${courseData.name} added successfully` });
    } catch (error) {
        console.error('Error adding course:', error.message, error.stack); // Log detailed error
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate course name. Course already exists.' });
        }
        res.status(500).json({ message: 'Error adding course', error: error.message });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const { name, academicYears, subjects } = req.body;

        // Validate required fields
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ message: 'Course name is required and must be a string.' });
        }

        // Find the course by name
        const course = await Course.findOne({ name });
        if (!course) {
            return res.status(404).json({ message: 'Course not found.' });
        }

        // Update academic years if provided
        if (academicYears && Array.isArray(academicYears)) {
            course.academicYears = [...new Set([...course.academicYears, ...academicYears])];
        }

        // Update subjects if provided
        if (subjects && Array.isArray(subjects)) {
            subjects.forEach(subject => {
                if (!subject.name || !subject.semester || !subject.subjectCode || !subject.professorName) {
                    throw new Error('Each subject must have name, semester, subjectCode, and professorName.');
                }
                const existingSubject = course.subjects.find(s => s.subjectCode === subject.subjectCode);
                if (existingSubject) {
                    // Update existing subject
                    Object.assign(existingSubject, subject);
                } else {
                    // Add new subject
                    course.subjects.push(subject);
                }
            });
        }

        // Save the updated course
        await course.save();

        res.status(200).json({ message: `Course ${name} updated successfully.` });
    } catch (error) {
        console.error('Error updating course:', error.message, error.stack);
        res.status(500).json({ message: 'Error updating course', error: error.message });
    }
};
