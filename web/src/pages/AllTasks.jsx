import React, { useState, useEffect } from "react";
import API from "../services/api";
import Modal from "../components/common/Modal";
import TaskForm from "../components/TaskForm";
import { ListTodo, Check, X, Plus } from "lucide-react";

const AllTasks = () => {
  const [habits, setHabits] = useState([]);
  const [habitGrid, setHabitGrid] = useState({});
  const [dateHeaders, setDateHeaders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const dates = [...Array(7)]
      .map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return {
          obj: d,
          str: d.toISOString().split("T")[0],
        };
      })
      .reverse();

    setDateHeaders(dates);
    fetchHabits(dates);
  }, []);

  const fetchHabits = async (dates = dateHeaders) => {
    try {
      const { data } = await API.get("/habits");
      setHabits(data);
      processHabitData(data, dates);
    } catch (error) {
      console.error("Failed to fetch habits", error);
    }
  };

  const processHabitData = (habits, dates) => {
    const grid = {};
    const today = new Date().toISOString().split("T")[0];

    habits.forEach((habit) => {
      grid[habit.title] = {};

      dates.forEach(({ str }) => {
        if (habit.completedDates.includes(str)) {
          grid[habit.title][str] = "completed";
        } else if (str < today) {
          grid[habit.title][str] = "overdue";
        } else {
          grid[habit.title][str] = "pending";
        }
      });
    });

    setHabitGrid(grid);
  };

  const getStatusForDay = (habitName, dateStr) => {
    return habitGrid[habitName]?.[dateStr] || "none";
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-black text-white rounded-xl">
            <ListTodo size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Habit Tracker</h2>
            <p className="text-gray-500">
              Your visual history for the last 7 days.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg"
        >
          <Plus size={20} />
          Add Habit
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[200px_1fr] border-b border-gray-100 bg-gray-50/50">
          <div className="p-4 font-bold text-gray-400 uppercase text-xs">
            Habit Name
          </div>
          <div className="grid grid-cols-7">
            {dateHeaders.map((item, i) => (
              <div key={i} className="p-4 text-center border-l border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                  {item.obj.toLocaleDateString("en-US", { weekday: "short" })}
                </p>
                <p
                  className={`text-sm font-bold ${
                    i === 6
                      ? "text-blue-600 bg-blue-50 rounded-full w-6 h-6 mx-auto flex items-center justify-center"
                      : "text-gray-900"
                  }`}
                >
                  {item.obj.getDate()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Rows */}
        {Object.keys(habitGrid).length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            No habits tracked yet. Click "Add Habit" to start!
          </div>
        ) : (
          Object.keys(habitGrid).map((habitName) => (
            <div
              key={habitName}
              className="grid grid-cols-[200px_1fr] border-b border-gray-100 hover:bg-gray-50"
            >
              <div className="p-4 font-bold text-gray-800 truncate">
                {habitName}
              </div>
              <div className="grid grid-cols-7">
                {dateHeaders.map((item, i) => {
                  const status = getStatusForDay(habitName, item.str);
                  return (
                    <div
                      key={i}
                      className="p-2 border-l border-gray-100 flex justify-center"
                    >
                      {status === "completed" && (
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white">
                          <Check size={18} strokeWidth={4} />
                        </div>
                      )}
                      {status === "overdue" && (
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-500">
                          <X size={18} strokeWidth={3} />
                        </div>
                      )}
                      {status === "pending" && (
                        <div className="w-8 h-8 border-2 border-gray-200 rounded-lg bg-gray-50"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Start New Habit"
      >
        <TaskForm
          onSuccess={() => fetchHabits()}
          onClose={() => setIsModalOpen(false)}
          defaultType="habit"
        />
      </Modal>
    </div>
  );
};

export default AllTasks;
