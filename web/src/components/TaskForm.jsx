import React, { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

const TaskForm = ({ onSuccess, onClose, defaultType = "task" }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Work",
    priority: "Medium",
    dueDate: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setLoading(true);
    try {
      if (defaultType === "habit") {
        // ✅ CREATE HABIT (goes to /api/habits)
        await API.post("/habits", {
          title: formData.title.trim(),
        });
      } else {
        // ✅ CREATE TASK (goes to /api/tasks)
        await API.post("/tasks", {
          title: formData.title.trim(),
          category: formData.category,
          priority: formData.priority,
          dueDate: formData.dueDate,
          status: "pending",
        });
      }

      toast.success(
        `${defaultType === "habit" ? "Habit" : "Task"} created! 🚀`
      );

      onSuccess?.();
      onClose?.();

      // Reset form
      setFormData({
        title: "",
        category: "Work",
        priority: "Medium",
        dueDate: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* TITLE */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          {defaultType === "habit" ? "Habit Name" : "Task Name"}
        </label>
        <input
          type="text"
          placeholder={
            defaultType === "habit" ? "e.g. Morning Run" : "e.g. Buy Groceries"
          }
          autoFocus
          className="w-full p-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      {/* TASK-ONLY FIELDS */}
      {defaultType === "task" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Category
            </label>
            <select
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-black outline-none bg-white"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option>Work</option>
              <option>Personal</option>
              <option>Health</option>
              <option>Study</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-black outline-none"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />
          </div>
        </div>
      )}

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-70 mt-2 capitalize"
      >
        {loading
          ? "Saving..."
          : `Create ${defaultType === "habit" ? "Habit" : "Task"}`}
      </button>
    </form>
  );
};

export default TaskForm;
