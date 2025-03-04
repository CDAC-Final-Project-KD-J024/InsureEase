const { UserPolicy } = require('../models');

// 🟢 Get all policies for a specific user
exports.getUserPolicies = async (userId) => {
  try {
    return await UserPolicy.findAll({ where: { userId } });
  } catch (error) {
    console.error('❌ Get User Policies Error:', error);
    throw error;
  }
};

// 🟢 Add a policy to a user
exports.addUserPolicy = async (userPolicyData) => {
  try {
    return await UserPolicy.create(userPolicyData);
  } catch (error) {
    console.error('❌ Add User Policy Error:', error);
    throw error;
  }
};

// 🟢 Remove a policy from a user
exports.removeUserPolicy = async (userId, policyId) => {
  try {
    return await UserPolicy.destroy({ where: { userId, policyId } });
  } catch (error) {
    console.error('❌ Remove User Policy Error:', error);
    throw error;
  }
};

// 🟢 Update a user’s policy (e.g., change policy status)
exports.updateUserPolicy = async (userId, policyId, updates) => {
  try {
    return await UserPolicy.update(updates, { where: { userId, policyId } });
  } catch (error) {
    console.error('❌ Update User Policy Error:', error);
    throw error;
  }
};

// 🟢 Get a specific user policy by userId and policyId
exports.getUserPolicyById = async (userId, policyId) => {
  try {
    return await UserPolicy.findOne({ where: { userId, policyId } });
  } catch (error) {
    console.error('❌ Get User Policy By ID Error:', error);
    throw error;
  }
};
