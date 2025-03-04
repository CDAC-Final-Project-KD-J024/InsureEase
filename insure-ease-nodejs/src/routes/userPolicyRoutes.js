const express = require('express');
const { body } = require('express-validator');
const userPolicyController = require('../controllers/userPoliciesController');
const authMiddleware = require('../middlewares/authMiddleware');
// userPolicyRoute.js
const router = express.Router();

// 🟢 Get All Policies for Logged-in User
router.get('/', authMiddleware, userPolicyController.getUserPolicies);

// 🟢 Purchase a Policy
router.post(
  '/',
  authMiddleware,
  [
    body('policyId').notEmpty().withMessage('Policy ID is required'),
    body('startDate').notEmpty().withMessage('Start date is required'),
    body('endDate').notEmpty().withMessage('End date is required'),
    body('premiumAmount').isNumeric().withMessage('Premium amount must be a number')
  ],
  userPolicyController.purchasePolicy
);

// 🟢 Update User Policy
router.put(
  '/:id',
  authMiddleware,
  [
    body('startDate').optional().notEmpty().withMessage('Start date cannot be empty'),
    body('endDate').optional().notEmpty().withMessage('End date cannot be empty'),
    body('premiumAmount').optional().isNumeric().withMessage('Premium amount must be a number')
  ],
  userPolicyController.updateUserPolicy
);

// 🟢 Cancel User Policy
router.delete('/:id', authMiddleware, userPolicyController.cancelUserPolicy);

module.exports = router;