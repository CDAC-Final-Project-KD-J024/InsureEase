const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const { JWT_SECRET } = require('../config/env');
const sendEmail = require('../config/nodemailer');
const generateToken = require('../utils/generateToken');

// Register user
exports.registerUserService = async (userData) => {
    const existingUser = await userRepository.getUserByEmail(userData.email);
    if (existingUser) throw new Error('Email already in use');

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await userRepository.createUser({ ...userData, password: hashedPassword });
    const token=generateToken({
        id: user.id,
        email: user.email,
      });
    return {user,token};
};

// Login user
exports.loginUserService = async ({ email, password }) => {
    const user = await userRepository.getUserByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) throw new Error('Invalid credentials');

    const token=generateToken({
        id: user.id,
        email: user.email,
      });
    return { token,user };
};
// Forgot password
exports.forgotPasswordService = async (email) => {
    const user = await userRepository.getUserByEmail(email);
    if (!user) throw new Error('User not found');

    
    const token=generateToken({
        id: user.id,
        email: user.email,
      },'15m');
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

    await sendEmail(user.email, 'Password Reset', `Click here to reset your password: ${resetLink}`);
};

// Reset password
exports.resetPasswordService = async (userId, newPassword) => {
    const user = await userRepository.getUserById(userId);
    if (!user) throw new Error('User not found');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRepository.updateUser(userId, { password: hashedPassword });
};


// Google auth callback
exports.googleAuthCallbackService = async (profile) => {
    let user = await userRepository.getUserByEmail(profile.email);

    if (!user) {
        user = await userRepository.createUser({
            email: profile.email,
            name: profile.name,
            password: null,
            provider: 'google'
        });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
};

// GitHub auth callback
exports.githubAuthCallbackService = async (profile) => {
    let user = await userRepository.getUserByEmail(profile.email);

    if (!user) {
        user = await userRepository.createUser({
            email: profile.email,
            name: profile.name,
            password: null,
            provider: 'github'
        });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
};

exports.getUserByIdService = async (userId) => {
    const user = await userRepository.getUserById(userId);
    if (!user) throw new Error('User not found');
    return user;
};

// Get user profile
exports.getProfileService = async (userId) => {
    const user = await userRepository.getUserById(userId);
    if (!user) throw new Error('User not found');

    return user;
};

// Update user profile
exports.updateProfileService = async (userId, updateData) => {
    const user = await userRepository.getUserById(userId);
    if (!user) throw new Error('User not found');

    await userRepository.updateUser(userId, updateData);
    return userRepository.getUserById(userId);
};

// Change password
exports.changePasswordService = async (userId, currentPassword, newPassword) => {
    const user = await userRepository.getUserById(userId);
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new Error('Current password is incorrect');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRepository.updateUser(userId, { password: hashedPassword });
};



// Promote user to admin
exports.promoteUserService = async (userId) => {
    const user = await userRepository.getUserById(userId);
    if (!user) throw new Error('User not found');

    await userRepository.promoteUser(userId);
    return userRepository.getUserById(userId);
};

// Demote user from admin
exports.demoteUserService = async (userId) => {
    const user = await userRepository.getUserById(userId);
    if (!user) throw new Error('User not found');

    await userRepository.demoteUser(userId);
    return userRepository.getUserById(userId);
};

// Delete user
exports.deleteUserService = async (userId) => {
    const user = await userRepository.getUserById(userId);
    if (!user) throw new Error('User not found');

    await userRepository.deleteUser(userId);
};