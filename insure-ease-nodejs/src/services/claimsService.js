const UserPolicy = require('../models/UserPolicy');
const Claim = require('../models/Claim');
const  Policy = require('../models/Policy');
const  User  = require('../models/User');

// 🟢 File a New Claim
exports.fileClaim = async (userId, { policyId, description, amount }) => {
  try {
    const policy = await Policy.findByPk(policyId);
    if (!policy) throw new Error('Policy not found');

    const newClaim = await Claim.create({
      userId,
      policyId,
      description,
      amount,
      status: 'PENDING'
    });

    return newClaim;
  } catch (error) {
    console.error('❌ File Claim Error:', error);
    throw new Error('Failed to file claim');
  }
};

// 🟢 Get All Claims for a User
exports.getUserClaims = async (userId) => {
  try {
    const claims = await Claim.findAll({
      include: [{ model: UserPolicy, where: { userId } }]
    });
    return claims;
  } catch (error) {
    console.error('❌ Get User Claims Error:', error);
    throw new Error('Failed to get user claims');
  }
};

// 🟢 Get Claim by ID
exports.getClaimById = async (claimId) => {
  try {
    const claim = await Claim.findByPk(claimId, {
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName', 'email'] },
        { model: Policy, attributes: ['id', 'name', 'type'] }
      ]
    });
    if (!claim) throw new Error('Claim not found');
    return claim;
  } catch (error) {
    console.error('❌ Get Claim by ID Error:', error);
    throw new Error('Failed to get claim');
  }
};

// 🟢 Update Claim Status (Admin Only)
exports.updateClaimStatus = async (claimId, status) => {
  try {
    const claim = await Claim.findByPk(claimId);
    if (!claim) throw new Error('Claim not found');

    await Claim.update({ status }, { where: { id: claimId } });
    return { message: 'Claim status updated successfully' };
  } catch (error) {
    console.error('❌ Update Claim Status Error:', error);
    throw new Error('Failed to update claim status');
  }
};

// 🟢 Delete Claim (Admin Only)
exports.deleteClaim = async (claimId) => {
  try {
    const claim = await Claim.findByPk(claimId);
    if (!claim) throw new Error('Claim not found');

    await Claim.destroy({ where: { id: claimId } });
    return { message: 'Claim deleted successfully' };
  } catch (error) {
    console.error('❌ Delete Claim Error:', error);
    throw new Error('Failed to delete claim');
  }
};