const Order = require('../models/Order');
const Policy = require('../models/Policy');
const User = require('../models/User');

// 🟢 Create a New Order
exports.createOrder = async (orderData) => {
  try {
    const newOrder = await Order.create(orderData);
    return newOrder;
  } catch (error) {
    console.error('❌ Create Order Error:', error);
    throw new Error('Failed to create order');
  }
};

// 🟢 Get All Orders (Admin)
exports.getAllOrders = async () => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: Policy },
        { model: User, attributes: ['id', 'name', 'email'] }
      ]
    });
    return orders;
  } catch (error) {
    console.error('❌ Get All Orders Error:', error);
    throw new Error('Failed to fetch orders');
  }
};

// 🟢 Get Orders for Logged-in User
exports.getUserOrders = async (userId) => {
  try {
    const orders = await Order.findAll({
      where: { userId },
      include: [{ model: Policy }]
    });
    return orders;
  } catch (error) {
    console.error('❌ Get User Orders Error:', error);
    throw new Error('Failed to fetch user orders');
  }
};

// 🟢 Update an Order
exports.updateOrder = async (orderId, updateData) => {
  try {
    const [updated] = await Order.update(updateData, { where: { id: orderId } });
    if (!updated) throw new Error('Order not found');
    return 'Order updated successfully';
  } catch (error) {
    console.error('❌ Update Order Error:', error);
    throw new Error('Failed to update order');
  }
};

// 🟢 Cancel an Order
exports.cancelOrder = async (orderId, userId) => {
  try {
    const order = await Order.findOne({ where: { id: orderId, userId } });
    if (!order) throw new Error('Order not found');

    await Order.destroy({ where: { id: orderId, userId } });
    return 'Order canceled successfully';
  } catch (error) {
    console.error('❌ Cancel Order Error:', error);
    throw new Error('Failed to cancel order');
  }
};
