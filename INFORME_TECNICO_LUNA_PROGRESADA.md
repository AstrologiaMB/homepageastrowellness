# INFORME TÉCNICO: DISCREPANCIA EN CÁLCULO DE LUNA PROGRESADA
## Aplicación Astrowellness - Análisis y Solución Propuesta

**Fecha:** 27 de Junio, 2025  
**Versión:** 1.0  
**Autor:** Análisis Técnico Astrowellness  
**Destinatario:** Consulta Técnica Externa  

---

## 📋 RESUMEN EJECUTIVO

### Problema Identificado
La aplicación Astrowellness presenta una discrepancia crítica en el cálculo de Luna Progresada. Los resultados actuales muestran **~1° Capricornio** cuando deberían mostrar **~5°17' Capricornio**, generando una diferencia de aproximadamente **4.3 grados**.

### Impacto
- **Funcionalidad afectada:** Eventos astrológicos personales (Luna Progresada)
- **Usuarios impactados:** Todos los usuarios con servicios premium
- **Severidad:** Alta - Datos astrológicos incorrectos afectan la credibilidad del servicio

### Solución Propuesta
Reemplazar la implementación deficiente de cálculo de carta natal en el microservicio `astro-calendar-personal-fastapi` con la implementación correcta del microservicio `calculo-carta-natal-api`.

---

## 🏗️ ARQUITECTURA DEL SISTEMA

### Microservicios Involucrados

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                          │
│                 sidebar-fastapi                                │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│           MICROSERVICIO CALENDARIO PERSONAL                    │
│              astro-calendar-personal-fastapi                   │
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────────────────────────┐ │
│  │   app.py        │    │  astronomical_transits_calculator  │ │
│  │                 │    │           _v4.py                   │ │
│  │ /calculate-     │────▶│                                   │ │
│  │ personal-       │    │  ┌─────────────────────────────────┐ │ │
│  │ calendar-       │    │  │ ProgressedMoonTransitsCalculator│ │ │
│  │ dynamic         │    │  └─────────────────────────────────┘ │ │
│  └─────────────────┘    └─────────────────┬───────────────────┘ │
│                                           │                     │
│  ┌─────────────────────────────────────────▼───────────────────┐ │
│  │              natal_chart.py                                │ │
│  │          ❌ IMPLEMENTACIÓN DEFICIENTE ❌                    │ │
│  │                                                            │ │
│  │  def calcular_carta_natal():                              │ │
│  │    # Configuración incorrecta de Immanuel                 │ │
│  │    # Manejo problemático de zonas horarias                │ │
│  │    # Procesamiento incompleto de datos                    │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              MICROSERVICIO CARTA NATAL                         │
│                calculo-carta-natal-api                         │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    main.py                                 │ │
│  │          ✅ IMPLEMENTACIÓN CORRECTA ✅                      │ │
│  │                                                            │ │
│  │  def calcular_carta_natal():                              │ │
│  │    # Configuración correcta de Immanuel                   │ │
│  │    # Manejo adecuado de zonas horarias                    │ │
│  │    # Procesamiento completo y robusto                     │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Flujo de Datos Actual (Problemático)

```
Usuario → Frontend → /calculate-personal-calendar-dynamic
                                    ↓
                          calcular_carta_natal() [DEFICIENTE]
                                    ↓
                          Posiciones planetarias INCORRECTAS
                                    ↓
                          ProgressedMoonTransitsCalculator
                                    ↓
                          Luna Progresada INCORRECTA (~1°)
```

### Flujo de Datos Propuesto (Correcto)

```
Usuario → Frontend → /calculate-personal-calendar-dynamic
                                    ↓
                          calcular_carta_natal() [CORREGIDA]
                                    ↓
                          Posiciones planetarias CORRECTAS
                                    ↓
                          ProgressedMoonTransitsCalculator
                                    ↓
                          Luna Progresada CORRECTA (~5°17')
```

---

## 🔍 ANÁLISIS TÉCNICO DETALLADO

### Caso de Prueba
**Datos de referencia (AstroSeek):**
- **Persona:** Luis Minvielle
- **Fecha:** 26/12/1964
- **Hora:** 21:12
- **Lugar:** Buenos Aires, Argentina
- **Sol natal:** 5°16'15" Capricornio (275.267°)

### Resultados Actuales vs Esperados

| Componente | Resultado Actual | Resultado Esperado | Diferencia |
|------------|------------------|-------------------|------------|
| Sol natal | ~271° | 275.267° | ~4.3° |
| Luna Progresada | ~1° Capricornio | ~5°17' Capricornio | ~4.3° |

