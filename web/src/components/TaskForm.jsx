import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTasks } from "../hooks/useTasks";
import { useHabits } from "../hooks/useHabits";
import { useGoals } from "../hooks/useGoals";
import { useCalendar } from "../hooks/useCalendar";

const todayISO = () => new Date().toISOString().split("T")[0];
const nowTimeStr = () => new Date().toTimeString().slice(0, 5);

const LABELS = {
  task: "Task",
  habit: "Habit",
  goal: "Goal",
  event: "Event",
};

const TaskForm = ({ onSuccess, onClose, defaultType = "task" }) => {
  const { createTask } = useTasks();
  const { createHabit } = useHabits();
  const { createGoal } = useGoals();
  const { createEvent } = useCalendar();

  const [formData, setFormData] = useState({
    title: "",
    category: "Work",
    priority: "Medium",
    dueDate: todayISO(),
    targetValue: 100,
    unit: "%",
    startDate: todayISO(),
    startTime: nowTimeStr(),
    endTime: nowTimeStr(),
  });

  const mutation =
    defaultType === "habit" ? createHabit :
    defaultType === "goal" ? createGoal :
    defaultType === "event" ? createEvent :
    createTask;

  const loading = mutation.isPending;

  const buildPayload = () => {
    const title = formData.title.trim();
    if (defaultType === "habit") {
      return { title };
    }
    if (defaultType === "goal") {
      return {
        title,
        progress: { targetValue: Number(formData.targetValue) || 100, unit: formData.unit },
      };
    }
    if (defaultType === "event") {
      const start = new Date(`${formData.startDate}T${formData.startTime}`);
      const end = new Date(`${formData.startDate}T${formData.endTime}`);
      return {
        title,
        time: { start: start.toISOString(), end: end > start ? end.toISOString() : new Date(start.getTime() + 30 * 60000).toISOString() },
      };
    }
    // task
    return {
      title,
      priority: formData.priority.toLowerCase(),
      dueDate: new Date(formData.dueDate).toISOString(),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      await mutation.mutateAsync(buildPayload());
      toast.success(`${LABELS[defaultType]} created! 🚀`);
      onSuccess?.();
      onClose?.();
    } catch (error) {
      toast.error(error?.message || `Failed to create ${LABELS[defaultType].toLowerCase()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-text-muted mb-1">
          {LABELS[defaultType]} Name
        </label>
        <input
          type="text"
          placeholder={defaultType === "habit" ? "e.g. Morning Run" : defaultType === "goal" ? "e.g. Run a 10k" : defaultType === "event" ? "e.g. Team Standup" : "e.g. Buy Groceries"}
          autoFocus
          className="w-full p-3 rounded-xl border border-border-default bg-surface-primary text-text-heading focus:border-interactive-primary focus:ring-1 focus:ring-interactive-primary outline-none transition-all"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      {defaultType === "task" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-text-muted mb-1">Priority</label>
            <select
              className="w-full p-3 rounded-xl border border-border-default focus:border-interactive-primary outline-none bg-surface-primary text-text-heading"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-muted mb-1">Due Date</label>
            <input
              type="date"
              className="w-full p-3 rounded-xl border border-border-default focus:border-interactive-primary outline-none bg-surface-primary text-text-heading"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>
        </div>
      )}

      {defaultType === "goal" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-text-muted mb-1">Target Value</label>
            <input
              type="number"
              min="1"
              className="w-full p-3 rounded-xl border border-border-default focus:border-interactive-primary outline-none bg-surface-primary text-text-heading"
              value={formData.targetValue}
              onChange={(e) => setFormData({ ...formData, targetValue: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-muted mb-1">Unit</label>
            <input
              type="text"
              placeholder="%, km, books..."
              className="w-full p-3 rounded-xl border border-border-default focus:border-interactive-primary outline-none bg-surface-primary text-text-heading"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            />
          </div>
        </div>
      )}

      {defaultType === "event" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-text-muted mb-1">Date</label>
            <input
              type="date"
              className="w-full p-3 rounded-xl border border-border-default focus:border-interactive-primary outline-none bg-surface-primary text-text-heading"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text-muted mb-1">Start Time</label>
              <input
                type="time"
                className="w-full p-3 rounded-xl border border-border-default focus:border-interactive-primary outline-none bg-surface-primary text-text-heading"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-muted mb-1">End Time</label>
              <input
                type="time"
                className="w-full p-3 rounded-xl border border-border-default focus:border-interactive-primary outline-none bg-surface-primary text-text-heading"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !formData.title.trim()}
        className="w-full bg-interactive-primary text-white font-bold py-3.5 rounded-xl hover:bg-interactive-primary/90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
      >
        {loading ? "Saving..." : `Create ${LABELS[defaultType]}`}
      </button>
    </form>
  );
};

export default TaskForm;
