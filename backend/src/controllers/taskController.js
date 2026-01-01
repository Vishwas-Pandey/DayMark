const Task = require("../models/Task");

// @desc    Get all active tasks for the logged-in user
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res) => {
  try {
    // Only fetch tasks that belong to the user AND are not deleted
    const tasks = await Task.find({
      userId: req.user.id,
      isDeleted: false,
    }).sort({ dueDate: 1 }); // Sort by nearest due date

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res) => {
  try {
    const { title, category, priority, dueDate } = req.body;

    if (!title || !dueDate) {
      return res
        .status(400)
        .json({ message: "Title and Due Date are required" });
    }

    const task = await Task.create({
      userId: req.user.id, // Comes from authMiddleware
      title,
      category,
      priority,
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a task (Mark complete / Edit)
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Ensure user owns the task
    if (task.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Check if we are marking it as completed
    if (req.body.status === "completed" && task.status !== "completed") {
      req.body.completedAt = new Date();
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Soft Delete a task (Move to Trash)
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // SOFT DELETE: Just mark as deleted, don't remove from DB
    task.isDeleted = true;
    await task.save();

    res.status(200).json({ message: "Task moved to trash" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
