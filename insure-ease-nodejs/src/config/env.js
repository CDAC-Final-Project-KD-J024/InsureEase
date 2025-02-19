const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "your_secret_key",
    expiresIn: process.env.TOKEN_EXPIRY || "1d",
  },
};
