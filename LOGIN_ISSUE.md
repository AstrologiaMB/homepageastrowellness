# LOGIN_ISSUE.md - Authentication System Migration Plan

## Overview

This document outlines a detailed plan to implement a **hybrid authentication system** that combines:
- **Custom auth provider** for email/password login (client-side, based on `examples/auth/`)
- **next-auth** for Google OAuth (preserved, server-side)

The goals are:

1.  Convert server components in `app/calendario` and `app/cartas` to client components
2.  Wrap these pages with a `ProtectedPage` component (adapted from `examples/protected-page.tsx`)
3.  Create a reduced auth provider for email/password login functionality
4.  Modify `app/auth/login/page.tsx` to use **both** authentication methods
5.  **Keep Google OAuth fully functional** via next-auth

---

## Current State Analysis

### Authentication Systems

| System | Location | Type | Description |
|--------|----------|------|-------------|
| **next-auth** | `app/auth/login/page.tsx` | Server-side | Currently uses `signIn` from `next-auth/react` |
| **Example Auth Provider** | `examples/auth/auth-provider.tsx` | Client-side | Full-featured gym system auth (gym-specific, has bookings, trainers, etc.) |
| **Example Auth Context** | `examples/auth/auth-context.tsx` | Client-side | Alternative implementation with inline utilities |

