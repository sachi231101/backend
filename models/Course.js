const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    name: { type: String, required: true }, // Ensure 'name' is required
    academicYears: [String],
    subjects: [
        {
            name: String,
            semester: String,
            subjectCode: String,
            professorName: String,
        },
    ],
});

module.exports = mongoose.model('Course', courseSchema);
