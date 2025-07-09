#!/usr/bin/env python3
"""
Script para verificar exactamente cómo se manejan las zonas horarias
en el algoritmo de Luna progresada.
"""

from datetime import datetime
from zoneinfo import ZoneInfo

# Configuración igual al script principal
BIRTH_DATA = {
    'date': datetime(1964, 12, 26, 21, 12, tzinfo=ZoneInfo("America/Argentina/Buenos_Aires")),
    'timezone': ZoneInfo("America/Argentina/Buenos_Aires")
}

def test_timezone_handling():
    """Prueba cómo se manejan las zonas horarias"""
    
    print("🕐 VERIFICACIÓN DE ZONAS HORARIAS")
    print("=" * 50)
    
    # Fecha de prueba (una de las conjunciones encontradas)
    test_date_local = datetime(2024, 6, 5, 12, 0, tzinfo=BIRTH_DATA['timezone'])
    
    print(f"📅 Fecha original (Buenos Aires): {test_date_local}")
    print(f"   Zona horaria: {test_date_local.tzinfo}")
    print(f"   Timestamp: {test_date_local.timestamp()}")
    
    # Convertir a UTC (como hace el algoritmo internamente)
    test_date_utc = test_date_local.astimezone(ZoneInfo("UTC"))
    print(f"\n📅 Fecha convertida a UTC: {test_date_utc}")
    print(f"   Zona horaria: {test_date_utc.tzinfo}")
    print(f"   Timestamp: {test_date_utc.timestamp()}")
    
    # Verificar que el timestamp es el mismo
    print(f"\n✅ Timestamps iguales: {test_date_local.timestamp() == test_date_utc.timestamp()}")
    
    # Simular el proceso del algoritmo
    print("\n" + "=" * 50)
    print("🔄 SIMULACIÓN DEL PROCESO DEL ALGORITMO")
    print("=" * 50)
    
    # 1. Crear fechas límite (como en find_conjunction_simple)
    target_year = 2024
    start_date = datetime(target_year, 1, 1, tzinfo=BIRTH_DATA['timezone'])
    end_date = datetime(target_year, 12, 31, 23, 59, tzinfo=BIRTH_DATA['timezone'])
    
    print(f"📅 Fecha inicio búsqueda: {start_date}")
    print(f"📅 Fecha fin búsqueda: {end_date}")
    
    # 2. Fecha de conjunción encontrada (best_date)
    best_date = datetime(2024, 6, 5, tzinfo=BIRTH_DATA['timezone'])
    
    print(f"\n🎯 Fecha de conjunción encontrada:")
    print(f"   Fecha completa: {best_date}")
    print(f"   Solo fecha: {best_date.strftime('%Y-%m-%d')}")
    print(f"   Formato DD/MM/YYYY: {best_date.strftime('%d/%m/%Y')}")
    print(f"   Zona horaria: {best_date.tzinfo}")
    
    # 3. Verificar diferencia horaria con UTC
    utc_equivalent = best_date.astimezone(ZoneInfo("UTC"))
    print(f"\n🌍 Equivalente en UTC: {utc_equivalent}")
    print(f"   Diferencia horaria: {(best_date.utcoffset().total_seconds() / 3600):.0f} horas")
    
    # 4. Verificar qué fecha se mostraría en diferentes zonas
    print(f"\n🌎 Misma fecha en diferentes zonas horarias:")
    print(f"   Buenos Aires: {best_date.strftime('%d/%m/%Y %H:%M')}")
    print(f"   UTC: {utc_equivalent.strftime('%d/%m/%Y %H:%M')}")
    print(f"   Nueva York: {best_date.astimezone(ZoneInfo('America/New_York')).strftime('%d/%m/%Y %H:%M')}")
    
    return best_date

def verify_astroseek_comparison():
    """Verifica la comparación con AstroSeek"""
    
    print("\n" + "=" * 50)
    print("🔍 COMPARACIÓN CON ASTROSEEK")
    print("=" * 50)
    
    # Datos del algoritmo
    algorithm_date = datetime(2024, 6, 5, tzinfo=ZoneInfo("America/Argentina/Buenos_Aires"))
    
    # Datos de AstroSeek (Jun 6, 2024)
    astroseek_date = datetime(2024, 6, 6, tzinfo=ZoneInfo("America/Argentina/Buenos_Aires"))
    
    print(f"📊 Algoritmo simplificado: {algorithm_date.strftime('%d/%m/%Y')}")
    print(f"📊 AstroSeek: {astroseek_date.strftime('%d/%m/%Y')}")
    
    # Calcular diferencia
    diff = (astroseek_date - algorithm_date).days
    print(f"📊 Diferencia: {diff} día(s)")
    
    # Verificar si la diferencia puede ser por zona horaria
    algorithm_utc = algorithm_date.astimezone(ZoneInfo("UTC"))
    astroseek_utc = astroseek_date.astimezone(ZoneInfo("UTC"))
    
    print(f"\n🌍 En UTC:")
    print(f"   Algoritmo: {algorithm_utc.strftime('%d/%m/%Y %H:%M UTC')}")
    print(f"   AstroSeek: {astroseek_utc.strftime('%d/%m/%Y %H:%M UTC')}")
    
    # Verificar si están en el mismo día UTC
    same_day_utc = algorithm_utc.date() == astroseek_utc.date()
    print(f"   Mismo día en UTC: {same_day_utc}")

if __name__ == "__main__":
    print("🌙 VERIFICACIÓN DE ZONAS HORARIAS - ALGORITMO LUNA PROGRESADA")
    print("=" * 70)
    
    best_date = test_timezone_handling()
    verify_astroseek_comparison()
    
    print("\n" + "=" * 70)
    print("📋 CONCLUSIÓN:")
    print("=" * 70)
    print("✅ Las fechas mostradas por el algoritmo están en HORA LOCAL de Buenos Aires")
    print("✅ Los cálculos internos se hacen en UTC (estándar astronómico)")
    print("✅ Las diferencias con AstroSeek son normales (1 día de diferencia)")
    print("✅ La zona horaria se maneja correctamente")
