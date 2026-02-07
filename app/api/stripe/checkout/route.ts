import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { stripe } from '@/lib/stripe';
import { features, isFeatureEnabled } from '@/lib/features';
import { ENTITLEMENT_MAPPING } from '@/lib/constants/stripe.constants';
import prisma from '@/lib/prisma';

export async function POST(_request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get User from DB to check stripeCustomerId
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { subscription: true },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const body = await _request.json();
    const { items, mode } = body; // items: array of priceIds, mode: 'subscription' | 'payment'

    let customerId = user.stripeCustomerId;

    // If no customer ID exists, create one in Stripe and save to DB
    if (!customerId) {
      const customerData: any = {
        email: user.email,
        name: user.name || undefined,
      };

      const customer = await stripe.customers.create(customerData);
      customerId = customer.id;

      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    // Prepare line items
    const line_items = items.map((priceId: string) => ({
      price: priceId,
      quantity: 1,
    }));

    // [SECURITY] Validate Feature Flags
    // Iterate over items and check if the associated feature is enabled for this user.
    for (const priceId of items) {
      const featureKey = Object.entries(ENTITLEMENT_MAPPING).find(([key]) => key === priceId)?.[1];
      // Map entitlement key to feature flag key
      let featureFlagKey: keyof typeof features | undefined;

      // Manual mapping based on ENTITLEMENT_MAPPING keys to features keys
      if (featureKey === 'hasBaseBundle') featureFlagKey = 'enablePersonalCalendar';
      if (featureKey === 'hasLunarCalendar') featureFlagKey = 'enableLunarCalendar';
      if (featureKey === 'hasAstrogematria') featureFlagKey = 'enableAstrogematria';
      if (featureKey === 'hasElectiveChart') featureFlagKey = 'enableElectional';
      if (featureKey === 'hasDraconicAccess') featureFlagKey = 'enableDraconicChart';

      if (featureFlagKey) {
        const isEnabled = isFeatureEnabled(featureFlagKey, session.user.email);
        if (!isEnabled) {
          console.warn(`[SECURITY] Blocked purchase attempt for disabled feature: ${featureFlagKey} by ${session.user.email}`);
          return new NextResponse('Feature Disabled', { status: 403 });
        }
      }
    }

    // Check for Draconic logic (Prerequisite check)
    // If buying Draconic (One-Time), user MUST have Base Bundle active technically.
    // However, maybe they are buying them together?
    // For simplicity, we assume frontend handles "Buy Base First" or we allow buying together if we supported mixed modes (but Stripe doesn't easily mix sub+one-time in same checkout without setup).
    // Let's assume Draconic is a separate 'payment' mode checkout, and Add-ons are 'subscription' updates.

    // Actually, for subscriptions, we usually pass price IDs.

    // Prevent duplicate subscriptions
    if (mode === 'subscription' && user.subscription?.status === 'active') {
      // If user already has a subscription, create a Portal session instead
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${process.env.NEXTAUTH_URL}/upgrade`,
      });
      return NextResponse.json({ url: portalSession.url });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: mode || 'subscription',
      payment_method_types: ['card'],
      line_items,
      success_url: `${process.env.NEXTAUTH_URL}/upgrade?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/upgrade?canceled=true`,
      metadata: {
        userId: user.id,
      },
      allow_promotion_codes: true,
      // If subscription, allow them to manage it?
      // If 'payment' (Draconic/One-time), invoice_creation is automatic usually.
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
