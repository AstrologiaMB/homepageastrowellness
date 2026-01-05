import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-12-15.clover',
    typescript: true,
});

// Price IDs (from Environment or Constants)
export const STRIPE_PRICES = {
    BASE_BUNDLE: 'price_1ShGWULOQsTENXFlKx62Lxlx',
    ADD_ON_LUNAR: 'price_1ShGX9LOQsTENXFlz3FXikyg',
    ADD_ON_ASTROGEMATRIA: 'price_1ShGXVLOQsTENXFlygB8zOK0',
    ADD_ON_ELECTIVE: 'price_1ShGY7LOQsTENXFlvmAt6Nk2',
    ONE_TIME_DRACONIC: 'price_1ShGYSLOQsTENXFlGVyzY7t4',
} as const;
