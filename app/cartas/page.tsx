"use client";

import Link from "next/link";
import { ProtectedPage } from "@/components/protected-page";
import { Star, Compass, HelpCircle, MoveRight } from "lucide-react";

const charts = [
  {
    title: "Trópica",
    description: "Tu carta natal clásica",
    icon: Compass,
    href: "/cartas/tropica",
    color: "hover:border-white/30"
  },
  {
    title: "Dracónica",
    description: "Tu carta del alma",
    icon: Star,
    href: "/cartas/draconica",
    color: "hover:border-white/30"
  },
  {
    title: "Horaria",
    description: "¿Cuál es tu pregunta para el cielo?",
    icon: HelpCircle,
    href: "/cartas/horaria",
    color: "hover:border-white/30"
  }
];

export default function ChartsHub() {
  return (
    <ProtectedPage>
      <div className="min-h-screen bg-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-black">
            Cartas Astrales
          </h1>
          <p className="text-black/60 max-w-md mx-auto leading-relaxed">
            Explora los diferentes mapas del cielo
          </p>
        </div>

        {/* Chart Options */}
        <div className="space-y-4">
          {charts.map((chart, index) => {
            const Icon = chart.icon;
            return (
              <Link
                key={index}
                href={chart.href}
                className={`group block border border-black/10 ${chart.color} transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="p-8 md:p-10 flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <Icon className="w-8 h-8 text-black/70 group-hover:text-black transition-colors" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-xl md:text-2xl font-light text-black tracking-tight">
                        {chart.title}
                      </h2>
                      <p className="text-sm text-black/50">
                        {chart.description}
                      </p>
                    </div>
                  </div>
                  <MoveRight className="w-5 h-5 text-black/30 group-hover:text-black/60 group-hover:translate-x-1 transition-all" strokeWidth={1.5} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
    </ProtectedPage>
  );
}
