export interface CookieOption {
  name: string
  options: {
    httpOnly: boolean
    sameSite: 'lax' | 'strict' | 'none'
    path: string
    secure: boolean
  }
}

export interface AuthConfig {
  isProduction: boolean
  useSecureCookies: boolean
  cookieName: string
  cookieOptions: {
    httpOnly: boolean
    sameSite: 'lax' | 'strict' | 'none'
    path: string
    secure: boolean
  }
  stateCookie: CookieOption
  csrfTokenCookie: CookieOption
  pkceCodeVerifierCookie: CookieOption
  callbackUrlCookie: CookieOption
}

export const getAuthConfig = (): AuthConfig => {
  const isProduction = process.env.NEXTAUTH_URL?.startsWith('https://') ?? false

  const cookieOptions = {
    httpOnly: true,
    sameSite: 'lax' as const,
    path: '/',
    secure: isProduction,
  }

  return {
    isProduction,
    useSecureCookies: isProduction,
    cookieName: `${isProduction ? '__Secure-' : ''}next-auth.session-token`,
    cookieOptions,
    stateCookie: {
      name: `${isProduction ? '__Secure-' : ''}next-auth.state`,
      options: cookieOptions,
    },
    csrfTokenCookie: {
      name: `${isProduction ? '__Host-' : ''}next-auth.csrf-token`,
      options: { ...cookieOptions, ...(isProduction ? { sameSite: 'lax' as const } : {}) },
    },
    pkceCodeVerifierCookie: {
      name: `${isProduction ? '__Secure-' : ''}next-auth.pkce.code_verifier`,
      options: cookieOptions,
    },
    callbackUrlCookie: {
      name: `${isProduction ? '__Secure-' : ''}next-auth.callback-url`,
      options: cookieOptions,
    },
  }
}
