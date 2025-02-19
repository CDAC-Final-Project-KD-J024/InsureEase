const app = require("./src/app");
const { port } = require("./src/config/env");

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

// Handle unexpected errors
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
});
