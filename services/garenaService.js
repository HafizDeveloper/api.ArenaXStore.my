const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

class GarenaService {
  constructor() {
    this.baseURL = process.env.GARENA_API_URL || 'https://api.garena.com/v1';
    this.apiKey = process.env.GARENA_API_KEY;
    this.secretKey = process.env.GARENA_SECRET_KEY;
    this.merchantId = process.env.GARENA_MERCHANT_ID;
  }

  // Generate signature for API requests
  generateSignature(payload, timestamp) {
    const data = `${this.merchantId}${timestamp}${JSON.stringify(payload)}${this.secretKey}`;
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  // Check player information
  async checkPlayer(playerId) {
    try {
      const timestamp = Date.now().toString();
      const payload = {
        player_id: playerId,
        merchant_id: this.merchantId
      };

      const signature = this.generateSignature(payload, timestamp);

      const response = await axios.post(`${this.baseURL}/player/check`, payload, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-Timestamp': timestamp,
          'X-Signature': signature,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Garena API Error (checkPlayer):', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

  // Process diamond top-up
  async topupDiamonds(playerId, diamonds, transactionId) {
    try {
      const timestamp = Date.now().toString();
      const payload = {
        player_id: playerId,
        diamonds: diamonds,
        merchant_id: this.merchantId,
        reference_id: transactionId
      };

      const signature = this.generateSignature(payload, timestamp);

      const response = await axios.post(`${this.baseURL}/transaction/topup`, payload, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-Timestamp': timestamp,
          'X-Signature': signature,
          'Content-Type': 'application/json'
        },
        timeout: 30000 // Longer timeout for topup
      });

      return {
        success: true,
        data: response.data,
        garenaTransactionId: response.data.transaction_id
      };
    } catch (error) {
      console.error('Garena API Error (topupDiamonds):', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
        code: error.response?.status
      };
    }
  }

  // Check transaction status
  async checkTransactionStatus(garenaTransactionId) {
    try {
      const timestamp = Date.now().toString();
      const payload = {
        transaction_id: garenaTransactionId,
        merchant_id: this.merchantId
      };

      const signature = this.generateSignature(payload, timestamp);

      const response = await axios.post(`${this.baseURL}/transaction/status`, payload, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-Timestamp': timestamp,
          'X-Signature': signature,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Garena API Error (checkTransactionStatus):', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

  // Get shell balance
  async getShellBalance() {
    try {
      const timestamp = Date.now().toString();
      const payload = {
        merchant_id: this.merchantId
      };

      const signature = this.generateSignature(payload, timestamp);

      const response = await axios.post(`${this.baseURL}/merchant/balance`, payload, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-Timestamp': timestamp,
          'X-Signature': signature,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      return {
        success: true,
        balance: response.data.balance
      };
    } catch (error) {
      console.error('Garena API Error (getShellBalance):', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }
}

module.exports = new GarenaService();
