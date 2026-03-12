import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { stripe } from '@/lib/stripe';
import { features, isFeatureEnabled } from '@/lib/features';
import { PRODUCT_ENTITLEMENT_MAPPING } from '@/lib/constants/stripe.constants';
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
    // items: array of Price IDs (resolved by the frontend per currency)
    // mode: 'subscription' | 'payment'
    const { items, mode } = body;

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

    // Prepare line items
    const line_items = items.map((priceId: string) => ({
      price: priceId,
      quantity: 1,
    }));

    // [SECURITY] Validate Feature Flags
    // Fetch the price objects to get product IDs for validation
    const priceObjects = await Promise.all(
      items.map((priceId: string) => stripe.prices.retrieve(priceId))
    );

    for (const price of priceObjects) {
      const productId = typeof price.product === 'string' ? price.product : price.product.id;
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
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
