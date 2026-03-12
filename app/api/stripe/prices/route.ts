import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { STRIPE_PRODUCTS } from '@/lib/constants/stripe.constants';
import { isValidCurrency, DEFAULT_CURRENCY, detectCurrencyFromHeaders } from '@/lib/currency';
import type { SupportedCurrency } from '@/lib/currency';

/** Shape of a price returned to the client */
interface ProductPrice {
  priceId: string;
  productId: string;
  currency: string;
  unitAmount: number; // in major units (e.g. 3.00, not 300)
  recurring: { interval: string } | null;
}

/** In-memory cache: currency -> { data, timestamp } */
const cache = new Map<string, { data: Record<string, ProductPrice>; timestamp: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * GET /api/stripe/prices?currency=usd
 *
 * Returns active prices for all products in the requested currency.
 * Auto-detects currency from geo headers if not specified.
 * Response is keyed by product key (BASE_BUNDLE, ADD_ON_LUNAR, etc.)
 */
export async function GET(request: NextRequest) {
  try {
    // Determine currency
    const paramCurrency = request.nextUrl.searchParams.get('currency')?.toLowerCase();
    let currency: SupportedCurrency;

    if (paramCurrency && isValidCurrency(paramCurrency)) {
      currency = paramCurrency;
    } else {
      currency = detectCurrencyFromHeaders(request.headers);
    }

    // Check cache
    const cached = cache.get(currency);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json({
        currency,
        prices: cached.data,
        cached: true,
      });
    }

    // Fetch prices for each product from Stripe
    const productEntries = Object.entries(STRIPE_PRODUCTS);
    const prices: Record<string, ProductPrice> = {};

    // Fetch all in parallel
    const results = await Promise.all(
      productEntries.map(async ([key, productId]) => {
        const stripePrices = await stripe.prices.list({
          product: productId,
          currency,
          active: true,
          limit: 1,
        });

        const price = stripePrices.data[0];
        if (price) {
          return {
            key,
            price: {
              priceId: price.id,
              productId: productId,
              currency: price.currency,
              unitAmount: (price.unit_amount || 0) / 100,
              recurring: price.recurring
                ? { interval: price.recurring.interval }
                : null,
            } satisfies ProductPrice,
          };
        }

        // No price found for this currency — try USD fallback
        if (currency !== 'usd') {
          const fallbackPrices = await stripe.prices.list({
            product: productId,
            currency: 'usd',
            active: true,
            limit: 1,
          });
          const fallback = fallbackPrices.data[0];
          if (fallback) {
            return {
              key,
              price: {
                priceId: fallback.id,
                productId: productId,
                currency: fallback.currency,
                unitAmount: (fallback.unit_amount || 0) / 100,
                recurring: fallback.recurring
                  ? { interval: fallback.recurring.interval }
                  : null,
              } satisfies ProductPrice,
            };
          }
        }

        return null;
      })
    );

    for (const result of results) {
      if (result) {
        prices[result.key] = result.price;
      }
    }

    // Determine the actual currency returned (might be mixed if some fell back)
    const actualCurrency = prices.BASE_BUNDLE?.currency || currency;

    // Cache the result
    cache.set(actualCurrency, { data: prices, timestamp: Date.now() });

    return NextResponse.json({
      currency: actualCurrency,
      prices,
      cached: false,
    });
  } catch (error) {
    console.error('Error fetching Stripe prices:', error);
    return NextResponse.json(
      { error: 'Error fetching prices' },
      { status: 500 }
    );
  }
}
