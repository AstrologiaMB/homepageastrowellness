import { PrismaClient } from '../prisma/generated/client';

const prisma = new PrismaClient();

async function main() {
    const email = process.argv[2];

    if (!email) {
        console.error('Por favor proporciona un email como argumento.');
        console.log('Uso: npx tsx scripts/verify-cache-clear.ts <email>');
        process.exit(1);
    }

    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            personalCalendarCache: true
        }
    });

    if (!user) {
        console.error(`Usuario con email ${email} no encontrado.`);
        process.exit(1);
    }

    console.log(`\n--- Verificación de Caché para: ${user.name || user.email} ---`);
    console.log(`ID Usuario: ${user.id}`);
    console.log(`Entradas en PersonalCalendarCache: ${user.personalCalendarCache.length}`);

    if (user.personalCalendarCache.length > 0) {
        console.log('Detalles:');
        user.personalCalendarCache.forEach(c => {
            console.log(` - Año: ${c.year}, Calculado: ${c.calculatedAt.toISOString()}`);
        });
    } else {
        console.log('✅ El caché está vacío.');
    }
    console.log('---------------------------------------------------\n');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
