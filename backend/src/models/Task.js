const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a task title"],
      trim: true,
    },
    // 👇 NEW FIELD: Distinguishes Habits from Tasks
    type: {
      type: String,
      enum: ["task", "habit"],
      default: "task",
    },
    category: {
      type: String,
      enum: ["Work", "Personal", "Health", "Study", "No Category"],
      default: "No Category",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "overdue"],
      default: "pending",
    },
    completedAt: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
