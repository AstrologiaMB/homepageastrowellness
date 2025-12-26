import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { stripe, STRIPE_PRICES } from '@/lib/stripe';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';
import { syncSubscription } from '@/lib/stripe-sync';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await req.json();
        const { priceId, action } = body;

        if (!priceId || !['add', 'remove'].includes(action)) {
            return new NextResponse('Invalid request body', { status: 400 });
        }

        // Get User and Subscription from DB
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { subscription: true }
        });

        if (!user || !user.subscription || !user.subscription.stripeSubscriptionId) {
            return new NextResponse('No active subscription found', { status: 404 });
        }

        const subscriptionId = user.subscription.stripeSubscriptionId;

        // Fetch current subscription items from Stripe
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const items = subscription.items.data;

        // Security Check: Base Bundle Protection
        // Ensure we are NOT trying to remove the Base Bundle
        if (action === 'remove' && priceId === STRIPE_PRICES.BASE_BUNDLE) {
            return new NextResponse('Cannot remove Base Bundle via this endpoint', { status: 403 });
        }

        if (action === 'add') {
            // Check if already exists
            const existingItem = items.find(item => item.price.id === priceId);
            if (existingItem) {
                // Self-healing: If it exists in Stripe but we are here, DB might be out of sync.
                // Sync and return success.
                await syncSubscription(subscription, user.id);
                return NextResponse.json({ success: true, message: 'Already active, synced.' });
            }

            // Add the item
            await stripe.subscriptionItems.create({
                subscription: subscriptionId,
                price: priceId,
                quantity: 1,
                proration_behavior: 'always_invoice', // Invoice immediately for the difference
            });
        }

        if (action === 'remove') {
            // Find the item to remove
            const itemToRemove = items.find(item => item.price.id === priceId);
            if (!itemToRemove) {
                return new NextResponse('Item not found in subscription', { status: 404 });
            }

            // Remove the item
            await stripe.subscriptionItems.del(itemToRemove.id, {
                proration_behavior: 'always_invoice', // Credit immediately if applicable
            });
        }

        // CRITICAL: Immediately sync with DB so the frontend sees changes instantly
        // Fetch the LATEST state of the subscription
        const updatedSubscription = await stripe.subscriptions.retrieve(subscriptionId);
        await syncSubscription(updatedSubscription, user.id);

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('Subscription Update Error:', error);
        return new NextResponse(error.message || 'Internal Error', { status: 500 });
    }
}
