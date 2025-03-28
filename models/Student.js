const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: { type: String, required: true },
    usn: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    course: { type: String, required: true },
    year: { type: Number, required: true },
});

module.exports = mongoose.model('Student', studentSchema);
