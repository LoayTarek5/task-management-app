import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectOverdueTasks,
  selectTasksDueToday,
  selectTasksDueTomorrow,
} from '../store/selectors.js';

const UrgentTasksAlert = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const overdueTasks = useSelector(selectOverdueTasks);
  const tasksDueToday = useSelector(selectTasksDueToday);
  const tasksDueTomorrow = useSelector(selectTasksDueTomorrow);

  const hasOverdue = overdueTasks.length > 0;
  const hasDueToday = tasksDueToday.length > 0;
  const hasDueTomorrow = tasksDueTomorrow.length > 0;
  const hasUrgent = hasOverdue || hasDueToday;

  if (!hasUrgent && !hasDueTomorrow) return null;

  return (
    <div 
      className={`mb-4 rounded-xl overflow-hidden transition-all duration-300 ${
        hasOverdue 
          ? 'bg-red-50 border border-red-200' 
          : hasDueToday 
            ? 'bg-orange-50 border border-orange-200'
            : 'bg-yellow-50 border border-yellow-200'
      }`}
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between cursor-pointer
                   hover:bg-black/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">
            {hasOverdue ? '🚨' : hasDueToday ? '⏰' : '📅'}
          </span>
          <div className="text-left">
            <p className={`font-semibold ${
              hasOverdue ? 'text-red-800' : hasDueToday ? 'text-orange-800' : 'text-yellow-800'
            }`}>
              {hasOverdue && `${overdueTasks.length} overdue`}
              {hasOverdue && hasDueToday && ' • '}
              {hasDueToday && `${tasksDueToday.length} due today`}
              {!hasOverdue && !hasDueToday && hasDueTomorrow && `${tasksDueTomorrow.length} due tomorrow`}
            </p>
            <p className={`text-xs ${
              hasOverdue ? 'text-red-600' : hasDueToday ? 'text-orange-600' : 'text-yellow-600'
            }`}>
              Click to {isExpanded ? 'hide' : 'view'} details
            </p>
          </div>
        </div>
        <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 animate-[fade-in_0.2s_ease-in-out]">
          {/* Overdue Tasks */}
          {hasOverdue && (
            <div>
              <h4 className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-2">
                🚨 Overdue
              </h4>
              <ul className="space-y-1">
                {overdueTasks.map((task) => (
                  <li 
                    key={task.id}
                    className="text-sm text-red-800 bg-red-100 px-3 py-2 rounded-lg"
                  >
                    <span className="font-medium">{task.title}</span>
                    <span className="text-red-600 text-xs ml-2">
                      ({new Date(task.dueDate).toLocaleDateString()})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Due Today */}
          {hasDueToday && (
            <div>
              <h4 className="text-xs font-semibold text-orange-700 uppercase tracking-wide mb-2">
                ⏰ Due Today
              </h4>
              <ul className="space-y-1">
                {tasksDueToday.map((task) => (
                  <li 
                    key={task.id}
                    className="text-sm text-orange-800 bg-orange-100 px-3 py-2 rounded-lg"
                  >
                    {task.title}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Due Tomorrow */}
          {hasDueTomorrow && (
            <div>
              <h4 className="text-xs font-semibold text-yellow-700 uppercase tracking-wide mb-2">
                📅 Due Tomorrow
              </h4>
              <ul className="space-y-1">
                {tasksDueTomorrow.map((task) => (
                  <li 
                    key={task.id}
                    className="text-sm text-yellow-800 bg-yellow-100 px-3 py-2 rounded-lg"
                  >
                    {task.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UrgentTasksAlert;