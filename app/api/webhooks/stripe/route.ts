import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe, STRIPE_PRICES } from '@/lib/stripe';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';
import { syncSubscription } from '@/lib/stripe-sync';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === 'checkout.session.completed') {
        // 1. Handle One-Time Payments (Draconic)
        if (session.mode === 'payment' && session.payment_status === 'paid') {
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
            const isDraconic = lineItems.data.some(item => item.price?.id === STRIPE_PRICES.ONE_TIME_DRACONIC);

            if (isDraconic && session.metadata?.userId) {
                await prisma.user.update({
                    where: { id: session.metadata.userId },
                    data: { hasDraconicAccess: true }
                });
            }
        }

        // 2. Handle New Subscriptions
        if (session.mode === 'subscription') {
            const subscriptionId = session.subscription as string;
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);

            // Update or Create UserSubscription
            if (session.metadata?.userId) {
                // Sync function (reused)
                await syncSubscription(subscription, session.metadata.userId);
            }
        }
    }

    if (event.type === 'customer.subscription.updated') {
        const subscription = event.data.object as Stripe.Subscription;
        // We need to find the user associated with this customer
        const user = await prisma.user.findUnique({
            where: { stripeCustomerId: subscription.customer as string }
        });

        if (user) {
            await syncSubscription(subscription, user.id);
        }
    }

    if (event.type === 'customer.subscription.deleted') {
        const subscription = event.data.object as Stripe.Subscription;
        // Mark as canceled
        // Check if subscription exists first
        const existingSub = await prisma.userSubscription.findUnique({
            where: { stripeSubscriptionId: subscription.id }
        });

        if (existingSub) {
            await prisma.userSubscription.update({
                where: { stripeSubscriptionId: subscription.id },
                data: {
                    status: subscription.status,
                    hasBaseBundle: false,
                    hasLunarCalendar: false,
                    hasAstrogematria: false,
                    hasElectiveChart: false
                }
            });
        }
    }

    return new NextResponse(null, { status: 200 });
}
