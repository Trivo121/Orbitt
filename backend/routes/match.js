const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Find a friend
router.get('/find', async (req, res) => {
    try {
        // Simulate AI logic to find matches
        const randomUser = await User.aggregate([{ $sample: { size: 1 } }]);
        res.json(randomUser[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
