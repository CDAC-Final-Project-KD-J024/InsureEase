const userPolicyService = require('../services/userPolicyService');

// 🟢 Get All Policies for Logged-in User
exports.getUserPolicies = async (req, res) => {
  try {
    const userPolicies = await userPolicyService.getUserPolicies(req.user.id);
    res.status(200).json(userPolicies);
  } catch (error) {
    console.error('❌ Get User Policies Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🟢 Purchase a Policy
exports.purchasePolicy = async (req, res) => {
  try {
    const newUserPolicy = await userPolicyService.purchasePolicy(req.user.id, req.body);
    res.status(201).json({ message: 'Policy purchased successfully!', userPolicy: newUserPolicy });
  } catch (error) {
    console.error('❌ Purchase Policy Error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// 🟢 Update User Policy
exports.updateUserPolicy = async (req, res) => {
  try {
    const updatedPolicy = await userPolicyService.updateUserPolicy(req.user.id, req.params.id, req.body);
    res.status(200).json(updatedPolicy);
  } catch (error) {
    console.error('❌ Update User Policy Error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// 🟢 Cancel User Policy
exports.cancelUserPolicy = async (req, res) => {
  try {
    const result = await userPolicyService.cancelUserPolicy(req.user.id, req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error('❌ Cancel User Policy Error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};
