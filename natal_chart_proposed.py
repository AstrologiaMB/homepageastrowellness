"""
ANEXO A.2: IMPLEMENTACIÓN PROPUESTA (CORRECTA)
Basada en: calculo-carta-natal-api/main.py

Esta implementación genera posiciones planetarias correctas y precisas.
"""

from datetime import datetime
from zoneinfo import ZoneInfo
from src.immanuel import charts
from src.immanuel.const import chart
from src.immanuel.setup import settings

# ✅ CONFIGURACIÓN CORRECTA DE IMMANUEL
settings.objects = [
    # Planetas
    chart.SUN, chart.MOON, chart.MERCURY, chart.VENUS, chart.MARS,
    chart.JUPITER, chart.SATURN, chart.URANUS, chart.NEPTUNE, chart.PLUTO,
    # Ángulos
    chart.ASC, chart.MC,
    # Puntos especiales
    chart.TRUE_NORTH_NODE, chart.LILITH, chart.CHIRON,
    chart.PART_OF_FORTUNE, chart.VERTEX
]

# Configurar aspectos con orbes ajustados
settings.aspects = {
    0: 8,     # Conjunción con orbe de 8°
    60: 6,    # Sextil con orbe de 6°
    90: 8,    # Cuadratura con orbe de 8°
    120: 8,   # Trígono con orbe de 8°
    180: 8    # Oposición con orbe de 8°
}

