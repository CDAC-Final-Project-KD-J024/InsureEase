// models/Order.js
const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const User = require('./User');
const Policy = require('./Policy');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  policyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Policy,
      key: 'id'
    }
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  premiumAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'active', 'cancelled', 'completed'),
    defaultValue: 'pending'
  }
}, {
  timestamps: true
});

module.exports = Order;
