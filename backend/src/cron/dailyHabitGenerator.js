const cron = require("node-cron");
const Habit = require("../models/Habit");
const Task = require("../models/Task");

const generateDailyHabits = () => {
  // Run every day at midnight: '0 0 * * *'
  cron.schedule("0 0 * * *", async () => {
    console.log("📅 Generating Daily Habits...");

    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday...

    try {
      // Find all active habits that are scheduled for Today
      const habits = await Habit.find({
        isActive: true,
        repeatDays: { $in: [dayOfWeek] },
      });

      // Create a Task for each Habit
      for (const habit of habits) {
        // Check if task already exists for today (prevent duplicates)
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const exists = await Task.findOne({
          title: habit.title,
          userId: habit.userId,
          dueDate: { $gte: startOfDay, $lte: endOfDay },
        });

        if (!exists) {
          await Task.create({
            userId: habit.userId,
            title: habit.title,
            category: "Health", // Default category for habits
            dueDate: new Date().setHours(23, 59, 0, 0), // Due at end of day
            status: "pending",
          });
          console.log(`✅ Created task for habit: ${habit.title}`);
        }
      }
    } catch (error) {
      console.error("Error generating habits:", error);
    }
  });
};

module.exports = generateDailyHabits;
