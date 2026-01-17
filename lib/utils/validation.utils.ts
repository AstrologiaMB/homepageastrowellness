/**
 * Validation Utilities
 * 
 * Utility functions for data validation.
 * 
 * @module lib/utils/validation.utils
 */

/**
 * Check if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if URL is valid
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if phone number is valid (basic validation)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * Check if string is a valid date
 */
export function isValidDateString(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

/**
 * Check if date is in the past
 */
export function isPastDate(date: Date): boolean {
  return date < new Date();
}

/**
 * Check if date is in the future
 */
export function isFutureDate(date: Date): boolean {
  return date > new Date();
}

/**
 * Check if date is today
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if string is empty or whitespace only
 */
export function isEmpty(value: string | null | undefined): boolean {
  return !value || value.trim().length === 0;
}

/**
 * Check if string meets minimum length
 */
export function hasMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}

/**
 * Check if string meets maximum length
 */
export function hasMaxLength(value: string, maxLength: number): boolean {
  return value.length <= maxLength;
}

/**
 * Check if string length is within range
 */
export function isLengthInRange(value: string, min: number, max: number): boolean {
  return value.length >= min && value.length <= max;
}

/**
 * Check if password meets strength requirements
 */
export function isStrongPassword(password: string): boolean {
  // At least 8 characters
  if (password.length < 8) return false;
  
  // At least one lowercase letter
  if (!/[a-z]/.test(password)) return false;
  
  // At least one uppercase letter
  if (!/[A-Z]/.test(password)) return false;
  
  // At least one digit
  if (!/[0-9]/.test(password)) return false;
  
  // At least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;
  
  return true;
}

/**
 * Check if value is a number
 */
export function isNumber(value: any): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Check if value is an integer
 */
export function isInteger(value: any): boolean {
  return Number.isInteger(value);
}

/**
 * Check if number is positive
 */
export function isPositive(value: number): boolean {
  return value > 0;
}

/**
 * Check if number is negative
 */
export function isNegative(value: number): boolean {
  return value < 0;
}

/**
 * Check if number is within range
 */
export function isNumberInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Check if value is an array
 */
export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

/**
 * Check if array is empty
 */
export function isArrayEmpty(value: any): boolean {
  return !isArray(value) || value.length === 0;
}

/**
 * Check if array has minimum length
 */
export function hasMinArrayLength(value: any[], minLength: number): boolean {
  return value.length >= minLength;
}

/**
 * Check if array has maximum length
 */
export function hasMaxArrayLength(value: any[], maxLength: number): boolean {
  return value.length <= maxLength;
}

/**
 * Check if value is an object
 */
export function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Check if object is empty
 */
export function isObjectEmpty(value: any): boolean {
  return !isObject(value) || Object.keys(value).length === 0;
}

/**
 * Check if value is a boolean
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
 * Check if value is a function
 */
export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

/**
 * Check if value is a string
 */
export function isString(value: any): value is string {
  return typeof value === 'string';
}

/**
 * Check if value is a date
 */
export function isDate(value: any): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

/**
 * Check if value is a valid latitude
 */
export function isValidLatitude(value: number): boolean {
  return isNumberInRange(value, -90, 90);
}

/**
 * Check if value is a valid longitude
 */
export function isValidLongitude(value: number): boolean {
  return isNumberInRange(value, -180, 180);
}

/**
 * Check if value is a valid coordinate pair
 */
export function isValidCoordinate(lat: number, lon: number): boolean {
  return isValidLatitude(lat) && isValidLongitude(lon);
}

/**
 * Check if string matches regex pattern
 */
export function matchesPattern(value: string, pattern: RegExp): boolean {
  return pattern.test(value);
}

/**
 * Check if string contains only alphanumeric characters
 */
export function isAlphanumeric(value: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(value);
}

/**
 * Check if string contains only alphabetic characters
 */
export function isAlpha(value: string): boolean {
  return /^[a-zA-Z]+$/.test(value);
}

/**
 * Check if string contains only numeric characters
 */
export function isNumeric(value: string): boolean {
  return /^[0-9]+$/.test(value);
}

/**
 * Check if string is a valid UUID
 */
