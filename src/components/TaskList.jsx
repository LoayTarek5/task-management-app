import { useSelector, useDispatch } from "react-redux";
import TaskItem from "./TaskItem.jsx";
import {
  selectSortedTasks,
  selectTotalTasksCount,
  selectCompletedTasksCount,
  selectFilteredTasksCount,
  selectHasActiveFiters,
  selectHasTasks,
} from "../store/selectors.js";
import { resetFilters } from "../store/slices/tasksSlice.js";

const TaskList = () => {
  const dispatch = useDispatch();

  const tasks = useSelector(selectSortedTasks);
  const totalCount = useSelector(selectTotalTasksCount);
  const completedCount = useSelector(selectCompletedTasksCount);
  const filteredCount = useSelector(selectFilteredTasksCount);
  const hasActiveFilters = useSelector(selectHasActiveFiters);
  const hasTasks = useSelector(selectHasTasks);

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  // No tasks at all
  if (!hasTasks) {
    return (
      <div className="card text-center py-16">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No tasks yet
        </h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          Add your first task above to get started with organizing your day!
        </p>
      </div>
    );
  }

  // Has tasks but no matches for current filters
  if (tasks.length === 0 && hasActiveFilters) {
    return (
      <div className="card text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No matching tasks
        </h3>
        <p className="text-gray-500 mb-4">
          Try adjusting your filters or search query
        </p>
        <button onClick={handleResetFilters} className="btn-secondary">
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Task Summary Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-1 text-sm text-gray-500">
        <div className="flex items-center gap-3">
          <span>
            {hasActiveFilters ? (
              <>
                Showing{" "}
                <span className="font-medium text-gray-700">
                  {filteredCount}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-700">{totalCount}</span>{" "}
                tasks
              </>
            ) : (
              <>
                <span className="font-medium text-gray-700">{totalCount}</span>{" "}
                total tasks
              </>
            )}
          </span>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            {completedCount} completed
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            {totalCount - completedCount} remaining
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      {totalCount > 0 && (
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500 ease-out"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      )}

      {/* Task Items */}
      <div className="space-y-3 mt-4">
        {tasks.map((task, index) => (
          <TaskItem key={task.id} task={task} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
