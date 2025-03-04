const { Claim } = require('../models');
// claimRepository.js
// Create a new claim
const createClaim = async (claimData) => {
  try {
    const claim = await Claim.create(claimData);
    return claim;
  } catch (error) {
    console.error('❌ Error creating claim:', error);
    throw error;
  }
};

// Get all claims
const getAllClaims = async () => {
  try {
    const claims = await Claim.findAll();
    return claims;
  } catch (error) {
    console.error('❌ Error fetching claims:', error);
    throw error;
  }
};

// Get claim by ID
const getClaimById = async (claimId) => {
  try {
    const claim = await Claim.findByPk(claimId);
    return claim;
  } catch (error) {
    console.error('❌ Error fetching claim by ID:', error);
    throw error;
  }
};

// Update claim
const updateClaim = async (claimId, updatedData) => {
  try {
    const [updated] = await Claim.update(updatedData, { where: { id: claimId } });
    return updated;
  } catch (error) {
    console.error('❌ Error updating claim:', error);
    throw error;
  }
};

// Delete claim
const deleteClaim = async (claimId) => {
  try {
    const deleted = await Claim.destroy({ where: { id: claimId } });
    return deleted;
  } catch (error) {
    console.error('❌ Error deleting claim:', error);
    throw error;
  }
};

module.exports = {
  createClaim,
  getAllClaims,
  getClaimById,
  updateClaim,
  deleteClaim
};
