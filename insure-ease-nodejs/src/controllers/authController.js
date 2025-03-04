const jwt=require('jsonwebtoken');
const authService = require('../services/authService');
const JWT_SECRET=require('../config/env').jwt.secret;
const IMAGE_URL=require('../config/env').imageAddress.url;
exports.register = async (req, res, next) => {
    try {
        const profilePicture = req.file ? `${req.file.path.replace(/\\/g, '/')}` : null;

        const {user,token} = await authService.registerUserService({ 
            ...req.body, 
            profilePicture 
        });


        res.status(201).json({success:true, user, token ,message:'Registration successful!'});
    } catch (error) {
        next(error); // Pass the error to the global error handler
    }
};

exports.login = async (req, res,next) => {
    try {
        const { email, password } = req.body;
        const {token,user} = await authService.loginUserService({ email, password });
        res.status(200).json({user,token,success:true,message:"Logged in successfully !!"});
    } catch (error) {
        next(error);
    }
};
exports.forgotPassword = async (req, res,next) => {
    try {
        await authService.forgotPasswordService(req.body.email);
        console.log(`Forgot password ${req.body.email}`);
        res.status(200).json({success:true, message: 'Password reset email sent' });
    } catch (error) {
        next(error);
    }
};

exports.resetPassword = async (req, res,next) => {
    try {
        const { token, newPassword } = req.body;

        if (!token) {
            return res.status(400).json({ error: "Invalid or missing token" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id; // Extract user ID from token
        console.log(userId);
        await authService.resetPasswordService(userId, newPassword);
        res.status(200).json({success:true, message: "Password reset successful" });
    } catch (error) {
        next(error);
    }
};


exports.getProfile = async (req, res,next) => {
    try {
        const user = req.user;
        const profilePicture = user.profilePicture ? `${IMAGE_URL}${user.profilePicture}` : null;

        res.status(200).json({success:true,user: { ...user.toJSON(), profilePicture }});
    } catch (error) {
        next(error);
    }
};
exports.googleAuthCallback = async (req, res,next) => {
    try {
        const { user, token } = await authService.googleAuthCallbackService(req.body.profile);
        res.status(200).json({ user, token });
    } catch (error) {
        next(error);
    }
};

exports.githubAuthCallback = async (req, res,next) => {
    try {
        const { user, token } = await authService.githubAuthCallbackService(req.body.profile);
        res.status(200).json({ user, token });
    } catch (error) {
        next(error);
    }
};


// left to check
exports.updateProfile = async (req, res) => {
    try {
        const updatedUser = await authService.updateProfileService(req.user.id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        await authService.changePasswordService(req.user.id, req.body.currentPassword, req.body.newPassword);
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



// Promote user to admin
exports.promoteUser = async (req, res) => {
    try {
        const updatedUser = await authService.promoteUserService(req.params.userId);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Demote user from admin
exports.demoteUser = async (req, res) => {
    try {
        const updatedUser = await authService.demoteUserService(req.params.userId);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        await authService.deleteUserService(req.params.userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 🟢 Get User by ID
exports.selectUserById = async (req, res) => {
  try {
      const user = await authService.getUserByIdService(req.params.userId);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};
