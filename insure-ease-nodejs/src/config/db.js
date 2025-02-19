const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Create a MySQL connection pool (better than single connection)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10, // Adjust based on traffic
  queueLimit: 0,
});

// Promisify queries for cleaner async/await usage
const db = pool.promise();

module.exports = db;
