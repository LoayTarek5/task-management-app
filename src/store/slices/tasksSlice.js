import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    filters: {
        status: 'all', // all, completed, incomplete
        category: 'all', // all, personal, work, groceries, health
        priority: 'all', // all, high, medium, low
    },
    searchTerm: '',
    sortBy: 'created',
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // Load tasks for user
        loadUserTasks: (state, action) => {
            const savedState = action.payload;
            if (savedState) {
                state.tasks = savedState.tasks || [];
                state.filters = savedState.filters || initialState.filters;
                state.searchTerm = savedState.searchTerm || '';
                state.sortBy = savedState.sortBy || 'created';
            }
        },

        // Reset tasks (on logout)
        resetTasks: () => initialState,
        // Add New Task
        addTask: (state, action) => {
            const newTask = {
                id: Date.now().toString(),
                title: action.payload.title,
                description: action.payload.description,
                category: action.payload.category || 'personal',
                priority: action.payload.priority || 'medium',
                completed: false,
                dueDate: action.payload.dueDate || null,
                createdAt: new Date().toISOString(),
            };
            state.tasks.unshift(newTask); // Add to beginning
        },
        // Remove Task
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        // Toggle Task completion
        toggleTask: (state, action) => {
            const task = state.tasks.find((task) => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
        // Update a task
        updateTask: (state, action) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = { ...state.tasks[index], ...action.payload.updates };
            }
        },

        // Reorder tasks (for drag and drop)
        reorderTasks: (state, action) => {
            state.tasks = action.payload;
        },

        // Set status filter
        setStatusFilter: (state, action) => {
            state.filters.status = action.payload;
        },

        // Set category filter
        setCategoryFilter: (state, action) => {
            state.filters.category = action.payload;
        },

        // Set priority filter
        setPriorityFilter: (state, action) => {
            state.filters.priority = action.payload;
        },

        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        // Set search term
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },

        // Clear all filters
        clearFilters: (state) => {
            state.filters = initialState.filters;
            state.searchTerm = '';
        },
        // Clear completed tasks
        clearCompletedTasks: (state) => {
            state.tasks = state.tasks.filter((task) => !task.completed);
        },

        // Reset all filters
        resetFilters: (state) => {
            state.filters.category = 'all';
            state.filters.priority = 'all';
            state.filters.status = 'all';
            state.searchTerm = '';
            state.sortBy = 'created';
        },
    }
});

export const {
    loadUserTasks,
    resetTasks,
    addTask,
    removeTask,
    toggleTask,
    updateTask,
    reorderTasks,
    setStatusFilter,
    setCategoryFilter,
    setPriorityFilter,
    setSearchTerm,
    setSortBy,
    clearFilters,
    clearCompletedTasks,
    resetFilters,
} = tasksSlice.actions;

export default tasksSlice.reducer;