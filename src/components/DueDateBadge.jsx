const DueDateBadge = ({ dueDate, completed = false }) => {
  if (!dueDate || completed) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Overdue
  if (due < today) {
    const daysOverdue = Math.abs(diffDays);
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold 
                       bg-red-100 text-red-700 rounded-full animate-pulse">
        <span>🚨</span>
        <span>Overdue by {daysOverdue} {daysOverdue === 1 ? 'day' : 'days'}</span>
      </span>
    );
  }

  // Due today
  if (due.getTime() === today.getTime()) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold 
                       bg-orange-100 text-orange-700 rounded-full">
        <span>⏰</span>
        <span>Due Today</span>
      </span>
    );
  }

  // Due tomorrow
  if (due.getTime() === tomorrow.getTime()) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium 
                       bg-yellow-100 text-yellow-700 rounded-full">
        <span>📅</span>
        <span>Tomorrow</span>
      </span>
    );
  }

  // Due this week (within 7 days)
  if (diffDays <= 7) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium 
                       bg-blue-100 text-blue-700 rounded-full">
        <span>📅</span>
        <span>In {diffDays} days</span>
      </span>
    );
  }

  // Due later
  const formattedDate = due.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: due.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
  });

  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs 
                     bg-gray-100 text-gray-600 rounded-full">
      <span>📅</span>
      <span>{formattedDate}</span>
    </span>
  );
};

export default DueDateBadge;