"use client";

import { CalendarioPersonalWrapper } from "./CalendarioPersonalWrapper";
import { ProtectedPage } from "@/components/protected-page";

export default function CalendarioPersonalPage() {
  return (
    <ProtectedPage>
      <CalendarioPersonalWrapper />
    </ProtectedPage>
  );
}