/**
 * Array Utilities
 * 
 * Utility functions for array manipulation and validation.
 * 
 * @module lib/utils/array.utils
 */

/**
 * Check if array is empty
 */
export function isEmpty<T>(arr: T[] | undefined | null): boolean {
  return !arr || arr.length === 0;
}

/**
 * Check if array is not empty
 */
export function isNotEmpty<T>(arr: T[] | undefined | null): arr is T[] {
  return !isEmpty(arr);
}

/**
 * Get unique values from array
 */
export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/**
 * Remove duplicates from array based on key
 */
export function uniqueBy<T, K extends keyof T>(arr: T[], key: K): T[] {
  const seen = new Set();
  return arr.filter(item => {
    const k = item[key];
    if (seen.has(k)) {
      return false;
    }
    seen.add(k);
    return true;
  });
}

/**
 * Group array items by key
 */
export function groupBy<T, K extends keyof T>(arr: T[], key: K): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

/**
 * Chunk array into smaller arrays
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Shuffle array
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Sort array by key
 */
export function sortBy<T, K extends keyof T>(arr: T[], key: K, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...arr].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

/**
 * Get random item from array
 */
export function randomItem<T>(arr: T[]): T | undefined {
  if (isEmpty(arr)) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Get random items from array
 */
export function randomItems<T>(arr: T[], count: number): T[] {
  if (isEmpty(arr)) return [];
  const shuffled = shuffle(arr);
  return shuffled.slice(0, Math.min(count, arr.length));
}

/**
 * Find item by property
 */
export function findBy<T, K extends keyof T>(arr: T[], key: K, value: T[K]): T | undefined {
  return arr.find(item => item[key] === value);
}

/**
 * Filter items by property
 */
export function filterBy<T, K extends keyof T>(arr: T[], key: K, value: T[K]): T[] {
  return arr.filter(item => item[key] === value);
}

/**
 * Remove item from array
 */
export function remove<T>(arr: T[], item: T): T[] {
  return arr.filter(i => i !== item);
}

/**
 * Remove items by predicate
 */
export function removeBy<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(item => !predicate(item));
}

/**
 * Insert item at index
 */
export function insertAt<T>(arr: T[], index: number, item: T): T[] {
  const result = [...arr];
  result.splice(index, 0, item);
  return result;
}

/**
 * Remove item at index
 */
export function removeAt<T>(arr: T[], index: number): T[] {
  const result = [...arr];
  result.splice(index, 1);
  return result;
}

/**
 * Update item at index
 */
export function updateAt<T>(arr: T[], index: number, item: T): T[] {
  const result = [...arr];
  result[index] = item;
  return result;
}

/**
 * Flatten nested array
 */
export function flatten<T>(arr: (T | T[])[]): T[] {
  return arr.flat(Infinity) as T[];
}

/**
 * Deep flatten array
 */
export function deepFlatten<T>(arr: any[]): T[] {
  return arr.reduce<T[]>((acc, val) => {
    if (Array.isArray(val)) {
      return acc.concat(deepFlatten(val));
    }
    return acc.concat(val);
  }, []);
}

/**
 * Get first item
 */
export function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

/**
 * Get last item
 */
export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

/**
 * Get nth item (0-indexed)
 */
export function nth<T>(arr: T[], n: number): T | undefined {
  return arr[n];
}

/**
 * Get array without first item
 */
export function tail<T>(arr: T[]): T[] {
  return arr.slice(1);
}

/**
 * Get array without last item
 */
export function init<T>(arr: T[]): T[] {
  return arr.slice(0, -1);
}

/**
 * Take first n items
 */
export function take<T>(arr: T[], n: number): T[] {
  return arr.slice(0, n);
}

/**
 * Take last n items
 */
export function takeLast<T>(arr: T[], n: number): T[] {
  return arr.slice(-n);
}

/**
 * Drop first n items
 */
