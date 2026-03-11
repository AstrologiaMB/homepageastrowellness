const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearCache() {
    try {
        const deleted = await prisma.personalCalendarCache.deleteMany({});
        console.log(`✅ Cache total eliminado: ${deleted.count} entradas`);

        // También limpiamos el cache lunar por si acaso
        const deletedLunar = await prisma.lunarCalendarCache.deleteMany({});
        console.log(`🌙 Cache lunar eliminado: ${deletedLunar.count} entradas`);

    } catch (error) {
        console.error('❌ Error limpiando cache:', error);
    } finally {
        await prisma.$disconnect();
    }
}

clearCache();
