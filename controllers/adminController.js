const FeedbackTypeStatus = require('../models/FeedbackTypeStatus');

exports.updateFeedbackTypeStatus = async (req, res) => {
    const { type, enabled } = req.body;
    try {
        const feedbackType = await FeedbackTypeStatus.findOneAndUpdate(
            { type },
            { enabled },
            { new: true, upsert: true }
        );
        res.status(200).json({ message: 'Feedback type status updated successfully', feedbackType });
    } catch (error) {
        res.status(500).json({ message: 'Error updating feedback type status', error });
    }
};

exports.fetchFeedbackTypeStatuses = async (req, res) => {
    try {
        const statuses = await FeedbackTypeStatus.find();
        res.status(200).json(statuses);
    } catch (error) {
        console.error('Error fetching feedback type statuses:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

