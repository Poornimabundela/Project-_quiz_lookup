import express from 'express';
import Score from '../models/Score.js';
import UserModel from '../models/User.js';

const router = express.Router();

// Route to save a score (protected route)
router.post('/save', async (req, res) => {
    const { userEmail, quizType, score } = req.body;

    try {
        // Find the user by userEmail
        const user = await UserModel.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newScore = new Score({
            userEmail: userEmail, // Use userEmail to associate score with the user
            quizType,
            score
        });

        await newScore.save();
        return res.json({ status: true, message: 'Score saved successfully' });
    } catch (error) {
        console.error('Error saving score:', error);
        return res.status(500).json({ error: 'Failed to save score' });
    }
});

export default router;
