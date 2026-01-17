/**
 * Object Utilities
 * 
 * Utility functions for object manipulation and validation.
 * 
 * @module lib/utils/object.utils
 */

/**
 * Check if object is empty
 */
export function isEmpty(obj: Record<string, any> | null | undefined): boolean {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
}

/**
 * Check if object is not empty
 */
export function isNotEmpty(obj: Record<string, any> | null | undefined): obj is Record<string, any> {
  return !isEmpty(obj);
}

/**
 * Get all keys of object
 */
export function keys<T extends Record<string, any>>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

/**
 * Get all values of object
 */
export function values<T extends Record<string, any>>(obj: T): T[keyof T][] {
  return Object.values(obj);
}

/**
 * Get all key-value pairs of object
 */
export function entries<T extends Record<string, any>>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

/**
 * Create object from entries
 */
export function fromEntries<K extends string | number | symbol, V>(entries: [K, V][]): Record<K, V> {
  return Object.fromEntries(entries) as Record<K, V>;
}

/**
 * Pick specific keys from object
 */
export function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Omit specific keys from object
 */
export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as T;
  
  const clonedObj = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  return clonedObj;
}

/**
 * Deep merge objects
 */
export function deepMerge<T extends Record<string, any>>(target: T, ...sources: Partial<T>[]): T {
  if (!sources.length) return target;
  const source = sources.shift();
  
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key] as any, source[key] as any);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  
  return deepMerge(target, ...sources);
}

/**
 * Check if value is plain object
 */
export function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Check if value is array
 */
export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

/**
 * Check if value is function
 */
export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

/**
 * Check if value is string
 */
export function isString(value: any): value is string {
  return typeof value === 'string';
}

/**
 * Check if value is number
 */
export function isNumber(value: any): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Check if value is boolean
 */
export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Check if value is null or undefined
 */
export function isNil(value: any): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Check if value is defined (not null or undefined)
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return !isNil(value);
}

/**
 * Get nested property value by path
 */
export function get<T = any>(obj: Record<string, any>, path: string, defaultValue?: T): T {
  const keys = path.split('.');
  let result: any = obj;
  
  for (const key of keys) {
    if (result == null) {
      return defaultValue as T;
    }
    result = result[key];
  }
  
  return result !== undefined ? result : (defaultValue as T);
}

/**
 * Set nested property value by path
 */
export function set<T extends Record<string, any>>(obj: T, path: string, value: any): T {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  let current = obj as any;
  
  for (const key of keys) {
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[lastKey] = value;
  return obj;
}

/**
 * Delete nested property by path
 */
export function unset<T extends Record<string, any>>(obj: T, path: string): boolean {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  let current = obj as any;
  
  for (const key of keys) {
    if (!current[key]) {
      return false;
    }
    current = current[key];
  }
  
  return delete current[lastKey];
}

/**
 * Check if object has property
 */
export function has<T extends Record<string, any>>(obj: T, key: keyof T): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Check if object has nested property
 */
export function hasPath(obj: Record<string, any>, path: string): boolean {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current == null || !(key in current)) {
      return false;
    }
    current = current[key];
  }
  
  return true;
}

/**
 * Transform object keys
 */
export function mapKeys<T extends Record<string, any>, K extends string>(
  obj: T,
  mapper: (key: keyof T) => K
): Record<K, T[keyof T]> {
  const result = {} as Record<K, T[keyof T]>;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[mapper(key)] = obj[key];
    }
  }
  return result;
}

/**
 * Transform object values
 */
export function mapValues<T extends Record<string, any>, V>(
  obj: T,
  mapper: (value: T[keyof T], key: keyof T) => V
): Record<keyof T, V> {
  const result = {} as Record<keyof T, V>;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = mapper(obj[key], key);
    }
  }
  return result;
}

/**
 * Filter object entries
 */
export function filter<T extends Record<string, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> {
  const result = {} as Partial<T>;
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key], key)) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Reduce object entries
 */
export function reduce<T extends Record<string, any>, R>(
  obj: T,
  reducer: (acc: R, value: T[keyof T], key: keyof T) => R,
  initialValue: R
): R {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return reducer(acc, value as T[keyof T], key as keyof T);
  }, initialValue);
}

/**
 * Merge multiple objects
 */
export function merge<T extends Record<string, any>>(...objects: Partial<T>[]): T {
  return Object.assign({}, ...objects) as T;
}

/**
 * Get object size (number of own properties)
 */
export function size(obj: Record<string, any>): number {
  return Object.keys(obj).length;
}

/**
 * Invert object (swap keys and values)
 */
export function invert<T extends Record<string, any>>(obj: T): Record<string, keyof T> {
  const result = {} as Record<string, keyof T>;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[String(obj[key])] = key;
    }
  }
  return result;
}

/**
 * Create object with default values
 */
export function defaults<T extends Record<string, any>>(
  obj: Partial<T>,
  defaults: T
): T {
  const result = { ...defaults };
  for (const key in obj) {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Rename object keys
 */
export function renameKeys<T extends Record<string, any>, K extends string>(
  obj: T,
  keyMap: Partial<Record<keyof T, K>>
): Record<string, any> {
  const result: any = { ...obj };
  for (const oldKey in keyMap) {
    const newKey = keyMap[oldKey as keyof T];
    if (newKey && oldKey in result) {
      result[newKey] = result[oldKey];
      delete result[oldKey];
    }
  }
  return result;
}

/**
 * Convert object to query string
 */
export function toQueryString(obj: Record<string, any>): string {
  const params = new URLSearchParams();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => params.append(key, String(v)));
        } else {
          params.append(key, String(value));
        }
      }
    }
  }
  return params.toString();
}

/**
 * Convert query string to object
 */
export function fromQueryString(queryString: string): Record<string, string | string[]> {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string | string[]> = {};
  
  for (const [key, value] of (params as any).entries()) {
    if (key in result) {
      const existing = result[key];
      if (Array.isArray(existing)) {
        existing.push(value);
      } else {
        result[key] = [existing, value];
      }
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

/**
 * Freeze object recursively (deep freeze)
 */
export function deepFreeze<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  Object.freeze(obj);
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      deepFreeze(obj[key]);
    }
  }
  
  return obj;
}

/**
 * Get object difference
 */
export function diff<T extends Record<string, any>>(obj1: T, obj2: Partial<T>): Partial<T> {
  const result = {} as Partial<T>;
  
  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (obj1[key] !== obj2[key]) {
        result[key] = obj2[key];
      }
    }
  }
  
  return result;
}

/**
 * Check if two objects are equal (shallow)
 */
export function isEqual(a: Record<string, any>, b: Record<string, any>): boolean {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  
  if (keysA.length !== keysB.length) {
    return false;
  }
  
  for (const key of keysA) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  
  return true;
}

/**
 * Check if two objects are equal (deep)
 */
export function isDeepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  
  if (typeof a !== typeof b) return false;
  
  if (a === null || b === null) return a === b;
  
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => isDeepEqual(item, b[index]));
  }
  
  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    
    if (keysA.length !== keysB.length) return false;
    
    return keysA.every(key => isDeepEqual(a[key], b[key]));
  }
  
  return false;
}
