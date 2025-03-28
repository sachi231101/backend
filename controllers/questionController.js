const Question = require('../models/Question');

exports.getQuestionsByFeedbackType = async (req, res) => {
    const { feedbackType } = req.params;
    console.log('Requested feedbackType:', feedbackType); // Debug log

    try {
        const query = { feedbackType: { $regex: new RegExp(`^${feedbackType}$`, 'i') } }; // Case-insensitive match
        console.log('Executing query:', query); // Debug log
        const questionData = await Question.findOne(query);
        if (questionData) {
            res.status(200).json({ questions: questionData.questions });
        } else {
            res.status(404).json({ message: `No questions found for feedback type: ${feedbackType}` });
        }
    } catch (error) {
        console.error('Error fetching questions:', error.message);
        res.status(500).json({ message: 'Error fetching questions', error });
    }
};
