import { STRIPE_PRICES } from '@/lib/stripe';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';

export async function syncSubscription(subscription: Stripe.Subscription, userId: string) {
  const items = subscription.items.data;

  // Check which Price IDs are present
  const hasBaseBundle = items.some((i) => i.price.id === STRIPE_PRICES.BASE_BUNDLE);
  const hasLunar = items.some((i) => i.price.id === STRIPE_PRICES.ADD_ON_LUNAR);
  const hasAstro = items.some((i) => i.price.id === STRIPE_PRICES.ADD_ON_ASTROGEMATRIA);
  const hasElective = items.some((i) => i.price.id === STRIPE_PRICES.ADD_ON_ELECTIVE);

  // Ensure dates are valid
  // Use current_period_end or fallback to now (plus 30 days) if missing
  let periodEndTimestamp = (subscription as any).current_period_end;
  if (!periodEndTimestamp) {
    periodEndTimestamp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
  }
  const currentPeriodEnd = new Date(periodEndTimestamp * 1000);

  // Upsert UserSubscription
  await prisma.userSubscription.upsert({
    where: { userId: userId },
    create: {
      userId: userId,
      stripeSubscriptionId: subscription.id,
      stripeCurrentPeriodEnd: currentPeriodEnd,
      stripePriceId: hasBaseBundle ? STRIPE_PRICES.BASE_BUNDLE : null, // Main indicator
      status: subscription.status,
      hasBaseBundle,
      hasLunarCalendar: hasLunar,
      hasAstrogematria: hasAstro,
      hasElectiveChart: hasElective,
    },
    update: {
      stripeSubscriptionId: subscription.id,
      stripeCurrentPeriodEnd: currentPeriodEnd,
      stripePriceId: hasBaseBundle ? STRIPE_PRICES.BASE_BUNDLE : null,
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
