"use client";

import { Check, X } from "lucide-react";

export function ComparisonTable() {
    const features = [
        {
            name: "Precisión de Datos",
            traditional: "Signo Solar Genérico",
            astrochat: "Hora, Minuto y Grado Exacto",
        },
        {
            name: "Actualización",
            traditional: "Estática (Papel/PDF)",
            astrochat: "Tiempo Real (Fases Lunares)",
        },
        {
            name: "Profundidad",
            traditional: "Solo Tránsitos Básicos",
            astrochat: "Incluye Carta Dracónica (Alma)",
        },
        {
            name: "Personalización",
            traditional: "Para todos igual",
            astrochat: "Única para tu ADN Cósmico",
        },
        {
            name: "Herramientas Extras",
            traditional: "Ninguna",
            astrochat: "AstroGematría + Journal Lunar",
        },
    ];

    return (
        <section className="py-24 bg-[#080b12] border-t border-white/5 text-white">
            <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold font-serif mb-4">La Evolución de tu Agenda</h2>
                    <p className="text-gray-400">¿Por qué conformarte con generalidades cuando puedes tener precisión?</p>
                </div>

                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <div className="grid grid-cols-12 bg-white/5 p-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
                        <div className="col-span-4 md:col-span-5 pl-2">Característica</div>
                        <div className="col-span-4 md:col-span-3 text-center opacity-60">Agenda Común</div>
                        <div className="col-span-4 md:col-span-4 text-center text-[#D4AF37]">AstroChat</div>
                    </div>

                    <div className="divide-y divide-white/5">
                        {features.map((feature, idx) => (
                            <div key={idx} className="grid grid-cols-12 items-center p-4 hover:bg-white/5 transition-colors">
                                {/* Feature Name */}
                                <div className="col-span-4 md:col-span-5 font-medium text-gray-200 pl-2">
                                    {feature.name}
                                </div>

                                {/* Traditional (Negative) */}
                                <div className="col-span-4 md:col-span-3 flex flex-col items-center justify-center text-center">
                                    <span className="text-xs text-gray-500 mb-1 md:hidden">Agenda</span>
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <X className="h-4 w-4" />
                                        <span className="text-sm hidden md:inline">{feature.traditional}</span>
                                    </div>
                                </div>

                                {/* AstroChat (Positive) */}
                                <div className="col-span-4 md:col-span-4 flex flex-col items-center justify-center text-center bg-[#D4AF37]/5 -my-4 py-6 border-x border-[#D4AF37]/10">
                                    <span className="text-xs text-[#D4AF37] mb-1 md:hidden">AstroChat</span>
                                    <div className="flex items-center gap-2 text-[#D4AF37] font-semibold">
                                        <Check className="h-4 w-4" />
                                        <span className="text-sm hidden md:inline">{feature.astrochat}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
