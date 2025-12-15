"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star, Compass, HelpCircle } from "lucide-react";

export default function ChartsHub() {
    return (
        <div className="container mx-auto p-6 md:p-12 space-y-8 animate-in fade-in zoom-in duration-500">
            <header className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-serif text-slate-800 mb-2">
                    Cartas Astrales
                </h1>
                <p className="text-muted-foreground">
                    Explora los diferentes mapas del cielo.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* 1. Tropica */}
                <Link href="/cartas/tropica" className="group">
                    <Card className="h-full hover:shadow-lg hover:border-orange-300 transition-all cursor-pointer group-hover:-translate-y-1">
                        <CardHeader className="text-center flex flex-col items-center">
                            <div className="p-4 rounded-full bg-orange-50 group-hover:bg-orange-100 mb-4 transition-colors">
                                <Compass className="w-8 h-8 text-orange-600" />
                            </div>
                            <CardTitle className="text-xl text-slate-800">Trópica</CardTitle>
                            <CardDescription className="text-center mt-2">
                                Tu carta natal clásica.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                {/* 2. Draconica */}
                <Link href="/cartas/draconica" className="group">
                    <Card className="h-full hover:shadow-lg hover:border-indigo-300 transition-all cursor-pointer group-hover:-translate-y-1">
                        <CardHeader className="text-center flex flex-col items-center">
                            <div className="p-4 rounded-full bg-indigo-50 group-hover:bg-indigo-100 mb-4 transition-colors">
                                <Star className="w-8 h-8 text-indigo-600" />
                            </div>
                            <CardTitle className="text-xl text-slate-800">Dracónica</CardTitle>
                            <CardDescription className="text-center mt-2">
                                Tu carta del alma.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                {/* 3. Horaria */}
                <Link href="/cartas/horaria" className="group">
                    <Card className="h-full hover:shadow-lg hover:border-emerald-300 transition-all cursor-pointer group-hover:-translate-y-1">
                        <CardHeader className="text-center flex flex-col items-center">
                            <div className="p-4 rounded-full bg-emerald-50 group-hover:bg-emerald-100 mb-4 transition-colors">
                                <HelpCircle className="w-8 h-8 text-emerald-600" />
                            </div>
                            <CardTitle className="text-xl text-slate-800">Horaria</CardTitle>
                            <CardDescription className="text-center mt-2">
                                ¿Cuál es tu pregunta para el cielo?
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
