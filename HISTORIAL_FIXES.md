# 📚 HISTORIAL DE FIXES - Astrowellness

**Propósito:** Registro histórico detallado de todos los fixes y optimizaciones del sistema.

**Última actualización:** 26 de Noviembre 2025

---

## 🔧 FIXES DE GÉNERO Y CÁLCULOS DRACÓNICOS

### **Error de género: Luna aparece como 'dracónico' en vez de 'dracónica'**
**Fecha:** Q4 2024  
**Ubicación:** `../astro_interpretador_rag_fastapi/interpretador_refactored.py`  
**Función:** `_get_draconico_suffix()` (línea ~580)  
**Uso:** `_generar_consulta_estandarizada()` (línea ~450)  
**Testing:** Buscar "luna draconica" vs "mercurio draconico" en logs  
**Documentación completa:** `../calculo-carta-natal-api/DRACONIC_GENDER_FIX_DOCUMENTATION.md`

### **Cálculos dracónicos incorrectos o imprecisos**
**Fecha:** Q4 2024  
**Ubicación:** `../calculo-carta-natal-api/src/calculators/cross_chart_calculator.py`  
**Función:** `calculate_cross_aspects()` y `calculate_cross_cusps()`  
**Testing:** Comparar con AstroSeek para verificar precisión  
**Documentación completa:** `../calculo-carta-natal-api/DRACONIC_PRECISION_FIX_DOCUMENTATION.md`

### **Cúspides cruzadas muestran resultados incorrectos (1→1, 2→2, etc.)**
**Fecha:** Q4 2024  
**Causa:** Problema de cache de Prisma con datos obsoletos  
**Solución:** `npx prisma generate --force`  
**Verificación:** Casa 1 Dracónica debe caer en Casa 12 Tropical (no en Casa 1)  
**Testing:** Comparar Ascendente Dracónico (Acuario 8°57') vs Ascendente Tropical (Piscis 6°52')

### **Interpretaciones dracónicas muestran contenido equivocado**
**Fecha:** Q4 2024  
**Causa:** Archivos dracónicos en ubicación incorrecta (`drepecated draco/`)  
**Síntoma:** "⚠️ Índice dracónico no disponible, fallback a índice mixto"  
**Solución:** Mover archivos de `drepecated draco/` a `src/services/data/draco/`  
**Verificación:** Buscar "✅ Usando índice DRACÓNICO separado" en logs  
**Documentación completa:** `RAG_SEPARATION_IMPLEMENTATION_PLAN.md`

---

## 🚀 FIXES DE PERFORMANCE Y CACHE

### **Sistema de Cache del Calendario Personal**
**Fecha:** 21/11/2025  
**Status:** ✅ FUNCIONANDO - Performance mejorada 1,500x (12s → 8ms)

**Commits:**
- Sistema base: `db4c443` (13/11/2025)
- Fix userId: `8a7a772` (21/11/2025)

**Ubicaciones principales:**
- `prisma/schema.prisma`: Modelo PersonalCalendarCache con cascade delete
- `lib/calendar-cache.ts`: Funciones de cache server-side
- `app/api/calendario-personal/route.ts`: API Route con integración de cache
- `lib/personal-calendar-api.ts`: Cliente API para frontend
- `components/calendario-personal.tsx`: UI con badges visuales

**Performance lograda:**
```
Antes:  ~12,000ms (12 segundos) cada carga
Ahora:  Primera carga: ~12s (🔄 CALCULADO) → Segunda carga: 8ms (⚡ CACHE)
Mejora: 1,500x más rápido en cargas subsecuentes
```

**TTL Dinámico por año:**
- Año actual (2025): 24 horas
- Año futuro (2026+): Hasta fin de año (máx 1 año)
- Año pasado (2024-): 30 días

**Mejora futura recomendada (Opción 2):**
Migrar a callbacks de NextAuth para incluir `id` en sesión JWT y eliminar query extra (~2ms).

