const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware"); // Your JWT Guard

// Apply protection to all routes below
router.use(protect);

router
  .route("/")
  .get(getTasks) // GET /api/tasks
  .post(createTask); // POST /api/tasks

router
  .route("/:id")
  .put(updateTask) // PUT /api/tasks/:id
  .delete(deleteTask); // DELETE /api/tasks/:id

module.exports = router;
