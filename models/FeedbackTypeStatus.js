const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackTypeStatusSchema = new Schema({
    type: { type: String, unique: true, required: true }, // e.g., "Pre-Feedback", "Post-Feedback"
    enabled: { type: Boolean, default: true }, // Status of the feedback type
});

module.exports = mongoose.model('FeedbackTypeStatus', feedbackTypeStatusSchema);
