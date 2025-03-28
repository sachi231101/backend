const Feedback = require('../models/Feedback'); // Assuming a Feedback model exists

exports.submitFeedback = async (req, res) => {
    try {
        const feedbackData = req.body;
        console.log('Feedback submission received:', feedbackData); // Debug log

        // Save feedback to the database
        const feedback = new Feedback(feedbackData);
        await feedback.save();

        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        console.error('Error submitting feedback:', error.message);
        res.status(500).json({ message: 'Error submitting feedback', error });
    }
};

exports.getFeedbacks = async (req, res) => {
    try {
        // Fetch feedbacks from the database
        const feedbacks = await Feedback.find()
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error('Error fetching feedbacks:', error.message);
        res.status(500).json({ message: 'Error fetching feedbacks', error });
    }
};

exports.getFilteredFeedback = async (req, res) => {
    try {
        const { course, professor } = req.query;

        // Build query based on filters
        const query = {};
        if (course) query['student.course'] = course;
        if (professor) query['feedback.professorName'] = professor;

        // Fetch feedbacks from the database
        const feedbacks = await Feedback.find(query, {
            'student.name': 1,
            'student.usn': 1,
            'student.course': 1,
            academicYear: 1,
            semester: 1,
            feedbackType: 1,
            feedback: 1,
            comments: 1,
        });

        res.status(200).json(feedbacks);
    } catch (error) {
        console.error('Error fetching filtered feedbacks:', error.message);
        res.status(500).json({ message: 'Error fetching filtered feedbacks', error });
    }
};

exports.getCoursesAndProfessors = async (req, res) => {
    try {
        // Fetch unique courses
        const courses = await Feedback.distinct('student.course');

        // Fetch unique professors
        const professors = await Feedback.distinct('feedback.professorName');

        res.status(200).json({ courses, professors });
    } catch (error) {
        console.error('Error fetching courses and professors:', error.message);
        res.status(500).json({ message: 'Error fetching courses and professors', error });
    }
};

exports.getFilteredFeedbackWithAverage = async (req, res) => {
    try {
        const { course, professor, semester, year, feedbackType } = req.query; // Include feedbackType in query parameters

        // Build query based on filters
        const query = {};
        if (course) query['student.course'] = course;
        if (year) query.academicYear = year;
        if (professor) query['feedback.professorName'] = professor;
        if (semester) query.semester = semester;
        if (feedbackType) query.feedbackType = feedbackType; // Add feedbackType filter

        // Fetch feedbacks from the database
        const feedbacks = await Feedback.find(query, {
            'student.name': 1,
            'student.usn': 1,
            'student.course': 1,
            semester: 1, // Include semester in the response
            academicYear: 1, // Include year in the response
            feedback: 1,
            comments: 1,
        });

        // If professor is not provided, return all feedback for the course
        const filteredFeedbacks = professor
            ? feedbacks.map(feedback => ({
                  ...feedback._doc,
                  feedback: feedback.feedback.filter(subjectFeedback => subjectFeedback.professorName === professor),
              })).filter(feedback => feedback.feedback.length > 0)
            : feedbacks;

        // Calculate average ratings for the selected professor
        let averageRating = null;
        if (professor) {
            const ratings = filteredFeedbacks
                .flatMap(feedback => feedback.feedback)
                .reduce((acc, curr) => acc.concat(curr.ratings), []);

            if (ratings.length > 0) {
                averageRating = (ratings.reduce((sum, rating) => sum + rating, 0) / (ratings.length * 5)) * 100; // Assuming ratings are out of 5
            }
        }

        res.status(200).json({ feedbacks: filteredFeedbacks, averageRating });
    } catch (error) {
        console.error('Error fetching filtered feedbacks:', error.message);
        res.status(500).json({ message: 'Error fetching filtered feedbacks', error });
    }
};

exports.getSemesters = async (req, res) => {
    try {
        // Fetch unique semesters from the database
        const semesters = await Feedback.distinct('semester');
        res.status(200).json(semesters);
    } catch (error) {
        console.error('Error fetching semesters:', error.message);
        res.status(500).json({ message: 'Error fetching semesters', error });
    }
};

exports.getProfessorsByCourse = async (req, res) => {
    try {
        const { course } = req.query; // Get the course from query parameters
        if (!course) {
            return res.status(400).json({ message: 'Course is required' });
        }

        // Fetch unique professors for the given course
        const professors = await Feedback.distinct('feedback.professorName', { 'student.course': course });
        res.status(200).json(professors);
    } catch (error) {
        console.error('Error fetching professors by course:', error.message);
        res.status(500).json({ message: 'Error fetching professors by course', error });
    }
};

exports.getSemestersByCourse = async (req, res) => {
    try {
        const { course } = req.query; // Get the course from query parameters
        if (!course) {
            return res.status(400).json({ message: 'Course is required' });
        }

        // Fetch unique semesters for the given course
        const semesters = await Feedback.distinct('semester', { 'student.course': course });
        res.status(200).json(semesters);
    } catch (error) {
        console.error('Error fetching semesters by course:', error.message);
        res.status(500).json({ message: 'Error fetching semesters by course', error });
    }
};

exports.getYears = async (req, res) => {
    try {
        // Fetch unique years from the database
        const years = await Feedback.distinct('academicYear');
        res.status(200).json(years);
    } catch (error) {
        console.error('Error fetching years:', error.message);
        res.status(500).json({ message: 'Error fetching years', error });
    }
};

exports.getFeedbackTypes = async (req, res) => {
    try {
        // Fetch unique feedback types from the database
        const feedbackTypes = await Feedback.distinct('feedbackType');
        res.status(200).json(feedbackTypes);
    } catch (error) {
        console.error('Error fetching feedback types:', error.message);
        res.status(500).json({ message: 'Error fetching feedback types', error });
    }
};
