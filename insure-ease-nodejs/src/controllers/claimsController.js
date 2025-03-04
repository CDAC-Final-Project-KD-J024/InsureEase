const claimsService = require('../services/claimsService');

// 🟢 Get All Claims (Admin Only)
exports.getAllClaims = async (req, res) => {
  try {
    const claims = await claimsService.getAllClaimsService();
    res.status(200).json(claims);
  } catch (error) {
    console.error('❌ Get All Claims Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🟢 Get Claim by ID
exports.getClaimById = async (req, res) => {
  const { id } = req.params;

  try {
    const claim = await claimsService.getClaimByIdService(id);
    if (!claim) return res.status(404).json({ message: 'Claim not found!' });

    res.status(200).json(claim);
  } catch (error) {
    console.error('❌ Get Claim by ID Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🟢 File a New Claim
exports.fileClaim = async (req, res) => {
  const { userPolicyId, claimType, description } = req.body;

  try {
    const newClaim = await claimsService.fileClaimService(req.user.id, { userPolicyId, claimType, description });
    res.status(201).json({ message: 'Claim filed successfully!', claim: newClaim });
  } catch (error) {
    console.error('❌ File Claim Error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// 🟢 Update Claim Status (Admin Only)
exports.updateClaimStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedClaim = await claimsService.updateClaimStatusService(id, status);
    res.status(200).json({ message: 'Claim status updated successfully!', claim: updatedClaim });
  } catch (error) {
    console.error('❌ Update Claim Status Error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// 🟢 Delete Claim (Admin Only)
exports.deleteClaim = async (req, res) => {
  const { id } = req.params;

  try {
    await claimsService.deleteClaimService(id);
    res.status(200).json({ message: 'Claim deleted successfully!' });
  } catch (error) {
    console.error('❌ Delete Claim Error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// 🟢 Get All Claims for Logged-in User
exports.getUserClaims = async (req, res) => {
  try {
    const claims = await claimsService.getUserClaimsService(req.user.id);
    res.status(200).json(claims);
  } catch (error) {
    console.error('❌ Get User Claims Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🟢 Cancel a Claim
exports.cancelClaim = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await claimsService.cancelClaimService(id, req.user.id);
    res.status(200).json(response);
  } catch (error) {
    console.error('❌ Cancel Claim Error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};
