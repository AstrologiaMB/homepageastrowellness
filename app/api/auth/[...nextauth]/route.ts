/**
 * NextAuth API Route Handler
 *
 * Used for authentication API requests (signin, signout, csrf, session, etc.)
 */
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth-options';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
