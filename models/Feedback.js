const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    student: {
        _id: String,
        name: String,
        usn: String,
        course: String,
    },
    academicYear: String,
    semester: String,
    feedbackType: String,
    feedback: [
        {
            subject: String,
            professorName: String,
            ratings: [Number],
        },
    ],
    comments: String,
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
