const { Order } = require('../models');

const OrdersRepository = {
  // Create a new order
  async createOrder(orderData) {
    try {
      return await Order.create(orderData);
    } catch (error) {
      throw new Error('Failed to create order');
    }
  },

  // Get an order by ID
  async getOrderById(orderId) {
    try {
      return await Order.findByPk(orderId);
    } catch (error) {
      throw new Error('Failed to get order');
    }
  },

  // Get all orders for a user
  async getOrdersByUserId(userId) {
    try {
      return await Order.findAll({ where: { userId } });
    } catch (error) {
      throw new Error('Failed to get user orders');
    }
  },

  // Update an order
  async updateOrder(orderId, updateData) {
    try {
      const [updated] = await Order.update(updateData, { where: { id: orderId } });
      if (!updated) throw new Error('Order not found');
      return await Order.findByPk(orderId);
    } catch (error) {
      throw new Error('Failed to update order');
    }
  },

  // Delete an order
  async deleteOrder(orderId) {
    try {
      const deleted = await Order.destroy({ where: { id: orderId } });
      if (!deleted) throw new Error('Order not found');
      return true;
    } catch (error) {
      throw new Error('Failed to delete order');
    }
  }
};

module.exports = OrdersRepository;