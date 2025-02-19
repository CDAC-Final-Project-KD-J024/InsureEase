

// 📂 backend/routes/auth.routes.js
const express = require('express');
const passport=require('passport');
const upload = require('../middlewares/uploadImage');
const { body } = require('express-validator');
const { register, login,updateProfile,promoteUser,demoteUser,deleteUser,selectUserById,updateUserRole, resetPassword, forgotPassword } = require('../controllers/auth.controller');
const authMiddleware=require('../middlewares/auth.middleware').protect;
const router = express.Router();

// 🟢 User Registration
router.post(
  '/register',
  upload.single('profilePicture'),
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  register
);

// 🟢 User Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login
);
// 🟢 Google Authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const { token, ...user } = req.user;
   // Frontend redirect with token
    res.redirect(`http://localhost:5173/login?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);

  }
);

// 🟢 GitHub Authentication
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const { token, ...user } = req.user;
    // Frontend redirect with token
    res.redirect(`http://localhost:5173/login?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
 }
);
// 🟢 Update User Profile
router.put(
  '/update-profile',
  authMiddleware, // Ensure user is authenticated
  upload.single('profilePicture'),
  [
    body('email').optional().isEmail().withMessage('Invalid email format'),
    body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
  ],
  updateProfile
);

// 🟢 Promote User to Admin
router.put('/promote-user/:userId', authMiddleware, promoteUser);

// 🟢 Demote User to Standard User
router.put('/demote-user/:userId', authMiddleware, demoteUser);


// 🟢 Delete User
router.delete("/delete-user/:userId", authMiddleware, deleteUser);

// 🟢 Get User by ID
router.get("/user/:userId", authMiddleware, selectUserById);

// 🟢 Update User Role
router.put("/update-role/:userId", authMiddleware, updateUserRole);

router.post("/reset-password", resetPassword);


router.post("/forgot-password", forgotPassword);

module.exports = router;
