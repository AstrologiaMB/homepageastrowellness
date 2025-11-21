# 🗺️ DONDE ESTÁ QUE - GPS del Ecosistema Astrowellness

**Versión:** 3.0
**Fecha:** 13 de Noviembre 2025
**Propósito:** Encontrar cualquier funcionalidad en 30 segundos

---

## 🚀 INICIO RÁPIDO

### Arquitectura General
- **Frontend**: Next.js (Puerto 3000) - `sidebar-fastapi/`
- **API Cálculos**: FastAPI (Puerto 8001) - `calculo-carta-natal-api/`
- **API Interpretaciones**: FastAPI (Puerto 8002) - `astro_interpretador_rag_fastapi/`
- **API Calendario**: FastAPI (Puerto 8003) - `astro-calendar-personal-fastapi/`
- **API Astrogematría**: FastAPI (Puerto 8004) - `astrogematria_fastapi/`
- **API Carta Electiva**: FastAPI (Puerto 8005) - `carta-electiva-api/` ⭐ **NUEVO**

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

# Nota: Desarrollo usa localhost hardcoded en lib/api-config.ts (no requiere configuración)
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

### **"¿Qué ocurre al cambiar de año (2025 → 2026)?"** ⭐ **TEST VALIDADO**
📍 **Estado:** ✅ **SISTEMA LISTO PARA 2026** (validado 21/11/2025)  
📍 **Ubicación:** `hooks/use-user-natal-data.ts` (línea 141)  
📍 **Mecanismo:** `year: new Date().getFullYear()` - detección automática del año del sistema  
📍 **Comportamiento:**
- El sistema detecta automáticamente el año actual
- Calcula eventos personales para el año detectado
- NO requiere intervención manual
- Funciona al cambiar la fecha del sistema operativo
📍 **Test realizado:**
- Fecha del sistema cambiada a 1/1/2026
- Usuario hizo login
- Sistema calculó 233 eventos automáticamente para 2026
- Tipos: 197 tránsitos + 1 luna progresada + 1 profección + 25 fases lunares + 4 eclipses + 5 aspectos
- Tiempo de cálculo: ~10 segundos
📍 **Resultado:** ✅ Funciona perfectamente sin cambios de código
📍 **Nota técnica:** Error 422 en microservicio de interpretaciones (puerto 8002) no es crítico - eventos se calculan y muestran correctamente, solo falta texto interpretativo RAG
📍 **Recomendación futura:** Agregar mensaje opcional "🎊 Feliz Año Nuevo" al detectar 1 de enero
📍 **Para usuarios en producción:**
- El 1/1/2026 simplemente acceden al calendario
- Sistema recalcula automáticamente para 2026
- Si la página está abierta a medianoche, hacer refresh o re-login

