# 🗺️ DONDE ESTÁ QUE - GPS del Ecosistema Astrowellness

**Versión:** 1.3
**Fecha:** 12 de Septiembre 2025
**Propósito:** Encontrar cualquier funcionalidad en 30 segundos

---

## 🚀 INICIO RÁPIDO

### Arquitectura General
- **Frontend**: Next.js (Puerto 3000) - `sidebar-fastapi/`
- **API Cálculos**: FastAPI (Puerto 8001) - `calculo-carta-natal-api/`
- **API Interpretaciones**: FastAPI (Puerto 8002) - `astro_interpretador_rag_fastapi/`
- **API Calendario**: FastAPI (Puerto 8003) - `astro-calendar-personal-fastapi/`
- **API Astrogematría**: FastAPI (Puerto 8004) - `astro-calendar-personal-fastapi/`

### Variables de Entorno Requeridas
```bash
# Archivo: .env
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
```

### Inicio del Sistema
```bash
# Desde sidebar-fastapi/
./start_services.sh    # Inicia todos los servicios
./check_services.sh    # Verifica estado de servicios
```

---

## 🚨 PROBLEMAS COMUNES → SOLUCIONES

### **"Error de género: Luna aparece como 'dracónico' en vez de 'dracónica'"**
📍 **Ubicación:** `../astro_interpretador_rag_fastapi/interpretador_refactored.py`  
📍 **Función:** `_get_draconico_suffix()` (línea ~580)  
📍 **Uso:** `_generar_consulta_estandarizada()` (línea ~450)  
📍 **Testing:** Buscar "luna draconica" vs "mercurio draconico" en logs  
📍 **Documentación:** `../calculo-carta-natal-api/DRACONIC_GENDER_FIX_DOCUMENTATION.md`

### **"Cálculos dracónicos incorrectos o imprecisos"**
📍 **Ubicación:** `../calculo-carta-natal-api/src/calculators/cross_chart_calculator.py`  
📍 **Función:** `calculate_cross_aspects()` y `calculate_cross_cusps()`  
📍 **Testing:** Comparar con AstroSeek para verificar precisión  
📍 **Documentación:** `../calculo-carta-natal-api/DRACONIC_PRECISION_FIX_DOCUMENTATION.md`

### **"Cúspides cruzadas muestran resultados incorrectos (1→1, 2→2, etc.)"**
📍 **Causa:** Problema de cache de Prisma con datos obsoletos  
📍 **Solución:** `npx prisma generate --force`  
📍 **Verificación:** Casa 1 Dracónica debe caer en Casa 12 Tropical (no en Casa 1)  
📍 **Ubicación del código:** `../calculo-carta-natal-api/src/calculators/cross_chart_calculator.py`  
📍 **Testing:** Comparar Ascendente Dracónico (Acuario 8°57') vs Ascendente Tropical (Piscis 6°52')  
📍 **Síntoma:** Todas las casas dracónicas caen en la misma casa tropical correspondiente

### **"Interpretaciones dracónicas muestran contenido equivocado (Luna en lugar de Sol)"**
📍 **Causa:** Archivos dracónicos en ubicación incorrecta (`drepecated draco/`)
📍 **Síntoma:** "⚠️ Índice dracónico no disponible, fallback a índice mixto"
📍 **Solución:** Mover archivos de `drepecated draco/` a `src/services/data/draco/`
📍 **Verificación:** Buscar "✅ Usando índice DRACÓNICO separado" en logs
📍 **Documentación:** `RAG_SEPARATION_IMPLEMENTATION_PLAN.md`

### **"Interpretaciones no aparecen o están vacías"**
📍 **Ubicación:** `../astro_interpretador_rag_fastapi/interpretador_refactored.py`
📍 **Función:** `_flexible_title_match()` (matching de títulos)
📍 **Datos:** `../calculo-carta-natal-api/src/services/data/draco/Títulos normalizados minusculas.txt`
📍 **Testing:** Verificar que los títulos generados coincidan con los archivos

