/**
 * String Utilities
 * 
 * Utility functions for string manipulation and validation.
 * 
 * @module lib/utils/string.utils
 */

/**
 * Convert string to title case
 */
export function toTitleCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert string to sentence case
 */
export function toSentenceCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Capitalize first letter of each word
 */
export function capitalizeWords(str: string): string {
  return str.replace(/\b\w+/g, (_, word) => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
}

/**
 * Truncate string to max length
 */
export function truncate(str: string, maxLength: number = 100): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + '...';
}

/**
 * Pad string to target length
 */
export function padString(str: string, targetLength: number, padChar: string = ' '): string {
  const padding = padChar.repeat(Math.max(0, targetLength - str.length));
  return str + padding;
}

/**
 * Remove extra whitespace
 */
export function trimExtraWhitespace(str: string): string {
  return str.trim().replace(/\s+/g, ' ');
}

/**
 * Check if string is empty or whitespace only
 */
export function isEmpty(str: string): boolean {
  return str.trim().length === 0;
}

/**
 * Check if string is valid email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate random string
 */
export function generateRandomString(length: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Slugify string for URLs
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/[^\s]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Format number as currency
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format number as percentage
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${(value * 100).toFixed(decimals)}%`;
}
