const express = require('express');
const Joi = require('joi');
const garenaService = require('../services/garenaService');
const { Transaction } = require('../models');

const router = express.Router();

const schema = Joi.object({
  userId: Joi.string().min(1).required(),
  zoneId: Joi.string().min(1).required(),
  amount: Joi.number().positive().required(),
  orderId: Joi.string().optional()
});

// POST /api/mobileLegendsTopup
router.post('/', async (req, res) => {
  try {
    // Optional API key check
    const configuredKey = process.env.API_KEY;
    if (configuredKey) {
      const headerKey = req.headers['x-api-key'] || req.headers['apikey'] || req.query.api_key;
      if (!headerKey || headerKey !== configuredKey) {
        return res.status(401).json({ success: false, error: 'Invalid API key' });
      }
    }

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, error: error.details.map(d => d.message).join(', ') });
    }

    // Check player exists with Garena
    const playerCheck = await garenaService.checkPlayer(value.userId);
    if (!playerCheck.success) {
      return res.status(400).json({
        success: false,
        error: 'Player ID tidak ditemukan atau tidak valid'
      });
    }

    // Create transaction record
    const transactionId = `ML${Date.now()}${Math.floor(Math.random() * 9000) + 1000}`;
    const transaction = await Transaction.create({
      transaction_id: transactionId,
      user_id: value.userId,
      game: 'mobile-legends',
      amount: value.amount,
      status: 'pending',
      payment_status: 'pending',
      order_id: value.orderId || null,
      created_at: new Date(),
      updated_at: new Date()
    });

    // Process diamond top-up with Garena
    const topupResult = await garenaService.topupDiamonds(value.userId, value.amount, transactionId);

    if (topupResult.success) {
      // Update transaction with success
      await transaction.update({
        status: 'processing',
        garena_transaction_id: topupResult.garenaTransactionId,
        updated_at: new Date()
      });

      return res.status(201).json({
        success: true,
        provider: 'mobile-legends',
        transactionId,
        garenaTransactionId: topupResult.garenaTransactionId,
        orderId: value.orderId,
        status: 'processing',
        message: 'Top-up sedang diproses. Diamond akan dikirim dalam 1-5 menit.'
      });
    } else {
      // Update transaction with failure
      await transaction.update({
        status: 'failed',
        error_message: topupResult.error,
        updated_at: new Date()
      });

      return res.status(500).json({
        success: false,
        error: 'Gagal memproses top-up: ' + topupResult.error
      });
    }

  } catch (error) {
    console.error('Mobile Legends Top-up Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan server internal'
    });
  }
});

// GET transaction status
router.get('/status/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;

    const transaction = await Transaction.findOne({
      where: { transaction_id: transactionId }
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaksi tidak ditemukan'
      });
    }

    // Check status with Garena if we have their transaction ID
    let garenaStatus = null;
    if (transaction.garena_transaction_id) {
      const statusCheck = await garenaService.checkTransactionStatus(transaction.garena_transaction_id);
      if (statusCheck.success) {
        garenaStatus = statusCheck.data.status;

        // Update local status based on Garena status
        if (garenaStatus === 'completed' && transaction.status !== 'completed') {
          await transaction.update({
            status: 'completed',
            updated_at: new Date()
          });
        }
      }
    }

    return res.json({
      success: true,
      transactionId,
      status: transaction.status,
      garenaStatus,
      createdAt: transaction.created_at,
      updatedAt: transaction.updated_at
    });

  } catch (error) {
    console.error('Status Check Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan saat memeriksa status'
    });
  }
});

// GET list (for debug) - not required but useful during development
router.get('/_list', async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { game: 'mobile-legends' },
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      count: transactions.length,
      transactions: transactions.map(t => ({
        transactionId: t.transaction_id,
        userId: t.user_id,
        amount: t.amount,
        status: t.status,
        paymentStatus: t.payment_status,
        createdAt: t.created_at
      }))
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
