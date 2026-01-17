/**
 * Utils Index
 *
 * Barrel file for all utility functions.
 *
 * @module lib/utils
 */

// Date utilities
export { addDays, formatDateForUser, formatDateToDisplay, formatDateToISO, formatTime, getAgeInYears, getDaysBetween, getStartOfDayUTC, parseISODate, subtractDays } from './date.utils';

// String utilities
export { capitalizeWords, generateRandomString, isValidEmail, padString, slugify, toSentenceCase, toTitleCase, trimExtraWhitespace, truncate } from './string.utils';

// Number utilities
export { calculateDistance, clamp, degreesToRadians, formatNumberWithSeparators, isInRange, radiansToDegrees, roundToPrecision } from './number.utils';

// Array utilities
export { isEmpty as arrayIsEmpty, isNotEmpty as arrayIsNotEmpty, average, chunk, contains, deepFlatten, difference, drop, dropLast, every, filterBy, find, findAll, findBy, first, flatten, groupBy, indexOf, init, insertAt, intersect, last, lastIndexOf, max, min, nth, partition, randomItem, randomItems, remove, removeAt, removeBy, some, sortBy, sortNumbers, sortStrings, sum, tail, take, takeLast, toObject, union, unique, uniqueBy, unzip, updateAt, zip } from './array.utils';

// Object utilities
export { deepClone, deepFreeze, deepMerge, defaults, diff, entries, filter, fromEntries, fromQueryString, get, has, hasPath, invert, isDeepEqual, isEqual, keys, mapKeys, mapValues, merge, omit, pick, reduce, renameKeys, set, size, toQueryString, unset, values } from './object.utils';

// Type guard utilities
export { isArray, isBoolean, isDefined, isFunction, isNil, isNumber, isObject, isString } from './object.utils';

// Validation utilities
export * from './validation.utils';

// Crypto utilities
export * from './crypto.utils';

// HTTP utilities
export * from './http.utils';

// Async utilities
export * from './async.utils';

// Storage utilities
export * from './storage.utils';
