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
