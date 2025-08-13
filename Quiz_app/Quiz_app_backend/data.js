const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const points = mongoose.models.points || mongoose.model('points', new mongoose.Schema({ email: String, total: Number, correct: Number }));
const db = mongoose.models.db || mongoose.model('db', { topic: String, content: String }, 'content_dbs');
const moreinfos = mongoose.models.moreinfos || mongoose.model('moreinfos', { topic: String, content: String }, 'moreinfos');
const fd = mongoose.models.fd || mongoose.model('fd', { rev: String }, 'feedback');
const MessageFromPortfolio = mongoose.models.MessageFromPortfolio || mongoose.model('MessageFromPortfolio', new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
}));

router.put('/result/points', async (req, res) => {
    try {
        const { email, tot, crt } = req.body;

        if (!email || tot == null || crt == null) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        let user = await points.findOne({ email });

        if (user) {
            await points.updateOne(
                { email },
                { $set: { total: parseInt(user.total) + parseInt(tot), correct: parseInt(user.correct) + parseInt(crt) } }
            );
        } else {
            await points.create({ email, total: tot, correct: crt });
        }

        res.status(200).json({ message: "Points updated successfully" });
    } catch {
        res.status(500).json({ error: "Server Error" });
    }
});

router.put('/feedback', async (req, res) => {
    const { rev } = req.body;
    try {
        const newFeedback = new fd({ rev });
        await newFeedback.save();
        res.status(200).send({ message: 'Feedback saved' });
    } catch {
        res.status(500).send({ error: 'Failed to save feedback' });
    }
});

router.get('/:slug', async (req, res) => {
    const tpc = req.params.slug;
    let arr = tpc.split(':');

    try {
        if (arr[0] === 'content' && arr.length > 1) {
            const obj = await moreinfos.findOne({ topic: arr[1] });
            if (obj) return res.send(obj);
            else return res.status(404).send({ message: 'Moreinfo not found' });
        } else {
            const obj = await db.findOne({ topic: tpc });
            if (obj) return res.send(obj);
            else return res.status(404).send({ message: 'Content not found' });
        }
    } catch {
        res.status(500).send({ error: 'Error retrieving content' });
    }
});

router.get('/quiz/:slug', async (req, res) => {
    const collectionName = req.params.slug;
    try {
        const QuizModel = mongoose.models[collectionName] || mongoose.model(collectionName, {
            question: String,
            answer: String
        }, collectionName);

        const data = await QuizModel.find({});
        if (data) res.json(data);
        else res.status(404).send({ message: 'No quiz data found' });
    } catch {
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
        res.status(500).json({ success: false, error: 'Server error. Please try again later.' });
    }
});

module.exports = router;