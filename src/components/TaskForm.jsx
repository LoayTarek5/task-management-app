import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/slices/tasksSlice.js';

const CATEGORIES = [
  { value: 'personal', label: 'Personal', emoji: '👤' },
  { value: 'work', label: 'Work', emoji: '💼' },
  { value: 'groceries', label: 'Groceries', emoji: '🛒' },
  { value: 'health', label: 'Health', emoji: '❤️' },
];

const PRIORITIES = [
  { value: 'high', label: 'High', emoji: '🔴' },
  { value: 'medium', label: 'Medium', emoji: '🟡' },
  { value: 'low', label: 'Low', emoji: '🟢' },
];

const initialFormState = {
  title: '',
  description: '',
  category: 'personal',
  priority: 'medium',
  dueDate: '',
};

const TaskForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormState);
  const [isExpanded, setIsExpanded] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(
      addTask({
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        priority: formData.priority,
        dueDate: formData.dueDate || null,
      })
    );

    // Reset form
    setFormData(initialFormState);
    setIsExpanded(false);
    setErrors({});
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setIsExpanded(false);
    setErrors({});
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <form onSubmit={handleSubmit} className="card mb-6">
      {/* Main Input Row */}
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onFocus={() => setIsExpanded(true)}
            placeholder="✏️ Add a new task..."
            className={`input ${errors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
            autoComplete="off"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>
        <button
          type="submit"
          className="btn-primary whitespace-nowrap"
        >
          Add Task
        </button>
      </div>

      {/* Expanded Options */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 animate-[fade-in_0.3s_ease-in-out]">
          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              📝 Description (optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add more details..."
              className="input resize-none"
              rows={2}
            />
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                📁 Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="select"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.emoji} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                🚨 Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="select"
              >
                {PRIORITIES.map((pri) => (
                  <option key={pri.value} value={pri.value}>
                    {pri.emoji} {pri.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                📅 Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="input"
                min={getTodayDate()}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleCancel}
              className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              ✕ Cancel
            </button>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>Press</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-600">Enter</kbd>
              <span>to add task</span>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default TaskForm;