import React from "react";

const ConsistencyRing = ({ tasks, size = "large" }) => {
  // 1. Calculate Score
  const completed = tasks.filter((t) => t.status === "completed").length;
  const overdue = tasks.filter((t) => t.status === "overdue").length;
  const totalHistory = completed + overdue;

  const percentage =
    totalHistory === 0 ? 100 : Math.round((completed / totalHistory) * 100);

  // 2. Adjust Sizes based on 'size' prop
  const radius = size === "large" ? 30 : 18;
  const stroke = size === "large" ? 8 : 4;
  const boxSize = size === "large" ? 80 : 44; // SVG Viewbox size

  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 50) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div
      className={`flex items-center ${
        size === "large"
          ? "justify-between bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
          : "gap-4"
      }`}
    >
      {/* Text is only visible in Large Mode (Dashboard) */}
      {size === "large" && (
        <div>
          <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider">
            Consistency
          </h3>
          <p className="text-3xl font-black text-gray-900 mt-1">
            {percentage}%
          </p>
          <p className="text-xs text-gray-400 font-medium mt-1">
            {completed} done • {overdue} missed
          </p>
        </div>
      )}

      {/* The Ring Visual */}
      <div
        className={`relative ${size === "large" ? "w-20 h-20" : "w-12 h-12"}`}
      >
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox={`0 0 ${boxSize} ${boxSize}`}
        >
          {/* Background Gray Circle */}
          <circle
            cx={boxSize / 2}
            cy={boxSize / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={stroke}
            fill="transparent"
            className="text-gray-100"
          />
          {/* Colored Progress Circle */}
          <circle
            cx={boxSize / 2}
            cy={boxSize / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={stroke}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${getColor()} transition-all duration-1000 ease-out`}
          />
        </svg>

        {/* Percentage Text inside Ring (Only for Mini mode) */}
        {size !== "large" && (
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-700">
            {percentage}%
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsistencyRing;
