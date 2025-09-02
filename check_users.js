/**
 * Script para verificar usuarios existentes en la base de datos
 */

const { PrismaClient } = require('./prisma/generated/client');

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    console.log('🔍 Verificando usuarios en la base de datos...');

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        birthDate: true,
        birthCity: true,
        birthCountry: true,
        createdAt: true
      }
    });

    console.log(`\n📊 Encontrados ${users.length} usuarios:\n`);

    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email}`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Nombre: ${user.name || 'Sin nombre'}`);
      console.log(`   Fecha nacimiento: ${user.birthDate || 'No definida'}`);
      console.log(`   Ciudad: ${user.birthCity || 'No definida'}`);
      console.log(`   País: ${user.birthCountry || 'No definido'}`);
      console.log(`   Creado: ${user.createdAt}\n`);
    });

    // Buscar específicamente el usuario de test
    const testUser = users.find(u => u.email === 'test@astrowellness.dev');
    if (testUser) {
      console.log('✅ Usuario de test encontrado:', testUser.email);
    } else {
      console.log('❌ Usuario de test NO encontrado. Email esperado: test@astrowellness.dev');
      console.log('💡 Necesitas crear el usuario en Prisma Studio');
    }

  } catch (error) {
    console.error('❌ Error consultando usuarios:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
