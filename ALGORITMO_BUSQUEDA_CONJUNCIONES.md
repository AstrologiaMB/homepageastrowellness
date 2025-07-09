# 🔍 ALGORITMO COMPLETO: Búsqueda de Conjunciones Luna Progresada

## 📋 **FLUJO PRINCIPAL EN `calculate_all()`**

```python
def calculate_all(self, start_date: datetime = None, end_date: datetime = None) -> list:
    # Si no se especifican fechas, usar el año actual completo
    if not start_date:
        start_date = datetime(datetime.now().year, 1, 1, tzinfo=ZoneInfo("UTC"))
    if not end_date:
        end_date = datetime(datetime.now().year, 12, 31, 23, 59, tzinfo=ZoneInfo("UTC"))

    all_events = []
    
    # Verificar conjunciones para cada planeta natal
    for planet_id in PLANETS_TO_CHECK:
        if planet_id in self.natal_positions:
            # ⚠️ AQUÍ ESTÁ EL PROBLEMA: Buscar fecha de conjunción
            result = self._find_conjunction_date(planet_id, start_date, end_date)
            
            if result:
                conj_date, orb = result
                # Crear evento con la fecha encontrada
                # ...
```

## 🚨 **ALGORITMO PROBLEMÁTICO 1: `_find_conjunction_date()`**

```python
def _find_conjunction_date(self, planet_id: int, start_date: datetime, end_date: datetime) -> tuple:
    """
    Encuentra la fecha exacta de conjunción entre la Luna progresada y un planeta natal
    usando búsqueda binaria.
    """
    # Obtener posición del planeta natal
    natal_pos = self.natal_positions[planet_id]['longitude']
    
    # Calcular posiciones de Luna progresada al inicio y fin del período
    start_pos = self._calculate_progressed_moon_position(start_date)
    end_pos = self._calculate_progressed_moon_position(end_date)
    
    # Calcular diferencias angulares
    start_diff = abs(start_pos - natal_pos)
    if start_diff > 180:
        start_diff = 360 - start_diff
        
    end_diff = abs(end_pos - natal_pos)
    if end_diff > 180:
        end_diff = 360 - end_diff
    
    # Si la diferencia inicial es menor que el orbe, la conjunción ya está ocurriendo al inicio
    if start_diff <= settings.default_orb:
        return (start_date, start_diff)
        
    # Si la diferencia final es menor que el orbe, la conjunción ocurre al final
    if end_diff <= settings.default_orb:
        return (end_date, end_diff)
    
    # ⚠️ BÚSQUEDA BINARIA (puede encontrar fecha aproximada incorrecta)
    min_date = start_date
    max_date = end_date
    best_date = None
    min_orb = float('inf')
    
    # Máximo 10 iteraciones para evitar bucles infinitos
    for _ in range(10):
        # Calcular fecha media
        mid_seconds = (min_date.timestamp() + max_date.timestamp()) / 2
        mid_date = datetime.fromtimestamp(mid_seconds, tz=ZoneInfo("UTC"))
        
        # Calcular posición y diferencia
        mid_pos = self._calculate_progressed_moon_position(mid_date)
        mid_diff = abs(mid_pos - natal_pos)
        if mid_diff > 180:
            mid_diff = 360 - mid_diff
            
        # Actualizar mejor fecha si el orbe es menor
        if mid_diff < min_orb:
            min_orb = mid_diff
            best_date = mid_date
            
        # Si el orbe es menor que el umbral, hemos encontrado una conjunción
        if mid_diff <= settings.default_orb:
            # ⚠️ AQUÍ LLAMA AL ALGORITMO PROBLEMÁTICO
            return self._refine_conjunction(planet_id, mid_date, min_orb)
            
        # Lógica de búsqueda binaria...
        # (código complejo para determinar dirección)
        
    # Si llegamos aquí, devolver la mejor aproximación
    if min_orb <= settings.default_orb and best_date:
        return (best_date, min_orb)
        
    return None
```

## 🚨 **ALGORITMO PROBLEMÁTICO 2: `_refine_conjunction()`**

```python
def _refine_conjunction(self, planet_id: int, approx_date: datetime, approx_orb: float) -> tuple:
    """
    Refina la fecha de conjunción para encontrar el orbe mínimo.
    ⚠️ AQUÍ ESTÁ EL BUG PRINCIPAL
    """
    natal_pos = self.natal_positions[planet_id]['longitude']
    
    # ⚠️ PROBLEMA: Buscar en un rango de ±45 días SIN LÍMITES
    min_date = approx_date - timedelta(days=45)  # Puede ir a 2024
    max_date = approx_date + timedelta(days=45)  # Puede ir a 2026 ❌
    
    best_date = approx_date
    min_orb = approx_orb
    
    # ⚠️ PROBLEMA: Verificar cada día en el rango (incluyendo 2026)
    current = min_date
    while current <= max_date:
        pos = self._calculate_progressed_moon_position(current)
        diff = abs(pos - natal_pos)
        if diff > 180:
            diff = 360 - diff
            
        # ⚠️ PROBLEMA: Si encuentra mejor orbe en 2026, lo selecciona
        if diff < min_orb:
            min_orb = diff
            best_date = current  # ← AQUÍ SE ASIGNA 2026-01-01
            
        current += timedelta(days=1)
        
    return (best_date, min_orb)  # ← DEVUELVE FECHA EN 2026
```

## 🎯 **RESUMEN DEL PROBLEMA**

### **Paso 1**: `calculate_all()` define rango 2025 ✅
### **Paso 2**: `_find_conjunction_date()` encuentra fecha aproximada ~noviembre 2025 ✅
### **Paso 3**: `_refine_conjunction()` busca ±45 días = octubre 2025 a enero 2026 ❌
### **Paso 4**: Encuentra orbe menor en 2026-01-01 y lo devuelve ❌

## 🔧 **SOLUCIÓN**

El problema está en `_refine_conjunction()` que NO respeta los límites del año 2025. Necesita recibir y respetar `start_date` y `end_date` del rango original.
