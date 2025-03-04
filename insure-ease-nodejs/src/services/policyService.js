const Policy = require('../models/Policy');

// Get All Policies
exports.getAllPolicies = async () => {
  try {
    return await Policy.findAll();
  } catch (error) {
    console.error('❌ Get All Policies Error:', error);
    throw new Error('Server error');
  }
};

// Get Policy by ID
exports.getPolicyById = async (policyId) => {
  try {
    const policy = await Policy.findByPk(policyId);
    if (!policy) throw new Error('Policy not found');
    return policy;
  } catch (error) {
    console.error('❌ Get Policy By ID Error:', error);
    throw error;
  }
};

// Create New Policy
exports.createPolicy = async (policyData) => {
  try {
    return await Policy.create(policyData);
  } catch (error) {
    console.error('❌ Create Policy Error:', error);
    throw new Error('Server error');
  }
};

// Update Policy
exports.updatePolicy = async (policyId, updatedData) => {
  try {
    const policy = await Policy.findByPk(policyId);
    if (!policy) throw new Error('Policy not found');

    await policy.update(updatedData);
    return policy;
  } catch (error) {
    console.error('❌ Update Policy Error:', error);
    throw error;
  }
};

// Delete Policy
exports.deletePolicy = async (policyId) => {
  try {
    const policy = await Policy.findByPk(policyId);
    if (!policy) throw new Error('Policy not found');

    await policy.destroy();
    return { message: 'Policy deleted successfully' };
  } catch (error) {
    console.error('❌ Delete Policy Error:', error);
    throw error;
  }
};