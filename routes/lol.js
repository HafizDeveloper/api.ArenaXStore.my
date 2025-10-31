const express = require('express');
const Joi = require('joi');
const router = express.Router();

// Validation schema for League of Legends top-up
const lolSchema = Joi.object({
    userId: Joi.string().required(),
    item: Joi.string().required(),
    price: Joi.string().required(),
    paymentMethod: Joi.string().required()
});

// League of Legends top-up endpoint
router.post('/lolTopup', async (req, res) => {
    try {
        // Validate request body
        const { error } = lolSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request data',
                error: error.details[0].message
            });
        }

        const { userId, item, price, paymentMethod } = req.body;

        // Generate unique transaction ID
        const transactionId = 'LOL-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock successful response
        const response = {
            success: true,
            transactionId: transactionId,
            game: 'League of Legends',
            userId: userId,
            item: item,
            price: price,
            paymentMethod: paymentMethod,
            status: 'completed',
            message: `Successfully purchased ${item} for League of Legends account ${userId}`,
            timestamp: new Date().toISOString()
        };

        console.log('League of Legends Top-up Processed:', response);
        res.json(response);

    } catch (error) {
        console.error('League of Legends Top-up Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error during League of Legends top-up'
        });
    }
});

module.exports = router;
