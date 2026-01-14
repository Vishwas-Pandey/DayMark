const express = require("express");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const habitRoutes = require("./routes/habitRoutes");

const app = express();

// =======================
// CORS (PRODUCTION SAFE)
// =======================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://day-mark-five.vercel.app", // ✅ your Vercel domain
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// =======================
// BODY PARSERS
// =======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// DEBUG LOGGER (DEV ONLY)
// =======================
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log(`📡 [${req.method}] ${req.url}`);
    next();
  });
}

// =======================
// ROUTES
// =======================
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/habit", habitRoutes); // ✅ SINGULAR (matches frontend)

// =======================
// GLOBAL ERROR HANDLER
// =======================
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err.stack);
  res.status(500).json({
    message: err.message || "Server Error",
  });
});

module.exports = app;
