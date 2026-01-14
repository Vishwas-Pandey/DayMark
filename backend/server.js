require("dotenv").config();
const http = require("http");
const connectDB = require("./src/config/db");
const startCronJobs = require("./src/jobs/cronJobs");
const app = require("./src/app");

// =======================
// DATABASE
// =======================
connectDB();

// =======================
// CRON JOBS (SAFE START)
// =======================
if (process.env.NODE_ENV !== "test") {
  startCronJobs();
}

// =======================
// SERVER
// =======================
const PORT = process.env.PORT || 5001;

const server = http.createServer(app);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// =======================
// GRACEFUL SHUTDOWN (IMPORTANT FOR RENDER)
// =======================
process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    process.exit(0);
  });
});
