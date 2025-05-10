let a = require('express');
const express = a();
const cors = require('cors');
const mongoose = require("mongoose");

express.use(cors());
express.use(a.json());

const dbs = mongoose.connect('mongodb://localhost:27017/trymongo').then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

const db = mongoose.model('db', { topic: String, content: String }, 'content_dbs');
const moreinfos = mongoose.model('moreinfos', { topic: String, content: String }, 'moreinfos');
const fd = mongoose.model('fd', { rev: String }, 'feedback');

express.listen(3000, (error) => {
    if (error) console.error("Server error:", error);
    else console.log('Server running on port 3000');
});

// Feedback Route
express.put('/feedback', (req, res) => {
    let str = req.body;
    let con = str['rev'];

    async function c() {
        try {
            let fd2 = new fd({ 'rev': `${con}` });
            await fd2.save();
            res.status(200).send({ message: "Feedback saved" });
        } catch (err) {
            console.error("Feedback error:", err);
            res.status(500).send({ error: "Failed to save feedback" });
        }
    }
    c();
});

// Content & MoreInfo Route
express.get('/:slug', (req, res) => {
    const tpc = req.params.slug;
    let arr = tpc.split(':');

    if (arr[0] == 'content' && arr.length > 1) {
        const fun2 = async function () {
            try {
                const obj = await moreinfos.findOne({ 'topic': `${arr[1]}` });
                if (obj != null) {
                    res.send(obj);
                } else {
                    res.status(404).send({ message: "Moreinfo not found" });
                }
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: "Error retrieving moreinfo" });
            }
        };
        fun2();
    } else {
        const fun = async function () {
            try {
                const obj = await db.findOne({ 'topic': `${tpc}` });
                if (obj != null) {
                    res.send(obj);
                } else {
                    res.status(404).send({ message: "Content not found" });
                }
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: "Error retrieving content" });
            }
        };
        fun();
    }
});

// Quiz Data Route
express.get('/quiz/:slug', (req, res) => {
    console.log(req.params.slug);
    const collectionName = req.params.slug;

    const fun = async function () {
        try {
            const quiz =
                mongoose.models[`${collectionName}`] ||
                mongoose.model(`${collectionName}`, {
                    question: String,
                    answer: String
                }, `${collectionName}`);

            const data = await quiz.find({});
            if (data != null) {
                res.json(data);
            } else {
                res.status(404).send({ message: "No quiz data found" });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Error fetching quiz data" });
        }
    };
    fun();
});
