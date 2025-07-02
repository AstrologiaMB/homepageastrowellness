const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function clearNatalChartCache() {
  try {
    console.log('🧹 Limpiando caché de cartas natales...');
    
    // Eliminar todas las cartas natales en caché
    const deletedRecords = await prisma.cartaNatal.deleteMany({});
    
    console.log(`✅ Caché limpiado exitosamente: ${deletedRecords.count} registros eliminados`);
    console.log('📝 Todas las cartas natales serán recalculadas con las fechas corregidas');
    
  } catch (error) {
    console.error('❌ Error limpiando caché:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearNatalChartCache();
