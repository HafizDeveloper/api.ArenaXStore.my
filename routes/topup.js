const express = require('express');
const router = express.Router();
const { createTopupTransaction } = require('../services/topupService');
const auth = require('../middleware/auth'); // Assuming authentication middleware exists

// Route to handle top-up requests
router.post('/topup', auth, async (req, res) => {
  const { game, playerId, packageId, paymentMethod } = req.body;
  const userId = req.user.id; // Assuming user ID is available from authentication middleware

  if (!game || !playerId || !packageId || !paymentMethod) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const transaction = await createTopupTransaction(userId, game, playerId, packageId, paymentMethod);
    res.status(201).json({ message: 'Top-up request created successfully', transaction });
  } catch (error) {
    console.error('Error in top-up route:', error);
    res.status(500).json({ message: 'Failed to create top-up request', error: error.message });
  }
});

module.exports = router;