### Evidencia del Problema

#### 1. Test Script Correcto
```bash
# Archivo: test_progressed_moon_position.py
# Resultado: Luna Progresada = 5.30° Capricornio ✅
```

#### 2. API Response Incorrecta
```bash
curl -X POST "http://localhost:8004/calculate-personal-calendar-dynamic" \
-H "Content-Type: application/json" \
-d '{"name": "Luis Minvielle", "birth_date": "1964-12-26", "birth_time": "21:12", "location": {...}, "year": 2025}'

# Resultado: "grado": 1 ❌ (debería ser ~5)
```

---

## 🔧 ANÁLISIS DE CÓDIGO

### Implementación Deficiente (Actual)

**Archivo:** `astro-calendar-personal-fastapi/src/calculators/natal_chart.py`

```python
# ❌ PROBLEMAS IDENTIFICADOS:

# 1. Configuración incompleta de Immanuel
import immanuel.charts as charts
from immanuel.const import chart, calc
from immanuel.setup import settings

# NO CONFIGURA settings.objects
# NO CONFIGURA settings.aspects

# 2. Manejo problemático de zonas horarias
birth_datetime_utc = birth_datetime.astimezone(ZoneInfo("UTC"))

# 3. Creación incorrecta de carta natal
natal_chart = charts.Natal(
    date_time=birth_datetime_utc,  # ❌ Usa UTC en lugar de tiempo local
    latitude=latitude,
    longitude=longitude
)

# 4. Procesamiento básico y propenso a errores
# Conversión de datos incompleta y sin validaciones robustas
```

### Implementación Correcta (Referencia)

**Archivo:** `calculo-carta-natal-api/main.py`

```python
# ✅ IMPLEMENTACIÓN CORRECTA:

# 1. Configuración completa de Immanuel
from src.immanuel import charts
from src.immanuel.const import chart
from src.immanuel.setup import settings

# Configurar objetos y aspectos
settings.objects = [
    chart.SUN, chart.MOON, chart.MERCURY, chart.VENUS, chart.MARS,
    chart.JUPITER, chart.SATURN, chart.URANUS, chart.NEPTUNE, chart.PLUTO,
    chart.ASC, chart.MC,
    chart.TRUE_NORTH_NODE, chart.LILITH, chart.CHIRON,
    chart.PART_OF_FORTUNE, chart.VERTEX
]

settings.aspects = {
    0: 8,     # Conjunción con orbe de 8°
    60: 6,    # Sextil con orbe de 6°
    90: 8,    # Cuadratura con orbe de 8°
    120: 8,   # Trígono con orbe de 8°
    180: 8    # Oposición con orbe de 8°
}

# 2. Manejo correcto de tiempo local
local_time = datetime.fromisoformat(datos_usuario['hora_local'])

# 3. Creación correcta de carta natal
native = charts.Subject(
    date_time=local_time,  # ✅ Usa tiempo local directamente
    latitude=latitude,
    longitude=longitude
)

chart_obj = charts.Natal(native)
raw_data = chart_obj.to_dict()

# 4. Procesamiento robusto y completo
# Conversión completa con validaciones y manejo de errores
```

---

## 💡 SOLUCIÓN PROPUESTA

### Estrategia de Corrección

**Opción 1: Reemplazo Completo (RECOMENDADA)**
- Reemplazar completamente la función `calcular_carta_natal()` en `natal_chart.py`
- Usar la implementación probada del microservicio `calculo-carta-natal-api`
- Mantener compatibilidad con la interfaz existente

**Opción 2: Corrección Incremental**
- Corregir los problemas específicos identificados
- Mayor riesgo de introducir nuevos errores
- Tiempo de desarrollo más largo

### Plan de Implementación

#### Fase 1: Backup y Preparación
```bash
# 1. Crear backup del archivo actual
cp astro-calendar-personal-fastapi/src/calculators/natal_chart.py \
   astro-calendar-personal-fastapi/src/calculators/natal_chart.py.backup

# 2. Documentar cambios
git add -A
git commit -m "Backup antes de corrección Luna Progresada"
```

#### Fase 2: Implementación
```python
# Reemplazar función calcular_carta_natal() con implementación correcta
# Mantener interfaz compatible con el resto del sistema
# Agregar logging para debugging
```

