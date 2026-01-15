import NextAuth from "next-auth"
import { getAuthUrl } from "@/lib/auth-url"
import { getBaseAuthOptions } from "@/lib/auth-config"

async function createHandler(req: Request) {
  const authUrl = await getAuthUrl()
  
  process.env.NEXTAUTH_URL = authUrl
  
  const authOptions = getBaseAuthOptions()
  
  const handler = NextAuth(authOptions as any)
  return handler(req)
}

export { createHandler as GET, createHandler as POST };
