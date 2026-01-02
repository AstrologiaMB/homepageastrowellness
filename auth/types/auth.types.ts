// Simplified user type for astrology app (no gym-specific fields)
export interface User {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
  // Astrology-specific entitlements
  entitlements?: {
    hasBaseBundle?: boolean;
    hasLunarCalendar?: boolean;
    hasDraconicAccess?: boolean;
  };
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  getAuthHeaders: () => HeadersInit;
  authSource?: 'custom' | 'google' | null;  // Optional: for debugging
}
