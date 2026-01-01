require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const startCronJobs = require("./src/jobs/cronJobs"); // ✅ Imported here

// Import Routes
const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
const habitRoutes = require("./src/routes/habitRoutes");

const app = express();

// ✅ 1. CORS (Allow Frontend to connect)
app.use(cors());

// ✅ 2. BODY PARSER (Crucial for receiving JSON data)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ 3. DEBUG LOGGER (Optional: Helps see requests in terminal)
app.use((req, res, next) => {
  console.log(`📡 [${req.method}] ${req.url}`);
  next();
});

// ✅ 4. CONNECT DATABASE
connectDB();

// ✅ 5. MOUNT ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/habit", habitRoutes);

// ✅ 6. GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err.stack);
  res.status(500).json({
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// ✅ 7. START BACKGROUND JOBS (The "Midnight Patrol")
startCronJobs(); // 👈 This turns on the automation!

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
