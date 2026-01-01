import React, { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

const TaskForm = ({ onSuccess, onClose }) => {
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
      await API.post("/tasks", formData);
      toast.success("Task created! 🚀");
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Task Name
        </label>
        <input
          type="text"
          placeholder="e.g. Finish Project Report"
          autoFocus
          className="w-full p-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

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

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-70 mt-2"
      >
        {loading ? "Saving..." : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;
