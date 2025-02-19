insure-ease-nodejs/
│── src/
│   ├── config/          # Configuration files (DB, environment, etc.)
│   │   ├── db.js        # MySQL database connection setup
│   │   ├── env.js       # Load environment variables
│   ├── controllers/     # Handles business logic (user authentication, etc.)
│   │   ├── auth.controller.js
│   ├── middlewares/     # Middleware (authentication, validation)
│   │   ├── auth.middleware.js
│   │   ├── validate.middleware.js
│   ├── models/          # Database models (User, etc.)
│   │   ├── user.model.js
│   ├── routes/          # API endpoints
│   │   ├── auth.routes.js
│   ├── services/        # Handles complex business logic (DB queries, hashing, JWT, etc.)
│   │   ├── auth.service.js
│   ├── utils/           # Utility functions (password hashing, token generation, etc.)
│   │   ├── password.util.js
│   │   ├── jwt.util.js
│   ├── app.js           # Express app setup
│   ├── server.js        # Entry point for starting the server
│── .env                 # Environment variables (DB credentials, JWT secret, etc.)
│── package.json         # Project dependencies and scripts
│── README.md            # Project documentation
📌 What Goes Where?
Folder/File	Purpose
config/	Stores configuration files like database connection and environment settings.
controllers/	Contains functions that handle HTTP requests and responses (e.g., user registration).
middlewares/	Middleware functions for request validation, authentication, etc.
models/	Defines database models/tables (e.g., User model for MySQL).
routes/	Defines API endpoints (e.g., POST /api/auth/register).
services/	Handles business logic like querying MySQL, hashing passwords, generating tokens.
utils/	Utility functions such as password hashing, JWT token generation.
app.js	Main Express.js app configuration (middleware, routes).
server.js	Starts the server and listens on a port.
.env	Stores environment variables like DB_HOST, DB_USER, DB_PASSWORD.
🛠️ Next Steps
Initialize the Node.js Project

bash
Copy
Edit
mkdir insureease-auth-service && cd insureease-auth-service
npm init -y
Install Core Dependencies

bash
Copy
Edit
npm install express dotenv mysql2 cors helmet morgan bcryptjs jsonwebtoken joi
express → Web framework.
dotenv → Loads environment variables.
mysql2 → MySQL database driver.
cors → Handles cross-origin requests.
helmet → Secures HTTP headers.
morgan → Logs HTTP requests.
bcryptjs → Hashes passwords.
jsonwebtoken → Creates & verifies JWT tokens.
joi → Validates input data.
 Setting Up MySQL Connection (Industry-Level)
Since you're using MySQL, we’ll create a proper database connection management system to: ✔ Use connection pooling for better performance.
✔ Load credentials from .env to keep them secure.
✔ Handle errors gracefully to prevent crashes.

📁 Folder Structure Update
graphql
Copy
Edit
src/
│── config/
│   ├── db.js        # MySQL Database Connection (Connection Pool)
│   ├── env.js       # Loads environment variables
Step 1: Setup Environment Variables (.env)
env
Copy
Edit
PORT=5000

# MySQL Database Credentials
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=insureease
DB_PORT=3306
Step 2: Create Database Connection (src/config/db.js)
js
Copy
Edit
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
🔹 Why use connection pooling?
Instead of opening and closing new database connections for every request, pooling reuses connections, reducing overhead.

🔹 Why use db.promise()?
It enables async/await usage, making code cleaner.

Step 3: Load Environment Variables (src/config/env.js)
js
Copy
Edit
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
Step 4: Integrate DB Connection in Express (src/app.js)
js
Copy
Edit
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const db = require("./config/db"); // Import MySQL connection

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Test Database Connection
db.query("SELECT 1")
  .then(() => console.log("✅ MySQL Database Connected"))
  .catch((err) => console.error("❌ MySQL Connection Error:", err));

module.exports = app;
Step 5: Run & Test the MySQL Connection
bash
Copy
Edit
node src/server.js
If the setup is correct, you should see:

pgsql
Copy
Edit
✅ MySQL Database Connected
Server running on port 5000
