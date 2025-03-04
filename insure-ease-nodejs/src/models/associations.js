const User = require('./User');
const Policy = require('./Policy');
const UserPolicy = require('./UserPolicy');
const Order = require('./Order');
const Claim = require('./Claim');

// User ↔ UserPolicy
User.hasMany(UserPolicy, {
  foreignKey: 'userId',
  onDelete: 'CASCADE', // Ensures user policies are deleted when user is deleted
  onUpdate: 'CASCADE'
});
UserPolicy.belongsTo(User, {
  foreignKey: 'userId'
});

// Policy ↔ UserPolicy
Policy.hasMany(UserPolicy, {
  foreignKey: 'policyId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
UserPolicy.belongsTo(Policy, {
  foreignKey: 'policyId'
});

// UserPolicy ↔ Claim
UserPolicy.hasMany(Claim, {
  foreignKey: 'userPolicyId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Claim.belongsTo(UserPolicy, {
  foreignKey: 'userPolicyId'
});

// User ↔ Order
User.hasMany(Order, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Order.belongsTo(User, {
  foreignKey: 'userId'
});

// Policy ↔ Order
Policy.hasMany(Order, {
  foreignKey: 'policyId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Order.belongsTo(Policy, {
  foreignKey: 'policyId'
});

console.log('✅ Model associations set up successfully');
