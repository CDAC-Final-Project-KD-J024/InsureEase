const ordersService = require('../services/orderService');

// 🟢 Get All Orders for Logged-in User
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await ordersService.getUserOrders(req.user.id);
    res.status(200).json(orders);
  } catch (error) {
    console.error('❌ Get User Orders Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🟢 Place a New Order
exports.placeOrder = async (req, res) => {
  const { policyId, amount, paymentStatus } = req.body;

  try {
    const newOrder = await ordersService.createOrder({
      userId: req.user.id,
      policyId,
      amount,
      paymentStatus
    });

    res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
  } catch (error) {
    console.error('❌ Place Order Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🟢 Get Order by ID
exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await ordersService.getOrderById(id, req.user.id);
    if (!order) return res.status(404).json({ message: 'Order not found!' });

    res.status(200).json(order);
  } catch (error) {
    console.error('❌ Get Order by ID Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🟢 Cancel Order
exports.cancelOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await ordersService.cancelOrder(id, req.user.id);
    res.status(200).json({ message });
  } catch (error) {
    console.error('❌ Cancel Order Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🟢 Get All Orders (Admin Only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await ordersService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error('❌ Get All Orders Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🟢 Update Order (Admin Only)
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const message = await ordersService.updateOrder(id, updateData);
    res.status(200).json({ message });
  } catch (error) {
    console.error('❌ Update Order Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
