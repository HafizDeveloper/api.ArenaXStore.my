const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { PaymentLog, Transaction } = require('../models');

class PaymentService {
  constructor() {
    this.stripe = stripe;
  }

  // Create payment intent
  async createPaymentIntent(amount, currency = 'myr', metadata = {}) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: currency.toLowerCase(),
        metadata: metadata,
        payment_method_types: ['card', 'fpx', 'grabpay'],
        description: 'Free Fire Diamond Top-up'
      });

      return {
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      };
    } catch (error) {
      console.error('Stripe Payment Intent Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Confirm payment
  async confirmPayment(paymentIntentId) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);

      return {
        success: true,
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency
      };
    } catch (error) {
      console.error('Stripe Confirm Payment Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Handle webhook
  async handleWebhook(rawBody, signature) {
    try {
      const event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      // Log the webhook event
      await PaymentLog.create({
        transaction_id: event.data.object.metadata?.transaction_id || null,
        payment_gateway: 'stripe',
        event_type: event.type,
        payload: event.data.object,
        processed: false
      });

      return {
        success: true,
        event: event,
        type: event.type
      };
    } catch (error) {
      console.error('Webhook Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Process successful payment
  async processSuccessfulPayment(paymentIntentId, transactionId) {
    try {
      const transaction = await Transaction.findOne({
        where: { transaction_id: transactionId }
      });

      if (!transaction) {
        throw new Error('Transaction not found');
      }

      // Update transaction status
      await transaction.update({
        status: 'paid',
        payment_id: paymentIntentId,
        updated_at: new Date()
      });

      // Mark payment log as processed
      await PaymentLog.update(
        { processed: true, processed_at: new Date() },
        {
          where: {
            transaction_id: transaction.id,
            payment_gateway: 'stripe',
            event_type: 'payment_intent.succeeded'
          }
        }
      );

      return {
        success: true,
        transaction: transaction
      };
    } catch (error) {
      console.error('Process Payment Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Create refund
  async createRefund(paymentIntentId, amount = null) {
    try {
      const refund = await this.stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: amount ? Math.round(amount * 100) : undefined
      });

      return {
        success: true,
        refundId: refund.id,
        status: refund.status
      };
    } catch (error) {
      console.error('Stripe Refund Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = new PaymentService();
