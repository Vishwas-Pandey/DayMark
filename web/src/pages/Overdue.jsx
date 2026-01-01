import React, { useState, useEffect } from "react";
import API from "../services/api";
import { AlertTriangle, Calendar } from "lucide-react";
import toast from "react-hot-toast";

const Overdue = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchOverdue();
  }, []);

  const fetchOverdue = () => {
    API.get("/tasks").then(({ data }) => {
      // Only show tasks that are actually overdue
      setTasks(data.filter((t) => t.status === "overdue"));
    });
  };

  const handleQuickComplete = async (task) => {
    try {
      await API.put(`/tasks/${task._id}`, { status: "completed" });
      toast.success("Better late than never! 😅");
      fetchOverdue(); // Refresh list to remove the item
    } catch (err) {
      toast.error("Error updating task");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-red-100 text-red-600 rounded-xl">
          <AlertTriangle size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Missed Tasks</h2>
          <p className="text-red-500 font-medium">
            {tasks.length} tasks require attention
          </p>
        </div>
      </div>

      <div className="grid gap-3">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="p-5 rounded-2xl border border-red-100 bg-white shadow-sm flex justify-between items-center group hover:border-red-300 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500 font-bold">
                !
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">
                  {task.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-red-500 font-bold mt-1">
                  <Calendar size={14} />
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleQuickComplete(task)}
              className="px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-green-600 transition-colors"
            >
              Mark Done
            </button>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="p-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400 text-lg">
              No overdue tasks. You are crushing it! 🚀
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overdue;