### Hybrid Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                       Login Page                                 │
├─────────────────────────────┬───────────────────────────────────┤
│   Email/Password Login      │      Google OAuth Login           │
│   ──────────────────────    │      ────────────────────         │
│   Uses: Custom AuthProvider │      Uses: next-auth signIn       │
│   API: /api/v1/login        │      API: /api/auth/[...nextauth] │
│   Storage: localStorage     │      Storage: HTTP-only cookies   │
└─────────────────────────────┴───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Unified Auth Context                            │
│  ────────────────────────────────────────────────────────────── │
│  Checks BOTH:                                                    │
│  - Custom auth (localStorage token)                              │
│  - next-auth session (useSession hook)                           │
│  Provides: isAuthenticated, user, entitlements                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ProtectedPage Component                       │
│  ────────────────────────────────────────────────────────────── │
│  Uses unified auth context to protect routes                     │
│  Checks entitlements for premium features                        │
└─────────────────────────────────────────────────────────────────┘
```

### Pages to Convert

#### `app/calendario/` Directory

| Page | Current Type | Layout Protection | Notes |
|------|-------------|-------------------|-------|
| [page.tsx](file:///Users/nicolasariasescudero/Downloads/homepageastrowellness/app/calendario/page.tsx) | **Client** (`"use client"`) | None | Hub page - links to sub-calendars |
| [personal/page.tsx](file:///Users/nicolasariasescudero/Downloads/homepageastrowellness/app/calendario/personal/page.tsx) | **Client** (`"use client"`) | Server layout checks `hasBaseBundle` | Uses `CalendarioPersonalWrapper` |
| [personal/layout.tsx](file:///Users/nicolasariasescudero/Downloads/homepageastrowellness/app/calendario/personal/layout.tsx) | **Server** | `getServerSession` + entitlements check | Redirects to `/login` or `/upgrade` |
| [lunar/page.tsx](file:///Users/nicolasariasescudero/Downloads/homepageastrowellness/app/calendario/lunar/page.tsx) | **Client** (`"use client"`) | Server layout checks `hasLunarCalendar` | Uses `CalendarioLunarWrapper` |
| [lunar/layout.tsx](file:///Users/nicolasariasescudero/Downloads/homepageastrowellness/app/calendario/lunar/layout.tsx) | **Server** | `getServerSession` + entitlements check | Redirects to `/login` or `/upgrade` |
| [general/page.tsx](file:///Users/nicolasariasescudero/Downloads/homepageastrowellness/app/calendario/general/page.tsx) | **Client** (`"use client"`) | None | Uses `CalendarioGeneral` component |

#### `app/cartas/` Directory

| Page | Current Type | Layout Protection | Notes |
|------|-------------|-------------------|-------|
| [page.tsx](file:///Users/nicolasariasescudero/Downloads/homepageastrowellness/app/cartas/page.tsx) | **Client** (`"use client"`) | None | Hub page - links to chart types |
| [tropica/page.tsx](file:///Users/nicolasariasescudero/Downloads/homepageastrowellness/app/cartas/tropica/page.tsx) | **Client** (`"use client"`) | Server layout checks `hasBaseBundle` | Full tropical chart page |
| [tropica/layout.tsx](file:///Users/nicolasariasescudero/Downloads/homepageastrowellness/app/cartas/tropica/layout.tsx) | **Server** | `getServerSession` + entitlements check | Redirects to `/login` or `/upgrade` |
| [draconica/page.tsx](file:///Users/nicolasariasescudero/Downloads/homepageastrowellness/app/cartas/draconica/page.tsx) | **Client** (`"use client"`) | Server layout checks `hasDraconicAccess` | Full draconic chart page |
| [draconica/layout.tsx](file:///Users/nicolasariasescudero/Downloads/homepageastrowellness/app/cartas/draconica/layout.tsx) | **Server** | `getServerSession` + entitlements check | Redirects to `/login` or `/upgrade` |
| [horaria/page.tsx](file:///Users/nicolasariasescudero/Downloads/homepageastrowellness/app/cartas/horaria/page.tsx) | **Client** (`"use client"`) | None (uses `useSession`) | Form-based page with its own auth check |

### Current Login Page

[app/auth/login/page.tsx](file:///Users/nicolasariasescudero/Downloads/homepageastrowellness/app/auth/login/page.tsx):
- Uses `next-auth/react` `signIn` function
- Supports email/password and Google OAuth
- Redirects to `/` on success

---

## Proposed Architecture

### New Files to Create

```
src/
├── auth/                           # Production auth module (NOT in examples)
│   ├── auth-provider.tsx          # [NEW] Reduced auth provider for astrology app
│   ├── auth-context.tsx           # [NEW] Context export and useAuth hook
│   ├── types/
│   │   └── auth.types.ts          # [NEW] Simplified types for astrology app
│   ├── utils/
│   │   ├── storage.ts             # [COPY] From examples/auth/utils/storage.ts
│   │   └── token.ts               # [COPY] From examples/auth/utils/token.ts
│   └── services/
│       └── auth.service.ts        # [NEW] Reduced auth service (login only)
├── components/
│   └── protected-page.tsx         # [NEW] Adapted from examples/protected-page.tsx
```

### Files to Modify

```
app/
├── auth/
│   └── login/
│       └── page.tsx               # [MODIFY] Replace next-auth with custom auth
├── calendario/
│   ├── page.tsx                   # [MODIFY] Wrap with ProtectedPage
│   ├── layout.tsx                 # [MODIFY] Remove server auth, keep as passthrough
│   ├── personal/
│   │   ├── page.tsx               # [MODIFY] Wrap with ProtectedPage
│   │   └── layout.tsx             # [MODIFY] Convert to client, remove getServerSession
│   ├── lunar/
│   │   ├── page.tsx               # [MODIFY] Wrap with ProtectedPage
│   │   └── layout.tsx             # [MODIFY] Convert to client, remove getServerSession
│   └── general/
│       └── page.tsx               # [MODIFY] Wrap with ProtectedPage
├── cartas/
│   ├── page.tsx                   # [MODIFY] Wrap with ProtectedPage
│   ├── layout.tsx                 # [MODIFY] Remove server auth, keep as passthrough
│   ├── tropica/
│   │   ├── page.tsx               # [MODIFY] Wrap with ProtectedPage
│   │   └── layout.tsx             # [MODIFY] Convert to client, remove getServerSession
│   ├── draconica/
│   │   ├── page.tsx               # [MODIFY] Wrap with ProtectedPage
│   │   └── layout.tsx             # [MODIFY] Convert to client, remove getServerSession
│   └── horaria/
│       └── page.tsx               # [MODIFY] Replace useSession with useAuth
├── layout.tsx                     # [MODIFY] Wrap with AuthProvider
```

---

## Detailed Implementation Steps

### Phase 1: Create Auth Infrastructure

#### Step 1.1: Create Simplified Auth Types

**File:** `src/auth/types/auth.types.ts`

```typescript
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
```

> [!NOTE]
> The types are intentionally simplified compared to the gym example. We remove:
> - `Admin`, `Trainer` roles (not needed for astrology app)
> - `bookings`, `weekly_sessions`, `plan_*` fields (gym-specific)
> - Password reset/OTP flows (can be added later if needed)

---

#### Step 1.2: Copy Utility Files

**Files to copy from examples:**
- `examples/auth/utils/storage.ts` → `src/auth/utils/storage.ts`
- `examples/auth/utils/token.ts` → `src/auth/utils/token.ts`

These files are generic and can be used as-is. They handle:
- LocalStorage operations with expiration
- JWT token management
- Auth header creation

---

#### Step 1.3: Create Reduced Auth Service

**File:** `src/auth/services/auth.service.ts`

```typescript
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
```

> [!IMPORTANT]
> This is a **minimal** auth service. It only handles login. Password reset, registration, and session refresh can be added incrementally.

---

#### Step 1.4: Create Unified Auth Provider (Hybrid: Custom + next-auth)

**File:** `src/auth/auth-provider.tsx`

The **unified auth provider** should:
1. Check **both** authentication sources:
   - Custom auth (localStorage token) for email/password login
   - next-auth session (useSession hook) for Google OAuth login
2. Merge user data from either source into a unified `user` object
3. Handle email/password login via custom flow
4. Allow Google OAuth to continue working via next-auth
5. Provide unified `isAuthenticated` and `isLoading` flags

> [!IMPORTANT]
> **This is the key to the hybrid approach**: The provider checks both auth sources and considers the user authenticated if **either** source has a valid session.

**Implementation outline:**

```typescript
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
```

> [!TIP]
> The `authSource` field is optional but useful for debugging. It tells you whether the current user authenticated via email/password (`'custom'`) or Google OAuth (`'google'`).

---

#### Step 1.5: Create ProtectedPage Component

**File:** `src/components/protected-page.tsx`

Adapted from `examples/protected-page.tsx`, simplified for this app:

```typescript
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/auth/auth-provider';
import { useRouter } from 'next/navigation';

