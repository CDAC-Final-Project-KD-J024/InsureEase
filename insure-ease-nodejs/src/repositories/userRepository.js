const User = require("../models/User");

// 🟢 Get User by ID
exports.getUserById = async (userId) => {
  return await User.findByPk(userId);
};

// 🟢 Get User by Email
exports.getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

// 🟢 Create New User
exports.createUser = async (userData) => {
  return await User.create(userData);
};

// 🟢 Update User
exports.updateUser = async (userId, updateData) => {
  const [updated] = await User.update(updateData, { where: { id: userId } });
  if (updated) {
    return await User.findByPk(userId);
  }
  throw new Error('User not found or no changes made');
};

// 🟢 Delete User
exports.deleteUser = async (userId) => {
  const deleted = await User.destroy({ where: { id: userId } });
  if (!deleted) {
    throw new Error('User not found');
  }
};

// 🟢 Get All Users (Optional, Admin Use)
exports.getAllUsers = async () => {
  return await User.findAll();
};

// 🟢 Promote User to Admin
exports.promoteUser = async (userId) => {
  const [updated] = await User.update({ role: 'admin' }, { where: { id: userId } });
  if (updated) {
    return await User.findByPk(userId);
  }
  throw new Error('User not found');
};

// 🟢 Demote Admin to Standard User
exports.demoteUser = async (userId) => {
  const [updated] = await User.update({ role: 'user' }, { where: { id: userId } });
  if (updated) {
    return await User.findByPk(userId);
  }
  throw new Error('User not found');
};