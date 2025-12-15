"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calculator, Sparkles } from "lucide-react";

export default function AstrogematriaHub() {
    return (
        <div className="container mx-auto p-6 md:p-12 space-y-8 animate-in fade-in zoom-in duration-500">
            <header className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-serif text-slate-800 mb-2">
                    Astrogematría
                </h1>
                <p className="text-muted-foreground">
                    Descubre los valores numéricos y sus significados ocultos.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {/* 1. Calculadora */}
                <Link href="/astrogematria/calculos" className="group">
                    <Card className="h-full hover:shadow-lg hover:border-pink-300 transition-all cursor-pointer group-hover:-translate-y-1">
                        <CardHeader className="text-center flex flex-col items-center">
                            <div className="p-4 rounded-full bg-pink-50 group-hover:bg-pink-100 mb-4 transition-colors">
                                <Calculator className="w-8 h-8 text-pink-600" />
                            </div>
                            <CardTitle className="text-xl text-slate-800">Astrogematría</CardTitle>
                            <CardDescription className="text-center mt-2">
                                Calculadora astrogematrica
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                {/* 2. Interpretaciones */}
                <Link href="/astrogematria/interpretaciones" className="group">
                    <Card className="h-full hover:shadow-lg hover:border-teal-300 transition-all cursor-pointer group-hover:-translate-y-1">
                        <CardHeader className="text-center flex flex-col items-center">
                            <div className="p-4 rounded-full bg-teal-50 group-hover:bg-teal-100 mb-4 transition-colors">
                                <Sparkles className="w-8 h-8 text-teal-600" />
                            </div>
                            <CardTitle className="text-xl text-slate-800">Homeopatía</CardTitle>
                            <CardDescription className="text-center mt-2">
                                Valores astrogemátricos.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
