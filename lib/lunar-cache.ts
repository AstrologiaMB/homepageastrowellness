import prisma from '@/lib/prisma';

export interface CachedLunarData {
    events: any[];
    calculatedAt: string; // ISO string
}

const CACHE_DURATION_DAYS = 30; // Update monthly is enough for lunar phases, but they are static for a year/birthdata pair. 
// Actually, they depend on birth data. If birth data changes, userId might stay same? 
// The schema uses [userId, year]. If user changes birthdata, they are same user?
// Usually yes. But we can assume re-calculation happens if requested.

export async function getLunarCache(userId: string, year: number): Promise<CachedLunarData | null> {
    try {
        const cached = await prisma.lunarPhasesCache.findUnique({
            where: {
                userId_year: {
                    userId,
                    year,
                },
            },
        });

        if (!cached) return null;

        // We can filter by "expiresAt" if we added it, but LunarPhases are static for a person/year mostly.
        // However, if we improve calculation, we might want to expire it.
        // For now, simple retrieval.

        return {
            events: JSON.parse(cached.events),
            calculatedAt: cached.updatedAt.toISOString(),
        };
    } catch (error) {
        console.error('Error getting lunar cache:', error);
        return null;
    }
}

export async function setLunarCache(userId: string, year: number, events: any[]): Promise<boolean> {
    try {
        const data = JSON.stringify(events);

        await prisma.lunarPhasesCache.upsert({
            where: {
                userId_year: {
                    userId,
                    year,
                },
            },
            update: {
                events: data,
            },
            create: {
                userId,
                year,
                events: data,
            },
        });

        return true;
    } catch (error) {
        console.error('Error setting lunar cache:', error);
        return false;
    }
}
