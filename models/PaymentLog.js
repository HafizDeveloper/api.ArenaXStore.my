const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PaymentLog = sequelize.define('PaymentLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  transaction_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'transactions',
      key: 'id'
    }
  },
  payment_gateway: {
    type: DataTypes.STRING,
    allowNull: false
  },
  event_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  payload: {
    type: DataTypes.JSON,
    allowNull: false
  },
  processed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  processed_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'payment_logs',
  timestamps: false,
  indexes: [
    {
      fields: ['transaction_id']
    },
    {
      fields: ['processed']
    },
    {
      fields: ['created_at']
    }
  ]
});

module.exports = PaymentLog;
