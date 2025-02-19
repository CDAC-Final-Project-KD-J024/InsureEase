const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const User = require("../models/user.model"); // Adjust the path as needed

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// 🟢 Register User
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    firstName,
    lastName,
    email,
    password,
    dob,
    gender,
    phone,
    address,
    city,
    state,
    country,
    pincode,
    role = "user", // Default role to 'user' if not provided
  } = req.body;

  const profilePicture = req.file ? req.file.path.replace(/\\/g, "/") : null;

  try {
    const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: "Email already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users (profilePicture, firstName, lastName, email, password, dob, gender, phone, address, city, state, country, pincode, role)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [profilePicture, firstName, lastName, email, hashedPassword, dob, gender, phone, address, city, state, country, pincode, role]
    );

    const [userResult] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = userResult[0];

    // 🔹 Generate JWT Token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Registration successful!",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [userResult] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = userResult[0];
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }
    console.log(password);
    console.log(email);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Update User Profile
exports.updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    firstName,
    lastName,
    dob,
    gender,
    phone,
    address,
    city,
    state,
    country,
    pincode,
  } = req.body;

  const profilePicture = req.file ? req.file.path.replace(/\\/g, "/") : null;
  const userId = req.user.id;

  try {
    const [existingUser] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
    if (!existingUser.length) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (profilePicture && existingUser[0].profilePicture) {
      fs.unlinkSync(existingUser[0].profilePicture); // Delete old picture if exists
    }

    await db.query(
      `UPDATE users SET profilePicture = ?, firstName = ?, lastName = ?, dob = ?, gender = ?, phone = ?, address = ?, city = ?, state = ?, country = ?, pincode = ?, updatedAt = NOW() WHERE id = ?`,
      [profilePicture, firstName, lastName, dob, gender, phone, address, city, state, country, pincode, userId]
    );

    const [updatedUserResult] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
    const updatedUser = updatedUserResult[0];

    res.json({
      message: "Profile updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("❌ Profile Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Promote User to Admin
exports.promoteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await db.query("UPDATE users SET role = 'admin', updatedAt = NOW() WHERE id = ?", [userId]);
    res.json({ message: "User promoted to admin successfully!" });
  } catch (error) {
    console.error("❌ Promote User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Demote User to Standard User
exports.demoteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await db.query("UPDATE users SET role = 'user', updatedAt = NOW() WHERE id = ?", [userId]);
    res.json({ message: "User demoted to standard user successfully!" });
  } catch (error) {
    console.error("❌ Demote User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// 🟢 Delete User
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const [existingUser] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
    if (!existingUser.length) {
      return res.status(404).json({ message: "User not found!" });
    }

    await db.query("DELETE FROM users WHERE id = ?", [userId]);
    res.json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error("❌ Delete User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Get User by ID
exports.selectUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const [user] = await db.query("SELECT id, email, role, firstName, lastName, phone FROM users WHERE id = ?", [userId]);
    if (!user.length) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json(user[0]);
  } catch (error) {
    console.error("❌ Get User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// reset password
exports.resetPassword=async (req, res) => {
  const { email, otp, newPassword } = req.body;
  
  if (!otpStore[email] || otpStore[email].otp !== otp || Date.now() > otpStore[email].expiresAt) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.update({ password: hashedPassword }, { where: { email } });

  delete otpStore[email]; // Remove OTP after successful reset
  res.status(200).json({ message: "Password reset successful" });
}

let otpStore = {}; // Temporary storage for OTPs

// forgot-password
exports.forgotPassword=async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
      return res.status(404).json({ message: "User not found" });
  }

  const otp = generateOTP();
  otpStore[email] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 }; // OTP expires in 10 mins

  try {
      await sendOTPEmail(email, otp);
      res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
      res.status(500).json({ message: "Error sending OTP", error });
  }
}

// 🟢 Update User Role
exports.updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!["admin", "user"].includes(role)) {
    return res.status(400).json({ message: "Invalid role. Must be 'admin' or 'user'." });
  }

  try {
    const [existingUser] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
    if (!existingUser.length) {
      return res.status(404).json({ message: "User not found!" });
    }

    await db.query("UPDATE users SET role = ?, updatedAt = NOW() WHERE id = ?", [role, userId]);
    res.json({ message: `User role updated to ${role} successfully!` });
  } catch (error) {
    console.error("❌ Update User Role Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
