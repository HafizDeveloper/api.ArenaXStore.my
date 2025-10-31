const express = require('express');
const Joi = require('joi');
const router = express.Router();

// Validation schema for Valorant top-up
const valorantSchema = Joi.object({
    userId: Joi.string().required(),
    item: Joi.string().required(),
    price: Joi.string().required(),
    paymentMethod: Joi.string().required()
});

// Valorant top-up endpoint
router.post('/valorantTopup', async (req, res) => {
    try {
        // Validate request body
        const { error } = valorantSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request data',
                error: error.details[0].message
            });
        }

        const { userId, item, price, paymentMethod } = req.body;

        // Generate unique transaction ID
        const transactionId = 'VAL-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock successful response
        const response = {
            success: true,
            transactionId: transactionId,
            game: 'Valorant',
            userId: userId,
            item: item,
            price: price,
            paymentMethod: paymentMethod,
            status: 'completed',
            message: `Successfully purchased ${item} for Valorant account ${userId}`,
            timestamp: new Date().toISOString()
        };

        console.log('Valorant Top-up Processed:', response);
        res.json(response);

    } catch (error) {
        console.error('Valorant Top-up Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error during Valorant top-up'
        });
    }
});

module.exports = router;
