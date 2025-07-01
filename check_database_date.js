#!/usr/bin/env node
/**
 * Script para verificar qué fecha está realmente almacenada en la base de datos
 * para el usuario lsmnvll@gmail.com
 */

const { PrismaClient } = require('./prisma/generated/client');

async function checkDatabaseDate() {
    const prisma = new PrismaClient();
    
    try {
        console.log('🔍 VERIFICANDO FECHA EN BASE DE DATOS');
        console.log('=' * 50);
        
        // Buscar el usuario
        const user = await prisma.user.findUnique({
            where: { email: 'lsmnvll@gmail.com' },
            select: {
                email: true,
                name: true,
                birthDate: true,
                birthHour: true,
                birthMinute: true,
                birthCity: true,
                timezone: true,
                createdAt: true,
                updatedAt: true
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
        
        console.log('📅 DATOS DE NACIMIENTO:');
        console.log(`   birthDate (raw): ${user.birthDate}`);
        console.log(`   birthDate (ISO): ${user.birthDate?.toISOString()}`);
        console.log(`   birthHour: ${user.birthHour}`);
        console.log(`   birthMinute: ${user.birthMinute}`);
        console.log(`   birthCity: ${user.birthCity}`);
        console.log(`   timezone: ${user.timezone}`);
        console.log('');
        
        console.log('🕐 FECHAS DEL SISTEMA:');
        console.log(`   createdAt: ${user.createdAt?.toISOString()}`);
        console.log(`   updatedAt: ${user.updatedAt?.toISOString()}`);
        console.log('');
        
        // Análisis del problema
        if (user.birthDate) {
            const birthDate = new Date(user.birthDate);
            const expectedDate = new Date('1964-12-26T00:00:00.000Z');
            
            console.log('🔍 ANÁLISIS:');
            console.log(`   Fecha almacenada: ${birthDate.toISOString()}`);
            console.log(`   Fecha esperada: ${expectedDate.toISOString()}`);
            console.log(`   ¿Coinciden? ${birthDate.getTime() === expectedDate.getTime() ? '✅ SÍ' : '❌ NO'}`);
            
            if (birthDate.getTime() !== expectedDate.getTime()) {
                const diffDays = Math.round((birthDate.getTime() - expectedDate.getTime()) / (1000 * 60 * 60 * 24));
                console.log(`   Diferencia: ${diffDays} días`);
            }
            
            // Verificar componentes de fecha
            console.log('');
            console.log('📊 COMPONENTES DE FECHA:');
            console.log(`   Año: ${birthDate.getUTCFullYear()}`);
            console.log(`   Mes: ${birthDate.getUTCMonth() + 1} (${birthDate.getUTCMonth() + 1}/12)`);
            console.log(`   Día: ${birthDate.getUTCDate()}`);
            console.log(`   Hora UTC: ${birthDate.getUTCHours()}:${birthDate.getUTCMinutes()}`);
        }
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkDatabaseDate().catch(console.error);
