/**
 * NextAuth Options Configuration
 * Separated from route.ts to follow Next.js App Router best practices.
 */

import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import { NextAuthOptions } from 'next-auth';
import type { DefaultSession as _DefaultSession, DefaultUser as _DefaultUser } from 'next-auth';
import bcrypt from 'bcryptjs';
import { getAuthConfig } from '@/lib/auth-utils';
import { env } from '@/lib/env';
import { ADMIN_EMAILS, AUTH_ROUTES } from '@/lib/constants';
import { syncUserToFluentCRM } from '@/lib/fluentcrm';

const authConfig = getAuthConfig();

/**
 * Extend the built-in NextAuth types to include custom properties
 */
declare module 'next-auth' {
  interface Session extends _DefaultSession {
    user: {
      id: string;
      hasCompletedData?: boolean;
      entitlements?: {
        hasBaseBundle: boolean;
        hasLunarCalendar: boolean;
        hasAstrogematria: boolean;
        hasElectiveChart: boolean;
        hasDraconicAccess: boolean;
        status: string;
      };
      subscriptionStatus?: string;
    } & _DefaultSession['user'];
  }

  interface User extends _DefaultUser {
    id: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string;
    hasCompletedData?: boolean;
    entitlements?: {
      hasBaseBundle: boolean;
      hasLunarCalendar: boolean;
      hasAstrogematria: boolean;
      hasElectiveChart: boolean;
      hasDraconicAccess: boolean;
      status: string;
    };
    subscriptionStatus?: string;
  }
}

export const authOptions: NextAuthOptions = {
  trustHost: true,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If we have the user object, it's a new login
      if (user) {
        token.userId = user.id;
      }

      try {
        const email = user?.email || token.email;
        if (email) {
          const dbUser = await prisma.user.findUnique({
            where: { email: email as string },
            include: { subscription: true },
          });

          // Add completed data information to token
          token.hasCompletedData = !!(
            dbUser?.birthDate &&
            dbUser?.birthCity &&
            dbUser?.residenceCity
          );

          // Add entitlement flags to token
          const hasBaseBundle = dbUser?.subscription?.hasBaseBundle || false;
          const status = dbUser?.subscription?.status || 'free';

          token.entitlements = {
            hasBaseBundle,
            hasLunarCalendar: dbUser?.subscription?.hasLunarCalendar || false,
            hasAstrogematria: dbUser?.subscription?.hasAstrogematria || false,
            hasElectiveChart: dbUser?.subscription?.hasElectiveChart || false,
            // Logic: Draconic requires Base Bundle AND Active Subscription
            hasDraconicAccess:
              (dbUser?.hasDraconicAccess && hasBaseBundle && status === 'active') || false,
            // Status for visual references
            status,
          };

          // Legacy support (optional, just in case)
          token.subscriptionStatus = dbUser?.subscription?.hasBaseBundle ? 'premium' : 'free';

          // OVERRIDE: Admin User Full Access
          const isAdmin = ADMIN_EMAILS.includes(email as (typeof ADMIN_EMAILS)[number]);
          if (isAdmin) {
            token.entitlements = {
              hasBaseBundle: true,
              hasLunarCalendar: true,
              hasAstrogematria: true,
              hasElectiveChart: true,
              hasDraconicAccess: true,
              status: 'active',
            };
            token.subscriptionStatus = 'premium';
          }
        }
      } catch (error) {
        console.error('Error verifying user data:', error);
        token.hasCompletedData = false;
        token.entitlements = {
          hasBaseBundle: false,
          hasLunarCalendar: false,
          hasAstrogematria: false,
          hasElectiveChart: false,
          hasDraconicAccess: false,
          status: 'error',
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.hasCompletedData = token.hasCompletedData;
        session.user.entitlements = token.entitlements;
        session.user.subscriptionStatus = token.subscriptionStatus; // Legacy
      }
      return session;
    },
    async signIn({ user }) {
      // Crear usuario en la base de datos si no existe
      if (user.email) {
        try {
          await prisma.user.upsert({
            where: { email: user.email },
            update: {}, // No actualizamos nada si ya existe
            create: {
              email: user.email,
              name: user.name || '',
              image: user.image || '',
            },
          });
          console.log(`Usuario creado/actualizado: ${user.email}`);
          // Update the user to set termsAccepted to true if created via OAuth
          // This is a safety catch.
          return true;
        } catch (error) {
          console.error('Error al crear/actualizar usuario:', error);
          return true;
        }
      }
      return true;
    },
  },
  secret: env.NEXTAUTH_SECRET,
  useSecureCookies: authConfig.useSecureCookies,
  cookies: {
    sessionToken: {
      name: authConfig.cookieName,
      options: authConfig.cookieOptions,
    },
  },
  pages: {
    signIn: AUTH_ROUTES.LOGIN,
    error: AUTH_ROUTES.LOGIN,
  },
  events: {
    async createUser({ user }) {
      // Update terms acceptance
      await prisma.user.update({
        where: { id: user.id },
        data: {
          termsAccepted: true,
          termsAcceptedAt: new Date(),
        },
      });

      // Sync to FluentCRM (non-blocking)
      if (user.email) {
        syncUserToFluentCRM({
          email: user.email,
          name: user.name,
        }).catch((error) => {
          console.error('[FluentCRM] Failed to sync user:', error);
        });
      }
    },
  },
};
