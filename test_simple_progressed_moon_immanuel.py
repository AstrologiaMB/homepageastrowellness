#!/usr/bin/env python3
"""
Script de prueba para algoritmo simplificado de conjunciones de Luna progresada.
Utiliza Immanuel para cálculos astronómicos precisos con lógica simplificada.

Datos de prueba: Persona nacida 26/12/1964, 21:12, Buenos Aires, Argentina
"""

import sys
import os
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

# Agregar el path del proyecto para importar Immanuel
sys.path.append('/Users/apple/astro-calendar-personal-fastapi/src')

try:
    import immanuel.charts as charts
    from immanuel.const import chart, calc
    from immanuel.tools import ephemeris, date, forecast
    from immanuel.setup import settings
    import swisseph as swe
except ImportError as e:
    print(f"Error importando Immanuel: {e}")
    print("Asegúrate de que Immanuel esté instalado y el path sea correcto")
    sys.exit(1)

# Configuración de Immanuel
settings.aspects = [calc.CONJUNCTION]
settings.default_orb = 2.0
settings.exact_orb = 0.001

# Datos natales de la persona de prueba
BIRTH_DATA = {
    'date': datetime(1964, 12, 26, 21, 12, tzinfo=ZoneInfo("America/Argentina/Buenos_Aires")),
    'latitude': -34.6118,  # Buenos Aires
    'longitude': -58.3960,
    'timezone': ZoneInfo("America/Argentina/Buenos_Aires")
}

# Posiciones natales (convertidas a grados absolutos 0-360)
NATAL_POSITIONS = {
    'Sun': 275.27,      # Capricorn 5°16' = 270° + 5.27°
    'Moon': 199.52,     # Libra 19°31' = 180° + 19.52°
    'Mercury': 258.92,  # Sagittarius 18°55' = 240° + 18.92°
    'Venus': 249.60,    # Sagittarius 9°36' = 240° + 9.60°
    'Mars': 172.32,     # Virgo 22°19' = 150° + 22.32°
    'Jupiter': 46.45,   # Taurus 16°27' = 30° + 16.45°
    'Saturn': 330.83,   # Pisces 0°50' = 330° + 0.83°
    'Uranus': 164.82,   # Virgo 14°49' = 150° + 14.82°
    'Neptune': 229.17,  # Scorpio 19°10' = 210° + 19.17°
    'Pluto': 166.30     # Virgo 16°18' = 150° + 16.30°
}

# Mapeo de nombres a IDs de Immanuel
PLANET_IDS = {
    'Sun': chart.SUN,
    'Moon': chart.MOON,
    'Mercury': chart.MERCURY,
    'Venus': chart.VENUS,
    'Mars': chart.MARS,
    'Jupiter': chart.JUPITER,
    'Saturn': chart.SATURN,
    'Uranus': chart.URANUS,
    'Neptune': chart.NEPTUNE,
    'Pluto': chart.PLUTO
}

