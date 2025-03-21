const Challenge = require('../models/Challenge');
const User = require('Server/models/user.js');

exports.getChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find();
        res.json(challenges);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.submitSolution = async (req, res) => {
    const { userId, challengeId, code } = req.body;
    try {
        const challenge = await Challenge.findById(challengeId);
        const user = await User.findById(userId);

        // Simulate code execution and check against test cases
        const isCorrect = challenge.testCases.every(testCase => {
            // Here you would run the code and compare the output
            return true; // Placeholder for actual code execution logic
        });

        if (isCorrect) {
            user.score += 10; // Award points for correct solution
            await user.save();
            res.json({ message: 'Solution correct!', score: user.score });
        } else {
            res.status(400).json({ message: 'Solution incorrect' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getLeaderboard = async (req, res) => {
    try {
        const users = await User.find().sort({ score: -1 }).limit(10);
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};