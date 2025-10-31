const { sequelize } = require('../config/database');

// Import models
const User = require('./User');
const Transaction = require('./Transaction');
const Package = require('./Package');
const AdminLog = require('./AdminLog');
const PaymentLog = require('./PaymentLog');

// Define associations
User.hasMany(Transaction, { foreignKey: 'user_id' });
Transaction.belongsTo(User, { foreignKey: 'user_id' });

Package.hasMany(Transaction, { foreignKey: 'package_id' });
Transaction.belongsTo(Package, { foreignKey: 'package_id' });

User.hasMany(AdminLog, { foreignKey: 'admin_id' });
AdminLog.belongsTo(User, { foreignKey: 'admin_id' });

Transaction.hasMany(PaymentLog, { foreignKey: 'transaction_id' });
PaymentLog.belongsTo(Transaction, { foreignKey: 'transaction_id' });

// Sync database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('✅ Database synchronized successfully.');
  } catch (error) {
    console.error('❌ Error synchronizing database:', error);
  }
};

module.exports = {
  sequelize,
  User,
  Transaction,
  Package,
  AdminLog,
  PaymentLog,
  syncDatabase
};
