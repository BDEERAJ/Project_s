const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)
const Points = mongoose.model('Points', new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    total: { type: Number, default: 0 },
    correct: { type: Number, default: 0 }
}));

const ContentDB = mongoose.model('ContentDB', new mongoose.Schema({
    topic: String,
    content: String
}), 'content_dbs');

const MoreInfo = mongoose.model('MoreInfo', new mongoose.Schema({
    topic: String,
    content: String
}), 'moreinfos');

const Feedback = mongoose.model('Feedback', new mongoose.Schema({
    rev: String
}), 'feedback');

const MessageFromPortfolio = mongoose.model('MessageFromPortfolio', new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
}));

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String
});

const pointsSchema = new mongoose.Schema({
    email: String,
    total: Number,
    correct: Number
});

const User =mongoose.model('users', userSchema);
module.exports = {
    Points,
    ContentDB,
    MoreInfo,
    Feedback,
    MessageFromPortfolio,
     User, 
     Points
};