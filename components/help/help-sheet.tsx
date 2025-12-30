"use client";

import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Search, HelpCircle, FileQuestion } from "lucide-react";
import { HELP_CONTENT, HelpCategory } from "./help-content";

export function HelpSheet() {
    const [searchQuery, setSearchQuery] = useState("");
    const [open, setOpen] = useState(false);

    // Filter content based on search query
    const filteredContent = HELP_CONTENT.map((category) => ({
        ...category,
        items: category.items.filter(
            (item) =>
                item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        ),
    })).filter((category) => category.items.length > 0);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Ayuda</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] flex flex-col h-full">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-purple-600" />
                        Centro de Ayuda Astrochat
                    </SheetTitle>
                    <SheetDescription>
                        Encuentra respuestas rápidas sin salir de tu sesión.
                    </SheetDescription>
                </SheetHeader>

                {/* Search */}
                <div className="py-6">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar (ej: cancelar, carta dracónica...)"
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Content */}
                <ScrollArea className="flex-1 pr-4 -mr-4">
                    <div className="space-y-6 pb-8">
                        {filteredContent.length > 0 ? (
                            filteredContent.map((category) => (
                                <div key={category.id} className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                        <category.icon className="h-4 w-4" />
                                        {category.title}
                                    </div>

                                    <Accordion type="single" collapsible className="w-full">
                                        {category.items.map((item, index) => (
                                            <AccordionItem key={index} value={`${category.id}-${index}`}>
                                                <AccordionTrigger className="text-left text-sm hover:text-purple-600">
                                                    {item.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                                    {item.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <FileQuestion className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                <p>No encontramos resultados para "{searchQuery}"</p>
                                <Button
                                    variant="link"
                                    onClick={() => setSearchQuery("")}
                                    className="mt-2"
                                >
                                    Ver todos los temas
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Contact Support Footer */}
                    <div className="mt-8 p-4 bg-muted/50 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground mb-2">
                            ¿No encuentras lo que buscas?
                        </p>
                        <Button variant="outline" size="sm" asChild>
                            <a href="mailto:info@astrochat.online">Contactar Soporte Humano</a>
                        </Button>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
