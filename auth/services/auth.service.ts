import { signIn } from 'next-auth/react';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    entitlements?: {
      hasBaseBundle?: boolean;
      hasLunarCalendar?: boolean;
      hasDraconicAccess?: boolean;
    };
  };
}

export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  // Use NextAuth's signIn with credentials provider
  const result = await signIn('credentials', {
    email: credentials.email,
    password: credentials.password,
    redirect: false,
  });

  if (!result?.ok || result?.error) {
    throw new Error('Credenciales inválidas');
  }

  // Return a mock response since NextAuth handles the session
  // The actual user data will come from the session
  return {
    token: 'nextauth-session', // NextAuth uses sessions, not tokens
    user: {
      id: '', // Will be populated from session
      email: credentials.email,
      name: '',
      role: 'user',
    },
  };
}
