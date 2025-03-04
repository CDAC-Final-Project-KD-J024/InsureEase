const express = require('express');
const passport = require('passport');
const { body } = require('express-validator');
const upload = require('../middlewares/uploadImage');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
//authRoutes.js
const router = express.Router();

// 🟢 User Registration
router.post(
  '/register',
  upload.single('profilePicture'),
  [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  authController.register
);

// 🟢 User Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  authController.login
);
// 🟢 Forgot Password
router.post(
  '/forgot-password',
  [body('email').isEmail().withMessage('Valid email is required')],
  authController.forgotPassword
);

// 🟢 Reset Password
router.post('/reset-password', authController.resetPassword);

// 🟢 Google Authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const { token, ...user } = req.user;
    res.redirect(`http://localhost:5173/login?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
  }
);

// 🟢 GitHub Authentication
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const { token, ...user } = req.user;
    res.redirect(`http://localhost:5173/login?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
  }
);


// 🟢 Change Password
router.post('/change-password', authController.changePassword);


// 🟢 Get Profile (Protected)
router.get('/user-profile', authMiddleware, authController.getProfile);

// 🟢 Update User Profile
router.put(
  '/profile',
  authMiddleware,
  upload.single('profilePicture'),
  [
    body('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
    body('lastName').optional().notEmpty().withMessage('Last name cannot be empty')
  ],
  authController.updateProfile
);

// 🟢 Promote User to Admin
router.put('/promote-user/:userId', authMiddleware, adminMiddleware, authController.promoteUser);

// 🟢 Demote User to Standard User
router.put('/demote-user/:userId', authMiddleware, adminMiddleware, authController.demoteUser);

// 🟢 Delete User
router.delete('/delete-user/:userId', authMiddleware, adminMiddleware, authController.deleteUser);

// 🟢 Get User by ID
router.get('/user/:userId', authMiddleware, adminMiddleware, authController.selectUserById);

// 🟢 Update User Role
// router.put('/update-role/:userId', authMiddleware, adminMiddleware, authController.updateUserRole);

module.exports = router;