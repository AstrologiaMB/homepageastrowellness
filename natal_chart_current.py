"""
ANEXO A.1: IMPLEMENTACIÓN ACTUAL (DEFICIENTE)
Archivo: astro-calendar-personal-fastapi/src/calculators/natal_chart.py

Este archivo contiene la implementación actual que genera posiciones planetarias incorrectas.
"""

from datetime import datetime
from zoneinfo import ZoneInfo
import immanuel.charts as charts
from immanuel.const import chart, calc
from immanuel.setup import settings

def calcular_carta_natal(datos_usuario: dict) -> dict:
    """
    IMPLEMENTACIÓN ACTUAL - PROBLEMÁTICA
    
    Problemas identificados:
    1. NO configura settings.objects
    2. NO configura settings.aspects  
    3. Manejo problemático de zonas horarias (convierte a UTC)
    4. Procesamiento básico sin validaciones robustas
    """
    try:
        # Extraer datos del usuario
        hora_local = datos_usuario['hora_local']
        latitude = datos_usuario['lat']
        longitude = datos_usuario['lon']
        zona_horaria = datos_usuario['zona_horaria']
        
        # ❌ PROBLEMA 1: Conversión problemática a UTC
        birth_datetime = datetime.fromisoformat(hora_local)
        if birth_datetime.tzinfo is None:
            birth_datetime = birth_datetime.replace(tzinfo=ZoneInfo(zona_horaria))
        
        # ❌ PROBLEMA 2: Usar UTC en lugar de tiempo local
        birth_datetime_utc = birth_datetime.astimezone(ZoneInfo("UTC"))
        
        # ❌ PROBLEMA 3: NO configura settings.objects ni settings.aspects
        # Esto causa que Immanuel use configuraciones por defecto incorrectas
        
        # ❌ PROBLEMA 4: Crear carta con fecha UTC (INCORRECTO)
        natal_chart = charts.Natal(
            date_time=birth_datetime_utc,  # ❌ Debería usar tiempo local
            latitude=latitude,
            longitude=longitude
        )
        
        # ❌ PROBLEMA 5: Procesamiento básico sin validaciones
        raw_data = natal_chart.to_dict()
        
        # Conversión básica de datos (incompleta)
        result = {
            'points': {},
            'houses': {},
            'angles': {},
            'aspects': [],
            'location': {
                'latitude': latitude,
                'longitude': longitude,
                'timezone': zona_horaria
            }
        }
        
        # Procesamiento de objetos (básico)
        for index, obj in raw_data.get('objects', {}).items():
            result['points'][obj.name] = {
                'longitude': obj.longitude.raw if hasattr(obj.longitude, 'raw') else obj.longitude,
                'latitude': obj.latitude.raw if hasattr(obj.latitude, 'raw') else obj.latitude,
                'sign': obj.sign.name,
                'degrees': obj.sign_longitude.raw if hasattr(obj.sign_longitude, 'raw') else obj.sign_longitude,
                'retrograde': obj.movement.retrograde if hasattr(obj, 'movement') else False
            }
        
        # Procesamiento de casas (básico)
        for index, house in raw_data.get('houses', {}).items():
            result['houses'][str(house.number)] = {
                'longitude': house.longitude.raw if hasattr(house.longitude, 'raw') else house.longitude,
                'sign': house.sign.name,
                'degrees': house.sign_longitude.raw if hasattr(house.sign_longitude, 'raw') else house.sign_longitude
            }
        
        return result
        
    except Exception as e:
        raise ValueError(f"Error calculando carta natal: {str(e)}")

# RESULTADO: Posiciones planetarias incorrectas
# Sol natal: ~271° (debería ser 275.267°)
# Diferencia: ~4.3° que se propaga a Luna Progresada
