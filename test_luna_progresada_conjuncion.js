#!/usr/bin/env node

/**
 * Script para verificar que la conjunción de Luna Progresada con Sol Natal
 * del 25/10/2025 se esté calculando y devolviendo correctamente.
 */

const fetch = require('node-fetch');

const MICROSERVICE_URL = 'http://localhost:8004';

// Datos de prueba para Luis Minvielle
const testData = {
  name: "Luis Minvielle",
  birth_date: "1964-12-26",
  birth_time: "21:12",
  location: {
    latitude: -34.6118,
    longitude: -58.3960,
    name: "Buenos Aires",
    timezone: "America/Argentina/Buenos_Aires"
  },
  year: 2025
};

async function testLunaProgresadaConjuncion() {
  console.log('🔍 VERIFICANDO CONJUNCIÓN LUNA PROGRESADA - SOL NATAL');
  console.log('=' * 60);
  
  try {
    // 1. Verificar que el microservicio esté disponible
    console.log('1. Verificando estado del microservicio...');
    const healthResponse = await fetch(`${MICROSERVICE_URL}/health`);
    
    if (!healthResponse.ok) {
      throw new Error('Microservicio no disponible');
    }
    
    console.log('✅ Microservicio disponible');
    
    // 2. Realizar cálculo del calendario personal
    console.log('\n2. Calculando calendario personal...');
    console.log(`   Datos: ${testData.name}, ${testData.birth_date} ${testData.birth_time}, ${testData.location.name}`);
    
    const response = await fetch(`${MICROSERVICE_URL}/calculate-personal-calendar-dynamic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    console.log(`✅ Cálculo completado: ${data.total_events} eventos en ${data.calculation_time.toFixed(2)}s`);
    
    // 3. Buscar eventos de Luna Progresada
    console.log('\n3. Analizando eventos de Luna Progresada...');
    
    const eventosLunaProgresada = data.events.filter(evento => 
      evento.tipo_evento === "Luna Progresada"
    );
    
    console.log(`   Eventos de Luna Progresada encontrados: ${eventosLunaProgresada.length}`);
    
    if (eventosLunaProgresada.length === 0) {
      console.log('❌ No se encontraron eventos de Luna Progresada');
      return;
    }
    
    // 4. Buscar específicamente la conjunción con el Sol
    console.log('\n4. Buscando conjunción con Sol Natal...');
    
    const conjuncionSol = eventosLunaProgresada.find(evento => 
      evento.descripcion && evento.descripcion.includes("Sol") && evento.descripcion.includes("Conjunción")
    );
    
    if (!conjuncionSol) {
      console.log('❌ No se encontró conjunción Luna Progresada - Sol Natal');
      console.log('   Eventos de Luna Progresada disponibles:');
      eventosLunaProgresada.forEach((evento, index) => {
        console.log(`   ${index + 1}. ${evento.fecha_utc} - ${evento.descripcion}`);
      });
      return;
    }
    
    // 5. Verificar la fecha de la conjunción
    console.log('\n5. Verificando fecha de conjunción...');
    console.log(`✅ Conjunción encontrada: ${conjuncionSol.descripcion}`);
    console.log(`   Fecha UTC: ${conjuncionSol.fecha_utc}`);
    console.log(`   Hora UTC: ${conjuncionSol.hora_utc}`);
    
    // Convertir a fecha local de Buenos Aires
    const fechaUTC = new Date(`${conjuncionSol.fecha_utc}T${conjuncionSol.hora_utc}:00Z`);
    const fechaLocal = new Date(fechaUTC.getTime() - (3 * 60 * 60 * 1000)); // UTC-3
    
    console.log(`   Fecha local (Buenos Aires): ${fechaLocal.toLocaleDateString('es-AR')}`);
    console.log(`   Hora local: ${fechaLocal.toLocaleTimeString('es-AR')}`);
    
    // Verificar si es el 25 de octubre
    const esOctubre25 = fechaLocal.getDate() === 25 && fechaLocal.getMonth() === 9; // Octubre = mes 9
    
    if (esOctubre25) {
      console.log('✅ FECHA CORRECTA: 25 de octubre de 2025');
    } else {
      console.log(`❌ FECHA INCORRECTA: Se esperaba 25 de octubre, se obtuvo ${fechaLocal.getDate()} de ${fechaLocal.toLocaleDateString('es-AR', { month: 'long' })}`);
    }
    
    // 6. Verificar datos adicionales del evento
    console.log('\n6. Datos adicionales del evento:');
    console.log(`   Planeta 1: ${conjuncionSol.planeta1 || 'No especificado'}`);
    console.log(`   Planeta 2: ${conjuncionSol.planeta2 || 'No especificado'}`);
    console.log(`   Tipo aspecto: ${conjuncionSol.tipo_aspecto || 'No especificado'}`);
    console.log(`   Orbe: ${conjuncionSol.orbe || 'No especificado'}`);
    console.log(`   Es aplicativo: ${conjuncionSol.es_aplicativo || 'No especificado'}`);
    
    // 7. Resumen final
    console.log('\n' + '=' * 60);
    console.log('📋 RESUMEN:');
    console.log(`✅ Microservicio funcionando correctamente`);
    console.log(`✅ Eventos de Luna Progresada: ${eventosLunaProgresada.length}`);
    console.log(`✅ Conjunción Sol encontrada: ${conjuncionSol ? 'SÍ' : 'NO'}`);
    console.log(`✅ Fecha correcta (25/10/2025): ${esOctubre25 ? 'SÍ' : 'NO'}`);
    
    if (esOctubre25 && conjuncionSol) {
      console.log('\n🎉 ¡PRUEBA EXITOSA! La conjunción se está calculando correctamente.');
      console.log('   El evento debería aparecer en el calendario personal el 25 de octubre.');
    } else {
      console.log('\n⚠️  Hay problemas que necesitan revisión.');
    }
    
  } catch (error) {
    console.error('❌ Error durante la prueba:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Sugerencia: Verifica que el microservicio esté ejecutándose:');
      console.log('   cd ../astro-calendar-personal-fastapi');
      console.log('   python app.py');
    }
  }
}

// Ejecutar la prueba
testLunaProgresadaConjuncion();
