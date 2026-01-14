const express = require("express");
const {
  createHabit,
  getHabits,
  toggleHabitToday,
  deleteHabit,
} = require("../controllers/habitController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// 🔐 protect all habit routes
router.use(protect);

router.post("/", createHabit);
router.get("/", getHabits);
router.post("/:id/toggle", toggleHabitToday);
router.delete("/:id", deleteHabit);

module.exports = router;
