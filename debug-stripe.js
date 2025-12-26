const Stripe = require('stripe');
require('dotenv').config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function listPrices() {
    try {
        const prices = await stripe.prices.list({ limit: 20 });
        console.log('--- Stripe Prices ---');
        prices.data.forEach(p => {
            console.log(`${p.nickname || p.product}: ${p.id} (${p.unit_amount / 100} ${p.currency})`);
        });
    } catch (error) {
        console.error('Error fetching prices:', error);
    }
}

listPrices();
