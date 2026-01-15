import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user || !user.stripeCustomerId) {
            return new NextResponse('User not found or no subscription', { status: 404 });
        }

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: user.stripeCustomerId,
            return_url: `${process.env.NEXTAUTH_URL}/upgrade`, // Redirect back to upgrade page
        });

        return NextResponse.json({ url: portalSession.url });

    } catch (error) {
        console.error('Stripe Portal Error:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
