/**
 * Storage Utilities
 * 
 * Utility functions for client-side storage operations.
 * 
 * @module lib/utils/storage.utils
 */

/**
 * Get item from localStorage
 * 
 * @param key - Storage key
 * @returns Stored value or null
 */
export function getLocalStorage<T = any>(key: string): T | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    return JSON.parse(item) as T;
  } catch {
    return null;
  }
}

/**
 * Set item in localStorage
 * 
 * @param key - Storage key
 * @param value - Value to store
 * @returns True if successful
 */
export function setLocalStorage<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Remove item from localStorage
 * 
 * @param key - Storage key
 * @returns True if successful
 */
export function removeLocalStorage(key: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

/**
 * Clear all items from localStorage
 * 
 * @returns True if successful
 */
export function clearLocalStorage(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    window.localStorage.clear();
    return true;
  } catch {
    return false;
  }
}

/**
 * Get item from sessionStorage
 * 
 * @param key - Storage key
 * @returns Stored value or null
 */
export function getSessionStorage<T = any>(key: string): T | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const item = window.sessionStorage.getItem(key);
    if (item === null) {
      return null;
    }
    return JSON.parse(item) as T;
  } catch {
    return null;
  }
}

/**
 * Set item in sessionStorage
 * 
 * @param key - Storage key
 * @param value - Value to store
 * @returns True if successful
 */
export function setSessionStorage<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Remove item from sessionStorage
 * 
 * @param key - Storage key
 * @returns True if successful
 */
export function removeSessionStorage(key: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    window.sessionStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

/**
 * Clear all items from sessionStorage
 * 
 * @returns True if successful
 */
export function clearSessionStorage(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    window.sessionStorage.clear();
    return true;
  } catch {
    return false;
  }
}

/**
 * Get item from cookie
 * 
 * @param key - Cookie key
 * @returns Cookie value or null
 */
export function getCookie(key: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }
  
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === key) {
      return decodeURIComponent(value);
    }
  }
  
  return null;
}

/**
 * Set cookie
 * 
 * @param key - Cookie key
 * @param value - Cookie value
 * @param options - Cookie options
 * @returns True if successful
 */
export function setCookie(
  key: string,
  value: string,
  options: {
    expires?: Date | number;
    maxAge?: number;
    domain?: string;
    path?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
  } = {}
): boolean {
  if (typeof document === 'undefined') {
    return false;
  }
  
  try {
    let cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    
    if (options.expires) {
      if (typeof options.expires === 'number') {
        const date = new Date();
        date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
        cookie += `; expires=${date.toUTCString()}`;
      } else {
        cookie += `; expires=${options.expires.toUTCString()}`;
      }
    }
    
    if (options.maxAge) {
      cookie += `; max-age=${options.maxAge}`;
    }
    
    if (options.domain) {
      cookie += `; domain=${options.domain}`;
    }
    
    if (options.path) {
      cookie += `; path=${options.path}`;
    }
    
    if (options.secure) {
      cookie += '; secure';
    }
    
    if (options.sameSite) {
      cookie += `; samesite=${options.sameSite}`;
    }
    
    document.cookie = cookie;
    return true;
  } catch {
    return false;
  }
}

/**
 * Remove cookie
 * 
 * @param key - Cookie key
 * @param options - Cookie options (domain, path)
 * @returns True if successful
 */
export function removeCookie(
  key: string,
  options: {
    domain?: string;
    path?: string;
  } = {}
): boolean {
  return setCookie(key, '', {
    ...options,
    expires: new Date(0),
  });
}

/**
 * Check if localStorage is available
 * 
 * @returns True if localStorage is available
 */
export function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if sessionStorage is available
 * 
 * @returns True if sessionStorage is available
 */
export function isSessionStorageAvailable(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    const testKey = '__storage_test__';
    window.sessionStorage.setItem(testKey, testKey);
    window.sessionStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if cookies are enabled
 * 
 * @returns True if cookies are enabled
 */
export function areCookiesEnabled(): boolean {
  if (typeof navigator === 'undefined') {
    return false;
  }
  
  return navigator.cookieEnabled;
}

/**
 * Get all items from localStorage
 * 
 * @returns Object with all localStorage items
 */
export function getAllLocalStorage(): Record<string, any> {
  if (typeof window === 'undefined') {
    return {};
  }
  
  const result: Record<string, any> = {};
  
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (key) {
      result[key] = getLocalStorage(key);
    }
  }
  
  return result;
}

/**
 * Get all items from sessionStorage
 * 
 * @returns Object with all sessionStorage items
 */
export function getAllSessionStorage(): Record<string, any> {
  if (typeof window === 'undefined') {
    return {};
  }
  
  const result: Record<string, any> = {};
  
  for (let i = 0; i < window.sessionStorage.length; i++) {
    const key = window.sessionStorage.key(i);
    if (key) {
      result[key] = getSessionStorage(key);
    }
  }
  
  return result;
}

/**
 * Get all cookies
 * 
 * @returns Object with all cookies
 */
export function getAllCookies(): Record<string, string> {
  if (typeof document === 'undefined') {
    return {};
  }
  
  const result: Record<string, string> = {};
  const cookies = document.cookie.split(';');
  
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name) {
      result[name] = value ? decodeURIComponent(value) : '';
    }
  }
  
  return result;
}

/**
 * Remove all cookies
 * 
 * @param options - Cookie options (domain, path)
 */
