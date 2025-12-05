
import { PrismaClient } from '../prisma/generated/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🧹 Limpiando caché de cartas natales...');
    try {
        const deleted = await prisma.cartaNatal.deleteMany({});
        console.log(`✅ Eliminados ${deleted.count} registros de caché de CartaNatal.`);
    } catch (error) {
        console.error('❌ Error limpiando caché:', error);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
