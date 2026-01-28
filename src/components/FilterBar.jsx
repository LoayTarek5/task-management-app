import { useSelector, useDispatch } from "react-redux";
import {
  setStatusFilter,
  setCategoryFilter,
  setPriorityFilter,
  resetFilters,
} from "../store/slices/tasksSlice.js";
import {
  selectStatusFilter,
  selectCategoryFilter,
  selectPriorityFilter,
  selectHasActiveFiters,
  selectTotalTasksCount,
  selectCompletedTasksCount,
  selectIncompleteTasksCount,
} from "../store/selectors.js";

const STATUS_OPTIONS = [
  { value: "all", label: "All", emoji: "📋" },
  { value: "incomplete", label: "Active", emoji: "⏳" },
  { value: "completed", label: "Completed", emoji: "✅" },
];

const CATEGORY_OPTIONS = [
  { value: "all", label: "All Categories", emoji: "📁" },
  { value: "personal", label: "Personal", emoji: "👤" },
  { value: "work", label: "Work", emoji: "💼" },
  { value: "groceries", label: "Groceries", emoji: "🛒" },
  { value: "health", label: "Health", emoji: "❤️" },
];

const PRIORITY_OPTIONS = [
  { value: "all", label: "All Priorities", emoji: "🎯" },
  { value: "high", label: "High", emoji: "🔴" },
  { value: "medium", label: "Medium", emoji: "🟡" },
  { value: "low", label: "Low", emoji: "🟢" },
];

const FilterBar = () => {
  const dispatch = useDispatch();

  const statusFilter = useSelector(selectStatusFilter);
  const categoryFilter = useSelector(selectCategoryFilter);
  const priorityFilter = useSelector(selectPriorityFilter);
  const hasActiveFilters = useSelector(selectHasActiveFiters);

  const totalCount = useSelector(selectTotalTasksCount);
  const completedCount = useSelector(selectCompletedTasksCount);
  const incompleteCount = useSelector(selectIncompleteTasksCount);

  const handleStatusChange = (status) => {
    dispatch(setStatusFilter(status));
  };

  const handleCategoryChange = (e) => {
    dispatch(setCategoryFilter(e.target.value));
  };

  const handlePriorityChange = (e) => {
    dispatch(setPriorityFilter(e.target.value));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  // Get count for status buttons
  const getStatusCount = (status) => {
    switch (status) {
      case "all":
        return totalCount;
      case "completed":
        return completedCount;
      case "incomplete":
        return incompleteCount;
      default:
        return 0;
    }
  };

  return (
    <div className="card mb-4">
      <div className="space-y-4">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleStatusChange(option.value)}
              className={
                statusFilter === option.value
                  ? "filter-btn-active"
                  : "filter-btn"
              }
            >
              <span className="mr-1">{option.emoji}</span>
              {option.label}
              <span className="ml-1.5 px-1.5 py-0.5 text-xs rounded-full bg-black/10">
                {getStatusCount(option.value)}
              </span>
            </button>
          ))}
        </div>

        {/* Category & Priority Dropdowns */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Category Filter */}
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={handleCategoryChange}
              className="select text-sm"
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.emoji} {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Priority
            </label>
            <select
              value={priorityFilter}
              onChange={handlePriorityChange}
              className="select text-sm"
            >
              {PRIORITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.emoji} {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Button */}
          {hasActiveFilters && (
            <div className="flex items-end">
              <button
                onClick={handleResetFilters}
                className="btn-secondary text-sm whitespace-nowrap"
              >
                ✕ Reset
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
