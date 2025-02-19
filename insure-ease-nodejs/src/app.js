const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const passport=require("passport");
const authRoutes = require("./routes/auth.routes");
const db = require("./config/db"); // Import MySQL connection
require("./models/user.model"); // Auto-create table on startup
require('./config/passport'); 
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(passport.initialize()); // Initialize Passport
// Test Database Connection
db.query("SELECT 1")
  .then(() => {
    
    console.log("✅ MySQL Database Connected")
  
console.log(process.env.JWT_SECRET);
console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CLIENT_SECRET);
console.log(process.env.GITHUB_CLIENT_ID);
console.log( process.env.GITHUB_CLIENT_SECRET);
  })
  .catch((err) => console.error("❌ MySQL Connection Error:", err));


// Routes
app.use("/api/auth", authRoutes);

module.exports = app;
