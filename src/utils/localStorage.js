const getStorageKey = (userId) => `task-manager-tasks-${userId}`;

/**
 * Load state from localStorage for specific user
 */
export const loadState = (userId) => {
  if (!userId) return undefined;
  
  try {
    const key = getStorageKey(userId);
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return undefined;
  }
};

/**
 * Save state to localStorage for specific user
 */
export const saveState = (userId, state) => {
  if (!userId) return;
  
  try {
    const key = getStorageKey(userId);
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
};

/**
 * Clear state from localStorage for specific user
 */
export const clearState = (userId) => {
  if (!userId) return;
  
  try {
    const key = getStorageKey(userId);
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing state from localStorage:', error);
  }
};