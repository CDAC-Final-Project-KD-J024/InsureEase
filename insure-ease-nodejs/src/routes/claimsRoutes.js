const express = require('express');
const { body } = require('express-validator');
const claimsController = require('../controllers/claimsController');
const authMiddleware = require('../middlewares/authMiddleware');
// claimsRoutes.js
const router = express.Router();

// 🟢 Get All Claims for Logged-in User
router.get('/', authMiddleware, claimsController.getUserClaims);

// 🟢 Get Claim by ID
router.get('/:id', authMiddleware, claimsController.getClaimById);

// 🟢 File a New Claim
router.post(
  '/',
  authMiddleware,
  [
    body('policyId').notEmpty().withMessage('Policy ID is required'),
    body('claimAmount').isFloat({ gt: 0 }).withMessage('Claim amount must be greater than 0'),
    body('reason').notEmpty().withMessage('Reason for claim is required')
  ],
  claimsController.fileClaim
);

// 🟢 Update Claim (User can only update if claim is pending)
router.put(
  '/:id',
  authMiddleware,
  [
    body('claimAmount').optional().isFloat({ gt: 0 }).withMessage('Claim amount must be greater than 0'),
    body('reason').optional().notEmpty().withMessage('Reason cannot be empty')
  ],
  claimsController.updateClaimStatus
);

// 🟢 Cancel Claim (User can only cancel if claim is pending)
router.delete('/:id', authMiddleware, claimsController.cancelClaim);

module.exports = router;