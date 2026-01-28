import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  toggleTask,
  removeTask,
  updateTask,
} from "../store/slices/tasksSlice.js";
import DueDateBadge from "./DueDateBadge.jsx";

const PRIORITY_CONFIG = {
  high: {
    border: "border-red-500",
    badge: "badge-high",
    label: "High",
  },
  medium: {
    border: "border-yellow-500",
    badge: "badge-medium",
    label: "Medium",
  },
  low: {
    border: "border-green-500",
    badge: "badge-low",
    label: "Low",
  },
};

const CATEGORY_CONFIG = {
  personal: { badge: "badge-personal", label: "Personal", emoji: "👤" },
  work: { badge: "badge-work", label: "Work", emoji: "💼" },
  groceries: { badge: "badge-groceries", label: "Groceries", emoji: "🛒" },
  health: { badge: "badge-health", label: "Health", emoji: "❤️" },
};

const TaskItem = ({ task, index, isDragging = false }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || "",
  });
  const [showDetails, setShowDetails] = useState(false);
  const editInputRef = useRef(null);

  const priority = PRIORITY_CONFIG[task.priority];
  const category = CATEGORY_CONFIG[task.category];

  // Check if task is overdue
  const isOverdue = () => {
    if (!task.dueDate || task.completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleToggle = () => {
    dispatch(toggleTask(task.id));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(removeTask(task.id));
    }
  };

  const handleEditStart = () => {
    setEditData({
      title: task.title,
      description: task.description || "",
    });
    setIsEditing(true);
  };

  const handleEditSave = () => {
    if (editData.title.trim()) {
      dispatch(
        updateTask({
          id: task.id,
          updates: {
            title: editData.title.trim(),
            description: editData.description.trim(),
          },
        }),
      );
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditData({
      title: task.title,
      description: task.description || "",
    });
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEditSave();
    }
    if (e.key === "Escape") {
      handleEditCancel();
    }
  };

  const formatCreatedAt = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const overdue = isOverdue();

  return (
    <div
      className={`task-card ${priority.border} 
        ${task.completed ? "opacity-60 bg-gray-50" : ""} 
        ${isDragging ? "shadow-2xl ring-2 ring-blue-500" : ""}
        ${overdue ? "ring-2 ring-red-300 bg-red-50/50" : ""}`}
    >
      <div className="flex items-start gap-3">
        {/* Drag Handle */}
        <div
          className="pt-1 cursor-grab active:cursor-grabbing text-gray-400 
                     hover:text-gray-600 select-none"
          title="Drag to reorder"
        >
          <span className="text-lg">⋮⋮</span>
        </div>

        {/* Checkbox */}
        <div className="pt-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 
                       focus:ring-blue-500 cursor-pointer"
            aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
          />
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <input
                ref={editInputRef}
                type="text"
                value={editData.title}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, title: e.target.value }))
                }
                onKeyDown={handleKeyDown}
                className="input py-1"
                placeholder="Task title..."
              />
              <textarea
                value={editData.description}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                onKeyDown={handleKeyDown}
                className="input py-1 resize-none text-sm"
                placeholder="Description (optional)..."
                rows={2}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleEditSave}
                  className="btn-primary text-sm py-1"
                >
                  Save
                </button>
                <button
                  onClick={handleEditCancel}
                  className="btn-secondary text-sm py-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Title */}
              <p
                className={`text-gray-800 font-medium ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.title}
              </p>

              {/* Description */}
              {task.description && (
                <p
                  className={`text-sm mt-1 ${
                    task.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-600"
                  } ${!showDetails && task.description.length > 100 ? "line-clamp-2" : ""}`}
                >
                  {task.description}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className={priority.badge}>{priority.label}</span>
                <span className={category.badge}>
                  {category.emoji} {category.label}
                </span>
                <DueDateBadge
                  dueDate={task.dueDate}
                  completed={task.completed}
                />
              </div>

              {/* Expandable Details */}
              {showDetails && (
                <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400 animate-[fade-in_0.2s_ease-in-out]">
                  <p>Created: {formatCreatedAt(task.createdAt)}</p>
                  {task.dueDate && (
                    <p>
                      Due:{" "}
                      {new Date(task.dueDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  )}
                  <p>ID: {task.id}</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Action Buttons */}
        {!isEditing && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="btn-icon text-gray-400 hover:text-gray-600"
              title={showDetails ? "Hide details" : "Show details"}
            >
              {showDetails ? "🔼" : "🔽"}
            </button>
            <button
              onClick={handleEditStart}
              className="btn-icon text-gray-400 hover:text-blue-600"
              title="Edit task"
              disabled={task.completed}
            >
              ✏️
            </button>
            <button
              onClick={handleDelete}
              className="btn-icon text-gray-400 hover:text-red-600"
              title="Delete task"
            >
              🗑️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
