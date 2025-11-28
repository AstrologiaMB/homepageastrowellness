# 🗺️ DONDE ESTÁ QUE - GPS del Ecosistema Astrowellness

**Versión:** 4.3 (Prisma Migrations Fix)
**Fecha:** 28 de Noviembre 2025
**Propósito:** Encontrar cualquier funcionalidad en 30 segundos

---

## 🚀 INICIO RÁPIDO

### Arquitectura General
- **Frontend**: Next.js (Puerto 3000) - `sidebar-fastapi/`
- **API Cálculos**: FastAPI (Puerto 8001) - `calculo-carta-natal-api/`
- **API Interpretaciones**: FastAPI (Puerto 8002) - `astro_interpretador_rag_fastapi/`
- **API Calendario**: FastAPI (Puerto 8003) - `astro-calendar-personal-fastapi/`
- **API Astrogematría**: FastAPI (Puerto 8004) - `astrogematria_fastapi/`
- **API Carta Electiva**: FastAPI (Puerto 8005) - `carta-electiva-api/`

### Variables de Entorno Requeridas
```bash
# Archivo: .env.local (desarrollo)
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000

# URLs de Microservicios (Railway - Producción)
# IMPORTANTE: Requieren prefix NEXT_PUBLIC_ para acceso desde browser
NEXT_PUBLIC_CALCULOS_API_URL=https://calculo-carta-natal-api-production.up.railway.app
NEXT_PUBLIC_INTERPRETACIONES_API_URL=https://astro-interpretador-rag-fastapi-production.up.railway.app
NEXT_PUBLIC_CALENDARIO_API_URL=https://astro-calendar-personal-fastapi-production.up.railway.app
NEXT_PUBLIC_ASTROGEMATRIA_API_URL=https://astrogematriafastapi-production.up.railway.app
NEXT_PUBLIC_CARTA_ELECTIVA_API_URL=https://carta-electiva-api-production.up.railway.app
```

### Inicio del Sistema
```bash
# Desde sidebar-fastapi/
./start_services.sh    # Inicia todos los servicios
./check_services.sh    # Verifica estado de servicios
./stop_services.sh     # Detiene todos los servicios
```

---

## 🚨 PROBLEMAS COMUNES → SOLUCIONES RÁPIDAS

