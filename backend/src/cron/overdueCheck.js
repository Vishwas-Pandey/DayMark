const cron = require("node-cron");
const Task = require("../models/Task");

const checkOverdueTasks = () => {
  // Run every hour: '0 * * * *'
  // Run every minute (for testing): '* * * * *'
  cron.schedule("0 * * * *", async () => {
    console.log("⏳ Running Overdue Task Check...");

    const now = new Date();

    try {
      // Find tasks that are PENDING and Due Date is in the PAST
      const result = await Task.updateMany(
        {
          status: "pending",
          dueDate: { $lt: now },
          isDeleted: false,
        },
        {
          $set: { status: "overdue" },
        }
      );

      if (result.modifiedCount > 0) {
        console.log(`⚠️ Marked ${result.modifiedCount} tasks as Overdue.`);
      }
    } catch (error) {
      console.error("Error in Overdue Check:", error);
    }
  });
};

module.exports = checkOverdueTasks;
