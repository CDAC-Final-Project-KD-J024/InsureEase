const express = require('express');
const { body } = require('express-validator');
const policyController = require('../controllers/policyController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
// policyRoutes.js
const router = express.Router();

// 🟢 Get All Policies
router.get('/', policyController.getAllPolicies);

// 🟢 Get Policy by ID
router.get('/:id', policyController.getPolicyById);

// 🟢 Add New Policy (Admin Only)
router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  [
    body('name').notEmpty().withMessage('Policy name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('type').notEmpty().withMessage('Policy type is required'),
    body('coverageAmount').isFloat({ gt: 0 }).withMessage('Coverage amount must be greater than 0'),
    body('premium').isFloat({ gt: 0 }).withMessage('Premium must be greater than 0')
  ],
  policyController.addPolicy
);

// 🟢 Update Policy (Admin Only)
router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  [
    body('name').optional().notEmpty().withMessage('Policy name cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    body('type').optional().notEmpty().withMessage('Policy type cannot be empty'),
    body('coverageAmount').optional().isFloat({ gt: 0 }).withMessage('Coverage amount must be greater than 0'),
    body('premium').optional().isFloat({ gt: 0 }).withMessage('Premium must be greater than 0')
  ],
  policyController.updatePolicy
);

// 🟢 Delete Policy (Admin Only)
router.delete('/:id', authMiddleware, adminMiddleware, policyController.deletePolicy);

module.exports = router;
