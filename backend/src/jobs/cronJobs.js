const cron = require("node-cron");
const Task = require("../models/Task");

const startCronJobs = () => {
  // 🌙 Schedule: Runs every night at Midnight (00:00)
  cron.schedule("* * * * *", async () => {
    console.log("⏰ Midnight Job: Checking for overdue tasks...");

    try {
      // Logic: If a task is 'pending' AND its due date is strictly BEFORE today
      // (meaning it was due yesterday or earlier), mark it as 'overdue'.

      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const result = await Task.updateMany(
        {
          status: "pending",
          dueDate: { $lt: todayStart },
        },
        {
          $set: { status: "overdue" },
        }
      );

      if (result.modifiedCount > 0) {
        console.log(`✅ Updated ${result.modifiedCount} tasks to Overdue.`);
      } else {
        console.log("👍 No overdue tasks found today.");
      }
    } catch (error) {
      console.error("❌ Cron Job Failed:", error);
    }
  });

  console.log("⚙️  Cron Jobs initialized");
};

module.exports = startCronJobs;
