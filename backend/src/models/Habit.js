const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },

    // Logic: "Run this habit every Monday and Friday"
    frequency: { type: String, enum: ["daily", "weekly"], default: "daily" },
    repeatDays: [{ type: Number }], // 0=Sun, 1=Mon...

    streak: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Habit", HabitSchema);
