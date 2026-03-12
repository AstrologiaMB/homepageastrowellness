import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { stripe } from '@/lib/stripe';
import { features, isFeatureEnabled } from '@/lib/features';
import { STRIPE_PRODUCTS, PRODUCT_ENTITLEMENT_MAPPING } from '@/lib/constants/stripe.constants';
import prisma from '@/lib/prisma';

/** Allowlist of valid product IDs — reject any price not belonging to these */
const VALID_PRODUCT_IDS = new Set(Object.values(STRIPE_PRODUCTS));

export async function POST(_request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await _request.json();
    const { items, mode } = body;

    // Input validation
    if (!Array.isArray(items) || items.length === 0 || !items.every((i: unknown) => typeof i === 'string')) {
      return new NextResponse('Invalid items', { status: 400 });
    }
    if (mode !== 'subscription' && mode !== 'payment') {
      return new NextResponse('Invalid mode', { status: 400 });
    }

    // Get User from DB
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { subscription: true },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    let customerId = user.stripeCustomerId;

    // If no customer ID exists, create one in Stripe and save to DB
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name || undefined,
      });
      customerId = customer.id;

      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    // [SECURITY] Validate price IDs belong to known products
    const submittedPrices = await Promise.all(
      items.map((priceId: string) => stripe.prices.retrieve(priceId).catch(() => null))
    );

    for (let idx = 0; idx < items.length; idx++) {
      const price = submittedPrices[idx];
      if (!price) {
        return new NextResponse('Invalid price ID', { status: 400 });
      }

      const productId = typeof price.product === 'string' ? price.product : price.product.id;

      // Reject prices not in our product allowlist
      if (!VALID_PRODUCT_IDS.has(productId)) {
        console.warn(`[SECURITY] Blocked checkout with unknown product: ${productId} by ${session.user.email}`);
        return new NextResponse('Invalid price', { status: 403 });
      }

      // Check feature flags
      const entitlementKey = PRODUCT_ENTITLEMENT_MAPPING[productId];
      let featureFlagKey: keyof typeof features | undefined;
      if (entitlementKey === 'hasBaseBundle') featureFlagKey = 'enablePersonalCalendar';
      if (entitlementKey === 'hasLunarCalendar') featureFlagKey = 'enableLunarCalendar';
      if (entitlementKey === 'hasAstrogematria') featureFlagKey = 'enableAstrogematria';
      if (entitlementKey === 'hasElectiveChart') featureFlagKey = 'enableElectional';
      if (entitlementKey === 'hasDraconicAccess') featureFlagKey = 'enableDraconicChart';

      if (featureFlagKey) {
        const isEnabled = isFeatureEnabled(featureFlagKey, session.user.email);
        if (!isEnabled) {
          console.warn(`[SECURITY] Blocked purchase attempt for disabled feature: ${featureFlagKey} by ${session.user.email}`);
          return new NextResponse('Feature Disabled', { status: 403 });
        }
      }
    }

    // Prevent duplicate subscriptions
    if (mode === 'subscription' && user.subscription?.status === 'active') {
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${process.env.NEXTAUTH_URL}/upgrade`,
      });
      return NextResponse.json({ url: portalSession.url });
    }

    const line_items = items.map((priceId: string) => ({
      price: priceId,
      quantity: 1,
    }));

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode,
      payment_method_types: ['card'],
      line_items,
      success_url: `${process.env.NEXTAUTH_URL}/upgrade?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/upgrade?canceled=true`,
      metadata: {
        userId: user.id,
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