### **"Sistema de Cache del Calendario Personal"** ⭐ **IMPLEMENTADO - 21/11/2025**
📍 **Estado:** ✅ **FUNCIONANDO** - Performance mejorada 1,500x (12s → 8ms)
📍 **Ubicaciones principales:**
- `prisma/schema.prisma`: Modelo PersonalCalendarCache con cascade delete
- `lib/calendar-cache.ts`: Funciones de cache server-side (getCalendarCache, setCalendarCache)
- `app/api/calendario-personal/route.ts`: API Route con integración de cache
- `lib/personal-calendar-api.ts`: Cliente API para frontend
- `components/calendario-personal.tsx`: UI con badges visuales de cache
📍 **Implementación actual (Opción 1):**
- Query a Prisma para obtener `userId` desde email (~2ms overhead)
- Cache en PostgreSQL con TTL dinámico por año
- Scalable para miles de usuarios
- No requiere reiniciar sesión
📍 **Performance lograda:**
```
Antes:  ~12,000ms (12 segundos) cada carga
Ahora:  Primera carga: ~12s (🔄 CALCULADO) → Segunda carga: 8ms (⚡ CACHE)
Mejora: 1,500x más rápido en cargas subsecuentes
```
📍 **TTL Dinámico por año:**
- Año actual (2025): 24 horas (datos cambian frecuentemente)
- Año futuro (2026+): Hasta fin de año (máx 1 año)
- Año pasado (2024-): 30 días (datos inmutables)
📍 **Badges visuales en UI:**
- ⚡ CACHE (badge verde): Eventos cargados desde cache
- 🔄 CALCULADO (badge azul): Eventos recién calculados del microservicio
📍 **Botón Refresh:** Fuerza recálculo bypass del cache (para actualizar datos)
📍 **Logs del servidor:**
```
📅 Solicitud de calendario personal: usuario [id], año 2025
⚡ Cache miss: usuario [id], año 2025
🔄 Calculando eventos (cache miss)
✅ Cache guardado: usuario [id], año 2025, TTL 24h
```
📍 **Seguridad:**
- Cache por usuario (no compartido entre usuarios)
- Autenticación verificada en API Route
- Prisma solo en servidor (no en cliente)
- Cascade delete: cache se elimina al eliminar usuario
📍 **Testing:**
1. Abrir `/calendario/personal`
2. Primera carga: Ver badge "🔄 CALCULADO en ~12s"
3. Refrescar página (F5): Ver badge "⚡ CACHE" (carga en 8ms)
4. Click en botón Refresh: Ver badge "🔄 CALCULADO" de nuevo
📍 **Commits:**
- Sistema base: `db4c443` (13/11/2025)
- Fix userId: `8a7a772` (21/11/2025)
📍 **🔮 Mejora futura recomendada (Opción 2):**
- Cuando haya tiempo, migrar a callbacks de NextAuth para incluir `id` en sesión JWT
- Esto eliminaría la query extra (~2ms) para obtener userId
- Configuración en `app/api/auth/[...nextauth]/route.ts`:
```typescript
callbacks: {
  async session({ session, token }) {
    if (token.sub) {
      session.user.id = token.sub;
    }
    return session;
  },
  async jwt({ token, user }) {
    if (user) {
      token.sub = user.id;
    }
    return token;
  }
}
```
- Nota: Requerirá que usuarios reinicien sesión para actualizar JWT
- Beneficio: Zero queries para obtener userId (más eficiente a gran escala)
- Cuándo migrar: Cuando escales a decenas/cientos de miles de usuarios

### **"Problemas de autenticación o login"**
📍 **Ubicación:** `app/auth/login/page.tsx`  
📍 **API:** `app/api/auth/[...nextauth]/route.ts`  
📍 **Testing:** Verificar NextAuth configuración y base de datos  
📍 **Logs:** Revisar logs de autenticación en consola del navegador

### **"Necesito eliminar un usuario y sus datos asociados"** ⭐ **NUEVO**
📍 **Ubicación:** `app/admin/users/page.tsx`  
📍 **API:** `app/api/admin/users/[id]/route.ts` (DELETE endpoint)  
📍 **Ruta:** `/admin/users` (solo accesible por admins)  
📍 **Funcionalidad:**
- Panel admin con lista de todos los usuarios
- Botón "Eliminar" rojo por cada usuario
- AlertDialog con confirmación doble antes de eliminar
- Cascade delete automático vía Prisma (elimina todos los datos relacionados)
- Validación de seguridad: admin no puede auto-eliminarse
📍 **Cascade Delete incluye:**
- ✅ NatalChart (cartas natales)
- ✅ Interpretation (interpretaciones guardadas)
- ✅ RectificationEvent (eventos de rectificación)
- ✅ HoraryRequest (consultas horarias)
📍 **Configuración Prisma:** `onDelete: Cascade` en relaciones del schema
📍 **Testing:** Usuario con `role: 'admin'` puede eliminar otros usuarios
📍 **Seguridad:**
- Solo usuarios con rol admin pueden acceder
- Admin no puede eliminarse a sí mismo (validación en backend)
- Confirmación doble en UI para prevenir eliminaciones accidentales
📍 **Verificación:** Usuario eliminado no debe aparecer en `/admin/users` ni en base de datos

### **"Rectificación de carta no funciona"**
📍 **Ubicación:** `app/rectificacion-carta/page.tsx`  
📍 **APIs:** `app/api/rectification/events/route.ts`, `app/api/rectification/request/route.ts`  
📍 **Testing:** Verificar que los eventos de vida estén correctamente formateados

### **"Geocodificación falla o no encuentra lugares"**
📍 **Ubicación:** `app/api/geocode/route.ts`  
📍 **Testing:** Verificar API key de geocodificación y límites de uso  
📍 **Fallback:** Verificar si hay datos de coordenadas manuales disponibles