def degrees_to_sign_format(degrees):
    """Convierte grados absolutos a formato signo + grados"""
    signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
             'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
    
    sign_index = int(degrees // 30)
    sign_degrees = degrees % 30
    
    whole_degrees = int(sign_degrees)
    minutes_decimal = (sign_degrees - whole_degrees) * 60
    minutes = int(minutes_decimal)
    seconds = int((minutes_decimal - minutes) * 60)
    
    return f"{signs[sign_index]} {whole_degrees}°{minutes}'{seconds}\""

def calculate_progressed_moon_position(current_date):
    """
    Calcula la posición de la Luna progresada usando el método ARMC 1 Naibod
    (mismo método que el algoritmo actual)
    """
    try:
        # Convertir fechas a UTC para cálculos
        birth_date_utc = BIRTH_DATA['date'].astimezone(ZoneInfo("UTC"))
        current_date_utc = current_date.astimezone(ZoneInfo("UTC"))
        
        # Convertir a fechas julianas
        birth_jd = date.to_jd(birth_date_utc)
        current_jd = date.to_jd(current_date_utc)
        
        # Calcular años transcurridos
        years_passed = (current_jd - birth_jd) / calc.YEAR_DAYS
        
        # Fecha juliana progresada
        progressed_jd = birth_jd + years_passed
        
        # Obtener ARMC natal
        natal_armc = ephemeris.angle(
            index=chart.ARMC,
            jd=birth_jd,
            lat=BIRTH_DATA['latitude'],
            lon=BIRTH_DATA['longitude'],
            house_system=chart.PLACIDUS
        )['lon']
        
        # ARMC progresado usando método Naibod
        progressed_armc_lon = swe.degnorm(natal_armc + years_passed * calc.MEAN_MOTIONS[chart.SUN])
        
        # Oblicuidad para la fecha progresada
        obliquity = ephemeris.obliquity(progressed_jd)
        
        # Posición de la Luna progresada
        progressed_objects = ephemeris.armc_objects(
            object_list=[chart.MOON],
            jd=progressed_jd,
            armc=progressed_armc_lon,
            lat=BIRTH_DATA['latitude'],
            lon=BIRTH_DATA['longitude'],
            obliquity=obliquity,
            house_system=chart.PLACIDUS
        )
        
        return progressed_objects[chart.MOON]['lon']
        
    except Exception as e:
        print(f"Error calculando Luna progresada: {e}")
        # Fallback simple
        years_passed = (current_date - BIRTH_DATA['date']).total_seconds() / (365.25 * 24 * 60 * 60)
        moon_advancement = years_passed * 13.2  # ~13.2° por año
        natal_moon_pos = NATAL_POSITIONS['Moon']
        return (natal_moon_pos + moon_advancement) % 360

def find_conjunction_simple(planet_name, target_year):
    """
    Algoritmo simplificado para encontrar conjunción de Luna progresada.
    Busca día a día dentro del año especificado.
    """
    natal_pos = NATAL_POSITIONS[planet_name]
    
    # Fechas límite del año
    start_date = datetime(target_year, 1, 1, tzinfo=BIRTH_DATA['timezone'])
    end_date = datetime(target_year, 12, 31, 23, 59, tzinfo=BIRTH_DATA['timezone'])
    
    best_date = None
    min_orb = float('inf')
    
    print(f"\nBuscando conjunción Luna progresada ♂ {planet_name}...")
    print(f"Posición natal de {planet_name}: {degrees_to_sign_format(natal_pos)}")
    
    # Buscar día a día (la Luna progresada se mueve muy lentamente)
    current = start_date
    days_checked = 0
    
    while current <= end_date:
        # Calcular posición de Luna progresada
        prog_moon_pos = calculate_progressed_moon_position(current)
        
        # Calcular diferencia angular
        diff = abs(prog_moon_pos - natal_pos)
        if diff > 180:
            diff = 360 - diff
        
        # Si está dentro del orbe y es mejor que el anterior
        if diff <= settings.default_orb and diff < min_orb:
            min_orb = diff
            best_date = current
            
        # Mostrar progreso cada 30 días
        days_checked += 1
        if days_checked % 30 == 0:
            print(f"  Revisando {current.strftime('%Y-%m-%d')} - Luna progresada: {degrees_to_sign_format(prog_moon_pos)} - Orbe: {diff:.2f}°")
        
        current += timedelta(days=1)
    
    if best_date:
        final_prog_pos = calculate_progressed_moon_position(best_date)
        print(f"  ✅ CONJUNCIÓN ENCONTRADA:")
        print(f"     Fecha: {best_date.strftime('%Y-%m-%d')}")
        print(f"     Luna progresada: {degrees_to_sign_format(final_prog_pos)}")
        print(f"     {planet_name} natal: {degrees_to_sign_format(natal_pos)}")
        print(f"     Orbe: {min_orb:.2f}°")
        return (best_date, min_orb, final_prog_pos)
    else:
        print(f"  ❌ No se encontró conjunción dentro del orbe de {settings.default_orb}°")
        return None

def main():
    """Función principal del script"""
    print("🌙 SCRIPT DE PRUEBA: Algoritmo Simplificado de Luna Progresada")
    print("=" * 60)
    print(f"Datos natales: {BIRTH_DATA['date'].strftime('%d/%m/%Y %H:%M')} - Buenos Aires")
    print(f"Orbe máximo: {settings.default_orb}°")
    print("=" * 60)
    
    # Pedir año al usuario
    while True:
        try:
            year_input = input("\n¿Para qué año buscar conjunciones? (ej: 2025): ")
            target_year = int(year_input)
            if 1900 <= target_year <= 2100:
                break
            else:
                print("Por favor ingresa un año entre 1900 y 2100")
        except ValueError:
            print("Por favor ingresa un año válido")
    
    print(f"\n🔍 Buscando conjunciones de Luna progresada para el año {target_year}...")
    
    # Buscar conjunciones con cada planeta
    conjunctions_found = []
    
    for planet_name in NATAL_POSITIONS.keys():
        if planet_name != 'Moon':  # No buscar conjunción de Luna progresada consigo misma
            result = find_conjunction_simple(planet_name, target_year)
            if result:
                conjunctions_found.append((planet_name, result))
    
    # Mostrar resumen
    print("\n" + "=" * 60)
    print("📊 RESUMEN DE CONJUNCIONES ENCONTRADAS")
    print("=" * 60)
    
    if conjunctions_found:
        # Ordenar por fecha
        conjunctions_found.sort(key=lambda x: x[1][0])
        
        for planet_name, (conj_date, orb, prog_pos) in conjunctions_found:
            print(f"🌙 Luna progresada ♂ {planet_name}")
            print(f"   Fecha: {conj_date.strftime('%d/%m/%Y')}")
            print(f"   Orbe: {orb:.2f}°")
            print(f"   Posición: {degrees_to_sign_format(prog_pos)}")
            print()
    else:
        print("❌ No se encontraron conjunciones en el año especificado")
    
    print(f"✅ Búsqueda completada para el año {target_year}")

if __name__ == "__main__":
    main()
