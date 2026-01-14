import React, { useState, useEffect } from "react";
import API from "../services/api";
import Modal from "../components/common/Modal";
import TaskForm from "../components/TaskForm";
import DailyRing from "../components/DailyRing";
import { Plus, Calendar, CheckCircle2, Circle, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchDashboardItems();
  }, []);

  const fetchDashboardItems = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];

      const [tasksRes, habitsRes] = await Promise.all([
        API.get("/tasks"),
        API.get("/habits"),
      ]);

      const tasks = tasksRes.data;

      const habitsAsTasks = habitsRes.data.map((habit) => ({
        _id: habit._id,
        title: habit.title,
        category: "Habit",
        status: habit.completedDates.includes(today) ? "completed" : "pending",
        dueDate: today,
        isHabit: true,
      }));

      setItems([...tasks, ...habitsAsTasks]);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  const handleToggleStatus = async (item) => {
    try {
      if (item.isHabit) {
        await API.post(`/habits/${item._id}/toggle`);
      } else {
        const newStatus = item.status === "completed" ? "pending" : "completed";
        await API.put(`/tasks/${item._id}`, { status: newStatus });
      }

      toast.success("Updated!");
      fetchDashboardItems();
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    try {
      if (item.isHabit) {
        await API.delete(`/habits/${item._id}`);
      } else {
        await API.delete(`/tasks/${item._id}`);
      }

      toast.success("Deleted");
      fetchDashboardItems();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  // 🗓️ Only show today’s items
  const todaysItems = items.filter((item) => {
    const itemDate = new Date(item.dueDate).toDateString();
    const today = new Date().toDateString();
    return itemDate === today && item.status !== "overdue";
  });

  const getCategoryColor = (category) => {
    const map = {
      Work: "bg-blue-100 text-blue-700",
      Personal: "bg-purple-100 text-purple-700",
      Health: "bg-green-100 text-green-700",
      Study: "bg-orange-100 text-orange-700",
      Habit: "bg-gray-200 text-gray-800",
    };
    return map[category] || "bg-gray-100 text-gray-700";
  };

  const getItemStyle = (status) => {
    if (status === "completed")
      return "border-green-100 bg-green-50/50 opacity-75";
    return "border-gray-100 hover:shadow-md bg-white";
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-black text-white rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-2">Focus on Today 🎯</h2>
          <p className="text-gray-400 mb-6">
            "Either you run the day, or the day runs you."
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-100"
          >
            + Add Task
          </button>
        </div>

        <DailyRing tasks={todaysItems} />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Plan</h2>

      {todaysItems.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-16 text-center">
          <h3 className="text-lg font-bold">No items for today</h3>
          <p className="text-gray-500 mt-1">Add a task or habit to begin</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {todaysItems.map((item) => (
            <div
              key={`${item.isHabit ? "habit" : "task"}-${item._id}`}
              className={`group p-5 rounded-2xl border flex justify-between items-center transition-all ${getItemStyle(
                item.status
              )}`}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleToggleStatus(item)}
                  className={`${
                    item.status === "completed"
                      ? "text-green-500"
                      : "text-gray-300 hover:text-black"
                  }`}
                >
                  {item.status === "completed" ? (
                    <CheckCircle2 size={26} />
                  ) : (
                    <Circle size={26} />
                  )}
                </button>

                <div>
                  <h3
                    className={`font-bold text-lg ${
                      item.status === "completed"
                        ? "line-through text-gray-400"
                        : "text-gray-900"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-3 mt-1.5">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg ${getCategoryColor(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={12} /> Today
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDelete(item)}
                className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full"
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
          onSuccess={fetchDashboardItems}
          onClose={() => setIsModalOpen(false)}
          defaultType="task"
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