### **Optimización de Logging - Fase 1**
**Fecha:** 25/11/2025  
**Status:** ✅ COMPLETADO  
**Problema:** Railway rate limit: 500 mensajes/segundo excedido  
**Síntoma:** "Messages dropped: 210"

**Commits:** `5c3e918` (branch optimization/logging-cleanup-v1 → main)  
**Branch backup:** `optimization/logging-cleanup-v1`

**Prints comentados (50+):**
- Prints de inicialización del InterpretadorRAG
- Prints de carga de archivos (tropical/dracónico)
- Prints de creación de engines RAG
- Feature flags de debugging

**Beneficios:**
- ✅ Reducción significativa de logs de Railway
- ✅ Mejora del performance de inicialización
- ✅ Funcionalidad completa mantenida
- ✅ Setup preservado para debugging futuro

### **Optimización de Logging - Fase 2B (Agresiva)**
**Fecha:** 26/11/2025  
**Status:** ✅ COMPLETADO  
**Problema:** Aún había verbosidad excesiva (~60 prints por interpretación)

**Commits:** d0bf30a, c5e87a4, d38b4fc, 7f6821b, `846e0ee` (merged a main)  
**Branch:** `optimization/phase2b-aggressive-logging`  
**Tag de seguridad:** `pre-phase2b-logging`

**Resultado:**
- **Antes (total):** ~110 prints por interpretación
- **Después:** ~6 prints críticos únicamente
- **Reducción:** 95% de logging eliminado
- **Rate limit:** 100% eliminado

**Prints mantenidos (6 críticos):**
```python
print("✅ InterpretadorRAG refactorizado inicializado correctamente")
print(f"🔧 Feature Flag - RAGs Separados: ACTIVADO/DESACTIVADO")
print(f"🚀 Ejecutando {N} consultas RAG en paralelo...")
print(f"⚠️ Error al consultar RAG: {e}")
print(f"❌ ERROR CRÍTICO: {error}")
```

### **Rate Limit de Railway - Fix Completo (Frontend Phase 2)**
**Fecha:** 27/11/2025  
**Status:** ✅ RESUELTO COMPLETAMENTE  
**Problema:** Railway dropping 486 messages/second - rate limit excedido persistentemente

#### **Fase 1: Console.logs en cruzada/route.ts**
**Fecha:** 27/11/2025  
**Ubicación:** `app/api/cartas/cruzada/route.ts`  
**Branch:** `fix/rate-limit-console-logs`  
**Commit:** `7d78f32` (merged to main)

**Logs comentados (~38 console.logs):**
- Debug loops de análisis de aspectos cruzados (líneas 66-103 caché)
- Debug loops de análisis de resultados (líneas 139-178 fresh)
- Logs mantenidos: "Llamando a FastAPI" y "Análisis calculado"

**Testing:** 
- ✅ Local: Funcionalidad verificada correctamente
- ✅ Deploy Railway: commit `7d78f32`
- ❌ Resultado: Rate limit PERSISTE (486 msgs/sec → sin cambio significativo)

#### **Fase 2A: Console.logs en interpretaciones/route.ts (FIX DEFINITIVO)**
**Fecha:** 27/11/2025  
**Ubicación:** `app/api/interpretaciones/route.ts`  
**Branch:** `fix/rate-limit-interpretaciones-phase2`  
**Commit:** `ff88e7d` (merged to main)

**Logs comentados críticos (7 líneas):**
1. `console.log('🔮 Obteniendo datos cruzados...')`
2. `console.log('✅ Agregadas X cúspides cruzadas...')`  
3. `console.log('✅ Agregados X aspectos cruzados...')`
4. `console.log('⚠️ No se encontraron aspectos cruzados...')`
5. `console.log('⚠️ No se encontraron datos cruzados...')`
6. `console.log('⚠️ Error al obtener datos cruzados...')`
7. `console.log('🔄 Llamando al microservicio RAG...')`
8. **`console.log('🔍 DEBUG:', JSON.stringify(ragRequest, null, 2))` ← CRÍTICO (50KB+ payload)**