### **"Timeout de geocodificación (ReadTimeoutError) al completar datos de usuario"** ⭐ **NUEVO**
📍 **Ubicación:** `../calculo-carta-natal-api/main.py`  
📍 **Funciones:** `get_coordinates()` (línea ~107), `get_coordinates_with_options()` (línea ~135)  
📍 **Síntoma:** `ReadTimeoutError: Read timed out. (read timeout=1)` al buscar ubicaciones  
📍 **Causa:** Timeout de 1 segundo demasiado bajo para API externa de Nominatim (OpenStreetMap)  
📍 **Solución:** Aumentado a 10 segundos en ambas funciones
📍 **Fix:**
```python
# Antes (timeout implícito de geopy: 1 segundo)
location = geolocator.geocode(f"{city}, {country}", exactly_one=True)

# Después (timeout explícito: 10 segundos)
location = geolocator.geocode(f"{city}, {country}", exactly_one=True, timeout=10)
```
📍 **Testing:** Probar con ubicaciones lentas como "Londres, Argentina"  
📍 **Commit:** `74d12a3` (13/11/2025)  
📍 **Deploy:** Pusheado a GitHub, Railway hace deploy automático  
📍 **Endpoint afectado:** `/geocode/search` en backend
📍 **Frontend:** `app/completar-datos/page.tsx` usa este endpoint
📍 **Resultado:** Usuarios pueden completar datos sin errores de timeout

### **"Emails no se envían o fallan"**
📍 **Configuración Dual:** AWS SES (desarrollo local) + Resend (Railway producción)
📍 **Lógica:** Si tiene `AWS_ACCESS_KEY_ID` → usa AWS SES; si tiene `RESEND_API_KEY` → usa Resend
📍 **Archivos:** `app/api/auth/register/route.ts`, `app/api/auth/forgot-password/route.ts`
📍 **Testing Local:** Verificar variables AWS en `.env.local`
📍 **Testing Producción:** Verificar `RESEND_API_KEY` en Railway environment
📍 **Fallback:** Si no hay configuración, no envía emails pero no falla

### **"PDFs de cartas tropicales muestran contenido incompleto o problemas de paginación"**
📍 **Ubicación:** `lib/pdf-generator.ts`
📍 **Problema:** Interpretaciones individuales faltantes (solo narrativa), footer sobreescrito, texto cortado en medio de párrafos
📍 **Síntoma:** PDFs de 2 páginas incompletas, texto mezclado con footer ("Generado por Astrochat - www.astrochat.com crecimiento personal...")
📍 **Solución:**
- Nueva función `addIndividualInterpretations()` para procesar todas las interpretaciones del array
- Paginación inteligente con `getTextDimensions(content, {maxWidth: 170})` para cálculo preciso de espacio
- Footer space aumentado a 100mm para evitar superposiciones
- Remoción de elementos visuales problemáticos en portada
📍 **Resultado:** PDFs completos de 10+ páginas con todas las 28 interpretaciones y formato profesional
📍 **Testing:** Generar PDF desde `http://localhost:3000/cartas/tropica` y verificar que todas las páginas tienen footer intacto

