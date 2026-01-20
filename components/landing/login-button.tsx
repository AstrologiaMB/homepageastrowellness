'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

export function LoginButton() {
  const { status } = useSession();

  // Only show when not authenticated
  if (status === 'authenticated') {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        asChild
        variant="outline"
        className="bg-[#0B0F19]/50 backdrop-blur-md border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B0F19] font-light"
      >
        <Link href="/auth/login">Ingresar</Link>
      </Button>
    </div>
  );
}