interface ProtectedPageProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
  /**
   * Optional: Check for specific entitlements
   */
  requiredEntitlement?: 'hasBaseBundle' | 'hasLunarCalendar' | 'hasDraconicAccess';
  /**
   * Redirect path if entitlement check fails
   */
  entitlementRedirect?: string;
}

export const ProtectedPage: React.FC<ProtectedPageProps> = ({
  children,
  fallback,
  redirectTo = '/auth/login',
  requiredEntitlement,
  entitlementRedirect = '/upgrade',
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace(redirectTo);
      } else if (requiredEntitlement) {
        // Check entitlement
        const hasEntitlement = user?.entitlements?.[requiredEntitlement];
        if (!hasEntitlement) {
          router.replace(entitlementRedirect);
        } else {
          setIsChecking(false);
        }
      } else {
        setIsChecking(false);
      }
    }
  }, [isAuthenticated, isLoading, router, redirectTo, requiredEntitlement, entitlementRedirect, user]);

  if (isLoading || isChecking) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-border mx-auto mb-4" />
            <p>Cargando...</p>
          </div>
        </div>
      )
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
```

> [!TIP]
> The `requiredEntitlement` prop allows specifying which premium feature is required, mimicking the current layout-based entitlement checks.

---

### Phase 2: Wrap Root Layout with AuthProvider

#### Step 2.1: Modify App Layout

**File:** `app/layout.tsx`

```typescript
import { AuthProvider } from '@/auth/auth-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          {/* existing layout content */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

---

### Phase 3: Modify Login Page (Hybrid Approach)

#### Step 3.1: Update Login Page for Dual Auth

**File:** `app/auth/login/page.tsx`

**Changes:**
1. **Keep** `import { signIn } from 'next-auth/react'` for Google OAuth
2. **Add** `import { useAuth } from '@/auth/auth-provider'` for email/password
3. Replace `signIn('credentials', ...)` with `login(credentials)` from custom auth
4. **Keep** `signIn('google', ...)` unchanged for Google OAuth

