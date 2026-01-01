import React, { useState, useEffect } from "react";
import API from "../services/api";
import ConsistencyRing from "../components/ConsistencyRing";
import { ListTodo, CheckCircle2, XCircle } from "lucide-react";

const AllTasks = () => {
  const [groupedHabits, setGroupedHabits] = useState({});

  useEffect(() => {
    API.get("/tasks").then(({ data }) => {
      // Group tasks by Title (e.g., combine all "Gym" entries into one group)
      const groups = {};
      data.forEach((task) => {
        const name = task.title.trim(); // Clean up names
        if (!groups[name]) groups[name] = [];
        groups[name].push(task);
      });
      setGroupedHabits(groups);
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-black text-white rounded-xl">
          <ListTodo size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Habit Analytics</h2>
          <p className="text-gray-500">
            Track the consistency of each specific habit.
          </p>
        </div>
      </div>

      {/* Grid of Habit Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(groupedHabits).length === 0 ? (
          <div className="col-span-2 text-center p-12 text-gray-400 border border-dashed rounded-2xl">
            No habits tracked yet. Add tasks to see stats!
          </div>
        ) : (
          Object.keys(groupedHabits).map((habitName) => {
            const habitTasks = groupedHabits[habitName];
            const completed = habitTasks.filter(
              (t) => t.status === "completed"
            ).length;
            const overdue = habitTasks.filter(
              (t) => t.status === "overdue"
            ).length;

            return (
              <div
                key={habitName}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {habitName}
                  </h3>
                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md font-bold">
                      <CheckCircle2 size={14} /> {completed}
                    </span>
                    <span className="flex items-center gap-1 text-red-500 bg-red-50 px-2 py-1 rounded-md font-bold">
                      <XCircle size={14} /> {overdue}
                    </span>
                  </div>
                </div>

                {/* The Mini Ring for this Habit */}
                <ConsistencyRing tasks={habitTasks} size="mini" />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllTasks;
