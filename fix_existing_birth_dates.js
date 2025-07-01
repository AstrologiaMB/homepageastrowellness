#!/usr/bin/env node
/**
 * Script para corregir fechas de nacimiento almacenadas incorrectamente
 * Convierte fechas que incluyen hora/timezone a fechas UTC puras (00:00:00)
 */

const { PrismaClient } = require('./prisma/generated/client');

async function fixExistingBirthDates() {
    const prisma = new PrismaClient();
    
    try {
        console.log('🔧 CORRIGIENDO FECHAS DE NACIMIENTO EXISTENTES');
        console.log('=' * 50);
        
        // Buscar el usuario específico que sabemos tiene el problema
        const user = await prisma.user.findUnique({
            where: { email: 'lsmnvll@gmail.com' },
            select: {
                id: true,
                email: true,
                name: true,
                birthDate: true,
                birthHour: true,
                birthMinute: true,
                timezone: true
            }
        });
        
        if (!user) {
            console.log('❌ Usuario no encontrado');
            return;
        }
        
        console.log('✅ Usuario encontrado:');
        console.log(`   Email: ${user.email}`);
        console.log(`   Nombre: ${user.name}`);
        console.log('');
        
        if (!user.birthDate) {
            console.log('⚠️  Usuario no tiene fecha de nacimiento');
            return;
        }
        
        const currentBirthDate = new Date(user.birthDate);
        console.log('📅 FECHA ACTUAL (INCORRECTA):');
        console.log(`   birthDate: ${currentBirthDate.toISOString()}`);
        console.log(`   Día almacenado: ${currentBirthDate.getUTCDate()}`);
        console.log(`   Mes almacenado: ${currentBirthDate.getUTCMonth() + 1}`);
        console.log(`   Año almacenado: ${currentBirthDate.getUTCFullYear()}`);
        console.log(`   Hora UTC almacenada: ${currentBirthDate.getUTCHours()}:${currentBirthDate.getUTCMinutes()}`);
        console.log('');
        
        // Para este usuario específico, sabemos que la fecha correcta debe ser 1964-12-26
        // La fecha actual está almacenada como 1964-12-27T00:12:00.000Z
        // Necesitamos corregirla a 1964-12-26T00:00:00.000Z
        
        const correctBirthDate = new Date(Date.UTC(1964, 11, 26, 0, 0, 0, 0)); // 26 de diciembre de 1964
        
        console.log('📅 FECHA CORREGIDA:');
        console.log(`   Nueva birthDate: ${correctBirthDate.toISOString()}`);
        console.log(`   Día corregido: ${correctBirthDate.getUTCDate()}`);
        console.log(`   Mes corregido: ${correctBirthDate.getUTCMonth() + 1}`);
        console.log(`   Año corregido: ${correctBirthDate.getUTCFullYear()}`);
        console.log(`   Hora UTC corregida: ${correctBirthDate.getUTCHours()}:${correctBirthDate.getUTCMinutes()}`);
        console.log('');
        
        // Confirmar antes de proceder
        console.log('🔍 RESUMEN DE CAMBIOS:');
        console.log(`   ANTES: ${currentBirthDate.toISOString()}`);
        console.log(`   DESPUÉS: ${correctBirthDate.toISOString()}`);
        console.log(`   birthHour se mantiene: ${user.birthHour}`);
        console.log(`   birthMinute se mantiene: ${user.birthMinute}`);
        console.log('');
        
        // Actualizar la fecha
        const updatedUser = await prisma.user.update({
            where: { email: 'lsmnvll@gmail.com' },
            data: {
                birthDate: correctBirthDate
            }
        });
        
        console.log('✅ CORRECCIÓN COMPLETADA');
        console.log(`   Usuario actualizado: ${updatedUser.email}`);
        console.log(`   Nueva fecha: ${updatedUser.birthDate?.toISOString()}`);
        console.log('');
        
        // Verificar que la corrección fue exitosa
        const verificationUser = await prisma.user.findUnique({
            where: { email: 'lsmnvll@gmail.com' },
            select: {
                birthDate: true,
                birthHour: true,
                birthMinute: true
            }
        });
        
        if (verificationUser?.birthDate) {
            const verificationDate = new Date(verificationUser.birthDate);
            const isCorrect = verificationDate.toISOString() === '1964-12-26T00:00:00.000Z';
            
            console.log('🔍 VERIFICACIÓN:');
            console.log(`   Fecha verificada: ${verificationDate.toISOString()}`);
            console.log(`   ¿Es correcta? ${isCorrect ? '✅ SÍ' : '❌ NO'}`);
            console.log(`   birthHour: ${verificationUser.birthHour}`);
            console.log(`   birthMinute: ${verificationUser.birthMinute}`);
        }
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Ejecutar solo si se llama directamente
if (require.main === module) {
    fixExistingBirthDates().catch(console.error);
}

module.exports = { fixExistingBirthDates };
