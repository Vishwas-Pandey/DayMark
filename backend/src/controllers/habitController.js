const Habit = require("../models/Habit");

// Create Habit
exports.createHabit = async (req, res) => {
  try {
    const habit = await Habit.create({
      userId: req.user.id,
      title: req.body.title,
      completedDates: [],
    });

    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ message: "Failed to create habit" });
  }
};

// Get All Habits
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({
      userId: req.user.id,
      isDeleted: false,
    }).sort({ createdAt: 1 });

    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch habits" });
  }
};

// Toggle Habit for Today
exports.toggleHabitToday = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    if (habit.completedDates.includes(today)) {
      habit.completedDates = habit.completedDates.filter((d) => d !== today);
    } else {
      habit.completedDates.push(today);
    }

    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle habit" });
  }
};

// Delete Habit (Permanent)
exports.deleteHabit = async (req, res) => {
  try {
    await Habit.deleteOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    res.json({ message: "Habit deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete habit" });
  }
};
