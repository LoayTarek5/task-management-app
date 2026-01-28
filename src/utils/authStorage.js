const USERS_KEY = 'task-manager-users';
const CURRENT_USER_KEY = 'task-manager-current-user';

/**
 * Simple hash function for passwords (NOT secure for production!)
 * In production, use bcrypt on a backend server
 */
const simpleHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return hash.toString(16);
};

/**
 * Get all registered users
 */
export const getUsers = () => {
    try {
        const users = localStorage.getItem(USERS_KEY);
        return users ? JSON.parse(users) : {};
    } catch (error) {
        console.error('Error loading users:', error);
        return {};
    }
};

/**
 * Save users to localStorage
 */
const saveUsers = (users) => {
    try {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (error) {
        console.error('Error saving users:', error);
    }
};

/**
 * Register a new user
 */
export const registerUser = (username, email, password) => {
    const users = getUsers();

    // Check if username already exists
    if (users[username]) {
        return { success: false, error: 'Username already exists' };
    }

    // Check if email already exists
    const emailExists = Object.values(users).some(user => user.email === email);
    if (emailExists) {
        return { success: false, error: 'Email already registered' };
    }

    // Create new user
    const newUser = {
        id: Date.now().toString(),
        username,
        email,
        passwordHash: simpleHash(password),
        createdAt: new Date().toISOString(),
    };

    users[username] = newUser;
    saveUsers(users);

    // Return user without password hash
    const { passwordHash, ...safeUser } = newUser;
    return { success: true, user: safeUser };
};

/**
 * Login user
 */
export const loginUser = (username, password) => {
    const users = getUsers();
    const user = users[username];

    if (!user) {
        return { success: false, error: 'User not found' };
    }

    if (user.passwordHash !== simpleHash(password)) {
        return { success: false, error: 'Invalid password' };
    }

    // Return user without password hash
    const { passwordHash, ...safeUser } = user;
    return { success: true, user: safeUser };
};

/**
 * Save current user session
 */
export const saveCurrentUser = (user) => {
    try {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } catch (error) {
        console.error('Error saving current user:', error);
    }
};

/**
 * Get current user session
 */
export const getCurrentUser = () => {
    try {
        const user = localStorage.getItem(CURRENT_USER_KEY);
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error('Error loading current user:', error);
        return null;
    }
};

/**
 * Clear current user session
 */
export const clearCurrentUser = () => {
    try {
        localStorage.removeItem(CURRENT_USER_KEY);
    } catch (error) {
        console.error('Error clearing current user:', error);
    }
};

/**
 * Update user profile
 */
export const updateUserProfile = (username, updates) => {
    const users = getUsers();

    if (!users[username]) {
        return { success: false, error: 'User not found' };
    }

    users[username] = { ...users[username], ...updates };
    saveUsers(users);

    const { passwordHash, ...safeUser } = users[username];
    return { success: true, user: safeUser };
};

/**
 * Change user password
 */
export const changePassword = (username, currentPassword, newPassword) => {
    const users = getUsers();
    const user = users[username];

    if (!user) {
        return { success: false, error: 'User not found' };
    }

    if (user.passwordHash !== simpleHash(currentPassword)) {
        return { success: false, error: 'Current password is incorrect' };
    }

    users[username].passwordHash = simpleHash(newPassword);
    saveUsers(users);

    return { success: true };
};