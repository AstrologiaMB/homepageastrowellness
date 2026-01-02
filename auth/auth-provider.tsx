'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { useSession, signOut as nextAuthSignOut } from 'next-auth/react';
import { saveToStorage, loadFromStorage, clearFromStorage } from './utils/storage';
import { saveToken, clearAllTokens, getActiveToken, createAuthHeaders } from './utils/token';
import { loginUser, LoginCredentials } from './services/auth.service';
import { User, AuthContextType } from './types/auth.types';

const STORAGE_KEY = 'auth_user';
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
  // Custom auth state (email/password)
  const [customUser, setCustomUser] = useState<User | null>(null);
  const [customLoading, setCustomLoading] = useState(true);

  // next-auth state (Google OAuth)
  const { data: nextAuthSession, status: nextAuthStatus } = useSession();
  const nextAuthLoading = nextAuthStatus === 'loading';

  // Load custom auth user from storage on mount
  useEffect(() => {
    const storedUser = loadFromStorage<User>(STORAGE_KEY);
    if (storedUser) {
      setCustomUser(storedUser);
    }
    setCustomLoading(false);
  }, []);

  // Unified user: prefer custom auth, fallback to next-auth
  const user = useMemo<User | null>(() => {
    if (customUser) {
      return customUser;
    }
    if (nextAuthSession?.user) {
      // Map next-auth session to our User type
      return {
        id: (nextAuthSession.user as any).id,
        email: nextAuthSession.user.email || undefined,
        name: nextAuthSession.user.name || undefined,
        entitlements: (nextAuthSession.user as any).entitlements,
      };
    }
    return null;
  }, [customUser, nextAuthSession]);

  // Unified loading state: loading if EITHER source is loading
  const isLoading = customLoading || nextAuthLoading;

  // Unified authenticated state: authenticated if EITHER source has user
  const isAuthenticated = useMemo(() => !!user, [user]);

  // Email/password login (custom auth)
  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    setCustomLoading(true);
    try {
      const { token, user: userData } = await loginUser(credentials);
      saveToken('user', token);
      setCustomUser(userData);
      saveToStorage(STORAGE_KEY, userData);
    } finally {
      setCustomLoading(false);
    }
  }, []);

  // Unified logout: clears BOTH auth sources
  const logout = useCallback((): void => {
    // Clear custom auth
    setCustomUser(null);
    clearFromStorage(STORAGE_KEY);
    clearAllTokens();
    // Clear next-auth session (Google OAuth)
    nextAuthSignOut({ redirect: false });
  }, []);

  const getAuthHeaders = useCallback((): HeadersInit => {
    return createAuthHeaders();
  }, []);

  // Determine auth source (for debugging/logging)
  const authSource = useMemo(() => {
    if (customUser) return 'custom';
    if (nextAuthSession?.user) return 'google';
    return null;
  }, [customUser, nextAuthSession]);

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
