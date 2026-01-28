import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DndProvider from './components/DndProvider.jsx';
import AuthForm from './components/auth/AuthForm.jsx';
import UserMenu from './components/auth/UserMenu.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import SearchBar from './components/SearchBar.jsx';
import FilterBar from './components/FilterBar.jsx';
import SortSelect from './components/SortSelect.jsx';
import NotificationBanner from './components/NotificationBanner.jsx';
import NotificationManager from './components/NotificationManager.jsx';
import UrgentTasksAlert from './components/UrgentTasksAlert.jsx';
import {
  selectIsAuthenticated,
  selectCurrentUser,
  selectHasTasks,
  selectHasCompletedTasks,
  selectCompletedTasksCount,
  selectUrgentTasksCount,
} from './store/selectors.js';
import { clearCompletedTasks } from './store/slices/tasksSlice.js';
import { loadUserTasksFromStorage } from './store/index.js';

const App = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);
  const hasTasks = useSelector(selectHasTasks);
  const hasCompletedTasks = useSelector(selectHasCompletedTasks);
  const completedCount = useSelector(selectCompletedTasksCount);
  const urgentCount = useSelector(selectUrgentTasksCount);

  // Load user tasks when authenticated
  useEffect(() => {
    if (isAuthenticated && currentUser?.id) {
      loadUserTasksFromStorage(currentUser.id);
    }
  }, [isAuthenticated, currentUser?.id]);

  const handleClearCompleted = () => {
    if (window.confirm(`Delete ${completedCount} completed task(s)?`)) {
      dispatch(clearCompletedTasks());
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <AuthForm />;
  }

  return (
    <DndProvider>
      {/* Background Notification Manager */}
      <NotificationManager />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="hidden sm:inline">Task Manager</span>
                </h1>

                {/* Urgent Badge */}
                {urgentCount > 0 && (
                  <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full animate-pulse">
                    {urgentCount} urgent
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                {hasTasks && hasCompletedTasks && (
                  <button
                    onClick={handleClearCompleted}
                    className="text-sm text-gray-500 hover:text-red-600 
                               transition-colors cursor-pointer hidden sm:block"
                  >
                    Clear completed ({completedCount})
                  </button>
                )}

                {/* User Menu */}
                <UserMenu />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* Welcome Message */}
          <div className="mb-6 text-center sm:text-left">
            <h2 className="text-xl text-gray-700">
              Welcome back, <span className="font-semibold">{currentUser?.username}</span>! 👋
            </h2>
          </div>

          {/* Notification Permission Banner */}
          <NotificationBanner />

          {/* Urgent Tasks Alert */}
          {hasTasks && <UrgentTasksAlert />}

          {/* Task Form */}
          <TaskForm />

          {/* Search & Filters Section */}
          {hasTasks && (
            <div className="space-y-4 mb-6">
              {/* Search Bar */}
              <SearchBar />

              {/* Filter Bar */}
              <FilterBar />

              {/* Sort Select */}
              <div className="flex justify-end">
                <SortSelect />
              </div>
            </div>
          )}

          {/* Task List */}
          <TaskList />
        </main>

        {/* Footer */}
        <footer className="text-center py-6 text-gray-500 text-sm">
          Built with React, Redux & Tailwind CSS v4
        </footer>
      </div>
    </DndProvider>
  );
};

export default App;
