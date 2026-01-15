export interface AuthConfig {
  isProduction: boolean
  useSecureCookies: boolean
  cookieName: string
  cookieOptions: {
    httpOnly: boolean
    sameSite: 'lax' | 'strict' | 'none'
    path: string
    secure: boolean
    domain?: string
  }
}

export const getAuthConfig = (): AuthConfig => {
  const isProduction = process.env.NEXTAUTH_URL?.startsWith('https://') ?? false

  const domain = isProduction ? '.fly.dev' : undefined

  return {
    isProduction,
    useSecureCookies: isProduction,
    cookieName: `${isProduction ? '__Secure-' : ''}next-auth.session-token`,
    cookieOptions: {
      httpOnly: true,
      sameSite: 'none',
      path: '/',
      secure: isProduction,
      domain,
    },
  }
}