**Key code changes:**

```typescript
// IMPORTS: Keep BOTH
import { signIn } from 'next-auth/react';  // Keep for Google OAuth
import { useAuth } from '@/auth/auth-provider';  // Add for email/password

// In component:
const { login } = useAuth();
const [isLoading, setIsLoading] = useState(false);

// Email/Password Login - Use custom auth
const handleEmailLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  try {
    await login({
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    });
    router.refresh();
    router.push('/');
  } catch (error) {
    setError('Email o contraseña incorrectos');
  } finally {
    setIsLoading(false);
  }
};

// Google OAuth Login - Keep using next-auth (UNCHANGED)
const handleGoogleLogin = async () => {
  setIsLoading(true);
  try {
    await signIn('google', { callbackUrl: '/' });  // Still uses next-auth
  } catch (error) {
    console.error('Error:', error);
    setError('Error al iniciar sesión con Google');
    setIsLoading(false);
  }
};
```

> [!NOTE]
> **Google OAuth is fully preserved!** The `signIn('google', ...)` call continues to work via next-auth. Only email/password login switches to the custom auth provider.

---

### Phase 4: Convert Protected Pages

#### Step 4.1: Convert calendario Layouts

**Files to modify:**
- `app/calendario/personal/layout.tsx`
- `app/calendario/lunar/layout.tsx`

**Change from:**
```typescript
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Layout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");
  // ...entitlement checks
  return <>{children}</>;
}
```

**Change to:**
```typescript
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

> [!IMPORTANT]
> Protection moves from layout to page component via `ProtectedPage` wrapper.

---

#### Step 4.2: Wrap calendario Pages with ProtectedPage

**Example: `app/calendario/personal/page.tsx`**

```typescript
"use client";

import { CalendarioPersonalWrapper } from "./CalendarioPersonalWrapper";
import { ProtectedPage } from "@/components/protected-page";

export default function CalendarioPersonalPage() {
  return (
    <ProtectedPage 
      requiredEntitlement="hasBaseBundle"
      entitlementRedirect="/upgrade"
    >
      <CalendarioPersonalWrapper />
    </ProtectedPage>
  );
}
```

**Apply same pattern to:**
- `app/calendario/page.tsx` (no entitlement, just auth)
- `app/calendario/lunar/page.tsx` (requiredEntitlement="hasLunarCalendar")
- `app/calendario/general/page.tsx` (no entitlement, just auth)

---

#### Step 4.3: Convert cartas Layouts and Pages

**Same pattern as calendario:**

| File | Required Entitlement |
|------|---------------------|
| `app/cartas/page.tsx` | None (just auth) |
| `app/cartas/tropica/page.tsx` | `hasBaseBundle` |
| `app/cartas/draconica/page.tsx` | `hasDraconicAccess` |
| `app/cartas/horaria/page.tsx` | None (uses form, just auth) |

---

#### Step 4.4: Update cartas/horaria/page.tsx

This page currently uses `useSession` from next-auth. Replace with the unified `useAuth`:

```typescript
// BEFORE
import { useSession } from "next-auth/react";
const { data: session, status } = useSession();

// AFTER
import { useAuth } from "@/auth/auth-provider";
const { user, isAuthenticated, isLoading } = useAuth();

