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

/** In-memory cache: requested currency -> { data, timestamp } */
const cache = new Map<string, { data: Record<string, ProductPrice>; currency: string; timestamp: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * GET /api/stripe/prices?currency=usd
 *
 * Returns active prices for all products in the requested currency.
 * Auto-detects currency from geo headers if not specified.
 * If any product lacks a price in the requested currency, ALL prices
 * fall back to USD to prevent mixed-currency checkout sessions.
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

    // Check cache (keyed by requested currency)
    const cached = cache.get(currency);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json({
        currency: cached.currency,
        prices: cached.data,
      });
    }

    // Fetch prices for each product from Stripe
    const productEntries = Object.entries(STRIPE_PRODUCTS);

    // First pass: try the requested currency
    const results = await Promise.all(
      productEntries.map(async ([key, productId]) => {
        const stripePrices = await stripe.prices.list({
          product: productId,
          currency,
          active: true,
          limit: 1,
        });

        const price = stripePrices.data[0];
        return { key, productId, price: price || null };
      })
    );

    // Check if all products have a price in the requested currency
    const allHaveCurrency = results.every((r) => r.price !== null);

    // If any product lacks the requested currency, fall back ALL to USD
    let finalCurrency = currency;
    let finalResults = results;

    if (!allHaveCurrency && currency !== 'usd') {
      finalCurrency = 'usd';
      finalResults = await Promise.all(
        productEntries.map(async ([key, productId]) => {
          const stripePrices = await stripe.prices.list({
            product: productId,
            currency: 'usd',
            active: true,
            limit: 1,
          });
          return { key, productId, price: stripePrices.data[0] || null };
        })
      );
    }

    // Build response
    const prices: Record<string, ProductPrice> = {};
    for (const result of finalResults) {
      if (result.price) {
        prices[result.key] = {
          priceId: result.price.id,
          productId: result.productId,
          currency: result.price.currency,
          unitAmount: (result.price.unit_amount || 0) / 100,
          recurring: result.price.recurring
            ? { interval: result.price.recurring.interval }
            : null,
        };
      }
    }

    // Cache under the requested currency key (so EUR requests don't miss cache)
    cache.set(currency, { data: prices, currency: finalCurrency, timestamp: Date.now() });

    return NextResponse.json({
      currency: finalCurrency,
      prices,
    });
  } catch (error) {
    console.error('Error fetching Stripe prices:', error);
    return NextResponse.json(
      { error: 'Error fetching prices' },
      { status: 500 }
    );
  }
}
