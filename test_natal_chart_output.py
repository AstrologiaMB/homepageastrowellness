import sys
import os
import json
from datetime import datetime
from zoneinfo import ZoneInfo

# Añadir el directorio padre al path para poder importar natal_chart
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'astro-calendar-personal-fastapi', 'src', 'calculators')))

# Importar settings de Immanuel antes de importar natal_chart
from immanuel.setup import settings
from immanuel.const import chart

# Guardar la configuración original de settings.objects
original_immanuel_settings_objects = list(settings.objects)

# Modificar settings.objects para el test, excluyendo los elementos problemáticos
# Esto se hace ANTES de importar natal_chart para que use esta configuración
settings.objects = [
    # Planetas
    chart.SUN, chart.MOON, chart.MERCURY, chart.VENUS, chart.MARS,
    chart.JUPITER, chart.SATURN, chart.URANUS, chart.NEPTUNE, chart.PLUTO,
    # Ángulos
    chart.ASC, chart.MC,
    # Puntos especiales (excluyendo los que causan AttributeError)
    chart.TRUE_NORTH_NODE, chart.TRUE_SOUTH_NODE, chart.LILITH, chart.CHIRON,
    # chart.PART_OF_FORTUNE, # Excluido temporalmente para el test
    # chart.VERTEX # Excluido temporalmente para el test
]

# Ahora importar natal_chart, que usará la configuración modificada de settings.objects
from natal_chart import calcular_carta_natal

def run_test():
    print("Ejecutando test para calcular carta natal con datos de Luis Minvielle...")

    datos_usuario = {
        "hora_local": "1964-12-26T21:12:00",
        "lat": -34.6118,
        "lon": -58.3960,
        "zona_horaria": "America/Argentina/Buenos_Aires",
        "lugar": "Buenos Aires, Argentina"
    }

    try:
        natal_data = calcular_carta_natal(datos_usuario)
        print("\n--- Datos de Carta Natal Generados ---")
        print(json.dumps(natal_data, indent=2, ensure_ascii=False))

        # Verificar la configuración de aspects en settings de Immanuel
        print("\n--- Configuración de Immanuel (settings.aspects) ---")
        if hasattr(settings, 'aspects') and settings.aspects:
            print(settings.aspects)
        else:
            print("settings.aspects NO está configurado o está vacío.")
            
        # Verificar la posición del Sol natal
        if 'points' in natal_data and 'Sun' in natal_data['points']:
            sun_pos = natal_data['points']['Sun']
            print(f"\nPosición del Sol natal: {sun_pos['degrees']}° {sun_pos['sign']} (Longitud: {sun_pos['longitude']:.3f}°)")
        
        # Verificar la posición de la Luna natal
        if 'points' in natal_data and 'Moon' in natal_data['points']:
            moon_pos = natal_data['points']['Moon']
            print(f"Posición de la Luna natal: {moon_pos['degrees']}° {moon_pos['sign']} (Longitud: {moon_pos['longitude']:.3f}°)")

        # Verificar si hay aspectos calculados
        if 'aspects' in natal_data and natal_data['aspects']:
            print(f"\n--- Aspectos Calculados ({len(natal_data['aspects'])}) ---")
            for asp in natal_data['aspects']:
                print(f"  - {asp.get('point1')} {asp.get('aspect')} {asp.get('point2')} (Orbe: {asp.get('orb'):.2f}°)")
        else:
            print("\n--- No se encontraron aspectos calculados en la carta natal. ---")

    except Exception as e:
        print(f"\nError al ejecutar el test: {e}")
        import traceback
        traceback.print_exc()
    finally:
        # Restaurar la configuración original de settings.objects después del test
        settings.objects = original_immanuel_settings_objects

if __name__ == "__main__":
    run_test()