**Logs activos mantenidos:**
- `console.log('📋 Devolviendo interpretación desde cache')`
- `console.log('⏭️ Saltando verificación de cache')`
- `console.log('✅ Interpretación generada en X segundos')`
- `console.log('💾 Interpretación guardada en cache')`
- Todos los `console.error()` para debugging crítico

**Testing:**
- ✅ Local: Carta dracónica generada correctamente (test usuario confirmado)
- ✅ Deploy Railway: commit `ff88e7d`
- ✅ **RESULTADO: Rate limit ELIMINADO (0 warnings de rate_limited)**

#### **Arquitectura del Fix Completo**

**Contribución por componente:**
```
Frontend (sidebar-fastapi) - IMPACTO CRÍTICO
├── interpretaciones/route.ts: ~8 logs comentados 
│   └── JSON.stringify(50KB): 70-80% del impacto total ⭐
└── cruzada/route.ts: ~38 logs comentados
    └── Loops de debug: 10-15% del impacto

Backend (astro_interpretador_rag_fastapi) - Pre-deployado
└── interpretador_refactored.py: ~58 prints (Fase 2B - 26/11)
    └── Contribución acumulativa: 10-15%

Total: ~104 logs eliminados → Rate limit resuelto ✅
```

#### **Resultado Final Confirmado**

**Métricas de Railway:**
- ❌ Antes: `⚠️ rate_limited: dropping 486 messages/sec`
- ✅ Después: Sin warnings de rate limit en logs
- 📊 Reducción total: ~95% del logging eliminado
- 🎯 Performance: Sin impacto en funcionalidad

**Factor crítico identificado:**
El `JSON.stringify(ragRequest, null, 2)` era el culpable principal:
- Payload típico: 50KB+ por request
- Frecuencia: Cada solicitud de interpretación dracónica
- Impacto: ~500 líneas de log por interpretación
- Solución: Comentar una sola línea eliminó 70-80% del problema

**Lecciones aprendidas:**
1. Los `JSON.stringify` de objetos grandes son el principal problema en rate limits
2. Loops con console.log tienen impacto menor pero acumulativo
3. Mantener logs de métricas (tiempos, cache) no afecta rate limit
4. Railway tiene límite de ~500 messages/sec - superado con interpretaciones complejas

---

## ⏱️ FIXES DE TIMEOUTS

### **Timeout en cartas dracónicas largas (>2 minutos)**
**Fecha:** 26/11/2025  
**Status:** ✅ RESUELTO  
**Problema:** Cartas dracónicas con 28+ eventos excedían timeout de 2 minutos

**Frontend (homepageastrowellness):**
- **Ubicación:** `app/api/interpretaciones/route.ts`
- **Cambio:** 120000ms → 300000ms (2min → 5min)
- **Commit:** `66108a7` (26/11/2025)
- **Deploy Railway:** `bae2cfae-76ae-4c89-a14b-3cf954a546d0`

**Backend RAG (astro_interpretador_rag_fastapi):**
- **Ubicación:** `interpretador_refactored.py` (líneas 682, 699)
- **Cambio:** Timeout OpenAI default (60s) → `timeout=300.0` (5min)
- **Código:**
```python
# Antes:
llm_rewriter = OpenAILLM(api_key=self.openai_key, temperature=0.7, model="gpt-4")

# Después:
llm_rewriter = OpenAILLM(api_key=self.openai_key, temperature=0.7, model="gpt-4", timeout=300.0)
```
- **Commit:** `41b9082` (26/11/2025)
- **Deploy Railway:** `d34258f8-871e-41ca-b502-86cc842079af`

**Arquitectura de Timeouts:**
```
Usuario → Frontend (5 min timeout)
          ↓
          Backend RAG (5 min timeout OpenAI)
          ↓
          OpenAI API (genera interpretación narrativa)
```

**Testing realizado:**
- ✅ Carta dracónica con 28 eventos: Completa sin timeout
- ✅ Interpretación narrativa: Genera correctamente
- ✅ Tiempo típico: 2-4 minutos para cartas complejas
- ✅ Margen de seguridad: 1-3 minutos de buffer

