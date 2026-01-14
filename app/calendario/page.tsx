"use client";

import Link from "next/link";
import { ProtectedPage } from "@/components/protected-page";
import { Calendar, Moon, Globe, MoveRight } from "lucide-react";

const calendars = [
  {
    title: "Personal",
    description: "Tu calendario astrológico personal",
    icon: Calendar,
    href: "/calendario/personal",
    color: "hover:border-white/30"
  },
  {
    title: "Lunar",
    description: "Tus ciclos lunares para el año",
    icon: Moon,
    href: "/calendario/lunar",
    color: "hover:border-white/30"
  },
  {
    title: "General",
    description: "Calendario astrológico para el año",
    icon: Globe,
    href: "/calendario/general",
    color: "hover:border-white/30"
  }
];

export default function CalendarHub() {
  return (
    <ProtectedPage>
      <div className="min-h-screen bg-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-black">
            Calendarios
          </h1>
          <p className="text-black/60 max-w-md mx-auto leading-relaxed">
            Selecciona el tipo de calendario que deseas consultar
          </p>
        </div>

        {/* Calendar Options */}
        <div className="space-y-4">
          {calendars.map((calendar, index) => {
            const Icon = calendar.icon;
            return (
              <Link
                key={index}
                href={calendar.href}
                className={`group block border border-black/10 ${calendar.color} transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="p-8 md:p-10 flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <Icon className="w-8 h-8 text-black/70 group-hover:text-black transition-colors" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-xl md:text-2xl font-light text-black tracking-tight">
                        {calendar.title}
                      </h2>
                      <p className="text-sm text-black/50">
                        {calendar.description}
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
