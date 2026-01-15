"use client";

import { CalendarioPersonalWrapper } from "./CalendarioPersonalWrapper";
import { ProtectedPage } from "@/components/protected-page";
import { RequireCompletedData } from "@/components/require-completed-data";

export default function CalendarioPersonalPage() {
  return (
    <RequireCompletedData>
      <ProtectedPage>
        <CalendarioPersonalWrapper />
      </ProtectedPage>
    </RequireCompletedData>
  );
}