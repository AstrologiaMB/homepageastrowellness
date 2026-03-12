import prisma from '@/lib/prisma';
import Stripe from 'stripe';
import { STRIPE_PRODUCTS } from '@/lib/constants/stripe.constants';

/** Safely extract product ID whether it's a string or expanded object */
function getProductId(product: string | Stripe.Product | Stripe.DeletedProduct): string {
  return typeof product === 'string' ? product : product.id;
}

export async function syncSubscription(subscription: Stripe.Subscription, userId: string) {
  const items = subscription.items.data;

  // Check which Product IDs are present (multi-currency safe)
  const hasBaseBundle = items.some((i) => getProductId(i.price.product) === STRIPE_PRODUCTS.BASE_BUNDLE);
  const hasLunar = items.some((i) => getProductId(i.price.product) === STRIPE_PRODUCTS.ADD_ON_LUNAR);
  const hasAstro = items.some((i) => getProductId(i.price.product) === STRIPE_PRODUCTS.ADD_ON_ASTROGEMATRIA);
  const hasElective = items.some((i) => getProductId(i.price.product) === STRIPE_PRODUCTS.ADD_ON_ELECTIVE);

  // Ensure dates are valid
  let periodEndTimestamp = (subscription as any).current_period_end;
  if (!periodEndTimestamp) {
    periodEndTimestamp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
  }
  const currentPeriodEnd = new Date(periodEndTimestamp * 1000);

  // Find the base bundle price ID (whatever currency it's in)
  const baseBundleItem = items.find((i) => getProductId(i.price.product) === STRIPE_PRODUCTS.BASE_BUNDLE);
  const basePriceId = baseBundleItem?.price.id || null;

  // Upsert UserSubscription
  await prisma.userSubscription.upsert({
    where: { userId: userId },
    create: {
      userId: userId,
      stripeSubscriptionId: subscription.id,
      stripeCurrentPeriodEnd: currentPeriodEnd,
      stripePriceId: basePriceId,
      status: subscription.status,
      hasBaseBundle,
      hasLunarCalendar: hasLunar,
      hasAstrogematria: hasAstro,
      hasElectiveChart: hasElective,
    },
    update: {
      stripeSubscriptionId: subscription.id,
      stripeCurrentPeriodEnd: currentPeriodEnd,
      stripePriceId: basePriceId,
      status: subscription.status,
      hasBaseBundle,
      hasLunarCalendar: hasLunar,
      hasAstrogematria: hasAstro,
      hasElectiveChart: hasElective,
    },
  });

  // Also ensure User has the customer ID
  await prisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId: subscription.customer as string },
  });

  console.log(
    `Synced subscription for user ${userId}: Base=${hasBaseBundle}, Lunar=${hasLunar}, Astro=${hasAstro}, Elective=${hasElective}`
  );
}