### **Timeout de geocodificación (ReadTimeoutError)**
**Fecha:** 13/11/2025  
**Ubicación:** `../calculo-carta-natal-api/main.py`  
**Funciones:** `get_coordinates()` (línea ~107), `get_coordinates_with_options()` (línea ~135)  
**Síntoma:** `ReadTimeoutError: Read timed out. (read timeout=1)` al buscar ubicaciones  
**Causa:** Timeout de 1 segundo demasiado bajo para API externa de Nominatim

**Solución:**
```python
# Antes (timeout implícito de geopy: 1 segundo)
location = geolocator.geocode(f"{city}, {country}", exactly_one=True)

# Después (timeout explícito: 10 segundos)
location = geolocator.geocode(f"{city}, {country}", exactly_one=True, timeout=10)
```

**Commit:** `74d12a3` (13/11/2025)  
**Testing:** Probar con ubicaciones lentas como "Londres, Argentina"

---

## 🌐 FIXES DE CONEXIÓN Y URLS

### **Error ECONNREFUSED al conectar con microservicios**
**Fecha:** Q4 2024  
**Causa:** URLs hardcodeadas que no funcionan en producción (Railway)  
**Síntoma:** `Error: connect ECONNREFUSED 127.0.0.1:8003` (o puertos 8001, 8002, 8004, 8005)  
**Solución:** Sistema centralizado de URLs con auto-discovery  
**Ubicación:** `lib/api-config.ts` (sistema centralizado)  
**Documentación completa:** `API_URL_CENTRALIZATION_FIX.md`

**Archivos afectados:** 7 rutas API actualizadas

**Variables de entorno requeridas en Railway:**
```env
CALCULOS_API_URL=https://calculo-carta-natal-api-production.up.railway.app
INTERPRETACIONES_API_URL=https://astro-interpretador-rag-fastapi-production.up.railway.app
ASTROGEMATRIA_API_URL=https://astrogematria-fastapi-production.up.railway.app
CALENDARIO_PERSONAL_API_URL=https://astro-calendar-personal-fastapi-production.up.railway.app
CARTA_ELECTIVA_API_URL=https://carta-electiva-api-production.up.railway.app
```

### **Variables de entorno no funcionan en producción (Railway)**
**Fecha:** 13/11/2025  
**Ubicación:** `lib/api-config.ts`  
**Síntoma:** `getApiUrl() returns empty string` o `undefined` en browser  
**Causa:** Next.js requiere prefix `NEXT_PUBLIC_` para variables accesibles desde browser

**Solución:**
```env
# Antes:
CALCULOS_API_URL=https://...

# Después:
NEXT_PUBLIC_CALCULOS_API_URL=https://...
```

**Commit:** `44ad61c` (13/11/2025)  
**Contexto:** Fix necesario porque `app/completar-datos/page.tsx` es client component

### **Calendario personal funciona local pero NO en producción (Railway)**
**Fecha:** 25/11/2025  
**Status:** ✅ RESUELTO  
**Diagnóstico:** Hardcode `localhost:8004` ignoraba variables entorno en contenedores separados

**Solución Arquitectural:**
```javascript
// Antes:
const MICROSERVICE_URL = 'http://localhost:8004' // hardcode problemático

// Después:
const MICROSERVICE_URL = getApiUrl('CALENDARIO') // configuración centralizada
```

**Commits:**
- `db7296d` (hardcode→centralizado)
- `48eb176` (timeout 30s→90s)

**Por qué Railway es más lento:** CPU allocation limitado vs máquina local completa (aceptado y normal)

---

## 🔐 FIXES DE SEGURIDAD Y ACCESO

### **Carta tropical accesible sin suscripción (paywall no funciona)**
**Fecha:** Q4 2024  
**Ubicación:** `lib/subscription.ts`  
**Array:** `PREMIUM_SERVICES` (línea ~10)  
**Causa:** Typo en la ruta - `/cartas/tropical` en lugar de `/cartas/tropica`

