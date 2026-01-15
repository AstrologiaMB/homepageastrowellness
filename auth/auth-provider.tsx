'use client';

import React, { createContext, useContext, useCallback, useMemo, ReactNode } from 'react';
import { useSession, signOut as nextAuthSignOut } from 'next-auth/react';
import { createAuthHeaders } from './utils/token';
import { loginUser, LoginCredentials } from './services/auth.service';
import { User, AuthContextType } from './types/auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // next-auth state (handles BOTH Google OAuth AND email/password)
  const { data: nextAuthSession, status: nextAuthStatus } = useSession();
  const isLoading = nextAuthStatus === 'loading';

  // Map next-auth session to our User type
  const user = useMemo<User | null>(() => {
    if (nextAuthSession?.user) {
      return {
        id: (nextAuthSession.user as any).id,
        email: nextAuthSession.user.email || undefined,
        name: nextAuthSession.user.name || undefined,
        hasCompletedData: (nextAuthSession.user as any).hasCompletedData,
        entitlements: (nextAuthSession.user as any).entitlements,
      };
    }
    return null;
  }, [nextAuthSession]);

  // Authenticated if we have a user from NextAuth session
  const isAuthenticated = useMemo(() => !!user, [user]);

  // Email/password login (delegates to NextAuth)
  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    // loginUser internally calls NextAuth signIn which creates the session
    await loginUser(credentials);
    // Session will be automatically updated by NextAuth
  }, []);

  // Logout: clears NextAuth session
  const logout = useCallback((): void => {
    // Clear NextAuth session (works for both Google OAuth and email/password)
    nextAuthSignOut({ redirect: false });
  }, []);

  const getAuthHeaders = useCallback((): HeadersInit => {
    return createAuthHeaders();
  }, []);

  // Determine auth source (for debugging/logging)
  const authSource = useMemo(() => {
    if (nextAuthSession?.user) {
      // Check if user logged in with Google or credentials
      return (nextAuthSession.user as any).image ? 'google' : 'credentials';
    }
    return null;
  }, [nextAuthSession]);

  const value = useMemo<AuthContextType>(() => ({
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    getAuthHeaders,
    authSource, // Optional: useful for debugging
  }), [user, isAuthenticated, isLoading, login, logout, getAuthHeaders, authSource]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
