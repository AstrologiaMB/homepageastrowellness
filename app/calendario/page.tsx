"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Moon, Globe } from "lucide-react";

export default function CalendarHub() {
    return (
        <div className="container mx-auto p-6 md:p-12 space-y-8 animate-in fade-in zoom-in duration-500">
            <header className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-serif text-slate-800 mb-2">
                    Calendarios
                </h1>
                <p className="text-muted-foreground">
                    Selecciona el tipo de calendario que deseas consultar.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* 1. Personal */}
                <Link href="/calendario/personal" className="group">
                    <Card className="h-full hover:shadow-lg hover:border-purple-300 transition-all cursor-pointer group-hover:-translate-y-1">
                        <CardHeader className="text-center flex flex-col items-center">
                            <div className="p-4 rounded-full bg-purple-50 group-hover:bg-purple-100 mb-4 transition-colors">
                                <Calendar className="w-8 h-8 text-purple-600" />
                            </div>
                            <CardTitle className="text-xl text-slate-800">Personal</CardTitle>
                            <CardDescription className="text-center mt-2">
                                Tu calendario astrólogico.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                {/* 2. Lunar */}
                <Link href="/calendario/lunar" className="group">
                    <Card className="h-full hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group-hover:-translate-y-1">
                        <CardHeader className="text-center flex flex-col items-center">
                            <div className="p-4 rounded-full bg-blue-50 group-hover:bg-blue-100 mb-4 transition-colors">
                                <Moon className="w-8 h-8 text-blue-600" />
                            </div>
                            <CardTitle className="text-xl text-slate-800">Lunar</CardTitle>
                            <CardDescription className="text-center mt-2">
                                Tus ciclos lunares para el año.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                {/* 3. General */}
                <Link href="/calendario/general" className="group">
                    <Card className="h-full hover:shadow-lg hover:border-amber-300 transition-all cursor-pointer group-hover:-translate-y-1">
                        <CardHeader className="text-center flex flex-col items-center">
                            <div className="p-4 rounded-full bg-amber-50 group-hover:bg-amber-100 mb-4 transition-colors">
                                <Globe className="w-8 h-8 text-amber-600" />
                            </div>
                            <CardTitle className="text-xl text-slate-800">General</CardTitle>
                            <CardDescription className="text-center mt-2">
                                Calendario astrológico para el año.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
