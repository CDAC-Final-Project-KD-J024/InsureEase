const UserPolicy= require('../models/UserPolicy');
const  Policy  = require('../models/Policy');

// 🟢 Get All Policies for Logged-in User
exports.getUserPolicies = async (userId) => {
  try {
    return await UserPolicy.findAll({
      where: { userId },
      include: [{ model: Policy }]
    });
  } catch (error) {
    console.error('❌ Get User Policies Error:', error);
    throw new Error('Server error');
  }
};

// 🟢 Purchase a Policy
exports.purchasePolicy = async (userId, { policyId, startDate, endDate, premiumAmount }) => {
  try {
    const policy = await Policy.findByPk(policyId);
    if (!policy) throw new Error('Policy not found!');

    return await UserPolicy.create({
      userId,
      policyId,
      startDate,
      endDate,
      premiumAmount
    });
  } catch (error) {
    console.error('❌ Purchase Policy Error:', error);
    throw new Error('Server error');
  }
};

// 🟢 Update User Policy
exports.updateUserPolicy = async (userId, policyId, updates) => {
  try {
    const userPolicy = await UserPolicy.findByPk(policyId);
    if (!userPolicy || userPolicy.userId !== userId) {
      throw new Error('Policy not found!');
    }

    await UserPolicy.update(updates, { where: { id: policyId, userId } });
    return { message: 'Policy updated successfully!' };
  } catch (error) {
    console.error('❌ Update User Policy Error:', error);
    throw new Error('Server error');
  }
};

// 🟢 Cancel User Policy
exports.cancelUserPolicy = async (userId, policyId) => {
  try {
    const userPolicy = await UserPolicy.findByPk(policyId);
    if (!userPolicy || userPolicy.userId !== userId) {
      throw new Error('Policy not found!');
    }

    await UserPolicy.destroy({ where: { id: policyId, userId } });
    return { message: 'Policy canceled successfully!' };
  } catch (error) {
    console.error('❌ Cancel User Policy Error:', error);
    throw new Error('Server error');
  }
};