### **"PDFs de cartas tropicales y dracónicas no incluyen el gráfico astrológico visual"**
📍 **Ubicación:** `components/pdf-download-button.tsx`, `lib/pdf-generator.ts`
📍 **Problema:** Los PDFs solo muestran texto, faltando el gráfico circular astrológico que aparece en pantalla
📍 **Síntoma:** PDFs sin imagen visual del gráfico, solo tablas de posiciones y texto
📍 **Solución:**
- **Sistema modular completo:** PDFs generados por secciones separadas y mergeados con `pdf-lib`
- **Funciones modulares tropicales:** `generateCoverPDF()`, `generateChartPDF()`, `generateNarrativePDF()`, `generateIndividualPDF()`
- **Funciones modulares dracónicas:** `generateDraconicCoverPDF()`, `generateDraconicChartPDF()`, `generateDraconicComparisonPDF()`, `generateDraconicEventsPDF()`, `generateDraconicNarrativePDF()`, `generateDraconicIndividualPDF()`
- **Captura del gráfico:** Usar html2canvas con parámetros `width`, `height`, `x`, `y` para forzar captura cuadrada desde esquina superior izquierda
- **Merge inteligente:** `mergePDFs()` combina secciones sin conflictos de paginación
- **Funciones principales:** `generateTropicalPDFModular()` y `generateDraconicPDFModular()` con fallback automático
- **Dimensiones:** Gráfico centrado de 105x105mm para mantener proporción circular perfecta
- **Paginación independiente:** Cada sección maneja su propia paginación sin interferir con otras
📍 **Resultado:** PDFs completos con gráficos astrológicos visuales circulares perfectos, paginación robusta, footer centrado y sin páginas en blanco para ambas cartas
📍 **Testing:**
- Tropical: Generar PDF desde `http://localhost:3000/cartas/tropica`
- Dracónica: Generar PDF desde `http://localhost:3000/cartas/draconica`
- Verificar gráficos circulares centrados, paginación intacta, footer centrado y flujo continuo sin páginas vacías
- Dracónica incluye ambas cartas: individual y superpuesta (tropical + dracónica)
📍 **Archivos modificados:** `components/pdf-download-button.tsx`, `lib/pdf-generator.ts`
📍 **Dependencias:** `pdf-lib` para merge de PDFs

### **"Grados aparecen en formato decimal en lugar de sexagesimal"**
📍 **Ubicación:** `app/cartas/draconica/page.tsx`
📍 **Función:** `formatearGradosEnTexto()` (línea ~68)
📍 **Síntoma:** Cúspides y descripciones muestran "8.988983013091001°" en lugar de "8° 59' 20""
📍 **Solución:** La función `formatearGradosEnTexto()` convierte automáticamente grados decimales a formato sexagesimal usando regex
📍 **Uso:** Aplicar `formatearGradosEnTexto()` antes de `traducirSignosEnTexto()` en descripciones de eventos
📍 **Testing:** Verificar eventos dracónicos en `http://localhost:3000/cartas/draconica`
📍 **Ejemplo:** `"Casa 1 Dracónica (Acuario 8.988983013091001°)"` → `"Casa 1 Dracónica (Acuario 8° 59' 20")"`

### **"Carta tropical accesible sin suscripción (paywall no funciona)"**
📍 **Ubicación:** `lib/subscription.ts`  
📍 **Array:** `PREMIUM_SERVICES` (línea ~10)  
📍 **Causa:** Typo en la ruta - `/cartas/tropical` en lugar de `/cartas/tropica`  
📍 **Síntoma:** Usuarios gratuitos pueden acceder a `/cartas/tropica` sin restricciones  
📍 **Solución:** Verificar que las rutas en `PREMIUM_SERVICES` coincidan exactamente con las rutas reales de las páginas  
📍 **Código correcto:**
```typescript
export const PREMIUM_SERVICES = [
  '/calendario/personal',
  '/cartas/tropica',      // ✅ Correcto (sin 'l' al final)
  '/cartas/draconica',
  '/astrogematria/interpretaciones'
] as const
```
📍 **Verificación:** 
- Usuario gratuito intenta acceder a `/cartas/tropica` → debe redirigir a `/upgrade`
- Usuario gratuito intenta acceder a `/cartas/draconica` → debe redirigir a `/upgrade`
📍 **Testing:** Usar usuario con `subscriptionStatus: 'free'` en base de datos
📍 **Middleware:** `middleware.ts` verifica permisos usando `isPremiumService(path)`

