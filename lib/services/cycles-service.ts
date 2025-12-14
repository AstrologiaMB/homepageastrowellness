import prisma from '@/lib/prisma';
import { getApiUrl } from '@/lib/api-config';

// TypeScript Interfaces for the Service
export interface CyclePhase {
    date: string; // ISO String
    phase: string;
    sign: string;
    degree: number;
    description: string;
    journal_entries?: Array<{
        id: string;
        date: Date;
        notes: string;
        eventType: string;
    }>;
}

export interface CycleFamily {
    family_sign: string;
    metonic_index: number;
    seed?: CyclePhase;
    action?: CyclePhase;
    fruition?: CyclePhase;
    release?: CyclePhase;
}

export interface ActiveCyclesResponse {
    date: string;
    active_cycles: CycleFamily[];
}

/**
 * Fetch active cycles from Python Microservice and enrich with Prisma Journal entries.
 */
export async function getCycleAnalysis(
    natalData: any, // Using 'any' for NatalData to avoid large interface duplication, or import if available
    targetDate: string,
    userId: string
): Promise<ActiveCyclesResponse> {
    const MICROSERVICE_URL = getApiUrl('CALENDARIO');

    // 1. Call Python Microservice
    const response = await fetch(`${MICROSERVICE_URL}/calculate-cycles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            birth_date: natalData.birth_date || `${natalData.year}-01-01`, // Fallback if missing, though schema requires it
            target_date: targetDate, // YYYY-MM-DD
            location: natalData.location
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Microservice Error: ${err}`);
    }

    const rawData: ActiveCyclesResponse = await response.json();

    // 2. Extract relevant dates to query Journal
    // We want to find journal entries AROUND the key dates (+/- 1 day)
    // To avoid hundreds of queries, we'll fetch a broad range or use specific dates.
    // Since we have specific dates (approx 4 per cycle * N cycles), let's collect them.

    const targetDates: Date[] = [];
    const phaseMap = new Map<string, CyclePhase>(); // Key: 'YYYY-MM-DD' -> Phase Object reference

    rawData.active_cycles.forEach(cycle => {
        [cycle.seed, cycle.action, cycle.fruition, cycle.release].forEach(phase => {
            if (phase && phase.date) {
                const d = new Date(phase.date);
                targetDates.push(d);
                // We iterate and link via reference
                // We'll process matching after fetching
            }
        });
    });

    if (targetDates.length === 0) {
        return rawData;
    }

    // 3. Query Prisma
    // We could optimize by finding Min/Max date, but cycles span 27 months. 
    // Better to use OR conditions for specific ranges.

    // Construct OR query for each date +/- 1 day
    const dateFilters = targetDates.map(date => {
        const start = new Date(date);
        start.setDate(start.getDate() - 2); // -2 days buffer
        const end = new Date(date);
        end.setDate(end.getDate() + 2); // +2 days buffer
        return {
            date: {
                gte: start,
                lte: end
            }
        };
    });

    // If too many filters, we might hit limits. But typically 1-2 active cycles = ~8 dates. Safe.
    const journalEntries = await prisma.lunarJournal.findMany({
        where: {
            userId: userId,
            OR: dateFilters
        },
        select: {
            id: true,
            date: true,
            notes: true,
            eventType: true
        }
    });

    // 4. Enrich Response
    // Iterate again and attach entries
    rawData.active_cycles.forEach(cycle => {
        [cycle.seed, cycle.action, cycle.fruition, cycle.release].forEach(phase => {
            if (phase && phase.date) {
                const phaseDate = new Date(phase.date);
                // Find entries within 36 hours (1.5 days)
                const matches = journalEntries.filter(entry => {
                    const diffTime = Math.abs(entry.date.getTime() - phaseDate.getTime());
                    const diffDays = diffTime / (1000 * 60 * 60 * 24);
                    return diffDays <= 1.5;
                });

                if (matches.length > 0) {
                    phase.journal_entries = matches;
                }
            }
        });
    });

    return rawData;
}