### **Género dracónico incorrecto (Luna "dracónico" vs "dracónica")**
📍 `../astro_interpretador_rag_fastapi/interpretador_refactored.py` → `_get_draconico_suffix()` (línea ~580)  
📍 Sistema de género implementado ✅  
📋 [Detalles completos en HISTORIAL_FIXES.md](HISTORIAL_FIXES.md#error-de-género-luna-aparece-como-dracónico-en-vez-de-dracónica)

### **Cálculos dracónicos imprecisos**
📍 `../calculo-carta-natal-api/src/calculators/cross_chart_calculator.py`  
📍 Funciones: `calculate_cross_aspects()`, `calculate_cross_cusps()`  
📍 Testing: Comparar con AstroSeek  
📋 [Detalles completos en HISTORIAL_FIXES.md](HISTORIAL_FIXES.md#cálculos-dracónicos-incorrectos-o-imprecisos)

### **Cúspides cruzadas incorrectas (1→1, 2→2)**
📍 Causa: Cache de Prisma obsoleto  
📍 Solución: `npx prisma generate --force`  
📍 Verificación: Casa 1 Dracónica debe caer en Casa 12 Tropical  
📋 [Detalles completos en HISTORIAL_FIXES.md](HISTORIAL_FIXES.md#cúspides-cruzadas-muestran-resultados-incorrectos-11-22-etc)

### **Interpretaciones dracónicas equivocadas**
📍 Síntoma: "⚠️ Índice dracónico no disponible, fallback a índice mixto"  
📍 Causa: Archivos en ubicación incorrecta (`drepecated draco/`)  
📍 Solución: Mover a `src/services/data/draco/`  
📍 Verificación: Buscar "✅ Usando índice DRACÓNICO separado" en logs  
📋 [Detalles completos en HISTORIAL_FIXES.md](HISTORIAL_FIXES.md#interpretaciones-dracónicas-muestran-contenido-equivocado)

### **Interpretaciones no aparecen o vacías**
📍 `../astro_interpretador_rag_fastapi/interpretador_refactored.py` → `_flexible_title_match()`  
📍 Datos: `../calculo-carta-natal-api/src/services/data/draco/Títulos normalizados minusculas.txt`  
📍 Verificar: Títulos generados coincidan con archivos

### **Calendario personal lento o no muestra eventos**
📍 `app/calendario/personal/page.tsx`  
📍 Sistema de cache: 1,500x más rápido (12s → 8ms)  
📍 Microservicio: Puerto 8003  
📍 Verificar: Datos natales del usuario y conexión al servicio  
📋 [Detalles de cache en HISTORIAL_FIXES.md](HISTORIAL_FIXES.md#sistema-de-cache-del-calendario-personal)

### **Error PersonalCalendarCache table does not exist (Railway)**
📍 Causa: `/prisma/migrations/` estaba en .gitignore bloqueando todo  
📍 Síntoma: "No migration found in prisma/migrations" en logs Railway  
📍 Solución: Remover línea de .gitignore y agregar migrations al repo  
📍 Commits: e747260 (intento fallido), 1b302be (BUILD→START), ac587b2 (fix real)  
📍 Estado: ✅ RESUELTO (28/11/2025) - Cache funciona en producción  
📋 [Detalles completos en HISTORIAL_FIXES.md](HISTORIAL_FIXES.md#error-personalcalendarcache-table-does-not-exist-railway)

### **Rate limit de Railway (messages dropped)**
📍 Causa: Logging excesivo en loops y JSON.stringify de payloads grandes  
📍 Solución: Fase 1 (`cruzada/route.ts`) + Fase 2A (`interpretaciones/route.ts`)  
📍 Crítico: `JSON.stringify(ragRequest, null, 2)` de 50KB+ comentado  
📍 Estado: ✅ RESUELTO (27/11/2025)  
📋 [Detalles completos en HISTORIAL_FIXES.md](HISTORIAL_FIXES.md#rate-limit-de-railway---fix-completo-frontend-phase-2)

### **Errores de conexión ECONNREFUSED con microservicios**
📍 Causa: URLs hardcodeadas o variables entorno incorrectas  
📍 Solución: Sistema centralizado en `lib/api-config.ts`  
📍 Variables Railway: Requieren prefix `NEXT_PUBLIC_`  
📍 Verificar logs: `🔧 API URL para [SERVICIO]: [URL]`  
📋 [Detalles completos en HISTORIAL_FIXES.md](HISTORIAL_FIXES.md#error-econnrefused-al-conectar-con-microservicios)

### **Error SSL al conectar internamente (ERR_SSL_PACKET_LENGTH_TOO_LONG)**
📍 `lib/api-config.ts` → Servicio `FRONTEND_INTERNAL` agregado  
📍 `app/api/interpretaciones/route.ts` → Usa `getApiUrl('FRONTEND_INTERNAL')`  
📍 Causa: Fetch interno intentaba HTTPS a puerto HTTP (8080) en Railway  
📍 Solución: Patrón consistente con microservicios externos  
📍 Estado: ✅ RESUELTO (27/11/2025)  
📋 [Detalles completos en HISTORIAL_FIXES.md](HISTORIAL_FIXES.md#error-ssl-en-fetch-interno-err_ssl_packet_length_too_long)

### **Timeout en cartas dracónicas o geocodificación**
📍 Frontend: `app/api/interpretaciones/route.ts` (timeout: 5 min)  
📍 Backend: `interpretador_refactored.py` (OpenAI timeout: 5 min)  
📍 Geocodificación: `main.py` (Nominatim timeout: 10 seg)  
📋 [Detalles completos en HISTORIAL_FIXES.md](HISTORIAL_FIXES.md#-fixes-de-timeouts)

### **Carta tropical accesible sin suscripción**
📍 `lib/subscription.ts` → Array `PREMIUM_SERVICES` (línea ~10)  
📍 Causa común: Typo en ruta (`/cartas/tropical` vs `/cartas/tropica`)  
📍 Middleware: `middleware.ts` verifica permisos  
📋 [Detalles completos en HISTORIAL_FIXES.md](HISTORIAL_FIXES.md#carta-tropical-accesible-sin-suscripción-paywall-no-funciona)

### **Error modelo OpenAI desconocido**
📍 `interpretador_refactored.py` (líneas 682, 699)  
📍 Solución: Usar `model="gpt-4"` (universal, compatible todas versiones)  
📍 Limpieza cache: Eliminar usuario desde `/admin/users`  
📋 [Detalles completos en HISTORIAL_FIXES.md](HISTORIAL_FIXES.md#error-al-generar-interpretación-narrativa-unknown-model-gpt-4-turbo)

### **PDFs incompletos o sin gráficos**
📍 `lib/pdf-generator.ts`, `components/pdf-download-button.tsx`  
📍 Sistema modular con `pdf-lib` para merge de secciones  
📍 Gráficos: html2canvas con dimensiones 105x105mm  
📋 [Detalles completos en HISTORIAL_FIXES.md](HISTORIAL_FIXES.md#-fixes-de-generación-de-pdf)

### **Grados en formato decimal vs sexagesimal**
📍 `app/cartas/draconica/page.tsx` → `formatearGradosEnTexto()` (línea ~68)  
📍 Conversión automática: "8.988983°" → "8° 59' 20""  
📍 Uso: Aplicar antes de `traducirSignosEnTexto()`

### **Sistema funciona en 2025, ¿funcionará en 2026?**
📍 `hooks/use-user-natal-data.ts` (línea 141)  
📍 Detección automática: `year: new Date().getFullYear()`  
📍 Estado: ✅ Sistema listo para 2026 (validado 21/11/2025)  
📍 Acción usuario: Solo acceder al calendario el 1/1/2026  
📋 [Detalles del test en HISTORIAL_FIXES.md](HISTORIAL_FIXES.md#qué-ocurre-al-cambiar-de-año-2025--2026)

---

## 📍 MAPA FUNCIONAL

### **🔮 Funciones Principales**
| Función | Ubicación | Archivo |
|---------|-----------|---------|
| **Cálculos astrológicos** | calculo-carta-natal-api | `src/calculators/` |
| **Interpretaciones RAG** | astro_interpretador_rag_fastapi | `interpretador_refactored.py` |
| **Frontend cartas** | sidebar-fastapi | `app/cartas/` |
| **Autenticación** | sidebar-fastapi | `app/auth/` |
| **Base de datos** | sidebar-fastapi | `lib/prisma.ts` |
| **Configuración URLs** | sidebar-fastapi | `lib/api-config.ts` |

### **🎯 Endpoints API**
| Servicio | Puerto | Endpoint | Health Check |
|----------|--------|----------|--------------|
| **Cálculos** | 8001 | `/calculate` | `curl localhost:8001/health` |
| **Interpretaciones** | 8002 | `/interpretar` | `curl localhost:8002/health` |
| **Calendario** | 8003 | `/calendar` | `curl localhost:8003/health` |
| **Astrogematría** | 8004 | `/astrogematria` | `curl localhost:8004/health` |
| **Carta Electiva** | 8005 | `/buscar`, `/progress/{task_id}` | `curl localhost:8005/health` |

### **🛠️ Utilidades Disponibles**

#### En `lib/astrology-utils.ts`
```typescript
formatAstrologicalDegrees(decimal)  // 8.988 → "8° 59' 20""
formatOrbe(orbe)                    // Formatea orbes de aspectos
getDraconicSuffix(planet)           // "dracónico" vs "dracónica"
translateSign(sign)                 // "Aries" → "Aries" (ES)
translatePlanet(planet)             // "Sun" → "Sol"
translateAspect(aspect)             // "Conjunction" → "Conjunción"
```

#### En `app/cartas/draconica/page.tsx`
```typescript
traducirSignosEnTexto(texto)        // Traduce términos en textos largos
formatearGradosEnTexto(texto)       // Convierte decimales en textos
```

---

## 🏗️ ESTRUCTURA POR MICROSERVICIO

### **📱 Frontend (sidebar-fastapi) - Puerto 3000**
```
app/cartas/
├── draconica/page.tsx       # Carta dracónica
├── tropica/page.tsx         # Carta tropical
└── horaria/page.tsx         # Carta horaria

app/api/
├── interpretaciones/        # Proxy a interpretador RAG
├── cartas/cruzada/         # Proxy a cálculos dracónicos
└── calendario-personal/    # Calendario con cache

components/
├── DraconicEventCard.tsx   # Tarjeta evento dracónico
├── DraconicEventsList.tsx  # Lista eventos
├── carta-natal.tsx         # Gráfico carta natal
└── pdf-download-button.tsx # Generación PDFs
```

### **🧮 Cálculos (calculo-carta-natal-api) - Puerto 8001**
```
src/calculators/
├── cross_chart_calculator.py    # Cálculos dracónicos
├── natal_chart.py               # Cartas tropicales
└── ...

src/services/data/
├── draco/                       # Datos interpretaciones dracónicas
└── tropical/                    # Datos interpretaciones tropicales
```

### **🤖 Interpretaciones (astro_interpretador_rag_fastapi) - Puerto 8002**
```
interpretador_refactored.py
├── _get_draconico_suffix()                  # Género gramatical
├── _generar_consulta_estandarizada()        # Consultas para matching
├── _flexible_title_match()                  # Matching de títulos
├── _generar_interpretaciones_concurrentes() # Consultas RAG paralelas
├── _generar_interpretacion_narrativa()      # Re-escritura GPT-4
└── _create_interpretation_item()            # Títulos para UI
```

### **📅 Calendario (astro-calendar-personal-fastapi) - Puerto 8003**
```
src/calculators/
├── astronomical_transits_calculator_v4.py  # Tránsitos
├── lunar_phases.py                         # Fases lunares
├── eclipses.py                            # Eclipses
└── profections_calculator.py             # Profecciones
```

### **🔮 Astrogematría (astrogematria_fastapi) - Puerto 8004**
```
src/calculators/
├── astrogematria_calculator.py           # Cálculos numerológicos
├── remedios_calculator.py                # Remedios astrológicos
└── interpretaciones_astrogematria.py     # Interpretaciones
```

### **⭐ Carta Electiva (carta-electiva-api) - Puerto 8005**
```
app.py                          # API principal FastAPI
core/
├── algoritmo_busqueda.py       # Algoritmo búsqueda optimizada
├── enraizamiento_calculator.py # Cálculos enraizamiento
└── numba_optimizations.py      # Optimizaciones Numba
```

---

## 🔧 DEBUGGING POR SÍNTOMAS

### **"No aparecen interpretaciones"**
1. Verificar RAG corriendo en puerto 8002: `curl localhost:8002/health`
2. Verificar títulos en logs: Buscar "EVENTO RECHAZADO"
3. Verificar archivos en `src/services/data/draco/`

### **"Cálculos incorrectos"**
1. Verificar servicio puerto 8001: `curl localhost:8001/health`
2. Comparar con AstroSeek usando datos conocidos
3. Revisar logs: `carta_natal_api.log`

### **"Frontend no carga"**
1. Verificar servicios: `./check_services.sh`
2. Verificar puertos libres: `lsof -i :3000`
3. Network tab del navegador: Ver llamadas API fallidas

### **"Errores de género en interpretaciones"**
1. Verificar función: `_get_draconico_suffix()` en interpretador
2. Verificar aplicación en: `_generar_consulta_estandarizada()`
3. Buscar en logs: "luna draconica" vs "mercurio draconico"

---

## 📚 DOCUMENTACIÓN RELACIONADA

### **Índice Principal**
- **[Índice de Documentación](docs/current/DOCUMENTACION_INDICE.md)** - Navegación completa
- **[Historial de Fixes](HISTORIAL_FIXES.md)** - Registro detallado de soluciones ⭐
- **[Overview de Microservicios](docs/current/MICROSERVICIOS_OVERVIEW.md)** - Arquitectura técnica

### **Documentación de Fixes Específicos**
- `DRACONIC_GENDER_FIX_DOCUMENTATION.md` - Fix género dracónico
- `DRACONIC_PRECISION_FIX_DOCUMENTATION.md` - Fix precisión cálculos
- `API_URL_CENTRALIZATION_FIX.md` - Fix URLs centralizadas
- `FRONTEND_GENDER_IMPLEMENTATION_GUIDE.md` - Arquitectura separación géneros

---

## 🚀 DESARROLLO RÁPIDO

### **Scripts de Gestión**
```bash
# Servicios
./start_services.sh      # Iniciar todos
./check_services.sh      # Verificar estado
./restart_services.sh    # Reiniciar
./stop_services.sh       # Detener

# Health checks individuales
curl http://localhost:8001/health  # Cálculos
curl http://localhost:8002/health  # Interpretaciones
curl http://localhost:8003/health  # Calendario
curl http://localhost:8004/health  # Astrogematría
curl http://localhost:8005/health  # Carta Electiva

# Limpieza de cache
npx prisma generate --force     # Cache Prisma
rm -rf node_modules/.prisma     # Reset Prisma
rm -rf .next                    # Cache Next.js
```

### **Tareas Comunes**
| Tarea | Acción | Ubicación |
|-------|--------|-----------|
| **Agregar interpretación** | Agregar .md en `data/draco/` | calculo-carta-natal-api |
| **Modificar UI** | Editar `app/cartas/` | sidebar-fastapi |
| **Cambiar algoritmo** | Modificar `src/calculators/` | calculo-carta-natal-api |
| **Actualizar estilos** | Editar `components/` | sidebar-fastapi |
| **Ver usuarios** | Acceder a `/admin/users` | sidebar-fastapi |
| **Limpiar cache** | DELETE user o `/api/cartas/clear-cache` | sidebar-fastapi |

---

## 💡 TIPS RÁPIDOS

### **Búsqueda Rápida en Logs**
```bash
# Interpretador RAG
grep "EVENTO RECHAZADO" logs/interpretador.log
grep "Usando índice DRACÓNICO" logs/interpretador.log

# Errores de conexión
grep "ECONNREFUSED" logs/app.log
grep "timeout" logs/app.log
```

### **Testing Local vs Producción**
```bash
# Local: URLs localhost automáticas
# Producción: Verificar variables NEXT_PUBLIC_ en Railway

# Verificar en browser console:
console.log(getApiUrl('CALCULOS'))
```

### **Regenerar Prisma Client**
```bash
npx prisma generate --force  # Fuerza regeneración
npx prisma studio            # UI para ver DB
```

---

**📍 Ubicación:** `/Users/apple/sidebar-fastapi/DONDE_ESTA_QUE.md`  
**🔄 Última actualización:** 28 de Noviembre 2025 (v4.3 - Prisma Migrations Fix)  
**📚 Ver también:**
- [HISTORIAL_FIXES.md](HISTORIAL_FIXES.md) - Detalles históricos completos
- [docs/current/DOCUMENTACION_INDICE.md](docs/current/DOCUMENTACION_INDICE.md) - Índice general

---

**🔍 Tip:** Usa Ctrl+F para buscar rápidamente. Para detalles históricos (commits, deployment IDs, testing detallado), consulta [HISTORIAL_FIXES.md](HISTORIAL_FIXES.md).
