/**
 * Internationalization (i18n) utilities
 * Provides functions for managing translations and locale switching
 */

import enTranslations from '@/locales/en.json';
import esTranslations from '@/locales/es.json';

/**
 * Supported locales
 */
export type Locale = 'en' | 'es';

/**
 * Translation keys type
 */
export type TranslationKey = string;

/**
 * Translation value type
 */
export type TranslationValue = string | number | boolean | TranslationValue[] | TranslationObject;

/**
 * Nested translation object type
 */
export interface TranslationObject {
  [key: string]: TranslationValue;
}

/**
 * Translation map containing all available translations
 */
export const translations: Record<Locale, TranslationObject> = {
  en: enTranslations,
  es: esTranslations,
};

/**
 * Default locale
 */
export const DEFAULT_LOCALE: Locale = 'en';

/**
 * Current locale (can be updated at runtime)
 */
let currentLocale: Locale = DEFAULT_LOCALE;

/**
 * Get the current locale
 * @returns The current locale
 */
export function getLocale(): Locale {
  return currentLocale;
}

/**
 * Set the current locale
 * @param locale - The locale to set
 */
export function setLocale(locale: Locale): void {
  if (!translations[locale]) {
    console.warn(`Locale "${locale}" is not supported. Falling back to "${DEFAULT_LOCALE}".`);
    currentLocale = DEFAULT_LOCALE;
    return;
  }
  currentLocale = locale;
}

/**
 * Get a translation value by key
 * Supports nested keys using dot notation (e.g., 'auth.login.title')
 * @param key - The translation key
 * @param locale - The locale to use (defaults to current locale)
 * @returns The translation value or the key if not found
 */
export function t(key: string, locale?: Locale): string {
  const targetLocale = locale ?? currentLocale;
  const translation = translations[targetLocale];

  if (!translation) {
    console.warn(`Locale "${targetLocale}" is not supported.`);
    return key;
  }

  // Support nested keys using dot notation
  const keys = key.split('.');
  let value: TranslationValue = translation;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as TranslationObject)[k];
    } else {
      console.warn(`Translation key "${key}" not found in locale "${targetLocale}".`);
      return key;
    }
  }

  return String(value);
}

/**
 * Get a translation with variable interpolation
 * Variables should be enclosed in curly braces (e.g., 'Hello {name}!')
 * @param key - The translation key
 * @param variables - Object containing variable values
 * @param locale - The locale to use (defaults to current locale)
 * @returns The interpolated translation
 */
export function tWithVars(key: string, variables: Record<string, string | number>, locale?: Locale): string {
  let translation = t(key, locale);

  // Replace variables in the translation
  for (const [varName, varValue] of Object.entries(variables)) {
    translation = translation.replace(new RegExp(`\\{${varName}\\}`, 'g'), String(varValue));
  }

  return translation;
}

/**
 * Check if a translation key exists
 * @param key - The translation key to check
 * @param locale - The locale to check (defaults to current locale)
 * @returns True if the key exists, false otherwise
 */
export function hasTranslation(key: string, locale?: Locale): boolean {
  const targetLocale = locale ?? currentLocale;
  const translation = translations[targetLocale];

  if (!translation) {
    return false;
  }

  const keys = key.split('.');
  let value: TranslationValue = translation;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as TranslationObject)[k];
    } else {
      return false;
    }
  }

  return true;
}

/**
 * Get all available locales
 * @returns Array of available locales
 */
export function getAvailableLocales(): Locale[] {
  return Object.keys(translations) as Locale[];
}

/**
 * Get the locale name in English
 * @param locale - The locale
 * @returns The locale name
 */
export function getLocaleName(locale: Locale): string {
  const names: Record<Locale, string> = {
    en: 'English',
    es: 'Español',
  };
  return names[locale] || locale;
}

/**
 * Get the locale native name
 * @param locale - The locale
 * @returns The locale native name
 */
export function getLocaleNativeName(locale: Locale): string {
  const names: Record<Locale, string> = {
    en: 'English',
    es: 'Español',
  };
  return names[locale] || locale;
}

/**
 * Detect locale from browser
 * @returns The detected locale or default locale
 */
export function detectLocale(): Locale {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE;
  }

  const browserLocale = navigator.language.split('-')[0] as Locale;

  if (translations[browserLocale]) {
    return browserLocale;
  }

  return DEFAULT_LOCALE;
}

/**
 * Initialize i18n with locale from browser or storage
 */
export function initI18n(): void {
  // Try to get locale from localStorage first
  if (typeof window !== 'undefined') {
    const storedLocale = localStorage.getItem('locale') as Locale | null;
    if (storedLocale && translations[storedLocale]) {
      setLocale(storedLocale);
      return;
    }
  }

  // Fall back to browser detection
  setLocale(detectLocale());
}

/**
 * Persist locale to localStorage
 * @param locale - The locale to persist
 */
export function persistLocale(locale: Locale): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('locale', locale);
  }
}

/**
 * Change locale and persist it
 * @param locale - The new locale
 */
export function changeLocale(locale: Locale): void {
  setLocale(locale);
  persistLocale(locale);
}
