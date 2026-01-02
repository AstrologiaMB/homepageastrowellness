const AUTH_API_BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:8001/api/v1';

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
  const response = await fetch(`${AUTH_API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Credenciales inválidas');
  }

  return response.json();
}
