import { createSlice } from '@reduxjs/toolkit';
import {
    registerUser,
    loginUser,
    saveCurrentUser,
    getCurrentUser,
    clearCurrentUser,
} from '../../utils/authStorage.js';

const initialState = {
    user: getCurrentUser(),
    isAuthenticated: !!getCurrentUser(),
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Set loading state
        setLoading: (state, action) => {
            state.isLoading = action.payload;
            state.error = null;
        },

        // Set error
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },

        // Clear error
        clearError: (state) => {
            state.error = null;
        },

        // Login success
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
            saveCurrentUser(action.payload);
        },

        // Logout
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
            clearCurrentUser();
        },

        // Update user profile
        updateProfile: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            saveCurrentUser(state.user);
        },
    },
});

export const {
    setLoading,
    setError,
    clearError,
    loginSuccess,
    logout,
    updateProfile,
} = authSlice.actions;

// Thunk actions
export const register = (username, email, password) => (dispatch) => {
    dispatch(setLoading(true));

    const result = registerUser(username, email, password);

    if (result.success) {
        dispatch(loginSuccess(result.user));
        return { success: true };
    } else {
        dispatch(setError(result.error));
        return { success: false, error: result.error };
    }
};

export const login = (username, password) => (dispatch) => {
    dispatch(setLoading(true));

    const result = loginUser(username, password);

    if (result.success) {
        dispatch(loginSuccess(result.user));
        return { success: true };
    } else {
        dispatch(setError(result.error));
        return { success: false, error: result.error };
    }
};

export default authSlice.reducer;