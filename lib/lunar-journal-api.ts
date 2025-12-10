export interface JournalEntry {
    id: string;
    userId: string;
    date: string;
    eventType: string;
    notes: string;
    createdAt: string;
    updatedAt: string;
}

export async function fetchLunarJournal(year?: number): Promise<JournalEntry[]> {
    try {
        const params = new URLSearchParams();
        if (year) {
            const start = new Date(year, 0, 1).toISOString();
            const end = new Date(year, 11, 31).toISOString();
            params.append('start', start);
            params.append('end', end);
        }

        const res = await fetch(`/api/journal/lunar?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch journal");
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}
