import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import { NextAuthOptions } from "next-auth"
import { User, Account, Profile } from "next-auth"
import bcrypt from "bcryptjs"

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
  // Railway-specific cookie configuration (only applies in production on Railway)
  ...(process.env.NODE_ENV === 'production' && process.env.NEXTAUTH_URL?.includes('railway.app') && {
    cookies: {
      sessionToken: {
        name: `next-auth.session-token`,
        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: true,
          domain: process.env.NEXTAUTH_URL?.replace('https://', ''),
        },
      },
    },
  }),
  callbacks: {
    async jwt({ token, user }) {
      // Si tenemos el objeto user, es un inicio de sesión nuevo
      if (user) {
        // Añadir el ID del usuario al token
        token.userId = user.id;
      }
      
      // Verificar si el usuario tiene datos completos y suscripción en cada refresh del token
      // Esto asegura que el token se actualice cuando el usuario completa sus datos o cambia su suscripción
      try {
        const email = user?.email || token.email;
        if (email) {
          const dbUser = await prisma.user.findUnique({
            where: { email: email as string },
            select: {
              birthDate: true,
              birthCity: true,
              residenceCity: true,
              subscriptionStatus: true,
              subscriptionExpiresAt: true
            }
          });

          // Añadir información de datos completos al token
          token.hasCompletedData = !!(dbUser?.birthDate && dbUser?.birthCity && dbUser?.residenceCity);

          // Añadir información de suscripción al token
          token.subscriptionStatus = dbUser?.subscriptionStatus || 'free';
          token.subscriptionExpiresAt = dbUser?.subscriptionExpiresAt;

          console.log(`Usuario ${email} - Datos completos: ${token.hasCompletedData}, Suscripción: ${token.subscriptionStatus}`);
        }
      } catch (error) {
        console.error("Error al verificar datos del usuario:", error);
        token.hasCompletedData = false;
        token.subscriptionStatus = 'free';
        token.subscriptionExpiresAt = null;
      }
      
      return token;
    },
    async session({ session, token }) {
      // Pasar la información del token a la sesión
      if (session.user) {
        // @ts-ignore - Añadir hasCompletedData a la sesión
        session.user.hasCompletedData = token.hasCompletedData;
        // @ts-ignore - Añadir información de suscripción a la sesión
        session.user.subscriptionStatus = token.subscriptionStatus;
        // @ts-ignore
        session.user.subscriptionExpiresAt = token.subscriptionExpiresAt;
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
  pages: {
    signIn: '/login',
    error: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
