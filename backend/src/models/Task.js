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
      default: false, // This enables the "Undo" feature
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
