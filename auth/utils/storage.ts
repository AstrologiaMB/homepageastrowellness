/**
 * Storage Utilities
 *
 * Generic utilities for storing and retrieving data from localStorage
 * with expiration support.
 */

const isBrowser = typeof window !== 'undefined';

export interface StorageOptions {
  expiryDays?: number;
}

const DEFAULT_EXPIRY_DAYS = 30;

/**
 * Save data to localStorage with optional expiration
 */
export function saveToStorage<T>(
  key: string,
  data: T,
  options: StorageOptions = {}
): void {
  if (!isBrowser) return;

  const { expiryDays = DEFAULT_EXPIRY_DAYS } = options;
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + expiryDays);

  try {
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(`${key}_expiry`, expiryDate.toISOString());
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
  }
}

/**
 * Load data from localStorage, checking expiration
 */
export function loadFromStorage<T>(key: string): T | null {
  if (!isBrowser) return null;

  try {
    const storedData = localStorage.getItem(key);
    const expiryDate = localStorage.getItem(`${key}_expiry`);

    if (!storedData) {
      return null;
    }

    // Check expiration if expiry key exists
    if (expiryDate) {
      const now = new Date();
      const expiry = new Date(expiryDate);

      if (now > expiry) {
        clearFromStorage(key);
        return null;
      }
    }

    return JSON.parse(storedData) as T;
  } catch (error) {
    console.error(`Error loading ${key} from storage:`, error);
    return null;
  }
}

/**
 * Remove data from localStorage
 */
export function clearFromStorage(key: string): void {
  if (!isBrowser) return;

  try {
    localStorage.removeItem(key);
    localStorage.removeItem(`${key}_expiry`);
  } catch (error) {
    console.error(`Error clearing ${key} from storage:`, error);
  }
}

/**
 * Check if data exists in localStorage and is not expired
 */
export function hasValidStorageData(key: string): boolean {
  if (!isBrowser) return false;

  const storedData = localStorage.getItem(key);
  const expiryDate = localStorage.getItem(`${key}_expiry`);

  if (!storedData) {
    return false;
  }

  if (expiryDate) {
    const now = new Date();
    const expiry = new Date(expiryDate);
    return now <= expiry;
  }

  return true;
}

/**
 * Simple key-value storage (no expiration)
 */
export const simpleStorage = {
  get: (key: string): string | null => {
    if (!isBrowser) return null;
    return localStorage.getItem(key);
  },

  set: (key: string, value: string): void => {
    if (!isBrowser) return;
    localStorage.setItem(key, value);
  },

  remove: (key: string): void => {
    if (!isBrowser) return;
    localStorage.removeItem(key);
  },

  has: (key: string): boolean => {
    if (!isBrowser) return false;
    return localStorage.getItem(key) !== null;
  },
};