// Replace session checks with isAuthenticated
// Replace session?.user?.email with user?.email
// Replace status === "loading" with isLoading
// Replace status === "authenticated" with isAuthenticated
```

> [!NOTE]
> The unified `useAuth` hook works regardless of whether the user logged in via email/password or Google OAuth. The page doesn't need to know which auth method was used.

---

### Phase 5: Summary of All File Changes

#### New Files

| Path | Description |
|------|-------------|
| `src/auth/auth-provider.tsx` | Main auth provider with login/logout |
| `src/auth/types/auth.types.ts` | TypeScript types for User and AuthContext |
| `src/auth/utils/storage.ts` | LocalStorage utilities (copy from examples) |
| `src/auth/utils/token.ts` | Token management utilities (copy from examples) |
| `src/auth/services/auth.service.ts` | Login API service |
| `src/components/protected-page.tsx` | Wrapper for protected routes |

#### Modified Files

| Path | Change Type | Description |
|------|-------------|-------------|
| `app/layout.tsx` | Wrap with AuthProvider | Add AuthProvider to root |
| `app/auth/login/page.tsx` | Major rewrite | Replace next-auth with useAuth |
| `app/calendario/personal/layout.tsx` | Simplify | Remove server auth, keep passthrough |
| `app/calendario/personal/page.tsx` | Wrap | Add ProtectedPage wrapper |
| `app/calendario/lunar/layout.tsx` | Simplify | Remove server auth |
| `app/calendario/lunar/page.tsx` | Wrap | Add ProtectedPage wrapper |
| `app/calendario/general/page.tsx` | Wrap | Add ProtectedPage wrapper |
| `app/calendario/page.tsx` | Wrap | Add ProtectedPage wrapper |
| `app/cartas/tropica/layout.tsx` | Simplify | Remove server auth |
| `app/cartas/tropica/page.tsx` | Wrap | Add ProtectedPage wrapper |
| `app/cartas/draconica/layout.tsx` | Simplify | Remove server auth |
| `app/cartas/draconica/page.tsx` | Wrap | Add ProtectedPage wrapper |
| `app/cartas/horaria/page.tsx` | Replace imports | Change useSession to useAuth |
| `app/cartas/page.tsx` | Wrap | Add ProtectedPage wrapper |

---

## Considerations and Risks

> [!NOTE]
> ### Preserved Functionality
> 
> ✅ **Google OAuth is fully preserved** via next-auth
> ✅ Existing users who signed up with Google can continue to log in
> ✅ next-auth session cookies remain valid

> [!WARNING]
> ### API Compatibility
> 
> The custom auth system expects these API endpoints:
> - `POST /api/v1/login` - Returns `{ token, user }` with user containing `entitlements`
> 
> **Verify the backend API matches this structure before implementation.**

> [!IMPORTANT]
> ### Entitlements Handling
> 
> The unified auth provider must handle entitlements from **both** sources:
> 
> | Auth Source | Entitlements Location |
> |-------------|----------------------|
> | Email/Password (custom) | Login API response: `response.user.entitlements` |
> | Google OAuth (next-auth) | Session object: `session.user.entitlements` |
> 
> Both are already mapped in the unified auth provider above.

> [!CAUTION]
> ### Dual Session Logout
> 
> The logout function must clear **both** auth sources:
> - Clear localStorage (custom auth)
> - Call `signOut()` from next-auth (Google OAuth)
> 
> This is already handled in the unified auth provider implementation.

---

## Implementation Order

1. **Phase 1.1-1.5**: Create all auth infrastructure files
2. **Phase 2**: Add AuthProvider to root layout
3. **Phase 3**: Update login page (test login works)
4. **Phase 4**: Convert layouts one by one (test each)
5. **Phase 4**: Wrap pages with ProtectedPage (test each)
6. **Final**: Remove unused next-auth references

---

## Testing Checklist

### Email/Password Login (Custom Auth)
- [ ] Login with email/password works
- [ ] User persists across page refreshes (localStorage)
- [ ] Logout clears localStorage session
- [ ] API calls include auth headers with JWT token
- [ ] Token expires and user is logged out

### Google OAuth Login (next-auth)
- [ ] Login with Google works
- [ ] User persists across page refreshes (cookies)
- [ ] Logout clears next-auth session
- [ ] User entitlements are read from session

### Unified Auth (Both Methods)
- [ ] `useAuth()` returns correct user for both auth methods
- [ ] `isAuthenticated` is true for both auth methods
- [ ] Protected pages work with both auth methods
- [ ] Unauthenticated users redirect to login
- [ ] Entitlement checks redirect to /upgrade
- [ ] Logout clears BOTH auth sources

---

## Future Enhancements

- [ ] Add password reset flow (email verification)
- [ ] Add session refresh/status check for custom auth
- [ ] Add registration flow for custom auth
- [ ] Add remember me functionality
- [ ] Add token refresh before expiration
- [ ] Add Apple Sign-In (via next-auth)
- [ ] Migrate fully to custom auth (optional, if next-auth becomes unnecessary)
