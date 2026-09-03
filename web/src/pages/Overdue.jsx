import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { AlertTriangle, Calendar } from "lucide-react";
import toast from "react-hot-toast";

const Overdue = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchOverdue();
  }, []);

  const fetchOverdue = () => {
    API.get("/tasks").then(({ data }) => {
      // Tasks have no literal "overdue" status — it's derived from dueDate.
      const now = new Date();
      setTasks(
        data.filter((t) => t.status !== "completed" && t.status !== "archived" && t.dueDate && new Date(t.dueDate) < now)
      );
    });
  };

  const handleQuickComplete = async (task) => {
    try {
      await API.patch(`/tasks/${task.id}`, { status: "completed" });
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
          <h2 className="text-2xl font-bold text-text-heading">Missed Tasks</h2>
          <p className="text-red-500 font-medium">
            {tasks.length} tasks require attention
          </p>
        </div>
      </div>

      <div className="grid gap-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-5 rounded-2xl border border-red-100 bg-surface-primary shadow-sm flex justify-between items-center group hover:border-red-300 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500 font-bold">
                !
              </div>
              <div>
                <h3 className="font-bold text-lg text-text-heading">
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
          <div className="p-20 text-center bg-surface-primary rounded-3xl border border-dashed border-border-default">
            <p className="text-text-muted text-lg">
              No overdue tasks. You are crushing it! 🚀
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overdue;
