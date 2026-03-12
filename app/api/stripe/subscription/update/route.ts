import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { stripe } from '@/lib/stripe';
import { STRIPE_PRODUCTS } from '@/lib/constants/stripe.constants';
import { syncSubscription } from '@/lib/stripe-sync';
import prisma from '@/lib/prisma';

export async function POST(_request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await _request.json();
    const { priceId, action } = body;

    if (!priceId || !['add', 'remove'].includes(action)) {
      return new NextResponse('Invalid request body', { status: 400 });
    }

    // Get User and Subscription from DB
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { subscription: true },
    });

    if (!user || !user.subscription || !user.subscription.stripeSubscriptionId) {
      return new NextResponse('No active subscription found', { status: 404 });
    }

    const subscriptionId = user.subscription.stripeSubscriptionId;

    // Fetch current subscription items from Stripe
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const items = subscription.items.data;

    // Resolve product ID from the price to check what we're dealing with
    const priceObj = await stripe.prices.retrieve(priceId);
    const productId = typeof priceObj.product === 'string' ? priceObj.product : priceObj.product.id;

    // Security Check: Base Bundle Protection
    if (action === 'remove' && productId === STRIPE_PRODUCTS.BASE_BUNDLE) {
      return new NextResponse('Cannot remove Base Bundle via this endpoint', { status: 403 });
    }

    if (action === 'add') {
      // Check if product already exists (by product ID, multi-currency safe)
      const existingItem = items.find((item) => {
        const itemProductId = typeof item.price.product === 'string' ? item.price.product : item.price.product.id;
        return itemProductId === productId;
      });
      if (existingItem) {
        await syncSubscription(subscription, user.id);
        return NextResponse.json({ success: true, message: 'Already active, synced.' });
      }

      await stripe.subscriptionItems.create({
        subscription: subscriptionId,
        price: priceId,
        quantity: 1,
        proration_behavior: 'always_invoice',
      });
    }

    if (action === 'remove') {
      // Find the item by product ID (multi-currency safe)
      const itemToRemove = items.find((item) => {
        const itemProductId = typeof item.price.product === 'string' ? item.price.product : item.price.product.id;
        return itemProductId === productId;
      });
      if (!itemToRemove) {
        return new NextResponse('Item not found in subscription', { status: 404 });
      }

      await stripe.subscriptionItems.del(itemToRemove.id, {
        proration_behavior: 'always_invoice',
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
