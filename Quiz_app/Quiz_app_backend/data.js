const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import all models from your models.js file
const {
    Points,
    ContentDB,
    MoreInfo,
    Feedback,
    MessageFromPortfolio
} = require('./models');

// Route to update or create user points
router.put('/result/points', async (req, res) => {
    try {
        const { email, tot, crt } = req.body;

        if (!email || tot == null || crt == null) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        await Points.findOneAndUpdate(
            { email },
            { $inc: { total: parseInt(tot), correct: parseInt(crt) } },
            { upsert: true, new: true } // upsert: true creates the doc if it doesn't exist
        );
       
        res.status(200).json({ message: "Points updated successfully" });
    } catch (error) {
        console.error('Error updating points:', error);
        res.status(500).json({ error: "Server Error" });
    }
});

// Route to save user feedback
router.put('/feedback', async (req, res) => {
    const { rev } = req.body;
    if (!rev) {
        return res.status(400).send({ error: 'Feedback content is required.' });
    }
    try {
        const newFeedback = new Feedback({ rev });
        await newFeedback.save();
        res.status(200).send({ message: 'Feedback saved' });
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).send({ error: 'Failed to save feedback' });
    }
});

// Route to get content based on a slug
router.get('/:slug', async (req, res) => {
    const tpc = req.params.slug;
    const arr = tpc.split(':');
    try {
        let obj;
        if (arr[0] === 'content' && arr.length > 1) {
            obj = await MoreInfo.findOne({ topic: arr[1] });
            if (!obj) return res.status(404).send({ message: 'Moreinfo not found' });
        } else {
            obj = await ContentDB.findOne({topic: tpc});
            if (!obj) return res.status(404).send({ message: 'Content not found' });
        }
        return res.send(obj);
    } catch (error) {
        console.error('Error retrieving content:', error);
        res.status(500).send({ error: 'Error retrieving content' });
    }
});

// Route to get quiz data from a dynamic collection name
router.get('/quiz/:slug', async (req, res) => {
    const collectionName = req.params.slug;
    try {
        // A basic schema for dynamic quiz models
        const quizSchema = new mongoose.Schema({
            question: String,
            answer: String
        });

        // Dynamically create a model if it doesn't already exist
        const QuizModel = mongoose.models[collectionName] || mongoose.model(collectionName, quizSchema, collectionName);

        const data = await QuizModel.find({});
        if (data && data.length > 0) {
            res.json(data);
        } else {
            res.status(404).send({ message: 'No quiz data found' });
        }
    } catch (error) {
        console.error('Error fetching quiz data:', error);
        res.status(500).send({ error: 'Error fetching quiz data' });
    }
});

router.put('/contact/sendmessage', async (req, res) => {
    const { email, name, message } = req.body;

    if (!email || !name || !message) {
        return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    try {
        const data = new MessageFromPortfolio({ name, email, message });
        await data.save();
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
        console.error('Error sending message:', err);
        res.status(500).json({ success: false, error: 'Server error. Please try again later.' });
    }
});

module.exports = router;
