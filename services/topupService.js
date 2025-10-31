const { v4: uuidv4 } = require('uuid');
const Transaction = require('../models/Transaction');
const Package = require('../models/Package');
const User = require('../models/User'); // Assuming User model is needed for user details

const createTopupTransaction = async (userId, game, playerId, packageId, paymentMethod) => {
  try {
    // Fetch package details to get amount and price
    const gamePackage = await Package.findByPk(packageId);
    if (!gamePackage) {
      throw new Error('Package not found');
    }

    // Fetch user details (optional, but good for logging/future features)
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const transaction_id = uuidv4();
    const amount = gamePackage.amount; // Assuming 'amount' in Package model is diamond amount
    const price = gamePackage.price;

    const newTransaction = await Transaction.create({
      transaction_id,
      user_id: userId,
      package_id: packageId,
      player_id: playerId,
      // player_name: (we might need to fetch this from game API, for now it's null)
      amount,
      price,
      currency: 'MYR', // Default currency
      status: 'pending',
      payment_method: paymentMethod,
      // garena_transaction_id: null,
      // garena_response: null,
      // retry_count: 0,
      // last_retry_at: null,
      // completed_at: null,
    });

    return newTransaction;
  } catch (error) {
    console.error('Error creating top-up transaction:', error);
    throw error;
  }
};

module.exports = {
  createTopupTransaction,
};