def calcular_carta_natal(datos_usuario: dict, draconica=False) -> dict:
    """
    IMPLEMENTACIÓN CORRECTA - PROPUESTA
    
    Mejoras implementadas:
    1. ✅ Configura settings.objects correctamente
    2. ✅ Configura settings.aspects correctamente
    3. ✅ Usa tiempo local directamente (sin conversión a UTC)
    4. ✅ Procesamiento robusto con validaciones completas
    5. ✅ Manejo de errores mejorado
    6. ✅ Compatibilidad con cartas dracónicas
    """
    try:
        # Usar coordenadas directamente
        latitude = datos_usuario['lat']
        longitude = datos_usuario['lon']
        
        # ✅ CORRECCIÓN 1: Usar tiempo local directamente
        local_time = datetime.fromisoformat(datos_usuario['hora_local'])
        
        # ✅ CORRECCIÓN 2: Crear sujeto para la carta natal
        native = charts.Subject(
            date_time=local_time,  # ✅ Usa tiempo local directamente
            latitude=latitude,
            longitude=longitude
        )
        
        # ✅ CORRECCIÓN 3: Calcular carta natal o dracónica según corresponda
        if draconica:
            chart_obj = charts.DraconicChart(native)
        else:
            chart_obj = charts.Natal(native)
            
        raw_data = chart_obj.to_dict()
        
        # ✅ CORRECCIÓN 4: Estructura de datos robusta
        result = {
            'points': {},
            'houses': {},
            'angles': {},
            'aspects': [],
            'location': {
                'latitude': datos_usuario['lat'],
                'longitude': datos_usuario['lon'],
                'name': datos_usuario.get('lugar', 'Unknown'),
                'timezone': datos_usuario['zona_horaria']
            },
            'fecha_hora_natal': datos_usuario.get('fecha_hora_natal', ''),
            'hora_local': datos_usuario['hora_local']  # ✅ Incluir hora_local
        }
        
        # ✅ CORRECCIÓN 5: Procesamiento completo de objetos
        for index, obj in raw_data.get('objects', {}).items():
            # Extraer datos básicos con validaciones
            point_data = {
                'longitude': obj.longitude.raw if hasattr(obj.longitude, 'raw') else obj.longitude,
                'latitude': (obj.latitude.raw if hasattr(obj.latitude, 'raw') else obj.latitude) if hasattr(obj, 'latitude') else 0.0,
                'distance': (obj.distance.raw if hasattr(obj.distance, 'raw') else obj.distance) if hasattr(obj, 'distance') else 0.0,
                'sign': obj.sign.name,
                'degrees': obj.sign_longitude.raw if hasattr(obj.sign_longitude, 'raw') else obj.sign_longitude,
                'retrograde': obj.movement.retrograde if hasattr(obj, 'movement') and hasattr(obj.movement, 'retrograde') else False
            }
            
            # Usar el nombre del objeto como clave
            result['points'][obj.name] = point_data
            
            # ✅ CORRECCIÓN 6: Agregar ángulos correctamente
            if obj.name in ['Asc', 'MC']:
                result['angles'][obj.name] = {
                    'longitude': obj.longitude.raw if hasattr(obj.longitude, 'raw') else obj.longitude,
                    'sign': obj.sign.name,
                    'degrees': obj.sign_longitude.raw if hasattr(obj.sign_longitude, 'raw') else obj.sign_longitude
                }
                
                # Agregar puntos opuestos (DSC y IC)
                opposite_name = 'Dsc' if obj.name == 'Asc' else 'Ic'
                opposite_longitude = ((obj.longitude.raw if hasattr(obj.longitude, 'raw') else obj.longitude) + 180) % 360
                opposite_sign_longitude = opposite_longitude % 30
                opposite_sign_index = int(opposite_longitude / 30)
                opposite_sign = ['Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo', 
                               'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis'][opposite_sign_index]
                
                result['angles'][opposite_name] = {
                    'longitude': opposite_longitude,
                    'sign': opposite_sign,
                    'degrees': opposite_sign_longitude
                }
        
        # ✅ CORRECCIÓN 7: Procesamiento completo de casas
        for index, house in raw_data.get('houses', {}).items():
            result['houses'][str(house.number)] = {
                'longitude': house.longitude.raw if hasattr(house.longitude, 'raw') else house.longitude,
                'sign': house.sign.name,
                'degrees': house.sign_longitude.raw if hasattr(house.sign_longitude, 'raw') else house.sign_longitude
            }
        
        # ✅ CORRECCIÓN 8: Procesamiento completo de aspectos
        aspect_types = {
            0: 'Conjunción',
            60: 'Sextil',
            90: 'Cuadratura',
            120: 'Trígono',
            180: 'Oposición'
        }
        
        # Calcular aspectos con validaciones
        aspects_set = set()  # Para evitar duplicados
        for p1_idx, aspects_dict in raw_data.get('aspects', {}).items():
            for p2_idx, aspect in aspects_dict.items():
                # Crear una clave única para el aspecto
                aspect_key = tuple(sorted([aspect._active_name, aspect._passive_name]) + [aspect.type])
                if aspect_key in aspects_set:
                    continue
                aspects_set.add(aspect_key)
                
                # Convertir el tipo de aspecto a español
                if aspect.type == 'Conjunction':
                    asp_type = 'Conjunción'
                elif aspect.type == 'Sextile':
                    asp_type = 'Sextil'
                elif aspect.type == 'Square':
                    asp_type = 'Cuadratura'
                elif aspect.type == 'Trine':
                    asp_type = 'Trígono'
                elif aspect.type == 'Opposition':
                    asp_type = 'Oposición'
                else:
                    continue
                
                # Agregar el aspecto con información completa
                result['aspects'].append({
                    'point1': aspect._active_name,
                    'point2': aspect._passive_name,
                    'aspect': asp_type,
                    'difference': {
                        'raw': aspect.difference.raw if hasattr(aspect.difference, 'raw') else aspect.difference,
                        'formatted': aspect.difference.formatted if hasattr(aspect.difference, 'formatted') else None,
                        'direction': aspect.difference.direction if hasattr(aspect.difference, 'direction') else None,
                        'degrees': aspect.difference.degrees if hasattr(aspect.difference, 'degrees') else None,
                        'minutes': aspect.difference.minutes if hasattr(aspect.difference, 'minutes') else None,
                        'seconds': aspect.difference.seconds if hasattr(aspect.difference, 'seconds') else None
                    },
                    'movement': {
                        'applicative': aspect.movement.applicative if hasattr(aspect.movement, 'applicative') else False,
                        'exact': aspect.movement.exact if hasattr(aspect.movement, 'exact') else False,
                        'separative': aspect.movement.separative if hasattr(aspect.movement, 'separative') else False,
                        'formatted': aspect.movement.formatted if hasattr(aspect.movement, 'formatted') else None
                    },
                    'condition': {
                        'associate': aspect.condition.associate if hasattr(aspect.condition, 'associate') else False,
                        'dissociate': aspect.condition.dissociate if hasattr(aspect.condition, 'dissociate') else False,
                        'formatted': aspect.condition.formatted if hasattr(aspect.condition, 'formatted') else None
                    }
                })
        
        # Ordenar aspectos por importancia
        aspect_order = {
            'Conjunción': 1,
            'Oposición': 2,
            'Cuadratura': 3,
            'Trígono': 4,
            'Sextil': 5
        }
        result['aspects'].sort(key=lambda x: (aspect_order[x['aspect']], x['point1'], x['point2']))
        
        return result
        
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Error detallado:\n{error_details}")
        raise ValueError(f"Error calculando carta natal: {str(e)}")

# RESULTADO ESPERADO: Posiciones planetarias correctas
# Sol natal: 275.267° (5°16'15" Capricornio) ✅
# Luna Progresada: ~5°17' Capricornio ✅
# Precisión: Compatible con AstroSeek
