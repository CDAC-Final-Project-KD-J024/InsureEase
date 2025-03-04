const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require('path');

dotenv.config();
const passport = require("passport");
const { connectDB } = require("./config/db");
require("./config/passport");

const authRoutes = require("./routes/authRoutes");
const policyRoutes = require("./routes/policyRoutes");
const orderRoutes = require("./routes/ordersRoutes");
const claimRoutes = require("./routes/claimsRoutes");
const userPolicyRoutes = require('./routes/userPolicyRoutes');
const errorMiddleware = require("./middlewares/errorMiddleware");
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Or your frontend URL
    credentials: true,
  }));
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(passport.initialize()); // Initialize Passport



// Connect to Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/user-policy", userPolicyRoutes);


// Global error handler - this should be after all routes
app.use(errorMiddleware);

module.exports = app;
