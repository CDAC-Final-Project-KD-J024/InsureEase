const db = require("../config/db"); // MySQL Connection

const createUserTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        profilePicture VARCHAR(255) DEFAULT NULL,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) DEFAULT NULL,
        dob DATE DEFAULT NULL,
        gender ENUM('Male', 'Female', 'Other') DEFAULT NULL,
        phone VARCHAR(15) UNIQUE DEFAULT NULL,
        address TEXT DEFAULT NULL,
        city VARCHAR(50) DEFAULT NULL,
        state VARCHAR(50) DEFAULT NULL,
        country VARCHAR(50) DEFAULT NULL,
        pincode VARCHAR(10) DEFAULT NULL,
        role ENUM('user', 'admin') DEFAULT 'user' NOT NULL, 
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Users table created or updated (if not exists)");
  } catch (err) {
    console.error("❌ Error creating/updating users table:", err);
  }
};

createUserTable();

module.exports = db;