**Código correcto:**
```typescript
export const PREMIUM_SERVICES = [
  '/calendario/personal',
  '/cartas/tropica',      // ✅ Correcto (sin 'l' al final)
  '/cartas/draconica',
  '/astrogematria/interpretaciones'
] as const
```

**Middleware:** `middleware.ts` verifica permisos usando `isPremiumService(path)`

---

## 🤖 FIXES DE OPENAI Y MODELOS

### **Error al generar interpretación narrativa: Unknown model 'gpt-4-turbo'**
**Fecha:** 19/11/2025  
**Ubicación:** `../astro_interpretador_rag_fastapi/interpretador_refactored.py`  
**Líneas afectadas:** 682 y 699 (función `_generar_interpretacion_narrativa`)

**Diagnóstico:**
- Primera iteración: Error con `gpt-4-turbo-preview` (modelo deprecado)
- Segunda iteración: Cambio a `gpt-4-turbo` pero Railway no lo reconoce
- Problema raíz: Sistema de cache múltiple (CartaNatal + InterpretacionCache)

**Solución final:**
```python
# Antes:
llm_rewriter = OpenAILLM(api_key=self.openai_key, temperature=0.7, model="gpt-4-turbo")

# Después (FIX DEFINITIVO):
llm_rewriter = OpenAILLM(api_key=self.openai_key, temperature=0.7, model="gpt-4")
```

**Commits:**
- Primer intento: `77fe722` (gpt-4-turbo-preview → gpt-4-turbo)
- Fix definitivo: `153d5dd` (gpt-4-turbo → gpt-4)

**Por qué funciona:**
- `gpt-4` es el nombre universal compatible con todas las versiones de openai
- OpenAI automáticamente mapea `gpt-4` → última versión de GPT-4 disponible

**Limpieza de cache requerida:**
- Eliminar usuario completo desde `/admin/users`
- Alternativa: Endpoint `/api/cartas/clear-cache`

---

## 📄 FIXES DE GENERACIÓN DE PDF

### **PDFs de cartas tropicales muestran contenido incompleto**
**Fecha:** Q4 2024  
**Ubicación:** `lib/pdf-generator.ts`  
**Problema:** Interpretaciones individuales faltantes, footer sobreescrito, texto cortado

**Solución:**
- Nueva función `addIndividualInterpretations()` 
- Paginación inteligente con `getTextDimensions(content, {maxWidth: 170})`
- Footer space aumentado a 100mm
- Remoción de elementos visuales problemáticos

**Resultado:** PDFs completos de 10+ páginas con todas las 28 interpretaciones

### **PDFs no incluyen el gráfico astrológico visual**
**Fecha:** Q4 2024  
**Ubicación:** `components/pdf-download-button.tsx`, `lib/pdf-generator.ts`  
**Problema:** PDFs solo muestran texto, faltando el gráfico circular

**Solución:**
- Sistema modular completo con `pdf-lib`
- Funciones modulares tropicales: `generateCoverPDF()`, `generateChartPDF()`, etc.
- Funciones modulares dracónicas: `generateDraconicCoverPDF()`, etc.
- Captura del gráfico con html2canvas (parámetros width, height, x, y)
- Merge inteligente: `mergePDFs()` combina secciones
- Dimensiones: Gráfico centrado de 105x105mm

**Resultado:** PDFs completos con gráficos circulares perfectos, paginación robusta

---

## 🎨 FIXES DE FORMATEO Y UI

### **Grados aparecen en formato decimal en lugar de sexagesimal**
**Fecha:** Q4 2024  
**Ubicación:** `app/cartas/draconica/page.tsx`  
**Función:** `formatearGradosEnTexto()` (línea ~68)  
**Síntoma:** Cúspides muestran "8.988983013091001°" en lugar de "8° 59' 20""

**Solución:** La función convierte automáticamente usando regex

**Ejemplo:**
```
"Casa 1 Dracónica (Acuario 8.988983013091001°)" 
→ 
"Casa 1 Dracónica (Acuario 8° 59' 20")"
```

---

## 📅 TESTING DE AÑOS Y TRANSICIONES