### **"Frontend dracónico no muestra eventos"**
📍 **Ubicación:** `app/cartas/draconica/page.tsx`  
📍 **Componentes:** `components/DraconicEventCard.tsx`, `components/DraconicEventsList.tsx`  
📍 **API:** `app/api/interpretaciones/route.ts`  
📍 **Testing:** Verificar llamadas a microservicios en Network tab

### **"Errores de conexión entre microservicios"**
📍 **Ubicación:** `app/api/cartas/cruzada/route.ts`  
📍 **Puertos:** Cálculos (8001), Interpretaciones (8002), Calendario (8003), Astrogematría (8004)  
📍 **Health checks:** `curl http://localhost:800X/health`  
📍 **Scripts:** `./restart_services.sh`

### **"Astrogematría no calcula o da errores"**
📍 **Ubicación:** `app/astrogematria/calculos/page.tsx`  
📍 **API:** `app/api/astrogematria/calcular/route.ts`  
📍 **Microservicio:** Puerto 8004 - astro-calendar-personal-fastapi  
📍 **Testing:** Verificar que el servicio esté corriendo y responda

### **"Calendario personal no muestra eventos"**
📍 **Ubicación:** `app/calendario/personal/page.tsx`  
📍 **Componente:** `components/calendario-personal.tsx`  
📍 **Microservicio:** Puerto 8003 - astro-calendar-personal-fastapi  
📍 **Testing:** Verificar datos natales del usuario y conexión al servicio

### **"Problemas de autenticación o login"**
📍 **Ubicación:** `app/auth/login/page.tsx`  
📍 **API:** `app/api/auth/[...nextauth]/route.ts`  
📍 **Testing:** Verificar NextAuth configuración y base de datos  
📍 **Logs:** Revisar logs de autenticación en consola del navegador

### **"Rectificación de carta no funciona"**
📍 **Ubicación:** `app/rectificacion-carta/page.tsx`  
📍 **APIs:** `app/api/rectification/events/route.ts`, `app/api/rectification/request/route.ts`  
📍 **Testing:** Verificar que los eventos de vida estén correctamente formateados

### **"Geocodificación falla o no encuentra lugares"**
📍 **Ubicación:** `app/api/geocode/route.ts`  
📍 **Testing:** Verificar API key de geocodificación y límites de uso  
📍 **Fallback:** Verificar si hay datos de coordenadas manuales disponibles

---

## 📍 MAPA FUNCIONAL (RESUMIDO)

### **🔮 FUNCIONES PRINCIPALES**
| Función | Ubicación | Archivo Principal |
|---------|-----------|-------------------|
| **Cálculos astrológicos** | calculo-carta-natal-api | `src/calculators/` |
| **Interpretaciones RAG** | astro_interpretador_rag_fastapi | `interpretador_refactored.py` |
| **Frontend cartas** | sidebar-fastapi | `app/cartas/` |
| **Autenticación** | sidebar-fastapi | `app/auth/` |
| **Base de datos** | sidebar-fastapi | `lib/prisma/` |

### **🎯 ENDPOINTS API**
| Servicio | Puerto | Endpoint Principal |
|----------|--------|-------------------|
| **Cálculos** | 8001 | `/calculate` |
| **Interpretaciones** | 8002 | `/interpretar` |
| **Calendario** | 8003 | `/calendar` |
| **Astrogematría** | 8004 | `/astrogematria` |

