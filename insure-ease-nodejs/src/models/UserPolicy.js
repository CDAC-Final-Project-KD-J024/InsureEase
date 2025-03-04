// models/UserPolicy.js
const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const User = require('./User');
const Policy = require('./Policy');

const UserPolicy = sequelize.define('UserPolicy', {
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
  premium: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'expired', 'cancelled'),
    defaultValue: 'active'
  }
}, {
  timestamps: true
});

UserPolicy.belongsTo(User, { foreignKey: 'userId' });
UserPolicy.belongsTo(Policy, { foreignKey: 'policyId' });

module.exports = UserPolicy;
