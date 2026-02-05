import {
  startOfWeek,
  endOfWeek,
  isSameWeek,
  addWeeks,
  endOfMonth,
  getYear,
  getMonth,
  format,
} from 'date-fns';
import { es } from 'date-fns/locale';

// Get the start and end dates of a week
export function getWeekRange(date: Date): { start: Date; end: Date } {
  const start = startOfWeek(date, { locale: es });
  const end = endOfWeek(date, { locale: es });
  return { start, end };
}

// Check if two dates are in the same week
export function areDatesInSameWeek(date1: Date, date2: Date): boolean {
  return isSameWeek(date1, date2, { locale: es });
}

// Get a list of weeks for a given month with sequential week numbers
export function getWeeksOfMonth(
  year: number,
  month: number
): { start: Date; end: Date; weekNumber: number }[] {
  const weeks: { start: Date; end: Date; weekNumber: number }[] = [];
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = endOfMonth(firstDayOfMonth);

  let currentWeekStart = startOfWeek(firstDayOfMonth, { locale: es });
  let weekCounter = 1;

  while (currentWeekStart <= lastDayOfMonth) {
    const currentWeekEnd = endOfWeek(currentWeekStart, { locale: es });
    weeks.push({ start: currentWeekStart, end: currentWeekEnd, weekNumber: weekCounter });
    currentWeekStart = addWeeks(currentWeekStart, 1);
    weekCounter++;
  }

  return weeks;
}

// Format a week range for display with sequential week number (e.g., "Semana 1: 01/03 – 07/03")
export function formatWeekRange(start: Date, end: Date, weekNumber: number): string {
  const startDay = format(start, 'dd', { locale: es });
  const startMonth = format(start, 'MM', { locale: es });
  const endDay = format(end, 'dd', { locale: es });
  const endMonth = format(end, 'MM', { locale: es });

  return `Semana ${weekNumber}: ${startDay}/${startMonth} – ${endDay}/${endMonth}`;
}

// Get the month and year as a string (e.g., "Abril 2025")
export function formatMonthYear(date: Date): string {
  return format(date, 'MMMM yyyy', { locale: es });
}

// Get the month number (0-indexed)
export function getMonthNumber(date: Date): number {
  return getMonth(date);
}

// Get the year
export function getYearNumber(date: Date): number {
  return getYear(date);
}

/**
 * Convierte una fecha/hora UTC a formato local legible
 * @param utcDateTimeString - Fecha y hora en formato UTC (YYYY-MM-DDTHH:MM:SSZ)
 * @returns Fecha y hora formateada en hora local (DD/MM/YYYY - HH:MM)
 */
export function formatLocalDateTime(utcDateTimeString: string): string {
  const date = new Date(utcDateTimeString);

  // Formato: "DD/MM/YYYY - HH:MM"
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${date.getFullYear()} - ${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
}

/**
 * Convierte una fecha y hora UTC a un objeto Date
 * @param dateUtc - Fecha en formato YYYY-MM-DD
 * @param timeUtc - Hora en formato HH:MM
 * @returns Objeto Date con la fecha y hora convertida
 */
export function createDateFromUtc(dateUtc: string, timeUtc: string): Date {
  // If dateUtc is already an ISO string (contains 'T'), parse it directly
  if (dateUtc.includes('T')) {
    return new Date(dateUtc);
  }
  // Legacy fallback: Construct ISO string from parts
  return new Date(`${dateUtc}T${timeUtc}:00Z`);
}