### **🛠️ UTILIDADES DISPONIBLES**
| Utilidad | Función | Ubicación |
|----------|---------|-----------|
| **formatAstrologicalDegrees()** | Convierte grados decimales a ° ' " | `lib/astrology-utils.ts` |
| **formatOrbe()** | Formatea orbes de aspectos | `lib/astrology-utils.ts` |
| **getDraconicSuffix()** | Determina sufijo dracónico por género | `lib/astrology-utils.ts` |
| **translateSign()** | Traduce signos del inglés al español | `lib/astrology-utils.ts` |
| **translatePlanet()** | Traduce nombres de planetas del inglés al español | `lib/astrology-utils.ts` |
| **translateAspect()** | Traduce tipos de aspectos del inglés al español | `lib/astrology-utils.ts` |
| **traducirSignosEnTexto()** | Traduce planetas, signos y términos en textos largos | `app/cartas/draconica/page.tsx` |

---

## 🏗️ MAPA POR MICROSERVICIO

### **📱 Frontend (sidebar-fastapi) - Puerto 3000**
```
app/
├── cartas/draconica/page.tsx          # Página principal dracónica
├── api/interpretaciones/route.ts      # Proxy a interpretador RAG
└── api/cartas/cruzada/route.ts       # Proxy a cálculos dracónicos

components/
├── DraconicEventCard.tsx             # Tarjeta individual de evento
└── DraconicEventsList.tsx            # Lista completa de eventos
```

### **🧮 Cálculos (calculo-carta-natal-api) - Puerto 8001**
```
src/calculators/
├── cross_chart_calculator.py         # ⭐ Cálculos dracónicos principales
├── natal_chart.py                    # Cartas tropicales base
└── ...

src/services/data/
├── draco/                            # Datos para interpretaciones dracónicas
└── tropical/                         # Datos para interpretaciones tropicales
```

### **🤖 Interpretaciones (astro_interpretador_rag_fastapi) - Puerto 8002**
```
interpretador_refactored.py           # ⭐ Motor RAG principal
├── _get_draconico_suffix()           # Género gramatical
├── _generar_consulta_estandarizada() # Consultas para matching
├── _flexible_title_match()           # Matching de títulos
└── _create_interpretation_item()     # Títulos para UI
```

### **📅 Calendario (astro-calendar-personal-fastapi) - Puerto 8003**
```
src/calculators/
├── astronomical_transits_calculator_v4.py  # Tránsitos principales
├── lunar_phases.py                         # Fases lunares
├── eclipses.py                            # Eclipses
└── profections_calculator.py             # Profecciones anuales
```

### **🔮 Astrogematría (astro-calendar-personal-fastapi) - Puerto 8004**
```
src/calculators/
├── astrogematria_calculator.py           # Cálculos numerológicos
├── remedios_calculator.py                # Remedios astrológicos
└── interpretaciones_astrogematria.py     # Interpretaciones numerológicas
```

---

## 🔧 DEBUGGING POR SÍNTOMAS

### **"No aparecen interpretaciones"**
1. **Verificar títulos:** ¿Los títulos generados coinciden con los archivos?
2. **Verificar RAG:** ¿El servicio interpretador está corriendo en puerto 8002?
3. **Verificar logs:** Buscar "EVENTO RECHAZADO" en logs del interpretador

### **"Cálculos incorrectos"**
1. **Verificar servicio:** ¿El servicio cálculos está corriendo en puerto 8001?
2. **Comparar con AstroSeek:** Usar datos de prueba conocidos
3. **Verificar logs:** Buscar errores en `carta_natal_api.log`

### **"Frontend no carga"**
1. **Verificar servicios:** `./check_services.sh`
2. **Verificar puertos:** ¿Están todos los puertos libres?
3. **Verificar Network tab:** ¿Las llamadas a APIs fallan?

### **"Errores de género"**
1. **Verificar función:** `_get_draconico_suffix()` en interpretador
2. **Verificar aplicación:** `_generar_consulta_estandarizada()`
3. **Verificar títulos:** ¿Los archivos de títulos están normalizados?

### **"Índice dracónico no disponible, fallback a índice mixto"**
1. **Verificar archivos:** ¿Existen archivos en `src/services/data/draco/`?
2. **Verificar rutas:** ¿Los archivos están en la carpeta correcta (no en subcarpetas)?
3. **Verificar logs:** Buscar "⚠️ Índice dracónico no disponible" en logs
4. **Solución:** Mover archivos de `drepecated draco/` a `draco/` si es necesario
5. **Verificación:** Buscar "✅ Usando índice DRACÓNICO separado" en logs