#### Fase 3: Validación
```bash
# 1. Test unitario
python test_progressed_moon_position.py

# 2. Test de API
curl -X POST "http://localhost:8004/calculate-personal-calendar-dynamic" \
-H "Content-Type: application/json" \
-d '{"name": "Luis Minvielle", ...}'

# 3. Verificar resultado esperado: ~5°17' Capricornio
```

---

## 📊 CASOS DE PRUEBA

### Test Case 1: Luis Minvielle
```json
{
  "name": "Luis Minvielle",
  "birth_date": "1964-12-26",
  "birth_time": "21:12",
  "location": {
    "latitude": -34.6118,
    "longitude": -58.3960,
    "name": "Buenos Aires",
    "timezone": "America/Argentina/Buenos_Aires"
  },
  "year": 2025
}
```

**Resultado Esperado:**
- Sol natal: 275.267° (5°16'15" Capricornio)
- Luna Progresada: ~5°17' Capricornio

### Test Case 2: Validación con AstroSeek
- Comparar resultados con software de referencia
- Verificar precisión en posiciones planetarias
- Validar cálculos de Luna Progresada

---

## 🔧 ARCHIVOS TÉCNICOS

### Estructura de Directorios
```
astro-calendar-personal-fastapi/
├── app.py                                    # API endpoints
├── src/
│   └── calculators/
│       ├── natal_chart.py                    # ❌ ARCHIVO A CORREGIR
│       ├── astronomical_transits_calculator_v4.py
│       └── progressed_moon_transits.py      # Usa datos de natal_chart.py
└── test_progressed_moon_position.py         # ✅ Test que funciona

calculo-carta-natal-api/
├── main.py                                   # ✅ IMPLEMENTACIÓN CORRECTA
└── src/
    └── immanuel/                            # Configuración correcta
```

### Dependencias Críticas
```python
# Librerías utilizadas
immanuel==2.3.1          # Cálculos astrológicos
swisseph==2.10.03.2      # Swiss Ephemeris
zoneinfo                 # Manejo de zonas horarias
datetime                 # Fechas y horas
```

---

## 🚨 RIESGOS Y CONSIDERACIONES

### Riesgos Técnicos
1. **Compatibilidad:** Cambios en la interfaz pueden afectar otros componentes
2. **Regresión:** Posibles efectos secundarios en otros cálculos astrológicos
3. **Performance:** Verificar que la nueva implementación mantenga el rendimiento

### Mitigación de Riesgos
1. **Testing exhaustivo** antes del despliegue
2. **Backup completo** del código actual
3. **Rollback plan** en caso de problemas
4. **Monitoring** post-implementación

### Consideraciones de Despliegue
- **Tiempo estimado:** 2-4 horas
- **Downtime requerido:** Mínimo (hot-swap posible)
- **Validación:** Tests automatizados + validación manual

---

## 📈 MÉTRICAS DE ÉXITO

### Criterios de Aceptación
1. **Precisión:** Luna Progresada = 5°17' Capricornio (±0.1°)
2. **Consistencia:** Resultados idénticos a AstroSeek
3. **Performance:** Tiempo de respuesta < 2 segundos
4. **Estabilidad:** Sin errores en 100 requests consecutivos

### Validación Post-Implementación
```bash
# Script de validación automática
./validate_progressed_moon.sh

# Métricas esperadas:
# - Precisión: 100%
# - Tiempo respuesta: < 2s
# - Error rate: 0%
```

---

## 📞 CONTACTO Y SOPORTE

### Información Técnica
- **Repositorio:** astrowellness-microservices
- **Documentación:** `/docs/luna-progresada-fix.md`
- **Logs:** `/var/log/astro-calendar-personal/`

### Escalación
1. **Nivel 1:** Desarrollador Frontend
2. **Nivel 2:** Arquitecto de Microservicios  
3. **Nivel 3:** Consultor Astrológico Externo

---

## 📋 ANEXOS

### Anexo A: Código Fuente Completo
Ver archivos adjuntos:
- `natal_chart_current.py` (implementación actual)
- `natal_chart_proposed.py` (implementación propuesta)
- `test_cases.json` (casos de prueba)

### Anexo B: Logs de Debugging
Ver archivos adjuntos:
- `debug_current_implementation.log`
- `debug_proposed_implementation.log`

### Anexo C: Comparación AstroSeek
Ver archivos adjuntos:
- `astroseek_reference_data.json`
- `comparison_results.xlsx`

---

**FIN DEL INFORME**

*Este documento contiene información técnica confidencial. Distribución restringida.*
