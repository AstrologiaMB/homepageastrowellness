"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; // Added this import
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, BookOpen, ArrowRight, Sparkles } from "lucide-react";

import { HelpSheet } from "@/components/help/help-sheet";
import { useUserNatalData } from "@/hooks/use-user-natal-data"; // Use shared hook
import { fetchPersonalCalendar, checkMicroserviceHealth } from "@/lib/personal-calendar-api"; // Use shared API

import { Suspense } from "react";

function ProcesandoDatosContent() {
    const [isReady, setIsReady] = useState(false);
    const [progress, setProgress] = useState(0);
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/calendario/personal";
    const { natalData, isLoading: isLoadingNatalData } = useUserNatalData(); // Fetch natal data

    // Trigger calculations on mount (Background Prefetch)
    useEffect(() => {
        const prefetchData = async () => {
            if (!natalData || isLoadingNatalData) return;

            try {
                // Fire and forget - trigger backend calculation with force=false (use cache or calc)
                console.log("Triggering calculation prefetch logic...");
                await fetchPersonalCalendar(natalData, false, undefined);
            } catch (e) {
                console.warn("Prefetch failed or running in background", e);
            }
        };

        if (natalData) {
            prefetchData();
        }
    }, [natalData, isLoadingNatalData]);

    // Simular progreso de cálculo (solo visual, para dar sensación de trabajo)
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsReady(true);
                    return 100;
                }
                // Incremento aleatorio para parecer "real"
                return prev + Math.random() * 10;
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <Card className="max-w-lg w-full shadow-xl bg-white border-indigo-100">
            <CardContent className="p-10 text-center space-y-8">

                {/* Header Animation */}
                <div className="relative h-24 w-24 mx-auto">
                    <div className="absolute inset-0 border-t-4 border-l-4 border-indigo-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-3 border-r-4 border-b-4 border-purple-600 rounded-full animate-[spin_3s_linear_infinite]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="h-8 w-8 text-amber-400 animate-pulse" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight text-indigo-950">
                        Calculando tu Universo...
                    </h1>
                    <p className="text-slate-600 text-lg leading-relaxed font-medium">
                        Estamos generando tus efemérides, cartas y tránsitos con precisión astronómica.
                    </p>
                    <p className="text-sm text-slate-500">
                        Ten un poco de paciencia, este cálculo garantiza la exactitud de tu reporte personal.
                    </p>
                </div>

                <div className="p-5 bg-indigo-50 rounded-lg border border-indigo-100 text-left space-y-3">
                    <div className="flex items-center gap-2 text-indigo-800 font-semibold">
                        <BookOpen className="h-5 w-5" />
                        <span>Mientras esperas...</span>
                    </div>
                    <p className="text-sm text-indigo-700">
                        Descubre cómo aprovechar al máximo tu nuevo dashboard astrológico.
                    </p>
                    <HelpSheet trigger={
                        <Button variant="link" className="text-indigo-600 p-0 h-auto hover:text-indigo-800 font-semibold px-0">
                            Leer Guía de Usuario <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                    } />
                </div>

                <div className="pt-4">
                    <Button
                        size="lg"
                        className={`w-full text-lg shadow-md transition-all duration-500 ${isReady ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                        onClick={() => {
                            if (isReady) {
                                window.location.href = callbackUrl; // Force full navigation to ensure fresh state
                            }
                        }}
                        disabled={!isReady}
                    >
                        {isReady ? (
                            <span>
                                {callbackUrl.includes('calendario') ? 'Ir a mi Calendario' : 'Continuar'}
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Procesando {Math.floor(progress)}%
                            </span>
                        )}
                    </Button>
                </div>

            </CardContent>
        </Card>
    );
}

export default function ProcesandoDatosPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
            <Suspense fallback={
                <div className="flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                </div>
            }>
                <ProcesandoDatosContent />
            </Suspense>
        </div>
    );
}
