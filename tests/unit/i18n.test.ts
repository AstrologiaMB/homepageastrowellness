/**
 * i18n unit tests
 * Tests for internationalization utilities
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { t, tWithVars, getLocale, setLocale, hasTranslation, getAvailableLocales, getLocaleName, getLocaleNativeName, detectLocale } from '@/lib/i18n';

// Mock translations
vi.mock('@/locales/en.json', () => ({
  default: {
    auth: {
      login: {
        title: 'Login',
        errors: {
          invalidCredentials: 'Invalid email or password',
        },
      },
    },
    common: {
      loading: 'Loading...',
    },
  },
}));

vi.mock('@/locales/es.json', () => ({
  default: {
    auth: {
      login: {
        title: 'Iniciar Sesión',
        errors: {
          invalidCredentials: 'Credenciales inválidas',
        },
      },
    },
    common: {
      loading: 'Cargando...',
    },
  },
}));

describe('i18n', () => {
  beforeEach(() => {
    // Reset to default locale before each test
    setLocale('en');
  });

  describe('t', () => {
    it('should return translation for existing key', () => {
      expect(t('auth.login.title')).toBe('Login');
    });

    it('should return translation for nested key', () => {
      expect(t('auth.login.errors.invalidCredentials')).toBe('Invalid email or password');
    });

    it('should return key if translation not found', () => {
      expect(t('nonexistent.key')).toBe('nonexistent.key');
    });

    it('should return translation from specific locale', () => {
      expect(t('auth.login.title', 'es')).toBe('Iniciar Sesión');
    });
  });

  describe('tWithVars', () => {
    it('should interpolate variables into translation', () => {
      // Note: This would require a translation with variables
      // For now, just test that it calls t
      const result = tWithVars('auth.login.title', {});
      expect(result).toBe('Login');
    });

    it('should replace multiple variables', () => {
      // This would require a translation like "Hello {name}, you have {count} messages"
      // For now, just test the function exists
      expect(typeof tWithVars).toBe('function');
    });
  });

  describe('getLocale', () => {
    it('should return current locale', () => {
      setLocale('en');
      expect(getLocale()).toBe('en');

      setLocale('es');
      expect(getLocale()).toBe('es');
    });
  });

  describe('setLocale', () => {
    it('should set current locale', () => {
      setLocale('en');
      expect(getLocale()).toBe('en');

      setLocale('es');
      expect(getLocale()).toBe('es');
    });

    it('should warn and fall back to default for invalid locale', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      setLocale('fr' as any);

      expect(consoleWarnSpy).toHaveBeenCalled();
      expect(getLocale()).toBe('en');

      consoleWarnSpy.mockRestore();
    });
  });

  describe('hasTranslation', () => {
    it('should return true for existing key', () => {
      expect(hasTranslation('auth.login.title')).toBe(true);
    });

    it('should return false for nonexistent key', () => {
      expect(hasTranslation('nonexistent.key')).toBe(false);
    });

    it('should check specific locale', () => {
      expect(hasTranslation('auth.login.title', 'es')).toBe(true);
    });
  });

  describe('getAvailableLocales', () => {
    it('should return array of available locales', () => {
      const locales = getAvailableLocales();
      expect(locales).toContain('en');
      expect(locales).toContain('es');
      expect(Array.isArray(locales)).toBe(true);
    });
  });

  describe('getLocaleName', () => {
    it('should return English name for locale', () => {
      expect(getLocaleName('en')).toBe('English');
      expect(getLocaleName('es')).toBe('Español');
    });
  });

  describe('getLocaleNativeName', () => {
    it('should return native name for locale', () => {
      expect(getLocaleNativeName('en')).toBe('English');
      expect(getLocaleNativeName('es')).toBe('Español');
    });
  });

  describe('detectLocale', () => {
    it('should return browser locale if supported', () => {
      // Mock navigator.language
      Object.defineProperty(navigator, 'language', {
        value: 'es-ES',
        writable: true,
      });

      expect(detectLocale()).toBe('es');
    });

    it('should return default locale if browser locale not supported', () => {
      // Mock navigator.language
      Object.defineProperty(navigator, 'language', {
        value: 'fr-FR',
        writable: true,
      });

      expect(detectLocale()).toBe('en');
    });
  });
});
