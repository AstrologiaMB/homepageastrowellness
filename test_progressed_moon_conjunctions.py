#!/usr/bin/env python3
"""
Script de prueba para verificar las conjunciones de Luna Progresada
con los datos específicos de Luis Minvielle.

Datos de prueba:
- Nacimiento: 26/12/1964 21:12 Buenos Aires, Argentina
- Evento esperado: Conjunción Luna Progresada-Sol Natal el 25/10/2025
- Posición esperada: 5°16' Capricornio
"""

import sys
import os
sys.path.append('../astro-calendar-personal-fastapi')

from datetime import datetime
from zoneinfo import ZoneInfo
from src.calculators.progressed_moon_transits import ProgressedMoonTransitsCalculator

def create_test_natal_data():
    """
    Crea los datos natales de prueba para Luis Minvielle.
    """
    return {
        'date': '1964-12-26T21:12:00-03:00',  # 26 diciembre 1964, 21:12 Buenos Aires
        'hora_local': '1964-12-26T21:12:00-03:00',
        'location': {
            'latitude': -34.6118,
            'longitude': -58.3960,
            'timezone': 'America/Argentina/Buenos_Aires'
        },
        'points': {
            'Sun': {'longitude': 275.2667},  # Aproximadamente 5°16' Capricornio
            'Moon': {'longitude': 45.0},     # Datos de ejemplo
            'Mercury': {'longitude': 260.0},
            'Venus': {'longitude': 290.0},
            'Mars': {'longitude': 320.0},
            'Jupiter': {'longitude': 150.0},
            'Saturn': {'longitude': 200.0},
            'Uranus': {'longitude': 100.0},
            'Neptune': {'longitude': 220.0},
            'Pluto': {'longitude': 180.0}
        }
    }

def test_specific_conjunction():
    """
    Prueba específica para la conjunción Luna Progresada-Sol Natal
    esperada el 25 de octubre 2025.
    """
    print("=" * 60)
    print("TEST: Conjunción Luna Progresada - Sol Natal")
    print("=" * 60)
    
    # Crear datos natales de prueba
    natal_data = create_test_natal_data()
    
    print(f"Datos de nacimiento:")
    print(f"  Fecha: {natal_data['date']}")
    print(f"  Lugar: Buenos Aires, Argentina")
    print(f"  Sol Natal: {natal_data['points']['Sun']['longitude']:.4f}° (≈ 5°16' Capricornio)")
    print()
    
    # Crear calculador
    calculator = ProgressedMoonTransitsCalculator(natal_data)
    
    # Definir período de búsqueda (todo 2025)
    start_date = datetime(2025, 1, 1, tzinfo=ZoneInfo("UTC"))
    end_date = datetime(2025, 12, 31, 23, 59, tzinfo=ZoneInfo("UTC"))
    
    print(f"Buscando conjunciones en el período:")
    print(f"  Desde: {start_date}")
    print(f"  Hasta: {end_date}")
    print()
    
    # Calcular conjunciones
    conjunctions = calculator.calculate_all(start_date, end_date)
    
    print(f"RESULTADOS:")
    print(f"Total de conjunciones encontradas: {len(conjunctions)}")
    print()
    
    # Buscar específicamente la conjunción con el Sol
    sun_conjunctions = [c for c in conjunctions if c.planeta2 == "Sol"]
    
    if sun_conjunctions:
        for conj in sun_conjunctions:
            # Convertir a zona horaria de Buenos Aires
            local_date = conj.fecha_utc.astimezone(ZoneInfo("America/Argentina/Buenos_Aires"))
            
            print(f"🌙 CONJUNCIÓN LUNA PROGRESADA - SOL NATAL:")
            print(f"  Fecha (UTC): {conj.fecha_utc}")
            print(f"  Fecha (Local): {local_date}")
            print(f"  Fecha mostrada: {local_date.strftime('%Y-%m-%d')}")
            print(f"  Luna Progresada: {conj.longitud1:.4f}°")
            print(f"  Sol Natal: {conj.longitud2:.4f}°")
            print(f"  Orbe: {conj.orbe:.4f}°")
            print(f"  Descripción: {conj.descripcion}")
            
            # Verificar si coincide con la fecha esperada
            expected_date = datetime(2025, 10, 25)
            actual_date = local_date.replace(hour=0, minute=0, second=0, microsecond=0)
            
            print()
            print(f"VERIFICACIÓN:")
            print(f"  Fecha esperada: 25 octubre 2025")
            print(f"  Fecha calculada: {actual_date.strftime('%d %B %Y')}")
            
            if actual_date.date() == expected_date.date():
                print(f"  ✅ FECHA CORRECTA")
            else:
                days_diff = (actual_date.date() - expected_date.date()).days
                print(f"  ❌ DIFERENCIA: {days_diff} días")
            
            # Verificar posición (aproximadamente 5°16' Capricornio = 275.2667°)
            expected_position = 275.2667
            position_diff = abs(conj.longitud1 - expected_position)
            
            print(f"  Posición esperada: ~275.27° (5°16' Capicornio)")
            print(f"  Posición calculada: {conj.longitud1:.4f}°")
            print(f"  Diferencia: {position_diff:.4f}°")
            
            if position_diff < 1.0:  # Tolerancia de 1°
                print(f"  ✅ POSICIÓN APROXIMADAMENTE CORRECTA")
            else:
                print(f"  ❌ POSICIÓN FUERA DE RANGO")
    else:
        print("❌ NO SE ENCONTRÓ CONJUNCIÓN CON EL SOL")
    
    print()
    print("=" * 60)
    
    return conjunctions

def test_moon_position_on_date():
    """
    Prueba la posición de la Luna Progresada en una fecha específica.
    """
    print("TEST: Posición Luna Progresada el 25 octubre 2025")
    print("=" * 60)
    
    natal_data = create_test_natal_data()
    calculator = ProgressedMoonTransitsCalculator(natal_data)
    
    # Fecha específica
    test_date = datetime(2025, 10, 25, 12, 0, tzinfo=ZoneInfo("America/Argentina/Buenos_Aires"))
    
    # Calcular posición
    moon_position = calculator._calculate_progressed_moon_position(test_date)
    
    print(f"Fecha de prueba: {test_date}")
    print(f"Luna Progresada: {moon_position:.4f}°")
    
    # Convertir a signo y grado
    from src.core.constants import AstronomicalConstants
    sign = AstronomicalConstants.get_sign_name(moon_position)
    degree = moon_position % 30
    
    print(f"Signo: {sign}")
    print(f"Grado: {degree:.4f}°")
    print(f"Formato: {degree:.1f}° {sign}")
    
    print("=" * 60)

if __name__ == "__main__":
    print("PRUEBA DE CONJUNCIONES DE LUNA PROGRESADA")
    print("Datos: Luis Minvielle, 26/12/1964 21:12 Buenos Aires")
    print()
    
    # Ejecutar pruebas
    try:
        # Test 1: Posición específica
        test_moon_position_on_date()
        print()
        
        # Test 2: Conjunciones
        conjunctions = test_specific_conjunction()
        
        print("\nRESUMEN FINAL:")
        print(f"- Conjunciones encontradas: {len(conjunctions)}")
        
        for conj in conjunctions:
            local_date = conj.fecha_utc.astimezone(ZoneInfo("America/Argentina/Buenos_Aires"))
            print(f"- {local_date.strftime('%Y-%m-%d')}: {conj.descripcion} (orbe: {conj.orbe:.2f}°)")
            
    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()
