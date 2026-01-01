const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // 1. Identity
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false }, // Hidden by default
    googleId: { type: String, select: false },

    // 2. Settings (Crucial for your "Overdue" logic)
    timezone: { type: String, default: "UTC" }, // Will update from frontend

    // 3. Stats (For the Consistency Ring)
    stats: {
      totalCompleted: { type: Number, default: 0 },
      currentStreak: { type: Number, default: 0 },
      longestStreak: { type: Number, default: 0 },
      lastActiveDate: { type: Date },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
