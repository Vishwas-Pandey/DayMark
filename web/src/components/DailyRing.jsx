import React from "react";

const DailyRing = ({ tasks }) => {
  // 1. Calculate Daily Progress (Completed / Total Today)
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;

  // Avoid NaN if no tasks exist
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  // 2. Circle Math
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // 3. Color Logic
  const getColor = () => {
    if (percentage === 100) return "text-green-500";
    if (percentage >= 50) return "text-orange-500";
    return "text-blue-500"; // Blue looks good for "in progress"
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
      <div>
        <h3 className="text-gray-500 font-bold text-xs uppercase tracking-wider">
          Today's Progress
        </h3>
        <p className="text-3xl font-black text-gray-900 mt-1">{percentage}%</p>
        <p className="text-xs text-gray-400 font-medium mt-1">
          {completed} of {total} tasks done
        </p>
      </div>

      {/* Animated SVG Ring */}
      <div className="relative w-20 h-20">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background Gray Circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-100"
          />
          {/* Colored Progress Circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${getColor()} transition-all duration-1000 ease-out`}
          />
        </svg>
      </div>
    </div>
  );
};

export default DailyRing;
