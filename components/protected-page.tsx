'use client';

import { useAuth } from '@/auth/auth-provider';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

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
  /**
   * Optional: Require user to have completed their profile data
   */
  requireCompletedData?: boolean;
  /**
   * Redirect path if data completion check fails
   */
  dataRedirect?: string;
}

export const ProtectedPage: React.FC<ProtectedPageProps> = ({
  children,
  fallback,
  redirectTo = '/auth/login',
  requiredEntitlement,
  entitlementRedirect = '/upgrade',
  requireCompletedData = false,
  dataRedirect = '/completar-datos',
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // 1. Authentication check - always first
      if (!isAuthenticated) {
        router.replace(redirectTo);
        return;
      }

      // 2. Entitlement check - if required
      if (requiredEntitlement) {
        const hasEntitlement = user?.entitlements?.[requiredEntitlement];
        if (!hasEntitlement) {
          const url = `${entitlementRedirect}?callbackUrl=${encodeURIComponent(pathname)}`;
          router.replace(url);
          return;
        }
      }

      // 3. Data completion check - if required (always after entitlement)
      if (requireCompletedData && !user?.hasCompletedData) {
        const url = `${dataRedirect}?callbackUrl=${encodeURIComponent(pathname)}`;
        router.replace(url);
        return;
      }

      setIsChecking(false);
    }
  }, [
    isAuthenticated,
    isLoading,
    router,
    redirectTo,
    requiredEntitlement,
    entitlementRedirect,
    requireCompletedData,
    dataRedirect,
    pathname,
    user,
  ]);

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

  // Entitlement check for render (belt and suspenders)
  if (requiredEntitlement && !user?.entitlements?.[requiredEntitlement]) {
    return null;
  }

  // Data completion check for render (belt and suspenders)
  if (requireCompletedData && !user?.hasCompletedData) {
    return null;
  }

  return <>{children}</>;
};
