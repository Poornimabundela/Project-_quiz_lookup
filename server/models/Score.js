import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
    userID: { type: String, required: true }, // Add userEmail field

    userEmail: { type: String, required: true }, // Add userEmail field
    quizType: { type: String, required: true },
    score: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const Score = mongoose.model('Score', scoreSchema);

export default Score;
