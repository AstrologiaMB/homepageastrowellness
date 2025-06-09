import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import prisma from "@/lib/prisma"
import { NextAuthOptions } from "next-auth"
import { User, Account, Profile } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Si tenemos el objeto user, es un inicio de sesión nuevo
      if (user) {
        // Añadir el ID del usuario al token
        token.userId = user.id;
      }
      
      // Verificar si el usuario tiene datos completos en cada refresh del token
      // Esto asegura que el token se actualice cuando el usuario completa sus datos
      try {
        const email = user?.email || token.email;
        if (email) {
          const dbUser = await prisma.user.findUnique({
            where: { email: email as string },
            select: { birthDate: true, birthCity: true, residenceCity: true }
          });
          
          // Añadir esta información al token
          token.hasCompletedData = !!(dbUser?.birthDate && dbUser?.birthCity && dbUser?.residenceCity);
          console.log(`Usuario ${email} tiene datos completos: ${token.hasCompletedData}`);
        }
      } catch (error) {
        console.error("Error al verificar datos del usuario:", error);
        token.hasCompletedData = false;
      }
      
      return token;
    },
    async session({ session, token }) {
      // Pasar la información del token a la sesión
      if (session.user) {
        // @ts-ignore - Añadir hasCompletedData a la sesión
        session.user.hasCompletedData = token.hasCompletedData;
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
