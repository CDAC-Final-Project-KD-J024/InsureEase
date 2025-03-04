// models/Policy.js
const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

const Policy = sequelize.define('Policy', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('home', 'car', 'life', 'health'),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  basePremium: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  coverageAmount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER, // Duration in months
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
}, {
  timestamps: true
});

module.exports = Policy;
