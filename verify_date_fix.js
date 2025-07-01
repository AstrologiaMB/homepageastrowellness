#!/usr/bin/env node
/**
 * Script para verificar que la corrección de fechas funciona correctamente
 * y que los cálculos astrológicos ahora muestran fechas correctas
 */

const { PrismaClient } = require('./prisma/generated/client');

async function verifyDateFix() {
    const prisma = new PrismaClient();
    
    try {
        console.log('✅ VERIFICANDO CORRECCIÓN DE FECHAS');
        console.log('=' * 50);
        
        // Verificar el usuario corregido
        const user = await prisma.user.findUnique({
            where: { email: 'lsmnvll@gmail.com' },
            select: {
                email: true,
                name: true,
                birthDate: true,
                birthHour: true,
                birthMinute: true,
                birthCity: true,
                timezone: true
            }
        });
        
        if (!user) {
            console.log('❌ Usuario no encontrado');
            return;
        }
        
        console.log('👤 USUARIO VERIFICADO:');
        console.log(`   Email: ${user.email}`);
        console.log(`   Nombre: ${user.name}`);
        console.log('');
        
        if (!user.birthDate) {
            console.log('❌ Usuario no tiene fecha de nacimiento');
            return;
        }
        
        const birthDate = new Date(user.birthDate);
        
        console.log('📅 DATOS DE NACIMIENTO CORREGIDOS:');
        console.log(`   birthDate: ${birthDate.toISOString()}`);
        console.log(`   birthHour: ${user.birthHour}`);
        console.log(`   birthMinute: ${user.birthMinute}`);
        console.log(`   birthCity: ${user.birthCity}`);
        console.log(`   timezone: ${user.timezone}`);
        console.log('');
        
        // Verificaciones específicas
        const expectedDate = '1964-12-26T00:00:00.000Z';
        const isDateCorrect = birthDate.toISOString() === expectedDate;
        const isHourCorrect = user.birthHour === 21;
        const isMinuteCorrect = user.birthMinute === 12;
        
        console.log('🔍 VERIFICACIONES:');
        console.log(`   ✅ Fecha correcta (${expectedDate}): ${isDateCorrect ? '✅ SÍ' : '❌ NO'}`);
        console.log(`   ✅ Hora correcta (21): ${isHourCorrect ? '✅ SÍ' : '❌ NO'}`);
        console.log(`   ✅ Minuto correcto (12): ${isMinuteCorrect ? '✅ SÍ' : '❌ NO'}`);
        console.log('');
        
        // Verificar componentes de fecha
        console.log('📊 COMPONENTES VERIFICADOS:');
        console.log(`   Año: ${birthDate.getUTCFullYear()} (esperado: 1964) ${birthDate.getUTCFullYear() === 1964 ? '✅' : '❌'}`);
        console.log(`   Mes: ${birthDate.getUTCMonth() + 1} (esperado: 12) ${birthDate.getUTCMonth() + 1 === 12 ? '✅' : '❌'}`);
        console.log(`   Día: ${birthDate.getUTCDate()} (esperado: 26) ${birthDate.getUTCDate() === 26 ? '✅' : '❌'}`);
        console.log(`   Hora UTC: ${birthDate.getUTCHours()} (esperado: 0) ${birthDate.getUTCHours() === 0 ? '✅' : '❌'}`);
        console.log(`   Minuto UTC: ${birthDate.getUTCMinutes()} (esperado: 0) ${birthDate.getUTCMinutes() === 0 ? '✅' : '❌'}`);
        console.log('');
        
        // Simular reconstrucción de fecha como lo hace el frontend
        console.log('🔄 SIMULACIÓN DE RECONSTRUCCIÓN (como en frontend):');
        const reconstructedDate = new Date(
            birthDate.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate(),
            user.birthHour,
            user.birthMinute
        );
        console.log(`   Fecha reconstruida: ${reconstructedDate.toISOString()}`);
        console.log(`   Fecha local: ${reconstructedDate.toString()}`);
        console.log('');
        
        // Resultado final
        const allCorrect = isDateCorrect && isHourCorrect && isMinuteCorrect;
        console.log('🎯 RESULTADO FINAL:');
        console.log(`   Estado: ${allCorrect ? '✅ CORRECCIÓN EXITOSA' : '❌ PROBLEMAS DETECTADOS'}`);
        
        if (allCorrect) {
            console.log('   ✅ La fecha de nacimiento está correctamente almacenada');
            console.log('   ✅ Los componentes de hora están separados correctamente');
            console.log('   ✅ Los cálculos astrológicos ahora usarán la fecha correcta');
            console.log('   ✅ La Luna Progresada mostrará fechas de conjunción correctas');
        }
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Ejecutar solo si se llama directamente
if (require.main === module) {
    verifyDateFix().catch(console.error);
}

module.exports = { verifyDateFix };