### **"Error ECONNREFUSED al conectar con microservicios (especialmente Astrogematría)"**
📍 **Causa:** URLs hardcodeadas que no funcionan en producción (Railway)
📍 **Síntoma:** `Error: connect ECONNREFUSED 127.0.0.1:8003` (o puertos 8001, 8002, 8004, 8005)
📍 **Solución:** Sistema centralizado de URLs con auto-discovery
📍 **Ubicación:** `lib/api-config.ts` (sistema centralizado)
📍 **Archivos afectados:** 7 rutas API actualizadas (`app/api/astrogematria/calcular/route.ts`, `app/api/astrogematria/remedios/route.ts`, `app/api/cartas/tropical/route.ts`, `app/api/cartas/draconica/route.ts`, `app/api/cartas/cruzada/route.ts`, `app/api/interpretaciones/route.ts`, `app/api/carta-electiva/buscar/route.ts`)
📍 **Documentación completa:** `API_URL_CENTRALIZATION_FIX.md`
📍 **Variables de entorno requeridas en Railway:**
```env
CALCULOS_API_URL=https://calculo-carta-natal-api-production.up.railway.app
INTERPRETACIONES_API_URL=https://astro-interpretador-rag-fastapi-production.up.railway.app
ASTROGEMATRIA_API_URL=https://astrogematria-fastapi-production.up.railway.app
CALENDARIO_PERSONAL_API_URL=https://astro-calendar-personal-fastapi-production.up.railway.app
CARTA_ELECTIVA_API_URL=https://carta-electiva-api-production.up.railway.app
```
📍 **Testing local:** URLs localhost funcionan automáticamente (fallback por defecto)
📍 **Testing Railway:** Verificar logs: `🔧 API URL para [SERVICIO]: [URL]`
📍 **Cómo funciona:**
- **Desarrollo:** Usa URLs localhost automáticamente si no hay variables de entorno
- **Producción:** Lee variables de entorno configuradas en Railway
- **Función:** `getApiUrl('SERVICIO_NAME')` centraliza toda la lógica

### **"Variables de entorno no funcionan en producción (Railway) - getApiUrl() retorna undefined"** ⭐ **NUEVO**
📍 **Ubicación:** `lib/api-config.ts`
📍 **Síntoma:** `getApiUrl() returns empty string` o `undefined` en browser, completar datos falla con error de network
📍 **Causa:** Next.js requiere prefix `NEXT_PUBLIC_` para variables accesibles desde el browser (client components)
📍 **Solución Implementada:**
- Cambiado de `process.env.CALCULOS_API_URL`
- A `process.env.NEXT_PUBLIC_CALCULOS_API_URL`
📍 **Variables requeridas en Railway (con prefix NEXT_PUBLIC_):**
```env
NEXT_PUBLIC_CALCULOS_API_URL=https://calculo-carta-natal-api-production.up.railway.app
NEXT_PUBLIC_INTERPRETACIONES_API_URL=https://astro-interpretador-rag_fastapi-production.up.railway.app
NEXT_PUBLIC_CALENDARIO_API_URL=https://astro-calendar-personal-fastapi-production.up.railway.app
NEXT_PUBLIC_ASTROGEMATRIA_API_URL=https://astrogematriafastapi-production.up.railway.app
NEXT_PUBLIC_CARTA_ELECTIVA_API_URL=https://carta-electiva-api-production.up.railway.app
```
📍 **Local:** No requiere cambios (usa localhost hardcoded automáticamente)
📍 **Testing:** Verificar en browser console que `getApiUrl('CALCULOS')` retorna URL válida
📍 **Commit:** `44ad61c` (13/11/2025)
📍 **Contexto:** Este fix fue necesario porque `app/completar-datos/page.tsx` es un client component que usa `getApiUrl()` para conectar con el backend de geocodificación
📍 **Resultado:** Usuarios pueden completar datos de nacimiento sin errores de conexión