export function drop<T>(arr: T[], n: number): T[] {
  return arr.slice(n);
}

/**
 * Drop last n items
 */
export function dropLast<T>(arr: T[], n: number): T[] {
  return arr.slice(0, -n);
}

/**
 * Zip two arrays
 */
export function zip<A, B>(arr1: A[], arr2: B[]): [A, B][] {
  const length = Math.min(arr1.length, arr2.length);
  const result: [A, B][] = [];
  for (let i = 0; i < length; i++) {
    result.push([arr1[i], arr2[i]]);
  }
  return result;
}

/**
 * Unzip array of pairs
 */
export function unzip<A, B>(arr: [A, B][]): [A[], B[]] {
  const arr1: A[] = [];
  const arr2: B[] = [];
  for (const [a, b] of arr) {
    arr1.push(a);
    arr2.push(b);
  }
  return [arr1, arr2];
}

/**
 * Intersect two arrays
 */
export function intersect<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter(item => set2.has(item));
}

/**
 * Difference between two arrays (items in arr1 not in arr2)
 */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter(item => !set2.has(item));
}

/**
 * Union of two arrays
 */
export function union<T>(arr1: T[], arr2: T[]): T[] {
  return unique([...arr1, ...arr2]);
}

/**
 * Partition array by predicate
 */
export function partition<T>(arr: T[], predicate: (item: T) => boolean): [T[], T[]] {
  const truthy: T[] = [];
  const falsy: T[] = [];
  for (const item of arr) {
    if (predicate(item)) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  }
  return [truthy, falsy];
}

/**
 * Find index of item
 */
export function indexOf<T>(arr: T[], item: T): number {
  return arr.indexOf(item);
}

/**
 * Find last index of item
 */
export function lastIndexOf<T>(arr: T[], item: T): number {
  return arr.lastIndexOf(item);
}

/**
 * Check if array contains item
 */
export function contains<T>(arr: T[], item: T): boolean {
  return arr.includes(item);
}

/**
 * Check if all items satisfy predicate
 */
export function every<T>(arr: T[], predicate: (item: T) => boolean): boolean {
  return arr.every(predicate);
}

/**
 * Check if any item satisfies predicate
 */
export function some<T>(arr: T[], predicate: (item: T) => boolean): boolean {
  return arr.some(predicate);
}

/**
 * Find item by predicate
 */
export function find<T>(arr: T[], predicate: (item: T) => boolean): T | undefined {
  return arr.find(predicate);
}

/**
 * Find all items by predicate
 */
export function findAll<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(predicate);
}

/**
 * Map array to object by key
 */
export function toObject<T, K extends keyof T>(arr: T[], key: K): Record<string, T> {
  return arr.reduce((acc, item) => {
    acc[String(item[key])] = item;
    return acc;
  }, {} as Record<string, T>);
}

/**
 * Sum array of numbers
 */
export function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0);
}

/**
 * Get average of array of numbers
 */
export function average(arr: number[]): number {
  if (isEmpty(arr)) return 0;
  return sum(arr) / arr.length;
}

/**
 * Get min value from array
 */
export function min(arr: number[]): number | undefined {
  if (isEmpty(arr)) return undefined;
  return Math.min(...arr);
}

/**
 * Get max value from array
 */
export function max(arr: number[]): number | undefined {
  if (isEmpty(arr)) return undefined;
  return Math.max(...arr);
}

/**
 * Sort numbers in ascending order
 */
export function sortNumbers(arr: number[], order: 'asc' | 'desc' = 'asc'): number[] {
  return [...arr].sort((a, b) => order === 'asc' ? a - b : b - a);
}

/**
 * Sort strings alphabetically
 */
export function sortStrings(arr: string[], order: 'asc' | 'desc' = 'asc'): string[] {
  return [...arr].sort((a, b) => order === 'asc' ? a.localeCompare(b) : b.localeCompare(a));
}
