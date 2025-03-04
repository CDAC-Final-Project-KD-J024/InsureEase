const { Policy } = require('../models');

// 🟢 Get All Policies
exports.getAllPolicies = async () => {
  try {
    return await Policy.findAll();
  } catch (error) {
    console.error('❌ Error fetching policies:', error);
    throw error;
  }
};

// 🟢 Get Policy by ID
exports.getPolicyById = async (policyId) => {
  try {
    return await Policy.findByPk(policyId);
  } catch (error) {
    console.error('❌ Error fetching policy by ID:', error);
    throw error;
  }
};

// 🟢 Create Policy
exports.createPolicy = async (policyData) => {
  try {
    return await Policy.create(policyData);
  } catch (error) {
    console.error('❌ Error creating policy:', error);
    throw error;
  }
};

// 🟢 Update Policy
exports.updatePolicy = async (policyId, updatedData) => {
  try {
    const [updated] = await Policy.update(updatedData, { where: { id: policyId } });
    if (!updated) throw new Error('Policy not found or no changes made');
    return await Policy.findByPk(policyId);
  } catch (error) {
    console.error('❌ Error updating policy:', error);
    throw error;
  }
};

// 🟢 Delete Policy
exports.deletePolicy = async (policyId) => {
  try {
    const deleted = await Policy.destroy({ where: { id: policyId } });
    if (!deleted) throw new Error('Policy not found');
    return deleted;
  } catch (error) {
    console.error('❌ Error deleting policy:', error);
    throw error;
  }
};
