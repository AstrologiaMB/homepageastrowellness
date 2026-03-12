/**
 * Currency detection and configuration for multi-currency support.
 *
 * Determines the user's preferred currency based on geolocation headers
 * (Fly.io / Cloudflare) or Accept-Language fallback.
 *
 * @module lib/currency
 */

/** Supported currencies */
export const SUPPORTED_CURRENCIES = ['usd', 'eur'] as const;
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

/** Default currency */
export const DEFAULT_CURRENCY: SupportedCurrency = 'usd';

/** Currency display configuration */
export const CURRENCY_CONFIG: Record<SupportedCurrency, { symbol: string; locale: string }> = {
  usd: { symbol: '$', locale: 'en-US' },
  eur: { symbol: '\u20AC', locale: 'es-ES' },
};

/**
 * Map of country codes to currencies.
 * Euro zone countries map to EUR, everything else defaults to USD.
 */
const COUNTRY_CURRENCY_MAP: Record<string, SupportedCurrency> = {
  // Eurozone
  AT: 'eur', BE: 'eur', CY: 'eur', EE: 'eur', FI: 'eur',
  FR: 'eur', DE: 'eur', GR: 'eur', IE: 'eur', IT: 'eur',
  LV: 'eur', LT: 'eur', LU: 'eur', MT: 'eur', NL: 'eur',
  PT: 'eur', SK: 'eur', SI: 'eur', ES: 'eur', HR: 'eur',
};

/**
 * Detect currency from request headers (server-side).
 *
 * Priority:
 * 1. Fly-Client-Country header (Fly.io)
 * 2. CF-IPCountry header (Cloudflare)
 * 3. Accept-Language header (browser locale)
 * 4. Default: USD
 */
export function detectCurrencyFromHeaders(headers: Headers): SupportedCurrency {
  // 1. Fly.io geo header
  const flyCountry = headers.get('fly-client-country');
  if (flyCountry) {
    const currency = COUNTRY_CURRENCY_MAP[flyCountry.toUpperCase()];
    if (currency) return currency;
  }

  // 2. Cloudflare geo header
  const cfCountry = headers.get('cf-ipcountry');
  if (cfCountry) {
    const currency = COUNTRY_CURRENCY_MAP[cfCountry.toUpperCase()];
    if (currency) return currency;
  }

  // 3. Accept-Language fallback
  const acceptLang = headers.get('accept-language');
  if (acceptLang) {
    // Extract country from locale like "es-ES", "de-DE", "fr-FR"
    const locales = acceptLang.split(',');
    for (const locale of locales) {
      const parts = locale.trim().split(';')[0].split('-');
      const country = parts[1]?.toUpperCase();
      if (country) {
        const currency = COUNTRY_CURRENCY_MAP[country];
        if (currency) return currency;
      }
    }
  }

  return DEFAULT_CURRENCY;
}

/**
 * Detect currency from browser locale (client-side).
 */
export function detectCurrencyFromLocale(): SupportedCurrency {
  if (typeof navigator === 'undefined') return DEFAULT_CURRENCY;

  const lang = navigator.language || (navigator as any).userLanguage || '';
  const parts = lang.split('-');
  const country = parts[1]?.toUpperCase();

  if (country) {
    const currency = COUNTRY_CURRENCY_MAP[country];
    if (currency) return currency;
  }

  return DEFAULT_CURRENCY;
}

/**
 * Format a price amount for display.
 */
export function formatPrice(amount: number, currency: SupportedCurrency): string {
  const config = CURRENCY_CONFIG[currency];
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Validate that a currency string is supported.
 */
export function isValidCurrency(currency: string): currency is SupportedCurrency {
  return SUPPORTED_CURRENCIES.includes(currency as SupportedCurrency);
}