---

## 📚 DOCUMENTACIÓN RELACIONADA

### **Documentación Técnica**
- **[Índice Principal](docs/current/DOCUMENTACION_INDICE.md)** - Navegación completa
- **[Integración de Servicios](docs/current/INTEGRACION_SIDEBAR_CALCULO_API_ACTUALIZADA.md)** - Cómo se conectan los microservicios
- **[Overview de Microservicios](docs/current/MICROSERVICIOS_OVERVIEW.md)** - Arquitectura técnica

### **Documentación de Fixes**
- **[Fix de Género Dracónico](../calculo-carta-natal-api/DRACONIC_GENDER_FIX_DOCUMENTATION.md)** - Problema Luna vs Mercurio
- **[Fix de Precisión Dracónica](../calculo-carta-natal-api/DRACONIC_PRECISION_FIX_DOCUMENTATION.md)** - Mejoras de algoritmo
- **[Guía de Géneros en Frontend](../calculo-carta-natal-api/FRONTEND_GENDER_IMPLEMENTATION_GUIDE.md)** - Arquitectura de separación

### **Scripts Útiles**
```bash
# Gestión de servicios
./start_services.sh      # Iniciar todos los servicios
./check_services.sh      # Verificar estado
./restart_services.sh    # Reiniciar servicios

# Health checks individuales
curl http://localhost:8001/health  # Cálculos
curl http://localhost:8002/health  # Interpretaciones
curl http://localhost:8003/health  # Calendario

# Limpieza de cache
npx prisma generate --force     # Limpiar cache de Prisma
rm -rf node_modules/.prisma     # Reset completo del cliente Prisma
rm -rf .next                    # Limpiar cache de Next.js
npm install                     # Reinstalar dependencias si es necesario
```

---

## 🎯 DESARROLLO RÁPIDO

### **Tareas Comunes de Desarrollo**
| Tarea | Comando | Ubicación |
|-------|---------|------------|
| **Agregar interpretación** | Agregar .md en `src/services/data/draco/` | calculo-carta-natal-api |
| **Modificar UI** | Editar `app/cartas/draconica/page.tsx` | sidebar-fastapi |
| **Cambiar algoritmo** | Modificar `src/calculators/` | calculo-carta-natal-api |
| **Formatear grados** | Usar `formatAstrologicalDegrees()` | `lib/astrology-utils.ts` |
| **Género dracónico** | Usar `getDraconicSuffix()` | `lib/astrology-utils.ts` |
| **Traducir signos** | Usar `translateSign()` | `lib/astrology-utils.ts` |
| **Traducir planetas** | Usar `translatePlanet()` | `lib/astrology-utils.ts` |
| **Traducir aspectos** | Usar `translateAspect()` | `lib/astrology-utils.ts` |
| **Traducir textos largos** | Usar `traducirSignosEnTexto()` | `app/cartas/draconica/page.tsx` |
| **Actualizar estilos** | Editar `components/` | sidebar-fastapi |

---

## � PRÓXIMAS MEJORAS

- [ ] **Comentarios de navegación** en funciones clave
- [ ] **Convenciones de naming** más descriptivas
- [ ] **Índices por funcionalidad** específicos
- [ ] **Guía de testing** automatizado

---

**📍 Ubicación de este documento:** `/Users/apple/sidebar-fastapi/DONDE_ESTA_QUE.md`
**🔄 Última actualización:** 12 de Septiembre 2025 (v1.3 - Nuevas funciones de traducción)
**👨‍💻 Mantenido por:** Equipo Astrowellness

---

**� Tip:** Usa Ctrl+F para buscar rápidamente cualquier funcionalidad en este documento.