### **"Error al generar interpretación narrativa: Unknown model 'gpt-4-turbo-preview' / 'gpt-4-turbo'"** ⭐ **NUEVO - 19/11/2025**
📍 **Ubicación:** `../astro_interpretador_rag_fastapi/interpretador_refactored.py`
📍 **Líneas afectadas:** 682 y 699 (función `_generar_interpretacion_narrativa`)
📍 **Síntoma:** Interpretaciones narrativas fallan con error "Unknown model 'gpt-4-turbo-preview'" o "Unknown model 'gpt-4-turbo'"
📍 **Causa:** La versión de la librería `openai` en Railway no reconoce estos nombres de modelo
📍 **Diagnóstico completo:**
- Primera iteración: Error con `gpt-4-turbo-preview` (modelo deprecado)
- Segunda iteración: Cambio a `gpt-4-turbo` pero Railway no lo reconoce
- Problema raíz: Sistema de cache múltiple (CartaNatal + InterpretacionCache)
📍 **Solución final:**
```python
# Antes (líneas 682 y 699):
llm_rewriter = OpenAILLM(api_key=self.openai_key, temperature=0.7, model="gpt-4-turbo")

# Después (FIX DEFINITIVO):
llm_rewriter = OpenAILLM(api_key=self.openai_key, temperature=0.7, model="gpt-4")
```
📍 **Por qué funciona:**
- `gpt-4` es el nombre **universal** compatible con todas las versiones de openai
- OpenAI automáticamente mapea `gpt-4` → última versión de GPT-4 disponible
- Funciona en desarrollo local Y en Railway sin configuración adicional
📍 **Limpieza de cache requerida:**
- **Problema adicional:** Sistema guarda interpretaciones en 2 tablas separadas
- **CartaNatal:** Guarda carta con interpretación embebida
- **InterpretacionCache:** Guarda solo interpretaciones
- **Solución:** Eliminar usuario completo desde `/admin/users` para limpiar ambos caches
- **Alternativa:** Endpoint `/api/cartas/clear-cache` solo limpia InterpretacionCache
📍 **Commits:**
- Primer intento: `77fe722` (gpt-4-turbo-preview → gpt-4-turbo)
- Fix definitivo: `153d5dd` (gpt-4-turbo → gpt-4)
📍 **Testing:**
- Tropical: Generar carta desde `/cartas/tropica`
- Dracónica: Generar carta desde `/cartas/draconica`
- Verificar que interpretación narrativa se genera sin errores
- Tiempo esperado: 3-15 segundos dependiendo de complejidad
📍 **Problema subsecuente identificado:**
- ⚠️ Railway rate limit: 500 logs/sec alcanzado
- Síntoma: "Messages dropped: 210"
- Impacto: Puede afectar rendimiento de carta dracónica
- Próximo paso: Optimizar logging en producción (pendiente)

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
| **Carta Electiva** | 8005 | `/buscar`, `/progress/{task_id}` ⭐ **NUEVO** |

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
| **formatearGradosEnTexto()** | Convierte grados decimales a sexagesimal en textos | `app/cartas/draconica/page.tsx` |

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
├── _generar_interpretaciones_concurrentes() # Consultas RAG paralelas
├── _generar_interpretacion_narrativa()      # Re-escritura GPT-4
└── _create_interpretation_item()     # Títulos para UI
```

### ** Calendario (astro-calendar-personal-fastapi) - Puerto 8003**
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

### **⭐ Carta Electiva (carta-electiva-api) - Puerto 8005** ⭐ **NUEVO**
```
app.py                                  # ⭐ API principal FastAPI
├── /buscar                             # Inicia búsqueda asíncrona
├── /progress/{task_id}                 # Consulta progreso real
└── /health                             # Health check

core/
├── algoritmo_busqueda.py               # ⭐ Algoritmo de búsqueda optimizada
├── enraizamiento_calculator.py         # Cálculos de enraizamiento
├── legacy_wrapper.py                   # Wrapper para cálculos legacy
└── numba_optimizations.py              # Optimizaciones con Numba

utils/
├── scc_calculator.py                   # Sistema de categorías SCC
├── csv_output.py                       # Exportación a CSV
└── ranking_system.py                   # Sistema de ranking
```

#### **🎯 Sistema de Progreso Real**
- **Antes:** Progreso simulado/falso (barra subía automáticamente)
- **Ahora:** Progreso real que refleja el trabajo backend
- **Implementación:** Polling simple cada 2 segundos a `/progress/{task_id}`
- **Backend:** Estado global `task_progress` con actualizaciones reales
- **Frontend:** Polling automático con manejo de errores y fallback

#### **🔍 Algoritmo de Búsqueda Optimizada**
- **Fase 1:** Filtro básico (1441 momentos → 515 prometedores)
- **Fase 2:** Análisis detallado con SCC (categorización automática)
- **Optimización:** 22x más rápido que sistema original
- **Timeout:** 5 minutos máximo por búsqueda

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
- **[Fix de URLs Centralizadas](API_URL_CENTRALIZATION_FIX.md)** - Solución ECONNREFUSED en producción

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
**🔄 Última actualización:** 13 de Noviembre 2025 (v3.0 - Optimización: Contenido Práctico)
**📚 Más documentación:** `docs/current/DOCUMENTACION_INDICE.md`
**👨‍💻 Mantenido por:** Equipo Astrowellness

---

**� Tip:** Usa Ctrl+F para buscar rápidamente cualquier funcionalidad en este documento.
