import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import { NextAuthOptions } from "next-auth"
import { User, Account, Profile } from "next-auth"
import bcrypt from "bcryptjs"
import { getAuthConfig } from "@/lib/auth-utils"

const authConfig = getAuthConfig()

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Si tenemos el objeto user, es un inicio de sesión nuevo
      if (user) {
        token.userId = user.id;
      }

      try {
        const email = user?.email || token.email;
        if (email) {
          const dbUser = await prisma.user.findUnique({
            where: { email: email as string },
            include: { subscription: true }
          });

          // Añadir información de datos completos al token
          token.hasCompletedData = !!(dbUser?.birthDate && dbUser?.birthCity && dbUser?.residenceCity);

          // Añadir flags de entitlements al token
          const hasBaseBundle = dbUser?.subscription?.hasBaseBundle || false;
          const status = dbUser?.subscription?.status || 'free';

          token.entitlements = {
            hasBaseBundle,
            hasLunarCalendar: dbUser?.subscription?.hasLunarCalendar || false,
            hasAstrogematria: dbUser?.subscription?.hasAstrogematria || false,
            hasElectiveChart: dbUser?.subscription?.hasElectiveChart || false,
            // Logic: Draconic requires Base Bundle AND Active Subscription
            hasDraconicAccess: (dbUser?.hasDraconicAccess && hasBaseBundle && status === 'active') || false,
            // Status para referencias visuales
            status
          };

          // Legacy support (opcional, por si acaso)
          token.subscriptionStatus = dbUser?.subscription?.hasBaseBundle ? 'premium' : 'free';

          // OVERRIDE: Admin User Full Access
          if (email === 'info@astrochat.online') {
            token.entitlements = {
              hasBaseBundle: true,
              hasLunarCalendar: true,
              hasAstrogematria: true,
              hasElectiveChart: true,
              hasDraconicAccess: true,
              status: 'active'
            };
            token.subscriptionStatus = 'premium';
          }
        }
      } catch (error) {
        console.error("Error al verificar datos del usuario:", error);
        token.hasCompletedData = false;
        token.entitlements = {
          hasBaseBundle: false,
          hasLunarCalendar: false,
          hasAstrogematria: false,
          hasElectiveChart: false,
          hasDraconicAccess: false,
          status: 'error'
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.hasCompletedData = token.hasCompletedData;
        // @ts-ignore
        session.user.entitlements = token.entitlements;
        // @ts-ignore
        session.user.subscriptionStatus = token.subscriptionStatus; // Legacy
      }
      return session;
    },
    async signIn({ user, account, profile }) {
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
            }
          });
          console.log(`Usuario creado/actualizado: ${user.email}`);
          return true;
        } catch (error) {
          console.error("Error al crear/actualizar usuario:", error);
          // Permitimos el inicio de sesión incluso si hay un error para no bloquear al usuario
          return true;
        }
      }
      return true;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: authConfig.useSecureCookies,
  cookies: {
    sessionToken: {
      name: authConfig.cookieName,
      options: authConfig.cookieOptions,
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  events: {
    async createUser({ user }) {
      // Update the user to set termsAccepted to true
      // We assume that since the UI blocks the Google button until checked,
      // any user created via OAuth has accepted the terms.
      await prisma.user.update({
        where: { id: user.id },
        data: {
          termsAccepted: true,
          termsAcceptedAt: new Date(),
        },
      });
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
