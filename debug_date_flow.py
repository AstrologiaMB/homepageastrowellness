#!/usr/bin/env python3
"""
Script para debuggear el flujo de fechas desde frontend hasta backend
Simula exactamente lo que hace el sistema para encontrar el error de fecha
"""

from datetime import datetime
import json

def simulate_frontend_date_processing():
    """Simula el procesamiento de fecha en el frontend (JavaScript)"""
    print("=== SIMULACIÓN DEL FRONTEND ===")
    
    # Datos que vienen de la base de datos (simulado)
    userData = {
        'birthDate': '1964-12-26T00:00:00.000Z',  # Como viene de Prisma
        'birthHour': 21,
        'birthMinute': 12,
        'birthCity': 'Buenos Aires'
    }
    
    print(f"1. Datos de la BD: {userData['birthDate']}")
    
    # Simular JavaScript: new Date(userData.birthDate)
    # En JavaScript esto se interpreta en UTC
    birth_date_js = datetime.fromisoformat(userData['birthDate'].replace('Z', '+00:00'))
    print(f"2. JavaScript new Date(): {birth_date_js} (UTC)")
    
    # Simular JavaScript: getFullYear(), getMonth(), getDate()
    # PROBLEMA: Si la fecha UTC es diferente a la fecha local, aquí está el error
    year = birth_date_js.year
    month = birth_date_js.month - 1  # JavaScript months are 0-based
    day = birth_date_js.day
    
    print(f"3. Componentes extraídos: año={year}, mes={month+1}, día={day}")
    
    # Simular JavaScript: new Date(year, month, day, hour, minute)
    # Esto crea una fecha en la zona horaria local del navegador
    birth_date_time_js = datetime(year, month + 1, day, userData['birthHour'], userData['birthMinute'])
    print(f"4. Fecha/hora construida: {birth_date_time_js}")
    
    # Formato que se envía al backend
    birth_date_str = birth_date_time_js.strftime('%Y-%m-%d')
    birth_time_str = f"{userData['birthHour']:02d}:{userData['birthMinute']:02d}"
    
    print(f"5. Enviado al backend:")
    print(f"   birth_date: {birth_date_str}")
    print(f"   birth_time: {birth_time_str}")
    
    return birth_date_str, birth_time_str

def simulate_backend_processing(birth_date_str, birth_time_str):
    """Simula el procesamiento en el backend FastAPI"""
    print("\n=== SIMULACIÓN DEL BACKEND ===")
    
    # Datos que llegan al backend
    request_data = {
        'birth_date': birth_date_str,  # '1964-12-26'
        'birth_time': birth_time_str,  # '21:12'
        'location': {
            'timezone': 'America/Argentina/Buenos_Aires'
        }
    }
    
    print(f"1. Datos recibidos: {request_data}")
    
    # Construcción de birth_data en app.py líneas 350-357
    birth_data = {
        "hora_local": f"{request_data['birth_date']}T{request_data['birth_time']}:00",
        "zona_horaria": request_data['location']['timezone']
    }
    
    print(f"2. birth_data construido: {birth_data}")
    
    # Procesamiento en natal_chart.py línea 45
    local_time = datetime.fromisoformat(birth_data['hora_local'])
    print(f"3. local_time en natal_chart.py: {local_time}")
    
    return local_time

def analyze_timezone_issue():
    """Analiza el problema específico de zona horaria"""
    print("\n=== ANÁLISIS DEL PROBLEMA ===")
    
    # Fecha original introducida por el usuario
    original_date = "26/12/1964 21:12 GMT-3"
    print(f"Fecha original del usuario: {original_date}")
    
    # Lo que debería estar en la base de datos
    # Si se guarda correctamente en hora local
    correct_db_date = "1964-12-26T21:12:00-03:00"
    print(f"Lo que debería estar en BD: {correct_db_date}")
    
    # Lo que probablemente está en la base de datos
    # Si se guarda como UTC sin considerar zona horaria
    probable_db_date = "1964-12-26T00:00:00.000Z"
    print(f"Lo que probablemente está en BD: {probable_db_date}")
    
    # Diferencia
    correct_dt = datetime.fromisoformat(correct_db_date.replace('-03:00', '+00:00')) 
    probable_dt = datetime.fromisoformat(probable_db_date.replace('Z', '+00:00'))
    
    print(f"Diferencia: {(probable_dt - correct_dt).days} días")

def main():
    """Función principal de debug"""
    print("🔍 DEBUG: FLUJO DE FECHAS FRONTEND → BACKEND")
    print("=" * 60)
    
    # Simular el flujo completo
    birth_date_str, birth_time_str = simulate_frontend_date_processing()
    final_datetime = simulate_backend_processing(birth_date_str, birth_time_str)
    
    print(f"\n📊 RESULTADO FINAL:")
    print(f"Fecha esperada: 1964-12-26 21:12:00")
    print(f"Fecha calculada: {final_datetime}")
    print(f"¿Coinciden? {'✅ SÍ' if str(final_datetime) == '1964-12-26 21:12:00' else '❌ NO'}")
    
    # Análisis adicional
    analyze_timezone_issue()
    
    print(f"\n🎯 CONCLUSIÓN:")
    print("El problema está en el almacenamiento/extracción de la fecha de nacimiento.")
    print("La fecha se está interpretando incorrectamente en algún punto del flujo.")

if __name__ == "__main__":
    main()
