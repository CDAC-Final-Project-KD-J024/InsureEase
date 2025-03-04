const policyService = require('../services/policyService');

// 🟢 Get All Policies
exports.getAllPolicies = async (req, res) => {
  try {
    const policies = await policyService.getAllPolicies();
    res.status(200).json(policies);
  } catch (error) {
    console.error('❌ Get All Policies Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🟢 Get Policy by ID
exports.getPolicyById = async (req, res) => {
  const { id } = req.params;

  try {
    const policy = await policyService.getPolicyById(id);
    if (!policy) return res.status(404).json({ message: 'Policy not found!' });

    res.status(200).json(policy);
  } catch (error) {
    console.error('❌ Get Policy by ID Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🟢 Add New Policy (Admin Only)
exports.addPolicy = async (req, res) => {
  try {
    const newPolicy = await policyService.createPolicy(req.body);
    res.status(201).json({ message: 'Policy added successfully!', policy: newPolicy });
  } catch (error) {
    console.error('❌ Add Policy Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🟢 Update Policy (Admin Only)
exports.updatePolicy = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedPolicy = await policyService.updatePolicy(id, req.body);
    res.status(200).json({ message: 'Policy updated successfully!', policy: updatedPolicy });
  } catch (error) {
    console.error('❌ Update Policy Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🟢 Delete Policy (Admin Only)
exports.deletePolicy = async (req, res) => {
  const { id } = req.params;

  try {
    await policyService.deletePolicy(id);
    res.status(200).json({ message: 'Policy deleted successfully!' });
  } catch (error) {
    console.error('❌ Delete Policy Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};