export function isUUID(value: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

/**
 * Check if string is a valid hex color
 */
export function isHexColor(value: string): boolean {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(value);
}

/**
 * Check if string is a valid credit card number (Luhn algorithm)
 */
export function isCreditCard(value: string): boolean {
  const sanitized = value.replace(/\D/g, '');
  if (sanitized.length < 13 || sanitized.length > 19) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

/**
 * Check if string is a valid IBAN
 */
export function isIBAN(value: string): boolean {
  const sanitized = value.replace(/\s/g, '').toUpperCase();
  const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/;
  
  if (!ibanRegex.test(sanitized)) return false;
  
  const rearranged = sanitized.substring(4) + sanitized.substring(0, 4);
  const numeric = rearranged.split('').map(char => {
    const code = char.charCodeAt(0);
    return code >= 65 && code <= 90 ? code - 55 : char;
  }).join('');
  
  const remainder = BigInt(numeric) % 97n;
  return remainder === 1n;
}

/**
 * Check if value is a valid timezone
 */
export function isValidTimezone(value: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if value is a valid currency code
 */
export function isValidCurrency(value: string): boolean {
  const currencyCodes = [
    'USD', 'EUR', 'GBP', 'JPY', 'CNY', 'INR', 'AUD', 'CAD', 'CHF', 'SEK',
    'NOK', 'DKK', 'MXN', 'BRL', 'RUB', 'KRW', 'SGD', 'HKD', 'NZD', 'ZAR'
  ];
  return currencyCodes.includes(value.toUpperCase());
}

/**
 * Check if string is a valid slug
 */
export function isSlug(value: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(value);
}

/**
 * Check if value is a valid JSON string
 */
export function isJSON(value: string): boolean {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if value is a valid base64 string
 */
export function isBase64(value: string): boolean {
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
  return base64Regex.test(value) && value.length % 4 === 0;
}

/**
 * Check if value is a valid IP address (IPv4 or IPv6)
 */
export function isIP(value: string): boolean {
  return isIPv4(value) || isIPv6(value);
}

/**
 * Check if value is a valid IPv4 address
 */
export function isIPv4(value: string): boolean {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Regex.test(value);
}

/**
 * Check if value is a valid IPv6 address
 */
export function isIPv6(value: string): boolean {
  // Use a simpler approach to avoid quantifier ordering issues
  const parts = value.split(':');
  
  // Must have between 2 and 8 parts
  if (parts.length < 2 || parts.length > 8) return false;
  
  // Check for :: shorthand (double colon)
  const doubleColonCount = (value.match(/::/g) || []).length;
  if (doubleColonCount > 1) return false;
  
  // Check each part
  for (const part of parts) {
    // Empty part is allowed only if we have ::
    if (part === '') {
      if (doubleColonCount === 0) return false;
      continue;
    }
    
    // Each part must be 1-4 hex digits
    if (!/^[0-9a-fA-F]{1,4}$/.test(part)) return false;
  }
  
  return true;
}

/**
 * Check if value is a valid port number
 */
export function isValidPort(value: number): boolean {
  return isInteger(value) && value >= 1 && value <= 65535;
}

/**
 * Check if value is a valid MAC address
 */
export function isMACAddress(value: string): boolean {
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  return macRegex.test(value);
}

/**
 * Check if value is a valid semver version
 */
export function isSemver(value: string): boolean {
  const semverRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
  return semverRegex.test(value);
}

/**
 * Check if value is a valid MIME type
 */
export function isMimeType(value: string): boolean {
  const mimeTypeRegex = /^[a-zA-Z0-9][a-zA-Z0-9!#$&\-\^_+.]{0,126}\/[a-zA-Z0-9][a-zA-Z0-9!#$&\-\^_+.]{0,126}$/;
  return mimeTypeRegex.test(value);
}

/**
 * Check if value is a valid data URL
 */
export function isDataURL(value: string): boolean {
  const dataUrlRegex = /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+)?;base64,[a-zA-Z0-9+/]+={0,2}$/;
  return dataUrlRegex.test(value);
}

/**
 * Check if value is a valid JWT token
 */
export function isJWT(value: string): boolean {
  const jwtRegex = /^[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$/;
  return jwtRegex.test(value);
}

/**
 * Check if value is a valid HTML tag
 */
export function isHTMLTag(value: string): boolean {
  const htmlTagRegex = /^<[a-zA-Z][a-zA-Z0-9]*(?:\s+[^>]*)?>|<\/[a-zA-Z][a-zA-Z0-9]*\s*>$/;
  return htmlTagRegex.test(value);
}

/**
 * Check if string contains HTML tags
 */
export function containsHTML(value: string): boolean {
  const htmlRegex = /<[a-zA-Z][a-zA-Z0-9]*(?:\s+[^>]*)?>|<\/[a-zA-Z][a-zA-Z0-9]*\s*>/;
  return htmlRegex.test(value);
}

/**
 * Check if string is XSS-safe (no script tags or dangerous attributes)
 */
export function isXSSSafe(value: string): boolean {
  const xssPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
  ];
  
  return !xssPatterns.some(pattern => pattern.test(value));
}

/**
 * Sanitize string to prevent XSS
 */
export function sanitizeXSS(value: string): string {
  return value
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#x27;');
}

/**
 * Check if value is a valid domain name
 */
export function isDomain(value: string): boolean {
  const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  return domainRegex.test(value);
}

/**
 * Check if value is a valid subdomain
 */
export function isSubdomain(value: string): boolean {
  const subdomainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]$/;
  return subdomainRegex.test(value);
}

/**
 * Check if value is a valid file extension
 */
export function isFileExtension(value: string): boolean {
  const extRegex = /^\.[a-zA-Z0-9]{1,10}$/;
  return extRegex.test(value);
}

/**
 * Check if value is a valid MIME type for image
 */
export function isImageMimeType(value: string): boolean {
  const imageMimeTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
    'image/bmp', 'image/tiff', 'image/x-icon'
  ];
  return imageMimeTypes.includes(value.toLowerCase());
}

/**
 * Check if value is a valid MIME type for video
 */
export function isVideoMimeType(value: string): boolean {
  const videoMimeTypes = [
    'video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo'
  ];
  return videoMimeTypes.includes(value.toLowerCase());
}

/**
 * Check if value is a valid MIME type for audio
 */
export function isAudioMimeType(value: string): boolean {
  const audioMimeTypes = [
    'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm', 'audio/aac'
  ];
  return audioMimeTypes.includes(value.toLowerCase());
}

/**
 * Check if value is a valid MIME type for document
 */
export function isDocumentMimeType(value: string): boolean {
  const documentMimeTypes = [
    'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain', 'text/csv'
  ];
  return documentMimeTypes.includes(value.toLowerCase());
}
