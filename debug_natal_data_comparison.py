#!/usr/bin/env python3
"""
Script para comparar los datos natales generados por calcular_carta_natal()
vs los datos hardcodeados del script de prueba.
"""

import sys
import os
sys.path.append('../astro-calendar-personal-fastapi/src')

from calculators.natal_chart import calcular_carta_natal

def main():
    print("=== COMPARACIÓN DE DATOS NATALES ===")
    print()
    
    # Datos de entrada (mismos que usa la API)
    birth_data = {
        "hora_local": "1964-12-26T21:12:00",
        "lat": -34.6118,
        "lon": -58.3960,
        "zona_horaria": "America/Argentina/Buenos_Aires",
        "lugar": "Buenos Aires"
    }
    
    print("Datos de entrada:")
    print(f"  Fecha/Hora: {birth_data['hora_local']}")
    print(f"  Ubicación: {birth_data['lugar']} ({birth_data['lat']}, {birth_data['lon']})")
    print(f"  Zona horaria: {birth_data['zona_horaria']}")
    print()
    
    # Calcular carta natal dinámicamente (como hace la API)
    print("Calculando carta natal con calcular_carta_natal()...")
    try:
        natal_data = calcular_carta_natal(birth_data)
        
        print("✅ Carta natal calculada exitosamente")
        print()
        
        # Datos hardcodeados del script de prueba (de AstroSeek)
        astroseek_data = {
            'Sun': 275.283,      # 5°17' Capricornio
            'Moon': 199.533,     # 19°32' Libra  
            'Mercury': 258.933,  # 18°56' Sagitario
            'Venus': 249.617,    # 9°37' Sagitario
            'Mars': 172.333      # 22°20' Virgo
        }
        
        print("COMPARACIÓN DE POSICIONES PLANETARIAS:")
        print("=" * 70)
        print(f"{'Planeta':<10} | {'Calculado':<15} | {'AstroSeek':<15} | {'Diferencia':<12}")
        print("-" * 70)
        
        for planet_name, astroseek_pos in astroseek_data.items():
            if planet_name in natal_data['points']:
                calculated_pos = natal_data['points'][planet_name]['longitude']
                diff = abs(calculated_pos - astroseek_pos)
                
                print(f"{planet_name:<10} | {calculated_pos:<15.6f} | {astroseek_pos:<15.6f} | {diff:<12.6f}")
            else:
                print(f"{planet_name:<10} | {'NO ENCONTRADO':<15} | {astroseek_pos:<15.6f} | {'N/A':<12}")
        
        print("=" * 70)
        print()
        
        # Verificar específicamente el Sol (crítico para Luna Progresada)
        if 'Sun' in natal_data['points']:
            sun_calculated = natal_data['points']['Sun']['longitude']
            sun_astroseek = 275.283
            sun_diff = abs(sun_calculated - sun_astroseek)
            
            print("🌟 ANÁLISIS DEL SOL (crítico para Luna Progresada):")
            print(f"  Calculado: {sun_calculated:.6f}° ({sun_calculated % 30:.2f}° Capricornio)")
            print(f"  AstroSeek:  {sun_astroseek:.6f}° (5°17' Capricornio)")
            print(f"  Diferencia: {sun_diff:.6f}° ({sun_diff * 60:.2f} minutos de arco)")
            
            if sun_diff > 0.1:  # Más de 6 minutos de arco
                print("  ⚠️  DIFERENCIA SIGNIFICATIVA detectada!")
                print("  Esta diferencia puede causar el error en Luna Progresada")
            else:
                print("  ✅ Diferencia mínima, no debería afectar Luna Progresada")
        
        print()
        print("DATOS COMPLETOS CALCULADOS:")
        print("Points:", list(natal_data['points'].keys()) if 'points' in natal_data else "No disponible")
        print("Houses:", list(natal_data['houses'].keys()) if 'houses' in natal_data else "No disponible")
        
    except Exception as e:
        print(f"❌ Error calculando carta natal: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
