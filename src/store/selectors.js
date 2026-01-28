import { createSelector } from '@reduxjs/toolkit';


// ============================================
// AUTH SELECTORS
// ============================================

export const selectAuthState = (state) => state.auth;

export const selectCurrentUser = (state) => state.auth.user;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const selectAuthLoading = (state) => state.auth.isLoading;

export const selectAuthError = (state) => state.auth.error;

// ============================================
// BASE SELECTORS
// ============================================

export const selectTasksState = (state) => state.tasks;
export const selectAllTasks = (state) => state.tasks?.tasks || [];
export const selectFilters = (state) => state.tasks.filters;
export const selectStatusFilter = (state) => state.tasks.filters.status;
export const selectCategoryFilter = (state) => state.tasks.filters.category;
export const selectPriorityFilter = (state) => state.tasks.filters.priority;
export const selectSearchTerm = (state) => state.tasks.searchTerm;
export const selectSortBy = (state) => state.tasks.sortBy;

// ============================================
// COUNT SELECTORS
// ============================================

export const selectTotalTasksCount = createSelector(
    [selectAllTasks],
    (tasks) => tasks.length
);

export const selectCompletedTasksCount = createSelector(
    [selectAllTasks],
    (tasks) => {return tasks.filter((task) => task.completed).length}
);

export const selectIncompleteTasksCount = createSelector(
    [selectAllTasks],
    (tasks) => tasks.filter((task) => !task.completed).length
);

export const selectTasksCountByCategory = createSelector(
    [selectAllTasks],
    (tasks) => {
        return tasks.reduce((acc, task) => {
            acc[task.category] = (acc[task.category] || 0) + 1;
            return acc;
        }, {});
    }
);

export const selectTasksCountByPriority = createSelector(
    [selectAllTasks],
    (tasks) => {
        return tasks.reduce((acc, task) => {
            acc[task.priority] = (acc[task.priority] || 0) + 1;
            return acc;
        }, {});
    }
);

// ============================================
// FILTERED TASKS SELECTOR
// ============================================
export const selectFilteredTasks = createSelector(
    [selectAllTasks, selectFilters, selectSearchTerm],
    (tasks, filters, searchTerm) => {
        return tasks.filter((task) => {
            if (!Array.isArray(tasks)) return [];
            // Status filter
            if (filters.status === 'completed' && !task.completed) return false;
            if (filters.status === 'incomplete' && task.completed) return false;

            // Category filter
            if (filters.category !== 'all' && task.category !== filters.category) {
                return false;
            }

            // Priority filter
            if (filters.priority !== 'all' && task.priority !== filters.priority) {
                return false;
            }

            // Search term filter
            if (searchTerm) {
                const search = searchTerm.toLowerCase().trim();
                const titleMatch = task.title.toLowerCase().includes(search);
                const descriptionMatch = task.description?.toLowerCase().includes(search) || false;
                if (!titleMatch && !descriptionMatch) return false;
            }

            return true;
        });
    }
);

// ============================================
// SORTED TASKS SELECTOR
// ============================================


export const selectSortedTasks = createSelector(
    [selectFilteredTasks, selectSortBy],
    (tasks, sortBy) => {
        const sortedTasks = [...tasks];
        const priorityOrder = { high: 0, medium: 1, low: 2 };

        // Always put completed tasks at the bottom
        sortedTasks.sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }

            switch (sortBy) {
                case 'priority':
                    return priorityOrder[a.priority] - priorityOrder[b.priority];

                case 'dueDate':
                    if (!a.dueDate && !b.dueDate) return 0;
                    if (!a.dueDate) return 1;
                    if (!b.dueDate) return -1;
                    return new Date(a.dueDate) - new Date(b.dueDate);

                case 'title':
                    return a.title.localeCompare(b.title);

                case 'created':
                default:
                    return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });

        return sortedTasks;
    }
);

// ============================================
// UI HELPER SELECTORS
// ============================================

export const selectHasActiveFiters = createSelector(
    [selectFilters, selectSearchTerm],
    (filters, searchTerm) => {
        return (
            filters.status !== 'all' ||
            filters.category !== 'all' ||
            filters.priority !== 'all' ||
            searchTerm !== ''
        );
    }
);

export const selectFilteredTasksCount = createSelector(
    [selectFilteredTasks],
    (tasks) => tasks.length
);

export const selectHasTasks = createSelector(
    [selectAllTasks],
    (tasks) => tasks.length > 0
);

export const selectHasCompletedTasks = createSelector(
    [selectCompletedTasksCount],
    (count) => count > 0
);

// ============================================
// DUE DATE SELECTORS
// ============================================

export const selectOverdueTasks = createSelector(
    [selectAllTasks],
    (tasks) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return tasks.filter((task) => {
            if (!task.dueDate || task.completed) return false;
            const dueDate = new Date(task.dueDate);
            dueDate.setHours(0, 0, 0, 0);
            return dueDate < today;
        });
    }
);

export const selectTasksDueToday = createSelector(
    [selectAllTasks],
    (tasks) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return tasks.filter((task) => {
            if (!task.dueDate || task.completed) return false;
            const dueDate = new Date(task.dueDate);
            dueDate.setHours(0, 0, 0, 0);
            return dueDate.getTime() === today.getTime();
        });
    }
);

export const selectTasksDueTomorrow = createSelector(
    [selectAllTasks],
    (tasks) => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        return tasks.filter((task) => {
            if (!task.dueDate || task.completed) return false;
            const dueDate = new Date(task.dueDate);
            dueDate.setHours(0, 0, 0, 0);
            return dueDate.getTime() === tomorrow.getTime();
        });
    }
);

export const selectTasksDueThisWeek = createSelector(
    [selectAllTasks],
    (tasks) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const weekEnd = new Date(today);
        weekEnd.setDate(today.getDate() + 7);

        return tasks.filter((task) => {
            if (!task.dueDate || task.completed) return false;
            const dueDate = new Date(task.dueDate);
            dueDate.setHours(0, 0, 0, 0);
            return dueDate >= today && dueDate <= weekEnd;
        });
    }
);

export const selectUrgentTasksCount = createSelector(
    [selectOverdueTasks, selectTasksDueToday],
    (overdue, dueToday) => overdue.length + dueToday.length
);

// ============================================
// TASK BY ID SELECTOR
// ============================================

export const selectTaskById = (taskId) =>
    createSelector([selectAllTasks], (tasks) =>
        tasks.find((task) => task.id === taskId)
    );

// ============================================
// STATISTICS SELECTOR
// ============================================

export const selectTasksStatistics = createSelector(
    [
        selectTotalTasksCount,
        selectCompletedTasksCount,
        selectIncompleteTasksCount,
        selectTasksCountByCategory,
        selectTasksCountByPriority,
        selectOverdueTasks,
        selectTasksDueToday,
    ],
    (
        total,
        completed,
        incomplete,
        byCategory,
        byPriority,
        overdue,
        dueToday
    ) => ({
        total,
        completed,
        incomplete,
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
        byCategory,
        byPriority,
        overdueCount: overdue.length,
        dueTodayCount: dueToday.length,
    })
);