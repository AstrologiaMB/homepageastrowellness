"use client";

import { CalendarioLunarWrapper } from "./CalendarioLunarWrapper";
import { ProtectedPage } from "@/components/protected-page";
import { RequireCompletedData } from "@/components/require-completed-data";

export default function CalendarioLunarPage() {
    return (
        <RequireCompletedData>
            <ProtectedPage>
                <CalendarioLunarWrapper />
            </ProtectedPage>
        </RequireCompletedData>
    );
}