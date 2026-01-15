"use client";

import { CalendarioLunarWrapper } from "./CalendarioLunarWrapper";
import { ProtectedPage } from "@/components/protected-page";

export default function CalendarioLunarPage() {
    return (
        <ProtectedPage>
            <CalendarioLunarWrapper />
        </ProtectedPage>
    );
}