### **¿Qué ocurre al cambiar de año (2025 → 2026)?**
**Fecha:** 21/11/2025  
**Estado:** ✅ SISTEMA LISTO PARA 2026 (validado)  
**Ubicación:** `hooks/use-user-natal-data.ts` (línea 141)  
**Mecanismo:** `year: new Date().getFullYear()` - detección automática

**Test realizado:**
- Fecha del sistema cambiada a 1/1/2026
- Usuario hizo login
- Sistema calculó 233 eventos automáticamente para 2026
- Tipos: 197 tránsitos + 1 luna progresada + 1 profección + 25 fases lunares + 4 eclipses + 5 aspectos
- Tiempo de cálculo: ~10 segundos

**Resultado:** ✅ Funciona perfectamente sin cambios de código

**Para usuarios en producción:**
- El 1/1/2026 simplemente acceden al calendario
- Sistema recalcula automáticamente para 2026
- Si la página está abierta a medianoche, hacer refresh o re-login

---

## 🗑️ FIXES DE ADMINISTRACIÓN

### **Necesito eliminar un usuario y sus datos asociados**
**Fecha:** Q4 2024  
**Ubicación:** `app/admin/users/page.tsx`  
**API:** `app/api/admin/users/[id]/route.ts` (DELETE endpoint)  
**Ruta:** `/admin/users` (solo accesible por admins)

**Funcionalidad:**
- Panel admin con lista de todos los usuarios
- Botón "Eliminar" rojo por cada usuario
- AlertDialog con confirmación doble
- Cascade delete automático vía Prisma
- Validación de seguridad: admin no puede auto-eliminarse

**Cascade Delete incluye:**
- ✅ NatalChart
- ✅ Interpretation
- ✅ RectificationEvent
- ✅ HoraryRequest

---

### **Error SSL en fetch interno (ERR_SSL_PACKET_LENGTH_TOO_LONG)**
**Fecha:** 27/11/2025  
**Status:** ✅ RESUELTO  
**Relación:** Continuación del fix ECONNREFUSED - mismo patrón, diferente error

**Problema:**
Después del fix de URLs centralizadas, cartas dracónicas funcionaban localmente pero fallaban en Railway con:
```
ERR_SSL_PACKET_LENGTH_TOO_LONG
```

**Causa raíz:**
`app/api/interpretaciones/route.ts` usaba `request.nextUrl.origin` que en Railway devuelve:
- `https://homepageastrowellness-production.up.railway.app` (HTTPS)
- Pero el contenedor interno corre en `http://localhost:8080` (HTTP)
- Resultado: Intentaba conexión HTTPS a puerto HTTP → Error SSL

**Evolución del fix:**
1. **Commit e7ce008** (intento inicial):
   - Cambió hardcode localhost → `request.nextUrl.origin`
   - ✅ Resolvió ECONNREFUSED local
   - ❌ Creó ERR_SSL en Railway

2. **Commit 7e8e55b** (fix definitivo):
   - Agregado `FRONTEND_INTERNAL` a `api-config.ts`
   - Development: `http://localhost:3000`
   - Production: `http://localhost:8080` (puerto interno Railway, sin SSL)
   - ✅ Patrón consistente con otros microservicios

**Archivos modificados:**
- `lib/api-config.ts`: Nuevo servicio `FRONTEND_INTERNAL`
- `app/api/interpretaciones/route.ts`: `getApiUrl('FRONTEND_INTERNAL')`

**Branch:** `fix/ssl-frontend-internal-fetch`  
**Testing:** ✅ Cartas dracónicas funcionan en Railway sin errores SSL

**Lección aprendida:**
En Railway, las llamadas internas entre APIs del mismo frontend deben usar:
- Puerto interno HTTP (8080) 
- NO el origin HTTPS externo
- Patrón `getApiUrl()` para consistencia

---

**📍 Ubicación de este documento:** `/Users/apple/sidebar-fastapi/HISTORIAL_FIXES.md`  
**🔄 Última actualización:** 27 de Noviembre 2025  
**📚 Ver también:** `DONDE_ESTA_QUE.md` (GPS del sistema)
