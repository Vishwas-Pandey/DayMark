const Habit = require("../models/Habit");

exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user.id });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createHabit = async (req, res) => {
  try {
    const { title, repeatDays } = req.body;
    const habit = await Habit.create({
      userId: req.user.id,
      title,
      repeatDays,
      frequency: "weekly",
    });
    res.status(201).json(habit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
