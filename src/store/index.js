import { configureStore } from '@reduxjs/toolkit';
import tasksReducer, { loadUserTasks, resetTasks } from './slices/tasksSlice.js';
import authReducer from './slices/authSlice.js';
import { loadState, saveState } from '../utils/localStorage.js';
import { getCurrentUser } from '../utils/authStorage.js';

// Get current user
const currentUser = getCurrentUser();

// Load user-specific tasks if logged in
const preloadedTasksState = currentUser ? loadState(currentUser.id) : undefined;


export const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: tasksReducer,
    },
    preloadedState: {
        tasks: preloadedTasksState || {
            tasks: [],
            filters: { status: 'all', category: 'all', priority: 'all' },
            searchTerm: '',
            sortBy: 'created',
        },
    },
});

// Debounce function
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

// Save to localStorage with debounce
const debouncedSave = debounce((userId, tasksState) => {
    if (userId) {
        saveState(userId, tasksState);
    }
}, 1000);

// Subscribe to store changes
store.subscribe(() => {
    const state = store.getState();
    const userId = state.auth.user?.id;

    if (userId) {
        debouncedSave(userId, state.tasks);
    }
});

// Helper function to load user tasks
export const loadUserTasksFromStorage = (userId) => {
    const savedState = loadState(userId);
    store.dispatch(loadUserTasks(savedState));
};

// Helper function to reset tasks on logout
export const resetTasksOnLogout = () => {
    store.dispatch(resetTasks());
};