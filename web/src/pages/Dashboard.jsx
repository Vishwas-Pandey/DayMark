import React, { useState, useEffect } from "react";
import API from "../services/api";
import Modal from "../components/common/Modal";
import TaskForm from "../components/TaskForm";
import ConsistencyRing from "../components/ConsistencyRing";
import {
  Plus,
  Calendar,
  CheckCircle2,
  Circle,
  Trash2,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const newStatus = task.status === "completed" ? "pending" : "completed";
      setTasks(
        tasks.map((t) => (t._id === task._id ? { ...t, status: newStatus } : t))
      );
      await API.put(`/tasks/${task._id}`, { status: newStatus });
      if (newStatus === "completed") toast.success("Nice work! 🎉");
    } catch (error) {
      toast.error("Failed to update task");
      fetchTasks();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      setTasks(tasks.filter((t) => t._id !== id));
      await API.delete(`/tasks/${id}`);
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task");
      fetchTasks();
    }
  };

  // 🗓️ FILTER: Only show tasks due TODAY (or completed today)
  const todaysTasks = tasks.filter((task) => {
    if (task.status === "overdue") return false; // Overdue goes to Overdue Page
    const taskDate = new Date(task.dueDate).toDateString();
    const today = new Date().toDateString();
    return taskDate === today;
  });

  // Helper Styles
  const getCategoryColor = (category) => {
    const map = {
      Work: "bg-blue-100 text-blue-700",
      Personal: "bg-purple-100 text-purple-700",
      Health: "bg-green-100 text-green-700",
      Study: "bg-orange-100 text-orange-700",
    };
    return map[category] || "bg-gray-100 text-gray-700";
  };

  const getTaskStyle = (status) => {
    if (status === "completed")
      return "border-green-100 bg-green-50/50 opacity-75";
    return "border-gray-100 hover:shadow-md bg-white";
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Ring Section */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-black text-white rounded-3xl p-8 flex flex-col justify-center shadow-xl">
          <h2 className="text-2xl font-bold mb-2">Focus on Today 🎯</h2>
          <p className="text-gray-400 mb-6">
            "Either you run the day, or the day runs you."
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-black px-6 py-3 rounded-xl font-bold self-start hover:bg-gray-100 transition-colors"
          >
            + Add Task
          </button>
        </div>
        <ConsistencyRing tasks={tasks} />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Plan</h2>

      {todaysTasks.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-16 text-center">
          <h3 className="text-lg font-bold text-gray-900">
            No tasks for today
          </h3>
          <p className="text-gray-500 mt-1">Add a task to get started!</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {todaysTasks.map((task) => (
            <div
              key={task._id}
              className={`group p-5 rounded-2xl border transition-all flex justify-between items-center ${getTaskStyle(
                task.status
              )}`}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleToggleStatus(task)}
                  className={`transition-colors ${
                    task.status === "completed"
                      ? "text-green-500"
                      : "text-gray-300 hover:text-black"
                  }`}
                >
                  {task.status === "completed" ? (
                    <CheckCircle2 size={26} />
                  ) : (
                    <Circle size={26} />
                  )}
                </button>
                <div>
                  <h3
                    className={`font-bold text-lg ${
                      task.status === "completed"
                        ? "text-gray-400 line-through"
                        : "text-gray-900"
                    }`}
                  >
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg ${getCategoryColor(
                        task.category
                      )}`}
                    >
                      {task.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-medium text-gray-400">
                      <Calendar size={12} /> Today
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDelete(task._id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Task"
      >
        <TaskForm
          onSuccess={fetchTasks}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
