// models/Claim.js
const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const UserPolicy = require('./UserPolicy');

const Claim = sequelize.define('Claim', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userPolicyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserPolicy,
      key: 'id'
    }
  },
  claimAmount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  claimReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'
  },
  filedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  resolvedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = Claim;
