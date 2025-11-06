import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface YearSelectorProps {
  selectedYear: number;
  availableYears: readonly number[];
  onYearChange: (year: number) => void;
}

export function YearSelector({
  selectedYear,
  availableYears,
  onYearChange
}: YearSelectorProps) {
  return (
    <Select value={selectedYear.toString()} onValueChange={(year) => onYearChange(parseInt(year))}>
      <SelectTrigger className="w-[110px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {availableYears.map(year => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
