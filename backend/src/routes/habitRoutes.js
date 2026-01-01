const express = require("express");
const router = express.Router();
const { getHabits, createHabit } = require("../controllers/habitController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.route("/").get(getHabits).post(createHabit);

module.exports = router;
