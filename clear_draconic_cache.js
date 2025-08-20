/**
 * Script para limpiar el caché de cartas dracónicas en PostgreSQL
 * Esto forzará que se use el algoritmo corregido de alta precisión
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function clearDraconicCache() {
  try {
    console.log('🔍 Iniciando limpieza de caché de cartas dracónicas...');
    
    // Obtener estadísticas antes de la limpieza
    const totalCartas = await prisma.cartaNatal.count();
    const cartasDraconicas = await prisma.cartaNatal.count({
      where: { tipo: 'draconica' }
    });
    
    console.log(`📊 Estado actual del caché:`);
    console.log(`   - Total de cartas: ${totalCartas}`);
    console.log(`   - Cartas dracónicas: ${cartasDraconicas}`);
    console.log(`   - Cartas tropicales: ${totalCartas - cartasDraconicas}`);
    
    if (cartasDraconicas === 0) {
      console.log('✅ No hay cartas dracónicas en caché. No es necesario limpiar.');
      return;
    }
    
    // Eliminar solo las cartas dracónicas (mantener tropicales)
    console.log('\n🧹 Eliminando cartas dracónicas cacheadas...');
    const resultado = await prisma.cartaNatal.deleteMany({
      where: { tipo: 'draconica' }
    });
    
    console.log(`✅ Limpieza completada:`);
    console.log(`   - Cartas dracónicas eliminadas: ${resultado.count}`);
    console.log(`   - Cartas tropicales conservadas: ${totalCartas - cartasDraconicas}`);
    
    // Verificar estado final
    const cartasRestantes = await prisma.cartaNatal.count();
    console.log(`   - Total de cartas restantes: ${cartasRestantes}`);
    
    console.log('\n🎯 Resultado:');
    console.log('   - El próximo cálculo dracónico usará el algoritmo corregido');
    console.log('   - Se esperan valores exactos que coincidan con AstroSeek');
    console.log('   - Sol dracónico debería mostrar Libra 13°02\' (no 12°19\')');
    
  } catch (error) {
    console.error('❌ Error limpiando caché:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  clearDraconicCache()
    .then(() => {
      console.log('\n✨ Script completado exitosamente');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Script falló:', error);
      process.exit(1);
    });
}

module.exports = { clearDraconicCache };
