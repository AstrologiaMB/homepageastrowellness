# Active Context

## Current Work

Estamos trabajando en la integración de la aplicación Next.js (sidebar-fastapi) con microservicios Python especializados mediante APIs FastAPI. El proyecto Astrowellness utiliza una arquitectura de microservicios donde sidebar-fastapi actúa como frontend y API gateway, mientras que diferentes programas Python (como calculo-carta-natal-api) proporcionan servicios especializados de cálculo astrológico.

**Arquitectura del Proyecto:**
```
Astrowellness (Proyecto Principal)
├── sidebar-fastapi/ (Frontend Next.js + API Gateway)
└── calculo-carta-natal-api/ (Microservicio Python #1)
    └── [futuros microservicios Python...]
```

**Estado Actual de la Integración:**
- ✅ Programa Python completamente funcional en calculo-carta-natal-api
- ✅ Formato de datos compatible confirmado
- ❌ FastAPI wrapper pendiente de implementación
- ❌ Endpoints de integración en Next.js pendientes

## Recent Changes

### **Descubrimiento del Programa Python Existente**
*   **Programa Python Funcional:** Confirmado que `calculo-carta-natal-api/main.py` está completamente implementado con:
    - Cálculo de cartas natales tropicales y dracónicas usando biblioteca `immanuel`
    - Geocodificación automática con `geopy` y `timezonefinder`
    - Función `generar_json_reducido()` que convierte datos al formato AstroChart
    - Generación de archivos JSON compatibles con el frontend
*   **Entorno Python Configurado:** Virtual environment activo con todas las dependencias instaladas
*   **Archivos de Ejemplo Generados:** Disponibles archivos JSON de prueba en formato compatible

### **Frontend Next.js (Completamente Funcional)**
*   **Versiones Actualizadas:** Next.js 15.2.4 + React 19 + NextAuth 4.24.11
*   **Sistema de Autenticación Robusto:** Middleware centralizado, callbacks JWT/session, protección de rutas
*   **Layout y Navegación:** Sidebar responsive, breadcrumbs dinámicos, navegación sin errores de claves duplicadas
*   **Calendario General Implementado:** Visualización de eventos astrológicos con scroll horizontal, conversión de zonas horarias
*   **Carta Natal Trópica Funcional:** Renderizada con @astrodraw/astrochart usando datos estáticos
*   **Formulario de Datos Personales:** Con precarga, validación y manejo de hora de nacimiento
*   **Base de Datos Prisma:** Schema actualizado con modelos User y RectificationEvent

### **Componentes UI Implementados**
*   **CartaNatalWrapper:** Carga dinámica con SSR disabled para compatibilidad con AstroChart
*   **EventoAstrologico:** Tarjetas optimizadas para mostrar eventos astrológicos
*   **CalendarioGeneral:** Navegación por semanas, selección de fechas, eventos filtrados por día
*   **Formularios:** Completar datos con precarga y validación robusta

## Next Steps - Integración FastAPI

### **Fase 1: Implementar FastAPI en calculo-carta-natal-api**
1. **Crear FastAPI wrapper** alrededor del código Python existente
2. **Implementar endpoints HTTP:**
   - `POST /carta-natal/tropical` - Calcular carta natal trópica
   - `POST /carta-natal/draconica` - Calcular carta dracónica
   - `GET /health` - Health check
3. **Configurar CORS** para permitir requests desde sidebar-fastapi
4. **Implementar manejo de errores** y logging
5. **Testing de endpoints** con herramientas como curl/Postman

### **Fase 2: Crear API Gateway en sidebar-fastapi**
1. **Implementar endpoint Next.js:** `app/api/cartas/tropical/route.ts`
2. **Integrar con sistema de caché** usando Prisma
3. **Implementar verificación de autenticación** y datos de usuario
4. **Manejo de errores** con fallback a datos locales

### **Fase 3: Actualizar Frontend**
1. **Modificar componentes** para usar datos dinámicos en lugar de estáticos
2. **Implementar loading states** y error handling
3. **Testing end-to-end** de la integración completa

### **Fase 4: Optimización**
1. **Sistema de caché avanzado** con limpieza programada
2. **Monitoreo y logging** de performance
3. **Documentación de APIs** con OpenAPI/Swagger

## Decisiones Activas

- **Arquitectura de Microservicios:** sidebar-fastapi como API gateway, microservicios Python especializados
- **Reutilización de Código:** Aprovechar el programa Python existente sin modificaciones mayores
- **FastAPI como Wrapper:** Crear capa HTTP alrededor de la lógica existente
- **Compatibilidad de Formatos:** Formato `carta_astrochart_*.json` ya compatible con AstroChart
- **Sistema de Caché:** Implementar en sidebar-fastapi usando Prisma para optimizar performance
- **Manejo de Errores:** Fallback a datos locales en caso de error en microservicios

## Últimas Implementaciones Completadas

### ✅ **Solución Casa en Subtítulos** - COMPLETADO (9 Enero 2025)
**Problema resuelto:** Los subtítulos de interpretaciones individuales no mostraban información de casa astrológica.

**Causa identificada:** Datos separados en dos registros en `InterpretacionCache`:
- "PlanetaEnSigno": tenía planeta, signo, grados pero `casa: null`
- "PlanetaEnCasa": tenía planeta, casa pero `signo: null`, `grados: null`

**Solución implementada:**
- Función `combinarInformacionCasa()` en `app/api/interpretaciones/route.ts`
- Combina información de ambos registros automáticamente
- Aplica tanto a datos desde cache como interpretaciones nuevas

**Resultado:**
- ANTES: "Sol en Capricornio 5° 17'"
- AHORA: "Sol en Capricornio 5° 17' • Casa 6"

**Documentación:** `CASA_SUBTITULO_DOCUMENTATION.md`

### ✅ **Simplificación de Símbolos Astrológicos** - COMPLETADO
**Problema resuelto:** Conversión problemática de símbolos astrológicos en subtítulos.

**Solución implementada:**
- Eliminación completa de conversiones automáticas
- Texto simple y limpio en `components/interpretaciones-individuales.tsx`
- Removido `replaceAstroWords()` y `font-astronomicon`

**Resultado:** Subtítulos legibles sin símbolos problemáticos.

## Aprendizajes del Proyecto

- El programa Python en calculo-carta-natal-api está más avanzado de lo documentado inicialmente
- La función `generar_json_reducido()` ya resuelve la compatibilidad de formatos
- La arquitectura de microservicios permite escalabilidad y mantenimiento independiente
- El frontend Next.js está completamente funcional y listo para la integración
- La integración será más directa de lo anticipado debido al código Python existente
- **Los datos de casa astrológica estaban disponibles en Prisma pero separados en registros diferentes**
- **La combinación de datos en el API es más eficiente que modificar la estructura de base de datos**
