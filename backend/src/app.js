const express = require("express");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const habitRoutes = require("./routes/habitRoutes");

const app = express();

/**
 * ✅ CORS FIX (IMPORTANT)
 */
app.use(
  cors({
    origin: [
      "https://day-mark-ec3y.vercel.app", // production frontend
      "http://localhost:5173", // local dev
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle preflight explicitly
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug logger
app.use((req, res, next) => {
  console.log(`📡 [${req.method}] ${req.url}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/habits", habitRoutes);

// Health check (VERY useful)
app.get("/", (req, res) => {
  res.json({ status: "DayMark backend running ✅" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err.stack);
  res.status(500).json({
    message: err.message || "Server Error",
  });
});

module.exports = app;
