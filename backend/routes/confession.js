const express = require('express');
const router = express.Router();
const Confession = require('../models/Confession');

// Post confession
router.post('/post', async (req, res) => {
    try {
        const { content } = req.body;
        const newConfession = new Confession({ content });
        await newConfession.save();
        res.json({ message: "Confession posted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all confessions
router.get('/', async (req, res) => {
    try {
        const confessions = await Confession.find();
        res.json(confessions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
