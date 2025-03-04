const express = require('express');
const { body } = require('express-validator');
const ordersController = require('../controllers/ordersController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
// ordersRoutes.js
const router = express.Router();

// 🟢 Get All Orders (Admin Only)
router.get('/', authMiddleware, adminMiddleware, ordersController.getAllOrders);

// 🟢 Get Order by ID (Admin or Owner)
router.get('/:id', authMiddleware, ordersController.getOrderById);

// 🟢 Create New Order
router.post(
  '/',
  authMiddleware,
  [
    body('policyId').notEmpty().withMessage('Policy ID is required'),
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
    body('paymentMethod').notEmpty().withMessage('Payment method is required')
  ],
  ordersController.placeOrder
);

// 🟢 Update Order Status (Admin Only)
router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  [body('status').notEmpty().withMessage('Order status is required')],
  ordersController.updateOrder
);

// 🟢 Cancel Order (Owner Only)
router.delete('/:id', authMiddleware, ordersController.cancelOrder);

module.exports = router;