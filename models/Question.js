const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
    feedbackType: { type: String, unique: true, enum: ['Pre-Feedback', 'Post-Feedback'] }, // Ensure feedbackType matches expected values
    questions: [String],
});

module.exports = mongoose.model('Question', questionSchema);
