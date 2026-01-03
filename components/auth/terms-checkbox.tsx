"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface TermsCheckboxProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
}

export function TermsCheckbox({ checked, onCheckedChange, disabled }: TermsCheckboxProps) {
    return (
        <div className="flex items-start space-x-2">
            <Checkbox
                id="terms"
                checked={checked}
                onCheckedChange={onCheckedChange}
                disabled={disabled}
                className="mt-1"
            />
            <div className="grid gap-1.5 leading-none">
                <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Acepto los{" "}
                    <Link
                        href="/legal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-semibold"
                    >
                        Términos y Condiciones y la Política de Privacidad
                    </Link>
                </Label>
                <p className="text-sm text-muted-foreground">
                    Es necesario aceptar para poder crear tu cuenta.
                </p>
            </div>
        </div>
    );
}