export function clearCookies(options: {
  domain?: string;
  path?: string;
} = {}): void {
  const cookies = getAllCookies();
  for (const key in cookies) {
    removeCookie(key, options);
  }
}

/**
 * Get localStorage size in bytes
 * 
 * @returns Size in bytes
 */
export function getLocalStorageSize(): number {
  if (typeof window === 'undefined') {
    return 0;
  }
  
  let size = 0;
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (key) {
      const value = window.localStorage.getItem(key);
      if (value) {
        size += key.length + value.length;
      }
    }
  }
  
  return size;
}

/**
 * Get sessionStorage size in bytes
 * 
 * @returns Size in bytes
 */
export function getSessionStorageSize(): number {
  if (typeof window === 'undefined') {
    return 0;
  }
  
  let size = 0;
  for (let i = 0; i < window.sessionStorage.length; i++) {
    const key = window.sessionStorage.key(i);
    if (key) {
      const value = window.sessionStorage.getItem(key);
      if (value) {
        size += key.length + value.length;
      }
    }
  }
  
  return size;
}

/**
 * Get all keys from localStorage
 * 
 * @returns Array of keys
 */
export function getLocalStorageKeys(): string[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const keys: string[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (key) {
      keys.push(key);
    }
  }
  
  return keys;
}

/**
 * Get all keys from sessionStorage
 * 
 * @returns Array of keys
 */
export function getSessionStorageKeys(): string[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const keys: string[] = [];
  for (let i = 0; i < window.sessionStorage.length; i++) {
    const key = window.sessionStorage.key(i);
    if (key) {
      keys.push(key);
    }
  }
  
  return keys;
}

/**
 * Check if key exists in localStorage
 * 
 * @param key - Storage key
 * @returns True if key exists
 */
export function hasLocalStorageKey(key: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  return window.localStorage.getItem(key) !== null;
}

/**
 * Check if key exists in sessionStorage
 * 
 * @param key - Storage key
 * @returns True if key exists
 */
export function hasSessionStorageKey(key: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  return window.sessionStorage.getItem(key) !== null;
}

/**
 * Get localStorage item count
 * 
 * @returns Number of items
 */
export function getLocalStorageCount(): number {
  if (typeof window === 'undefined') {
    return 0;
  }
  
  return window.localStorage.length;
}

/**
 * Get sessionStorage item count
 * 
 * @returns Number of items
 */
export function getSessionStorageCount(): number {
  if (typeof window === 'undefined') {
    return 0;
  }
  
  return window.sessionStorage.length;
}

/**
 * Watch for localStorage changes
 * 
 * @param key - Key to watch
 * @param callback - Callback function
 * @returns Cleanup function
 */
export function watchLocalStorage<T>(
  key: string,
  callback: (value: T | null, oldValue: T | null) => void
): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }
  
  let oldValue = getLocalStorage<T>(key);
  
  const handler = (event: StorageEvent) => {
    if (event.key === key) {
      const newValue = getLocalStorage<T>(key);
      callback(newValue, oldValue);
      oldValue = newValue;
    }
  };
  
  window.addEventListener('storage', handler);
  
  return () => {
    window.removeEventListener('storage', handler);
  };
}

/**
 * Watch for sessionStorage changes
 * Note: sessionStorage doesn't fire storage events across tabs
 * 
 * @param key - Key to watch
 * @param callback - Callback function
 * @returns Cleanup function
 */
export function watchSessionStorage<T>(
  key: string,
  callback: (value: T | null) => void
): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }
  
  let oldValue = getSessionStorage<T>(key);
  
  const handler = () => {
    const newValue = getSessionStorage<T>(key);
    if (newValue !== oldValue) {
      callback(newValue);
      oldValue = newValue;
    }
  };
  
  window.addEventListener('storage', handler);
  
  return () => {
    window.removeEventListener('storage', handler);
  };
}

/**
 * Storage utility class for typed operations
 */
export class Storage<T = any> {
  constructor(
    private key: string,
    private storage: 'localStorage' | 'sessionStorage' = 'localStorage'
  ) {}
  
  /**
   * Get value from storage
   */
  get(): T | null {
    return this.storage === 'localStorage'
      ? getLocalStorage<T>(this.key)
      : getSessionStorage<T>(this.key);
  }
  
  /**
   * Set value in storage
   */
  set(value: T): boolean {
    return this.storage === 'localStorage'
      ? setLocalStorage(this.key, value)
      : setSessionStorage(this.key, value);
  }
  
  /**
   * Remove value from storage
   */
  remove(): boolean {
    return this.storage === 'localStorage'
      ? removeLocalStorage(this.key)
      : removeSessionStorage(this.key);
  }
  
  /**
   * Check if key exists in storage
   */
  has(): boolean {
    return this.storage === 'localStorage'
      ? hasLocalStorageKey(this.key)
      : hasSessionStorageKey(this.key);
  }
  
  /**
   * Watch for changes
   */
  watch(callback: (value: T | null) => void): () => void {
    return this.storage === 'localStorage'
      ? watchLocalStorage(this.key, (value) => callback(value as T | null))
      : watchSessionStorage(this.key, callback);
  }
}

/**
 * Create a storage instance
 * 
 * @param key - Storage key
 * @param storage - Storage type (default: 'localStorage')
 * @returns Storage instance
 */
export function createStorage<T>(key: string, storage: 'localStorage' | 'sessionStorage' = 'localStorage'): Storage<T> {
  return new Storage<T>(key, storage);
}
